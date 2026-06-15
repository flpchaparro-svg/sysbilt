#!/usr/bin/env bash
# Deploy SYSBILT - Outbound List Builder (Workflow A) to n8n.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

if [[ -z "${N8N_API_KEY:-}" && -f .env.local ]]; then
  N8N_API_KEY=$(grep '^cursor-mcp=' .env.local | cut -d= -f2-)
  export N8N_API_KEY
fi

if [[ -f scripts/n8n/.deploy-state.env ]]; then
  # shellcheck disable=SC1091
  source scripts/n8n/.deploy-state.env
fi

: "${N8N_API_KEY:?Set N8N_API_KEY or cursor-mcp in .env.local}"

exec node scripts/n8n/deploy-outbound-list-builder.mjs "$@"
