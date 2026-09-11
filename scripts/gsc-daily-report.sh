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

GH="/opt/homebrew/bin/gh"

mkdir -p "$LOG_DIR"
cd "$REPO" || exit 1

# --- Deploy-Fallback -------------------------------------------------------
# The workflow's own cron (17 4 * * *) is unreliable: GitHub ran the 5:00 UTC
# schedule at 9:00-9:50 UTC for a week and skipped 11 Sept entirely, so
# scheduled articles went live hours late or not at all. This Mac is on every
# weekday morning anyway, so: if no deploy run exists for today (UTC), dispatch one.
TODAY_UTC=$(date -u +%Y-%m-%d)
{
  echo "=== Deploy-Fallback $(date '+%Y-%m-%d %H:%M %Z') ==="
  RUNS_TODAY=$("$GH" run list --workflow deploy.yml --limit 10 \
    --json createdAt,status,conclusion \
    --jq "[.[] | select(.createdAt | startswith(\"$TODAY_UTC\")) | select(.status != \"completed\" or .conclusion == \"success\")] | length" 2>/dev/null)
  if [[ -z "$RUNS_TODAY" ]]; then
    echo "gh nicht erreichbar, kein Dispatch"
  elif [[ "$RUNS_TODAY" -gt 0 ]]; then
    echo "heute bereits $RUNS_TODAY Deploy-Lauf/Laeufe, kein Dispatch"
  else
    if "$GH" workflow run deploy.yml --ref master 2>&1; then
      echo "kein Deploy heute, Rebuild per workflow_dispatch angestossen"
      osascript -e 'display notification "GitHub-Cron kam nicht, Rebuild manuell angestossen" with title "boredom-at-work"' 2>/dev/null
    else
      echo "Dispatch FEHLGESCHLAGEN"
    fi
  fi
  echo
} > "$LOG" 2>&1
# ---------------------------------------------------------------------------

"$NODE" scripts/gsc-index-status.js --top 10 >> "$LOG" 2>&1
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
