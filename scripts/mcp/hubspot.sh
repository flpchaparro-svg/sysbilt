#!/usr/bin/env bash
# Launch HubSpot MCP using the private app token from .env.local (no OAuth).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ENV_FILE="${ROOT}/.env.local"
NPX="/usr/local/bin/npx"

if [[ -f "${ENV_FILE}" ]]; then
  HUBSPOT_PRIVATE_APP_TOKEN="$(grep -E '^HUBSPOT_PRIVATE_APP_TOKEN=' "${ENV_FILE}" | tail -1 | cut -d= -f2- | tr -d '\r')"
  export HUBSPOT_PRIVATE_APP_TOKEN
fi

: "${HUBSPOT_PRIVATE_APP_TOKEN:?Set HUBSPOT_PRIVATE_APP_TOKEN in .env.local}"
export PRIVATE_APP_ACCESS_TOKEN="${HUBSPOT_PRIVATE_APP_TOKEN}"

exec "${NPX}" -y @hubspot/mcp-server
