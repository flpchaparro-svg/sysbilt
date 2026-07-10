#!/usr/bin/env bash
# Fix Postiz LinkedIn first-comment failures.
#
# Two bugs:
#   1. createCommentPost uses legacy v2/socialActions — carousel posts (ugcPost) need rest/socialActions + LinkedIn-Version header.
#   2. OAuth scopes only request w_member_social — comments need w_member_social_feed (+ w_organization_social_feed for pages).
#
# After running: re-connect LinkedIn personal + SYSBILT page in Postiz (OAuth must be redone for new scopes).
#
# Run ON the Mac Mini after Postiz image updates (re-apply if container is recreated from image).
set -euo pipefail

if ! docker ps --format '{{.Names}}' | grep -qx postiz; then
  echo "ERROR: postiz container not running" >&2
  exit 1
fi

docker exec postiz node <<'NODE'
const fs = require('fs');

const files = [
  '/app/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.ts',
  '/app/apps/backend/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.js',
  '/app/apps/backend/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.page.provider.js',
  '/app/apps/orchestrator/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.js',
];

let patched = 0;
for (const f of files) {
  if (!fs.existsSync(f)) {
    console.log('skip missing', f);
    continue;
  }
  let t = fs.readFileSync(f, 'utf8');
  const before = t;

  t = t.replace(/https:\/\/api\.linkedin\.com\/v2\/socialActions\//g, 'https://api.linkedin.com/rest/socialActions/');

  if (!t.includes('w_member_social_feed')) {
    t = t.replace("'w_member_social',", "'w_member_social',\n            'w_member_social_feed',");
  }
  if (!t.includes('w_organization_social_feed')) {
    t = t.replace("'w_organization_social',", "'w_organization_social',\n            'w_organization_social_feed',");
  }

  const headerNeedle = "headers: {\n                'Content-Type': 'application/json',\n                Authorization:";
  const headerRepl = "headers: {\n                'Content-Type': 'application/json',\n                'LinkedIn-Version': '202601',\n                'X-Restli-Protocol-Version': '2.0.0',\n                Authorization:";
  if (t.includes(headerNeedle) && !t.includes("'LinkedIn-Version': '202601'")) {
    t = t.replace(headerNeedle, headerRepl);
  }

  const headerNeedleTs = "'Content-Type': 'application/json',\n          Authorization:";
  const headerReplTs = "'Content-Type': 'application/json',\n          'LinkedIn-Version': '202601',\n          'X-Restli-Protocol-Version': '2.0.0',\n          Authorization:";
  if (t.includes(headerNeedleTs) && !t.includes("'LinkedIn-Version': '202601'")) {
    t = t.replace(headerNeedleTs, headerReplTs);
  }

  if (t !== before) {
    fs.writeFileSync(f, t);
    patched++;
    console.log('patched', f);
  } else {
    console.log('already ok', f);
  }
}

if (patched === 0) {
  console.log('No changes needed.');
}
NODE

echo "Restarting Postiz..."
POSTIZ_DIR="${HOME}/services/postiz"
if [[ -d "${POSTIZ_DIR}" ]]; then
  (cd "${POSTIZ_DIR}" && docker compose restart postiz)
else
  docker restart postiz
fi

sleep 10
if docker exec postiz grep -q 'w_member_social_feed' /app/apps/backend/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.js \
  && docker exec postiz grep -q 'rest/socialActions' /app/apps/orchestrator/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.js; then
  echo "OK: LinkedIn comment fix applied."
  echo "NEXT: Re-connect LinkedIn in Postiz (Felipe personal + SYSBILT page) so new OAuth scopes take effect."
else
  echo "ERROR: patch verification failed" >&2
  exit 1
fi
