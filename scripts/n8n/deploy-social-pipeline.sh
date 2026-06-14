#!/usr/bin/env bash
# Deploy Social Distribute workflow + NEWS branch to n8n.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

# n8n API key from .env.local (cursor-mcp JWT)
if [[ -z "${N8N_API_KEY:-}" && -f .env.local ]]; then
  N8N_API_KEY=$(grep '^cursor-mcp=' .env.local | cut -d= -f2-)
  export N8N_API_KEY
fi

# Postiz API key: local override, Mac Mini secrets, or env
if [[ -z "${POSTIZ_API_KEY:-}" && -f "$HOME/.config/sysbilt/postiz-secrets.env" ]]; then
  # shellcheck disable=SC1091
  source "$HOME/.config/sysbilt/postiz-secrets.env"
fi
if [[ -z "${POSTIZ_API_KEY:-}" ]]; then
  echo "Fetching POSTIZ_API_KEY from Mac Mini..." >&2
  POSTIZ_API_KEY=$(ssh sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net 'grep ^POSTIZ_API_KEY= ~/.config/sysbilt/postiz-secrets.env | cut -d= -f2-')
  export POSTIZ_API_KEY
fi

: "${N8N_API_KEY:?Set N8N_API_KEY or cursor-mcp in .env.local}"
: "${POSTIZ_API_KEY:?Set POSTIZ_API_KEY}"

exec node scripts/n8n/deploy-social-pipeline.mjs "$@"
