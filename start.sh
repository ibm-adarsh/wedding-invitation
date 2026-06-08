#!/usr/bin/env bash
# Local wedding invitation server — works fully offline after first npm install
set -e
cd "$(dirname "$0")"
PORT="${PORT:-8000}"

echo "🪔 Starting wedding invitation locally..."
echo "   Open: http://localhost:${PORT}"
echo "   Press Ctrl+C to stop"
echo ""

if command -v python3 &>/dev/null; then
  python3 -m http.server "$PORT"
elif command -v python &>/dev/null; then
  python -m http.server "$PORT"
elif command -v npx &>/dev/null; then
  npx --yes http-server -p "$PORT" -c-1
else
  echo "Error: Install Python 3 or Node.js to run a local server."
  echo "Or open index.html directly in your browser."
  exit 1
fi
