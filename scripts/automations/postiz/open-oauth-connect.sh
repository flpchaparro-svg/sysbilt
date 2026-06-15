#!/usr/bin/env bash
# Open Postiz OAuth connect flows (run after logging into Postiz as admin).
set -euo pipefail

HOST="${POSTIZ_HOST:-postiz.sysbilt.com}"
EMAIL="${POSTIZ_EMAIL:-felipe@sysbilt.com}"
PASSWORD="${POSTIZ_PASSWORD:?Set POSTIZ_PASSWORD}"
COOKIE_JAR="${TMPDIR:-/tmp}/postiz-cookies.txt"
RESOLVE=(--resolve "${HOST}:443:104.21.33.174")

login() {
  curl -s "${RESOLVE[@]}" -c "${COOKIE_JAR}" -X POST "https://${HOST}/api/auth/login" \
    -H 'Content-Type: application/json' \
    -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASSWORD}\",\"provider\":\"LOCAL\"}" >/dev/null
}

open_provider() {
  local provider="$1"
  local url
  url=$(curl -s "${RESOLVE[@]}" -b "${COOKIE_JAR}" "https://${HOST}/api/integrations/social/${provider}" | python3 -c "import json,sys; print(json.load(sys.stdin)['url'])")
  echo "${provider}: ${url}"
  open "${url}" 2>/dev/null || echo "Open manually: ${url}"
}

login
for p in linkedin linkedin-page facebook; do
  open_provider "${p}"
done
