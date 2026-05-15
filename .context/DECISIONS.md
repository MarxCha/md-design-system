# Decisiones arquitecturales — md-design-system

## 2026-05-08 (sesión 019 — Sprint 5)

### Agent Team de 3 + Foreman validates parallel clone-site dispatch
- **Contexto:** Tras shipping pk-hero (commit b81a4dd), CEO pidió clonar las 3 secciones restantes en paralelo via /orchestrator agent team.
- **Decisión:** Dispatched 3 frontend-architect agents con write-zones EXCLUSIVAS por sección (clone-spec/{NN}.md + componentes + route + assets + screenshots scoped al slug). Foreman pre-flight: extracción de section HTMLs + dev server up. Foreman post-flight: integración + typecheck + commit.
- **Resultado:** 3 secciones shipped en ~15 min wall-clock vs ~3-4h serial. Post-dispatch verify PASS por sección. Typecheck clean. Visual integration via route `/templates/pieterkoopt-full`.
- **Trade-off aceptado:** ~3x token consumption (cada teammate full SKILL invocation). Aceptable vs el wall-clock saving.
- **Lección:** Para parallel real (1 mensaje, 3 Agent calls simultáneos) se necesita 1 message-side dispatch, no 3 messages secuenciales. Pendiente como mejora.
- **Anti-pattern evitado:** Teammate C honestly substituyó la `.image-parallax` Webflow opaca con CSS-only static (no inventó scroll-listener fake) — AP-16 respetado. Documentado en spec body.

## 2026-05-08 (sesión 019)

### Hugo-A Strict Spec Pre-Dispatch Pattern adoptado para `/clone-site`
- **Contexto:** Sesión previa produjo "A3 cosplay" — sticky cards inventadas que no existían en pieterkoopt.nl, GSAP refs en SVGs estáticos. Codificados como AP-16 y AP-17 en `docs/arsenal-md/clone-anti-patterns.md`.
- **Decisión:** Toda dispatch de builder ahora pasa por `post-dispatch-verify.py --validate-spec` PRE-dispatch (schema JSON estricto) y `--verify-output` POST-dispatch (cuenta `gsap.*` en TSX vs `animations_declared[]`; si declared==[] y output tiene gsap → BLOCK).
- **Justificación:** Hugo's ADD model (cfdi-platform) probó que LLM-as-judge produce consensus errors correlated; gates deterministicas no.
- **Trade-off aceptado:** Más fricción upfront en spec-writing; menos cosplay downstream. Sprint 1 hardening tomó ~2h pero el smoke test atrapó bugs reales (datetime auto-parse, integer→string keys en YAML).

### 6-gate deterministic QA reemplaza LLM-as-judge `ui-visual-validator`
- **Contexto:** Gemini cross-audit del plan original señaló: cross-LLM consensus tiene errores correlacionados; gates deterministicas no.
- **Decisión:** Gates 1-6 implementadas en `qa-gates.py`: tag-hierarchy (Jaccard ≥80%), counts (±15% tags / ±50% classes), pixel-diff (SSIM ≥0.80 @ 3 breakpoints), animation-match (id+target+easing strings encontrados ≥70%), timing snapshots (GSAP pausado), CLS (<0.1).
- **Calibración pendiente:** Gates 1+2 thresholds asumen Webflow→Tailwind aumenta div count; en pk-hero el rebuilt es MENOR que original (clean React). Sprint 4 documentó esta brecha para futura calibración.
- **Trade-off aceptado:** El skill emite verdict mecánico que puede ser BLOCK aunque el clone sea bueno (caso pk-hero). Foreman debe interpretar con justificación documentada.

### Substituciones de fonts proprietarias declaradas en spec
- **Contexto:** Pieterkoopt usa Ivy Presto Headline (Adobe Typekit, requires CC subscription). MD operación interna no paga Adobe per-clone.
- **Decisión:** Cormorant Garamond (Google Fonts, OFL 1.1) como substitute display. Wired via `next/font/google` en `layout.tsx` (auto-subset latin). Spec frontmatter `fonts_used[].substitute` documenta el mapeo.
- **Trade-off aceptado:** Fidelidad visual ~92% vs 100%; aceptable para validation interna.

