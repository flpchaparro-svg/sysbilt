#!/usr/bin/env bash
# Postiz Phase 2 bootstrap for Mac Mini (felipes-mac-mini)
# Run ON the Mac Mini: bash bootstrap-mac-mini.sh
set -euo pipefail

POSTIZ_HOST="postiz.sysbilt.com"
POSTIZ_DIR="${HOME}/services/postiz"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_URL="https://github.com/gitroomhq/postiz-docker-compose"
ENV_FILE="${POSTIZ_DIR}/.env"

log() { printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
die() { echo "ERROR: $*" >&2; exit 1; }

command -v docker >/dev/null || die "Docker not found. Install Docker Desktop first."
docker compose version >/dev/null || die "docker compose plugin not found."

# --- credentials: env vars or optional local secrets file ---
SECRETS_FILE="${POSTIZ_SECRETS_FILE:-${HOME}/.config/sysbilt/postiz-secrets.env}"
if [[ -f "${SECRETS_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${SECRETS_FILE}"
fi

: "${LINKEDIN_CLIENT_ID:?Set LINKEDIN_CLIENT_ID}"
: "${LINKEDIN_CLIENT_SECRET:?Set LINKEDIN_CLIENT_SECRET}"
: "${FACEBOOK_APP_ID:?Set FACEBOOK_APP_ID}"
: "${FACEBOOK_APP_SECRET:?Set FACEBOOK_APP_SECRET}"

JWT_SECRET="${JWT_SECRET:-$(openssl rand -hex 32)}"
if [[ -f "${ENV_FILE}" ]] && grep -q '^POSTGRES_PASSWORD=' "${ENV_FILE}"; then
  POSTGRES_PASSWORD="$(grep '^POSTGRES_PASSWORD=' "${ENV_FILE}" | cut -d= -f2-)"
  JWT_SECRET="$(grep '^JWT_SECRET=' "${ENV_FILE}" | cut -d= -f2-)"
else
  POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-$(openssl rand -base64 24 | tr -d '/+=' | head -c 24)}"
fi

log "Clone or update postiz-docker-compose"
mkdir -p "$(dirname "${POSTIZ_DIR}")"
if [[ -d "${POSTIZ_DIR}/.git" ]]; then
  git -C "${POSTIZ_DIR}" pull --ff-only
else
  git clone "${REPO_URL}" "${POSTIZ_DIR}"
fi
cd "${POSTIZ_DIR}"

log "Write compose override (port 5000 + env)"
OVERRIDE="${POSTIZ_DIR}/docker-compose.override.yml"
DISABLE_REG="${DISABLE_REGISTRATION:-false}"
cat > "${OVERRIDE}" <<EOF
services:
  postiz:
    ports:
      - "5000:5000"
    environment:
      MAIN_URL: "https://${POSTIZ_HOST}"
      FRONTEND_URL: "https://${POSTIZ_HOST}"
      NEXT_PUBLIC_BACKEND_URL: "https://${POSTIZ_HOST}/api"
      JWT_SECRET: "${JWT_SECRET}"
      DATABASE_URL: "postgresql://postiz-user:${POSTGRES_PASSWORD}@postiz-postgres:5432/postiz-db-local"
      REDIS_URL: "redis://postiz-redis:6379"
      BACKEND_INTERNAL_URL: "http://localhost:3000"
      TEMPORAL_ADDRESS: "temporal:7233"
      IS_GENERAL: "true"
      STORAGE_PROVIDER: "local"
      UPLOAD_DIRECTORY: "/uploads"
      NEXT_PUBLIC_UPLOAD_DIRECTORY: "/uploads"
      DISABLE_REGISTRATION: "${DISABLE_REG}"
      RUN_CRON: "true"
      API_LIMIT: "30"
      RESTRICT_UPLOAD_DOMAINS: "cdn.sanity.io"
      LINKEDIN_CLIENT_ID: "${LINKEDIN_CLIENT_ID}"
      LINKEDIN_CLIENT_SECRET: "${LINKEDIN_CLIENT_SECRET}"
      FACEBOOK_APP_ID: "${FACEBOOK_APP_ID}"
      FACEBOOK_APP_SECRET: "${FACEBOOK_APP_SECRET}"
  postiz-postgres:
    environment:
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
      POSTGRES_USER: postiz-user
      POSTGRES_DB: postiz-db-local
EOF

log "Write ${ENV_FILE} (reference copy)"
cat > "${ENV_FILE}" <<EOF
# Postiz — generated $(date -u +%Y-%m-%dT%H:%MZ)
JWT_SECRET=${JWT_SECRET}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
DISABLE_REGISTRATION=${DISABLE_REG}
EOF
chmod 600 "${ENV_FILE}"

log "Start stack"
docker compose up -d
docker compose ps

log "Wait for postiz health (up to 3 min)"
for i in $(seq 1 36); do
  if curl -fsS "http://localhost:5000/" >/dev/null 2>&1; then
    log "Postiz responding on localhost:5000"
    break
  fi
  sleep 5
  if [[ "${i}" -eq 36 ]]; then
    die "Postiz did not become ready — check: docker compose logs postiz"
  fi
done

find_cloudflared_config() {
  local candidates=(
    "${HOME}/.cloudflared/config.yml"
    "${HOME}/.cloudflared/config.yaml"
    "/etc/cloudflared/config.yml"
    "${HOME}/Library/Application Support/cloudflared/config.yml"
  )
  local c
  for c in "${candidates[@]}"; do
    [[ -f "${c}" ]] && { echo "${c}"; return 0; }
  done
  return 1
}

if CF_CONFIG="$(find_cloudflared_config)"; then
  log "Patch cloudflared: ${CF_CONFIG}"
  bash "${SCRIPT_DIR}/patch-cloudflared.sh" "${POSTIZ_HOST}" "http://localhost:5000" || true
else
  log "No cloudflared config found — add tunnel hostname ${POSTIZ_HOST} -> http://localhost:5000"
fi

cat <<EOF

=== Postiz bootstrap complete (containers running) ===

1. Open https://${POSTIZ_HOST} and create your admin account.
2. Re-run with registration lock:
     DISABLE_REGISTRATION=true ${0}
   Or: sed -i '' 's/DISABLE_REGISTRATION=false/DISABLE_REGISTRATION=true/' "${ENV_FILE}" && docker compose --env-file "${ENV_FILE}" down && docker compose --env-file "${ENV_FILE}" up -d

3. Connect integrations in UI: LinkedIn, LinkedIn Page, Facebook Page.
4. Settings → Developers → copy Public API key.

Secrets saved in: ${ENV_FILE}
JWT_SECRET and POSTGRES_PASSWORD are in that file — back it up securely.

EOF

if [[ "${DISABLE_REGISTRATION:-false}" == "true" ]]; then
  log "Locking registration — recreate override and restart"
  DISABLE_REG="true"
  cat > "${OVERRIDE}" <<EOF
services:
  postiz:
    ports:
      - "5000:5000"
    environment:
      MAIN_URL: "https://${POSTIZ_HOST}"
      FRONTEND_URL: "https://${POSTIZ_HOST}"
      NEXT_PUBLIC_BACKEND_URL: "https://${POSTIZ_HOST}/api"
      JWT_SECRET: "${JWT_SECRET}"
      DATABASE_URL: "postgresql://postiz-user:${POSTGRES_PASSWORD}@postiz-postgres:5432/postiz-db-local"
      REDIS_URL: "redis://postiz-redis:6379"
      BACKEND_INTERNAL_URL: "http://localhost:3000"
      TEMPORAL_ADDRESS: "temporal:7233"
      IS_GENERAL: "true"
      STORAGE_PROVIDER: "local"
      UPLOAD_DIRECTORY: "/uploads"
      NEXT_PUBLIC_UPLOAD_DIRECTORY: "/uploads"
      DISABLE_REGISTRATION: "true"
      RUN_CRON: "true"
      API_LIMIT: "30"
      RESTRICT_UPLOAD_DOMAINS: "cdn.sanity.io"
      LINKEDIN_CLIENT_ID: "${LINKEDIN_CLIENT_ID}"
      LINKEDIN_CLIENT_SECRET: "${LINKEDIN_CLIENT_SECRET}"
      FACEBOOK_APP_ID: "${FACEBOOK_APP_ID}"
      FACEBOOK_APP_SECRET: "${FACEBOOK_APP_SECRET}"
  postiz-postgres:
    environment:
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
      POSTGRES_USER: postiz-user
      POSTGRES_DB: postiz-db-local
EOF
  docker compose down
  docker compose up -d
  log "Registration disabled."
fi
