#!/usr/bin/env bash
# Deploy SYSBILT - Lane 3 Industry News to n8n.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"
STATE_ENV="scripts/automations/n8n/.deploy-state.env"

if [[ -z "${N8N_API_KEY:-}" && -f .env.local ]]; then
  N8N_API_KEY=$(grep '^cursor-mcp=' .env.local | cut -d= -f2-)
  export N8N_API_KEY
fi

if [[ -z "${POSTIZ_API_KEY:-}" && -f "${HOME}/.config/sysbilt/postiz-secrets.env" ]]; then
  # shellcheck disable=SC1091
  set -a
  source "${HOME}/.config/sysbilt/postiz-secrets.env"
  set +a
fi

if [[ -f "${STATE_ENV}" ]]; then
  # shellcheck disable=SC1091
  source "${STATE_ENV}"
fi

: "${N8N_API_KEY:?Set N8N_API_KEY or cursor-mcp in .env.local}"

exec node scripts/automations/n8n/deploy-lane3-industry-news.mjs "$@"
