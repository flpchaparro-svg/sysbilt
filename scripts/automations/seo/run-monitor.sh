#!/usr/bin/env bash
# Monthly SEO monitor run. Logs the report and keeps the last 12 months.
set -uo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$DIR/../../.." && pwd)"
LOG_DIR="$DIR/logs"
mkdir -p "$LOG_DIR"

STAMP="$(date +%Y-%m-%d)"
cd "$REPO"

node scripts/automations/seo/seo-monitor.mjs > "$LOG_DIR/$STAMP.md" 2>&1
STATUS=$?

cat "$LOG_DIR/$STAMP.md"

# Keep a year of reports, drop the rest.
ls -1t "$LOG_DIR"/*.md 2>/dev/null | tail -n +13 | xargs -I {} rm -f {} 2>/dev/null || true

exit $STATUS
