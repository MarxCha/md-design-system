#!/usr/bin/env bash
# build.sh — pipeline de export del report-kit: HTML autocontenido → PDF (Chrome headless).
# Comando único que reemplaza el render.sh manual por-archivo.
#
# Uso:
#   build.sh                 # renderiza TODOS los examples/*/index.html
#   build.sh sener-modern    # renderiza solo ese example
#   build.sh --list          # lista los examples disponibles
#
# Salida: out/<nombre>.pdf (gitignored). Reusa la invocación de render.sh.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
EXDIR="$HERE/examples"
OUT="$HERE/out"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

render_one() {
  local name="$1" html="$EXDIR/$1/index.html"
  if [[ ! -f "$html" ]]; then echo "✗ $name: no existe $html" >&2; return 1; fi
  mkdir -p "$OUT"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$OUT/$name.pdf" --virtual-time-budget=12000 "file://$html" 2>/dev/null
  echo "✓ $name → out/$name.pdf"
}

if [[ "${1:-}" == "--list" ]]; then
  for d in "$EXDIR"/*/; do [[ -f "$d/index.html" ]] && basename "$d"; done
  exit 0
fi

if [[ -n "${1:-}" ]]; then
  render_one "$1"
else
  for d in "$EXDIR"/*/; do
    [[ -f "$d/index.html" ]] && render_one "$(basename "$d")" || true
  done
fi
