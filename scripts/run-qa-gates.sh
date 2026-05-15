#!/usr/bin/env bash
# Run 6-gate QA validation for pk-hero clone. Foreground-blocking.
set -e
cd /Users/marxchavez/Projects/md-design-system
exec /opt/homebrew/bin/python3 -u ~/.claude/skills/clone-site/templates/qa-gates.py --all \
  --spec clones/pieterkoopt-2026-05-08/clone-spec/01-hero.md \
  --original-html clones/pieterkoopt-2026-05-08/_evidence/hero-section.html \
  --rebuilt-url http://localhost:3011/templates/pk-hero \
  --evidence-dir clones/pieterkoopt-2026-05-08/_evidence \
  --src-dir src \
  --scope-selector-rebuilt .pk-hero
