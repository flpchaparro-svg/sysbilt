#!/usr/bin/env bash
# Fix Postiz LinkedIn for Community Management API-only apps + first-comment.
#
# Fixes:
#   1. OAuth scopes: drop openid/profile (not on CM-only apps); personal keeps
#      w_member_social + w_member_social_feed + r_basicprofile; page keeps org scopes
#      + social_feed. Removes prompt=none so LinkedIn shows consent (#1582 / #1243).
#   2. Authenticate/refresh: use /v2/me (r_basicprofile) instead of OpenID /v2/userinfo.
#   3. Comments: rest/socialActions + LinkedIn-Version header (carousel/ugcPost).
#
# After running: re-connect LinkedIn in Postiz (OAuth must be redone for new scopes).
#
# Run ON the Mac Mini after Postiz image updates (re-apply if container is recreated).
set -euo pipefail

if ! docker ps --format '{{.Names}}' | grep -qx postiz; then
  echo "ERROR: postiz container not running" >&2
  exit 1
fi

docker exec -i postiz node <<'NODE'
const fs = require('fs');

const PERSONAL_SCOPES_JS = `this.scopes = [
            'w_member_social',
            'w_member_social_feed',
            'r_basicprofile',
        ];`;

const PAGE_SCOPES_JS = `this.scopes = [
            'w_member_social',
            'w_member_social_feed',
            'r_basicprofile',
            'rw_organization_admin',
            'w_organization_social',
            'w_organization_social_feed',
        ];`;

const PERSONAL_SCOPES_TS = `scopes = [
    'w_member_social',
    'w_member_social_feed',
    'r_basicprofile',
  ];`;

const PAGE_SCOPES_TS = `override scopes = [
    'w_member_social',
    'w_member_social_feed',
    'r_basicprofile',
    'rw_organization_admin',
    'w_organization_social',
    'w_organization_social_feed',
  ];`;

const ME_FETCH_JS = `const meProfile = await (await fetch('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,vanityName,profilePicture(displayImage~digitalmediaAsset:playableStreams))', {
            headers: {
                Authorization: \`Bearer \${accessToken}\`,
            },
        })).json();
        const id = meProfile.id;
        const name = [meProfile.localizedFirstName, meProfile.localizedLastName].filter(Boolean).join(' ');
        const vanityName = meProfile.vanityName;
        const picture = meProfile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier;`;

const USERINFO_BLOCK_JS = `const { name, sub: id, picture, } = await (await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: {
                Authorization: \`Bearer \${accessToken}\`,
            },
        })).json();
        const { vanityName } = await (await fetch('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization: \`Bearer \${accessToken}\`,
            },
        })).json();`;

const USERINFO_ONLY_JS = `const { name, sub: id, picture, } = await (await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: {
                Authorization: \`Bearer \${accessToken}\`,
            },
        })).json();`;

const files = [
  {
    path: '/app/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.ts',
    page: false,
    ts: true,
  },
  {
    path: '/app/libraries/nestjs-libraries/src/integrations/social/linkedin.page.provider.ts',
    page: true,
    ts: true,
  },
  {
    path: '/app/apps/backend/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.js',
    page: false,
    ts: false,
  },
  {
    path: '/app/apps/backend/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.page.provider.js',
    page: true,
    ts: false,
  },
  {
    path: '/app/apps/orchestrator/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.js',
    page: false,
    ts: false,
  },
  {
    path: '/app/apps/orchestrator/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.page.provider.js',
    page: true,
    ts: false,
  },
];

function patchScopes(t, isPage, isTs) {
  if (isTs) {
    return isPage
      ? t.replace(/override scopes = \[[\s\S]*?\];/, PAGE_SCOPES_TS)
      : t.replace(/scopes = \[[\s\S]*?\];/, PERSONAL_SCOPES_TS);
  }
  return isPage
    ? t.replace(/this\.scopes = \[[\s\S]*?\];/, PAGE_SCOPES_JS)
    : t.replace(/this\.scopes = \[[\s\S]*?\];/, PERSONAL_SCOPES_JS);
}

function removePromptNone(t) {
  return t
    .replace(/&prompt=none/g, '')
    .replace(/prompt=none&/g, '')
    .replace(/\?prompt=none&/g, '?');
}

function patchUserinfoJs(t) {
  while (t.includes(USERINFO_BLOCK_JS)) {
    t = t.replace(USERINFO_BLOCK_JS, ME_FETCH_JS);
  }
  while (t.includes(USERINFO_ONLY_JS)) {
    t = t.replace(USERINFO_ONLY_JS, ME_FETCH_JS);
  }
  return t;
}