### `/clone-site` SKILL ahora vive en disco como artefacto auditable
- **Contexto:** Patrón D de Hugo (content sprint arsenal-as-disk-artifact) aplicado: `docs/arsenal-md/` contiene AP-1..AP-23 codificados, fidelity audit de 12 templates previas.
- **Decisión:** SKILL pre-flight requiere leer `docs/arsenal-md/clone-anti-patterns.md` y citar ≥3 APs en `arsenal_md_consulted` del spec frontmatter.
- **Resultado:** Sprint 0 produjo el arsenal; Sprint 1 lo wireó al schema; Sprint 2-3 lo respetaron (spec cita AP-1, AP-7, AP-11, AP-16, AP-17).

## 2026-04-13 (sesión 017)

### Visual Annotation Tool — Agentation como primera opción
- **Contexto:** Investigación exhaustiva (7 fuentes: 3 análisis CEO, deep-research, alternativas agent, Gemini CLI, primer research) evaluó 10+ herramientas.
- **Decisión:** Probar Agentation primero (React component + MCP bidireccional + animation freeze). Fallbacks: Vibe Annotations (Chrome ext, framework-agnostic), onUI (GPL-3.0, 8 MCP tools).
- **Riesgo:** React 19 compatibility no confirmada, animation freeze vs GSAP/Lenis no probado. Pre-check obligatorio.
- **Descartados:** Plannotator (no anota UI visual), Vercel Toolbar (formato opaco, sin selectores), Marker.io/BugHerd (SaaS pagado, sin MCP nativo comparable).

### Chrome DevTools MCP — Root cause y workaround
- **Bug:** Chrome 147 bloquea `--remote-debugging-port` en user-data-dir default. Mensaje: "DevTools remote debugging requires a non-default data directory."
- **Workaround:** Copiar perfil real a `/tmp/chrome-debug-real` + crear `DevToolsActivePort` en ruta default.
- **Resultado:** MCP conectado con perfil Marx Chavez (cookies, sesión activa).
- **Actualizado en:** CLAUDE.md global (Gem actualizó documentación).

### Merge de Flor — 3 componentes nuevos
- **Commits:** 487bfba (InfographicZoom fix), bf01495 (CinematicSection), c25a639 (PageTransition), 59a461a (merge)
- **Worktree:** feat/flor-infographic-fixes → mergeado a feat/design-system-scaffold sin conflictos.
- **Protocolo:** Flor en worktree aislado, Enrique en repo principal. Protocolo de worktrees funcionó correctamente.

### Templates C-grade — recomendación de descarte parcial (Gemini)
- **astrowind:** Gemini recomienda descartar (rewrite total Astro→Next.js). Pendiente decisión CEO.
- **page-ui:** Gemini recomienda solo 10 componentes visuales, no los 196 del original.
- **saas-starter:** Original NO tiene GSAP — nuestro GSAP inventado (51 refs) debe quitarse.

## 2026-04-12 (sesión 014)

### InfographicZoom FIXED — bug de fórmula de traducción
- **Bug:** `targetX = -(centerX - 50) * (targetScale / 100) * width * 0.01` tenía factor espurio `(targetScale/100)` que reducía desplazamientos ~60x (10px vs 624px en canvas 1920px).
- **Fix:** `targetX = (50 - centerX) * width / 100` — derivado de CSS transform `scale(s) translate(tx,ty)` con transform-origin center.
- **Resultado:** Zone transitions, labels, vignette, pagination dots todos visibles. 23.9 MB raw → 4.7 MB CRF 28.

### Templates son scaffolds, no clones — requieren replicación desde repos fuente
- **Hallazgo:** CEO comparó gsap-cocktails nuestra vs original (Velvet Pour). La nuestra no tiene las 35 imágenes de cocktails, usa contenido genérico, no se parece a la original.
- **Diagnóstico:** se emularon los templates en vez de replicar del código fuente. Mismo error que con iPhone-15 y Zentry — no se aprendió la lección.
- **Decisión:** REPLICAR del repo fuente, NO emular. Copiar assets reales, portar código, adaptar al stack.
- **Impacto:** los "12 templates completos" del STATUS.md son en realidad scaffolds. Requieren replicación correcta antes de cualquier video.

