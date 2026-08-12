#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
exec node "$ROOT/scripts/automations/n8n/deploy-outbound-quote-capture-send.mjs" "$@"