function patchUserinfoTs(t) {
  if (!t.includes('api.linkedin.com/v2/userinfo')) return t;
  const meTs = `const meProfile = await (
      await fetch(
        'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,vanityName,profilePicture(displayImage~digitalmediaAsset:playableStreams))',
        {
          headers: {
            Authorization: \`Bearer \${accessToken}\`,
          },
        }
      )
    ).json();
    const id = meProfile.id;
    const name = [meProfile.localizedFirstName, meProfile.localizedLastName]
      .filter(Boolean)
      .join(' ');
    const vanityName = meProfile.vanityName;
    const picture =
      meProfile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]
        ?.identifier;`;
  t = t.replace(
    /const \{[\s\S]*?name,[\s\S]*?sub: id,[\s\S]*?picture,[\s\S]*?\} = await \(\s*await fetch\(\s*'https:\/\/api\.linkedin\.com\/v2\/userinfo'[\s\S]*?\)\.json\(\);[\s\n]*const \{ vanityName \} = await \(\s*await fetch\(\s*'https:\/\/api\.linkedin\.com\/v2\/me'[\s\S]*?\)\.json\(\);/g,
    meTs
  );
  t = t.replace(
    /const \{[\s\S]*?name,[\s\S]*?sub: id,[\s\S]*?picture,[\s\S]*?\} = await \(\s*await fetch\(\s*'https:\/\/api\.linkedin\.com\/v2\/userinfo'[\s\S]*?\)\.json\(\);/g,
    meTs
  );
  return t;
}

function removeLeftoverVanityName(t) {
  // refreshToken originally kept a standalone /v2/me vanityName fetch; after
  // replacing userinfo with meProfile, that leftover redeclares vanityName.
  if (!t.includes('const vanityName = meProfile.vanityName')) return t;
  return t.replace(
    /[ \t]*const \{ vanityName \} = await \(await fetch\('https:\/\/api\.linkedin\.com\/v2\/me', \{\n[ \t]*headers: \{\n[ \t]*Authorization: `Bearer \$\{accessToken\}`,\n[ \t]*\},\n[ \t]*\}\)\)\.json\(\);\n?/g,
    ''
  ).replace(
    /[ \t]*const \{ vanityName \} = await \(\s*await fetch\(\s*'https:\/\/api\.linkedin\.com\/v2\/me',\s*\{\s*headers:\s*\{\s*Authorization: `Bearer \$\{accessToken\}`,\s*\},\s*\}\s*\)\s*\)\.json\(\);\n?/gs,
    ''
  );
}


let patched = 0;
for (const f of files) {
  if (!fs.existsSync(f.path)) {
    console.log('skip missing', f.path);
    continue;
  }
  let t = fs.readFileSync(f.path, 'utf8');
  const before = t;

  t = patchScopes(t, f.page, f.ts);
  t = removePromptNone(t);
  t = f.ts ? patchUserinfoTs(t) : patchUserinfoJs(t);
  t = removeLeftoverVanityName(t);

  // Comment API: rest/socialActions + version headers
  t = t.replace(
    /https:\/\/api\.linkedin\.com\/v2\/socialActions\//g,
    'https://api.linkedin.com/rest/socialActions/'
  );

  // Always inject version headers on comment Content-Type blocks that lack them
  // (file may already contain LinkedIn-Version elsewhere for posts).
  t = t.replace(
    /headers:\s*\{\s*\n(\s*)'Content-Type':\s*'application\/json',\s*\n(\s*)Authorization:/g,
    (m, i1, i2) => {
      if (m.includes('LinkedIn-Version')) return m;
      return `headers: {\n${i1}'Content-Type': 'application/json',\n${i1}'LinkedIn-Version': '202601',\n${i1}'X-Restli-Protocol-Version': '2.0.0',\n${i2}Authorization:`;
    }
  );

  if (t !== before) {
    fs.writeFileSync(f.path, t);
    patched++;
    console.log('patched', f.path);
  } else {
    console.log('already ok', f.path);
  }
}

console.log(patched === 0 ? 'No changes needed.' : `Patched ${patched} file(s).`);
NODE

echo "Restarting Postiz..."
POSTIZ_DIR="${HOME}/services/postiz"
if [[ -d "${POSTIZ_DIR}" ]]; then
  (cd "${POSTIZ_DIR}" && docker compose restart postiz)
else
  docker restart postiz
fi

echo "Waiting for healthy..."
for i in $(seq 1 36); do
  status="$(docker inspect -f '{{.State.Health.Status}}' postiz 2>/dev/null || echo starting)"
  if [[ "${status}" == "healthy" ]]; then
    break
  fi
  sleep 5
done

PERSONAL_JS=/app/apps/backend/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.js
PAGE_JS=/app/apps/backend/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.page.provider.js
ORCH_JS=/app/apps/orchestrator/dist/libraries/nestjs-libraries/src/integrations/social/linkedin.provider.js

ok=1
docker exec postiz grep -q 'w_member_social_feed' "${PERSONAL_JS}" || ok=0
docker exec postiz grep -q 'w_organization_social_feed' "${PAGE_JS}" || ok=0
docker exec postiz grep -q 'rest/socialActions' "${ORCH_JS}" || ok=0
! docker exec postiz grep -q 'openid' "${PERSONAL_JS}" || ok=0
! docker exec postiz grep -q 'prompt=none' "${PERSONAL_JS}" || ok=0
! docker exec postiz grep -q 'userinfo' "${PERSONAL_JS}" || ok=0
! docker exec postiz grep -q "rw_organization_admin" "${PERSONAL_JS}" || ok=0

if [[ "${ok}" -eq 1 ]] && [[ "$(docker inspect -f '{{.State.Health.Status}}' postiz)" == "healthy" ]]; then
  echo "OK: LinkedIn OAuth + comment fix applied."
  echo "NEXT: Calendar → Add Channel → LinkedIn (re-connect personal + page)."
else
  echo "ERROR: patch verification failed (health=$(docker inspect -f '{{.State.Health.Status}}' postiz))" >&2
  exit 1
fi
