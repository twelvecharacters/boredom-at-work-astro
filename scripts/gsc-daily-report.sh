#!/bin/bash
# Daily GSC index-status report. Run by the launchd agent
# ~/Library/LaunchAgents/com.boredomatwork.gsc-index.plist
#
# Writes the ranked submit list to a log and raises a macOS notification, so
# the ten manual "Request Indexing" submissions can be done from a current
# list instead of a guess. Submission itself stays manual: Google has no
# indexing API for regular articles.

set -uo pipefail

REPO="/Users/mehdivazirian/boredom-at-work"
NODE="/opt/homebrew/bin/node"
LOG_DIR="$HOME/.claude/logs"
LOG="$LOG_DIR/gsc-index-$(date +%Y-%m-%d).log"

mkdir -p "$LOG_DIR"
cd "$REPO" || exit 1

"$NODE" scripts/gsc-index-status.js --top 10 > "$LOG" 2>&1
STATUS=$?

if [[ $STATUS -ne 0 ]]; then
  osascript -e 'display notification "GSC-Report fehlgeschlagen, siehe Log" with title "boredom-at-work"' 2>/dev/null
  exit $STATUS
fi

INDEXED=$(grep -Eo '^ +[0-9]+ +Submitted and indexed' "$LOG" | grep -Eo '[0-9]+' | head -1)
INDEXED=${INDEXED:-0}

osascript -e "display notification \"$INDEXED Seiten indexiert. 10 neue URLs zum Einreichen liegen im Log.\" with title \"GSC Index-Report\" sound name \"Ping\"" 2>/dev/null

# Keep two weeks of logs, drop the rest.
find "$LOG_DIR" -name 'gsc-index-*.log' -mtime +14 -delete 2>/dev/null

exit 0