### Video Pipeline v2 — Playwright recording para templates A-tier
- **Hallazgo:** Remotion ProductDemo con `screens: []` producía videos blancos. Incluso con screenshots conectados, el resultado es genérico vs la experiencia real del template.
- **Decisión:** templates con scroll animations (8 A-tier) se graban con Playwright recording en vivo. Templates estáticos (4 B/C-tier) mantienen Remotion ProductDemo.
- **Script:** `scripts/record-template.mjs` creado y validado con gsap-macbook.

### Remotion Studio para iteración visual
- **Problema:** flujo de render ciego → abrir MP4 → screenshot problema → enviar → diagnosticar → re-render. Múltiples ciclos desperdiciados.
- **Decisión:** usar `npx remotion studio` para preview en vivo antes de renderizar a MP4.

### CI/CD creado — .github/workflows/ci.yml
- **Contenido:** push/PR a main → Node 22 → npm ci → tsc → eslint → vitest run.
- **Template replicable:** enviado a md-research y documentado con 4 variantes para los 10 repos del ecosistema.

### mdmem reasignado a md-research
- **CEO decidió:** mdmem se prototipa en md-research, no en md-design-system. Se promueve cuando esté validado.
- **Skeleton copiado** a `.context/references/mdmem-skeleton-reference.py` como referencia.

### Duix.Avatar — backlog (prioridad media)
- **Fuente:** peer o74z75r7 desde md-research.
- **Qué es:** alternativa open source a HeyGen para avatares parlantes. Self-hosted, Docker, gratis.
- **Acción:** spike de 2 hrs cuando haya necesidad concreta de demos con presentador virtual.

## 2026-04-11 (sesión 013)

### Graphify instalado como grafo estructural, no semántico
- **Contexto:** peer `brtbep8z` (md-research) ofreció instalar graphify + MCP en md-design-system. CEO aprobó.
- **Decisión:** sí al hook post-commit + sí al MCP. `graphify-out/` gitignored.
- **Rationale:** el `CLAUDE.md` del proyecto ya referenciaba `graphify-out/` sin existir. Cerrar la promesa + habilitar queries estructurales (god nodes, imports, comunidades) vale el costo ≈ 0 ($, API, tiempo).
- **Lo que NO hace graphify (corrección importante):** no genera embeddings semánticos. Es puro AST + Louvain communities. Query por significado NO es posible.
- **Resultado Sprint 1:** 510 nodes, 635 edges, 43 communities en 1.5s sobre 382 files. Distribución de edges baja (max 5) por barrel exports de React — el grafo es útil pero no impactante en este proyecto.

### Gap semántico sigue abierto
- **Contexto:** el peer recomendó `/sc:index-repo` para cubrir búsqueda semántica.
- **Hallazgo:** `/sc:index-repo` es un generador de `PROJECT_INDEX.md` para reducir tokens (58K→3K), NO semantic search. Los skills engañaron al peer (y a mí en primera lectura).
- **Decisión:** skippear `/sc:index-repo` por duplicación con `STATUS.md` y `context.json` existentes. No generar PROJECT_INDEX.md.
- **Gap:** para búsqueda semántica real sobre los .tsx, necesitamos pgvector + bge-micro-v2 local (o similar). Pospuesto — no es urgente, el grep escala lo suficiente hasta ~500 files.
- **Alternativa rechazada:** Smart Connections apuntando a symlinks de .tsx via callouts markdown — hackish, no recomendado por el peer.

### Worktree para graphify setup
- **Decisión:** usar worktree aislado `../md-design-system-graphify-setup` branch `chore/graphify-setup`.
- **Rationale:** regla git worktrees + working tree principal sucio (3 archivos modificados en `feat/design-system-scaffold`).
- **Pendiente:** merge de `chore/graphify-setup` → `feat/design-system-scaffold` (solo 1 commit: `e97868a` con entry `graphify-out/` en .gitignore).

### Bug upstream graphify (reportable)
- `graphify hook install claude` falla desde worktrees con `NotADirectoryError: .git/hooks` porque `.git` es file, no dir.
- Workaround: correr desde main worktree.
- Fix sugerido: leer el gitdir pointer y escribir al `common_dir`.

