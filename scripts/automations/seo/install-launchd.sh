#!/usr/bin/env bash
# Install the monthly SEO monitor as a user launchd job (1st of the month, 09:00).
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$DIR/../../.." && pwd)"
LABEL=com.sysbilt.seo-monitor
DEST="$HOME/Library/LaunchAgents/$LABEL.plist"
UID_NUM="$(id -u)"

mkdir -p "$HOME/Library/LaunchAgents" "$DIR/logs"
sed -e "s|__REPO__|$REPO|g" -e "s|__HOME__|$HOME|g" "$DIR/$LABEL.plist" > "$DEST"
chmod +x "$DIR/run-monitor.sh"

launchctl bootout "gui/$UID_NUM/$LABEL" 2>/dev/null || true
sleep 1
launchctl bootstrap "gui/$UID_NUM" "$DEST"
launchctl enable "gui/$UID_NUM/$LABEL"

echo "Installed $LABEL (1st of the month, 09:00 local)."
echo "Run now:  launchctl kickstart -k gui/$UID_NUM/$LABEL"
echo "Logs:     $DIR/logs/"
launchctl print "gui/$UID_NUM/$LABEL" | sed -n '1,12p'
