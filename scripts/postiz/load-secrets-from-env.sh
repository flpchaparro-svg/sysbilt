#!/usr/bin/env bash
# Copy Phase 1 secrets into Mac Mini local secrets file (run on Mac Mini).
# Usage: bash load-secrets-from-env.sh /path/to/.env.local
set -euo pipefail

SRC="${1:?Usage: $0 /path/to/.env.local}"
DEST="${HOME}/.config/sysbilt/postiz-secrets.env"
mkdir -p "$(dirname "${DEST}")"

get_var() {
  local key="$1"
  grep -E "^${key}=" "${SRC}" | tail -1 | cut -d= -f2- | tr -d '\r'
}

LINKEDIN_CLIENT_ID="$(get_var Linkedin_client_id)"
LINKEDIN_CLIENT_SECRET="$(get_var Linkedin_client_secret)"
FACEBOOK_APP_ID="$(get_var Facebook_app_id)"
FACEBOOK_APP_SECRET="$(get_var Facebook_app_secret)"

[[ -n "${LINKEDIN_CLIENT_ID}" ]] || { echo "Missing Linkedin_client_id in ${SRC}" >&2; exit 1; }

cat > "${DEST}" <<EOF
LINKEDIN_CLIENT_ID=${LINKEDIN_CLIENT_ID}
LINKEDIN_CLIENT_SECRET=${LINKEDIN_CLIENT_SECRET}
FACEBOOK_APP_ID=${FACEBOOK_APP_ID}
FACEBOOK_APP_SECRET=${FACEBOOK_APP_SECRET}
EOF
chmod 600 "${DEST}"
echo "Wrote ${DEST}"
