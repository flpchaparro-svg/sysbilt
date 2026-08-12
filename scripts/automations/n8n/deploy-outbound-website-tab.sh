#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."
node scripts/automations/n8n/deploy-outbound-website-tab.mjs "$@"
