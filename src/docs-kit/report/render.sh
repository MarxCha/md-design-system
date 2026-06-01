#!/usr/bin/env bash
# Render un documento report-kit (HTML autocontenido) a PDF con Chrome headless.
# Uso: render.sh <ruta/index.html> [salida.pdf]
set -euo pipefail
HTML="${1:?ruta al index.html}"; OUT="${2:-${HTML%/*}/out.pdf}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" --virtual-time-budget=12000 "file://$(cd "$(dirname "$HTML")" && pwd)/$(basename "$HTML")"
echo "→ $OUT"