### Discrepancia en STATUS.md
- STATUS.md dice "4 templates completados, 1 WIP" listando 5.
- Filesystem tiene 12 directorios: ai-sales, astrowind, cruip-open, dashboard-pro, ecommerce, form-builder, gsap-cocktails, gsap-macbook, iphone-15, page-ui, saas-starter, zentry.
- `context.json` también desactualizado (menciona 5 template directories).
- **Decisión:** NO arreglar en esta sesión — scope creep. Anotado para sesión siguiente.

### Opción (B) aprobada por CEO: InfographicKenBurns como ruta rápida
- **Contexto:** smoke test visual reveló que `InfographicZoom` (reescritura sesión 012) no se materializó visualmente — frames 0%/50%/95% casi idénticos, 24 MB outlier.
- **3 opciones presentadas al CEO:** (A) fix InfographicZoom, (B) degradar a Ken Burns simple, (C) Remotion nativa desde sources.
- **CEO eligió (B).** Rationale: desbloquea BACKLOG #12 de md-research (decisión urgente #5 del CEO), 30-45 min realista, garantiza pipeline funcionando HOY.
- **Ejecución:** nuevo `InfographicKenBurns.tsx` alongside la rota (aditivo, cero riesgo regresión), FitImage zoomIn + title overlay fade in/out, post-process ffmpeg CRF 28.
- **Resultado:** 4.3 MB compressed (6.3x reducción), Ken Burns + title overlay validados visualmente.
- **Follow-up:** (A) queda como deuda técnica para sesión 014 — investigar por qué InfographicZoom no se materializó. `InfographicZoom.tsx` permanece intocado como evidencia.

### PitchDeck counter overlap bug — FIXED
- **Bug:** `<Sequence from={delay}>` default `layout="absolute-fill"` sacaba al AnimatedCounter del flex column flow, haciendo que el label `<span>MXN/mes</span>` rendereara en el mismo spot que el counter (overlap visual).
- **Fix:** agregar `layout="none"` al Sequence wrapper. 1 línea.
- **Validación:** re-render `pitch-deck-fixed.mp4` frame 50% — counter "$249" arriba, label "MXN/mes" limpio debajo, sin overlap.
- **Commit pending:** junto con InfographicKenBurns.

### mdmem — ownership transferido a md-design-system (delegado por CEO)
- **Contexto:** peer `brtbep8z` draft un skeleton de `mdmem` (memory CLI) en md-research con hardcode `_ALLOWED_ROOT_PREFIXES`. CEO detectó que hace el tool one-off en vez de reutilizable.
- **Decisión CEO:** mdmem vive en md-design-system como skill + CLI reusable. Default-deny, opt-in per-repo via flag file. Storage en `.context/memory/sessions/{date}-{sid}.jsonl` gitignored. Query grep-based inicial, compresión semántica on-demand vía `claude -p`. Sync opcional a `~/obsidian-md/<project>/memory/`.
- **NINGÚN producto con PII** (MediVista/CFDI/VIGÍA/HIDROS) debe optar in.
- **Estado:** NO construido en esta sesión (scope grande, CEO dijo "no urgente, resto de pendientes menores de idle"). Pendiente para sesión dedicada 4-5 hrs.
- **Referencias cuando arranque:** `analysis/20260411-claude-mem-piloto-fase1.md` §5 (repo md-research main, commit `7ea67aa`), `~/claude-mem-pilot/mdmem-skeleton-reference/mdmem.py` (skeleton de referencia, NO copiar hardcoded prefixes), peer `brtbep8z` disponible como cross-reviewer.

### Worktree chore/graphify-setup — sin mergear
- Decisión de mergear `chore/graphify-setup` → `feat/design-system-scaffold` queda pendiente del CEO. El commit `e97868a` (1 solo commit, agrega entry `graphify-out/` al `.gitignore`) es aditivo y limpio, merge trivial.

### Smoke test MCP graphify-md-design-system — pendiente
- Peer `brtbep8z` registró el MCP en `~/.claude.json` apuntando a `graphify-out/graph.json` en el main worktree.
- Validación final requiere `/exit` + rearranque de Claude Code por parte del CEO.
- Expectativa: `mcp__graphify-md-design-system__god_nodes()` retorna `[validateStep1, escapeHtml, renderSlideHtml, generateStandaloneHtml, gridCols]`.
