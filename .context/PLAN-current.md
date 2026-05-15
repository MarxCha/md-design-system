# PLAN COMPLETADO 2026-05-08 — Hardening de SKILL `/clone-site` + Hero clonado pieterkoopt.nl

> **STATUS: SHIPPED.** Sprints 0-4 ejecutados. Hero rendered en `/templates/pk-hero` (port 3011).
> Reporte final: `clones/pieterkoopt-2026-05-08/REPORT-FINAL.md`. Verdict: MANUAL_REVIEW (3/6 gates PASS, 1 N/A, 2 documented divergence). Pixel-diff 0.92 SSIM. Animation match 7/7.

---

# PLAN ORIGINAL (archivado)

# PLAN ACTIVO — Hardening de SKILL `/clone-site` + Hero clonado pieterkoopt.nl

**Fecha:** 2026-05-08 (sesión 020 — sprint-implement)
**Owner:** Pau (md-design-system)
**Trigger:** CEO `/sprint-implement` autónomo tras (a) destilación SKILL prematura commiteada en `b2585ab`, (b) audit con Hugo (4 patterns ADD transferibles), (c) audit interno del arsenal MD (12 templates, sesión 014 fidelity), (d) reverse-engineering del original que reveló que el A3 hand-rebuild de hoy fue cosplay (sticky cards inventadas que no existen en el hero del original).
**Reemplaza:** PLAN previo (Visual Annotation Sprint 0). Ese plan se reactivará después.

## Contexto crítico (no inventar)

1. **GSAP libre confirmado:** `npm view gsap license` → "Standard 'no charge' license". 3.15.0. Webflow lo abrió tras adquirir GreenSock. Stack completo (core + ScrollTrigger + ScrollSmoother + SplitText + InertiaPlugin + CustomEase) usable sin licencia comercial.
2. **CEO redirect:** clone-site es para **consumo interno y validación de capacidades MD**, no deliverable cliente. Se aceptan sustituciones (Cormorant Garamond ≈ Ivy Presto Headline) en lugar de licencias Adobe.
3. **CEO redirect:** Plan A (deploy Qwen 7B en Coolify) descartado. Para casos LLM externo: Gemini CLI (free, 1M ctx, ya en `~/.claude/bin/gemini-clean`). Para esta SKILL: Claude IS the LLM, cero deps externas de inferencia.
4. **Pre-acción obligatoria:** `git reset --soft HEAD~1` para deshacer el commit `b2585ab` (SKILL no validada end-to-end). Branch `feat/design-system-scaffold` es local — no hay riesgo de force-push.
5. **Patrones ADD transferidos de Hugo (cfdi-platform):** A (spec strict pre-dispatch), B (verificación determinista 4-gate, no LLM-as-judge), C (clone-spec/{NN}.md con frontmatter YAML), D (content sprint arsenal audit antes de hardening).
6. **Patrones ADD descartados de Hugo:** roles operativos PM/Architect/Dev/Critic/Sign-off completos, RFC 2119 SOPs, memoria aislada investigacion/ejecucion, BMAD handoff schemas. Razón: son para producto multi-sprint, no para skill de clonación interna.

## 5 sprints (≈8 hr total) — Sprints 1-3 son ITERATIVOS (no lineales)

> **Aviso post Gemini cross-audit:** Sprints 1, 2, 3 NO son secuenciales puros. Esperar 1 ciclo de iteración: cuando el Sprint 3 dispatcha builders, sus outputs revelarán edge cases en los validators del Sprint 1 (eg. SplitText abstracted a custom hook, GSAP timeline patterns no anticipados). El plan acepta esto: marcar `iteration_required: true` en el primer pase y revisitar Sprint 1 con learnings antes de declararlo cerrado. Tiempo total ya incluye 1 pasada de re-trabajo.



### Sprint 0 — git reset + Arsenal audit content sprint (≈60 min, RECORTADO post Gemini)

**Objetivo:** convertir las lecciones del arsenal MD en artefactos en disco de **alta densidad** (NO 16 archivos diluidos — Gemini correctamente señaló que sería ruido en el SKILL pre-flight + tiempo subestimado).

**Pre-acción:** `git reset --soft HEAD~1` (deshace commit `b2585ab`, mantiene archivos en working tree).

**Archivos a producir (2 + un README, NO 16):**
- `docs/arsenal-md/clone-anti-patterns.md` — 1 archivo alta densidad: 14 anti-patterns originales + los 6 modos de falla nuevos descubiertos hoy: ui-visual-validator 60× error, GSAP MacBook 51 GSAP refs inventadas sobre SVG estático, A3 sticky cards inventadas, @layer/@theme inline scoping issues, h1-h6 globals.css overrides, video hydration patterns. Cada uno con root cause + qué validar para detectar.
- `docs/arsenal-md/templates-fidelity-summary.md` — 1 archivo: tabla 12 templates con grade A/B/C + 1 línea "qué hicieron bien" + 1 línea "qué les falló". NO archivos individuales por template. Si en el futuro alguien quiere profundizar en un template, lee su código directamente — el resumen es para que el SKILL aprenda QUÉ NO REPETIR.
- `docs/arsenal-md/README.md` — índice mínimo (3 líneas).

**Criterio de aceptación:**
- 3 archivos creados (vs 16 del plan original).
- El nuevo SKILL.md (Sprint 1) referencia `docs/arsenal-md/clone-anti-patterns.md` como input obligatorio en pre-flight (lee MENOS, decisiona MEJOR).

**Dependencias:** ninguna (todo lo que necesito está en mi context window de hoy).

### Sprint 1 — SKILL hardening (Patrones A+B+C de Hugo) (≈120 min)

**Objetivo:** Reescribir `~/.claude/skills/clone-site/SKILL.md` + templates incorporando spec JSON strict pre-dispatch, 4-gate deterministic validation, frontmatter YAML, anti-pattern #16 (no inventes desde screenshot — parse JS chunks first), Template Factory integration.

**Archivos a tocar:**
- `~/.claude/skills/clone-site/SKILL.md` — reescribir Phase 0 (license/proprietary audit + arsenal-md as gate input), Phase 3 (spec JSON strict + post-dispatch counts verification), Phase 5 (4-gate deterministic QA).
- `~/.claude/skills/clone-site/templates/component-spec.template.md` — refactorizar a `clone-spec/{NN-section}.md` template con frontmatter YAML obligatorio (`tags_count`, `classes_unique_count`, `js_deps_detected`, `animations_detected`, `fonts_used`, `static_only`).
- `~/.claude/skills/clone-site/templates/qa-gates.py` — NUEVO — implementación de las 4 heurísticas deterministas (DOM diff structural, counts ± 5%, frame-diff Playwright, AST scripts compare).
- `~/.claude/skills/clone-site/templates/post-dispatch-verify.py` — NUEVO — parsea output del builder, verifica counts vs spec, BLOCK on violation.
- `~/.claude/skills/clone-site/templates/license-audit.template.md` — NUEVO — checklist Phase 0 (GSAP, fonts, video, audio, Lottie + their licenses).

**Criterio de aceptación:**
- SKILL.md menciona los 4 patterns ADD de Hugo en su sección "References" con crédito.
- SKILL.md anti-pattern #16 escrito: "Don't invent from screenshot. If you didn't read the JS, you don't know what's happening."
- Templates JSON validan con `python3 -c "import json, jsonschema; jsonschema.validate(...)"` (o equivalente Pydantic) — al menos un test de validación pasa.
- `qa-gates.py` ejecutable independiente: `python3 qa-gates.py --original orig.html --rebuilt rebuilt.html` produce verdict `APPROVE | APPROVE_WITH_WARNINGS | BLOCK`.

**Dependencias:** Sprint 0 completo (necesito `docs/arsenal-md/` para referenciar desde el SKILL).

### Sprint 2 — Reverse-engineer Hero profundo + Foundation (≈90 min)

**Objetivo:** entender el código exacto del hero pieterkoopt + montar el scaffold del template.

**Reverse-engineering:**
- Descargar los 3 chunks `pieter-koopt-demo.*.schunk.js` desde Webflow CDN.
- Parsear con grep/AST para localizar las 4 ScrollTriggers del hero (selectors, triggers, animations).
- Mapear timings + easings + animation sequence: H1 SplitText reveal, P SplitText reveal, btn-animate-chars stagger, hero-outline reveal.
- Output: `clones/pk-hero-2026-05-08/clone-spec/01-hero.md` con frontmatter YAML (Patrón C de Hugo).

**Foundation:**
- `npm run template:new --slug=pk-hero --name="PieterKoopt Hero"` (Template Factory existente — NO scaffold from scratch).
- `npm install gsap` (3.15.0).
- Cormorant Garamond via `next/font/google` como sustituto de Ivy Presto Headline.
- Asset: descargar video Vimeo MP4 directo si público (vimeo.com/1076413178). Si no, placeholder MP4 stock.
- Lottie signature: recrear JSON o usar SVG con `stroke-dashoffset` como fallback honesto.

**Archivos producidos:**
- `clones/pk-hero-2026-05-08/clone-spec/01-hero.md` (con frontmatter)
- `clones/pk-hero-2026-05-08/license-audit.md`
- `src/app/templates/pk-hero/` (factory output: 7 files scaffold)
- `public/templates/pk-hero/` (assets: video + Lottie)

**Criterio de aceptación:**
- `clone-spec/01-hero.md` tiene `tags_count`, `classes_unique_count`, `js_deps_detected`, `animations_detected` poblados con valores extraídos del DOM original (no inferidos).
- Template Factory output compila: `tsc --noEmit && next build` clean.
- `npm install gsap` no rompe nada (`tsc` sigue clean).

**Dependencias:** Sprint 1 completo (necesito el template `clone-spec/{NN}.md` refinado).

### Sprint 3 — Build Hero component-by-component (≈120 min)

**Objetivo:** componentes Next.js que renderizan el hero clonado, validados mecánicamente contra el spec.

**Componentes a producir** (en `src/app/templates/pk-hero/_components/`):
- `Hero.tsx` — video full-bleed, hero-outline border, callout VAN GOGH, contenedor general.
- `HeroTitle.tsx` — H1 con SplitText reveal por líneas + GSAP entrance animation.
- `HeroLede.tsx` — paragraph con SplitText reveal.
- `HeroCTA.tsx` — botón "Sell your painting" con per-letter `transition-delay` 0.01s × index (btn-animate-chars).
- `IntroOverlay.tsx` — prompt "turn on your sound" + 2 botones audio toggle.
- `HowlerProvider.tsx` — Howler.js wrapper para audio toggle.
- `LottieSignature.tsx` — firma "PieterKoopt" Lottie player o SVG stroke-dashoffset fallback.

**Builder dispatch protocol (Patrón A de Hugo):**
- Cada builder sub-agent recibe el `clone-spec/01-hero.md` + frontmatter JSON inline.
- Builder produce TSX.
- Post-dispatch: `python3 post-dispatch-verify.py --spec clone-spec/01-hero.md --output Hero.tsx` → si counts del output (gsap.* refs, scroll triggers, etc.) discrepan del spec ± tolerancia, BLOCK + retry o foreman manual fix.

**Criterio de aceptación:**
- 7 componentes generados, todos con typecheck OK.
- Post-dispatch verify pasa para los 7.
- `next dev -p 3010` arranca y `localhost:3010/templates/pk-hero` renderiza visualmente.

**Dependencias:** Sprint 2 completo (foundation + spec).

### Sprint 4 — Validación 4-gate + Docs + Commit limpio (≈90 min)

**Objetivo:** validar end-to-end con las 4 heurísticas de Hugo y commit producto final.

**Validación 6-gate (Patrón B de Hugo + correcciones de Gemini):**
1. **DOM tag-hierarchy match** — html5-parser walk recursivo. Comparar SOLO tag hierarchy (semantics: section > h1 > p > button), NO class similarity. Threshold ≥80% hierarchy match. **Razón del cambio (Gemini):** Webflow combina clases (`.heading-1.is-large`) + Tailwind es utility-first → DEBE divergir en clases para ser correcto en Next.js/MD. Imponer match de clases obliga al builder a escribir CSS antiidiomático.
2. **Counts ± tolerancia (NO ± 5%)** — tag count tolerance ±15% (Tailwind genera más spans/divs por utility), JS bundle size relative-tier match (small/medium/large bucket, no exact bytes), computed-CSS-vars count ±20%. Strict counts solo si la sustitución NO está documentada en spec (ej. Splitting.js fallback).
3. **Frame-diff Playwright pixel @ 3 breakpoints** — 1440 + 768 + 390 (Gemini: solo 2 breakpoints es insuficiente para fluid-typography sites). SSIM/pixelmatch threshold ≥0.80 (relajado vs 0.85 — Webflow vs Tailwind divergence es esperable).
4. **AST animation declarations match** — NO solo conteo de `gsap.*`. Validar contra `animations_declared` array del spec frontmatter: cada animation declarada (`{trigger, target, props, timing, easing, sequence_index}`) tiene match estructural en el bundle del rebuild. Tolerance: targets pueden mapear a custom hooks (LLM abstraction válida), pero los timings + easings deben coincidir ±10ms.
5. **Animation timing snapshots** [NEW de Gemini] — Inyectar `gsap.globalTimeline.pause()` + capturar screenshots en t=0 / t=1s / t=2.5s / hover-state-active. Pixel-diff cada snapshot vs original equivalente. Detecta wrong easings (`power2.in` vs `power4.out`) que el conteo no atrapa.
6. **Layout stability** [NEW de Gemini] — Lighthouse CLS metric o manual measure: si SplitText/textos fragmentados causan FOUT por font-load timing, CLS > 0.1 → fail. Si fonts hidratan estables, pass.

**Verdict mecánico (umbrales ajustados):**
- 6/6 pass = APPROVE
- 5/6 pass = APPROVE_WITH_WARNINGS (foreman documenta cuál falló y por qué)
- 4/6 pass = MANUAL_REVIEW (foreman + CEO deciden)
- ≤3/6 pass = BLOCK (no shipping)

**Documentación:**
- Update `.context/STATUS.md` con sesión 020.
- Update `.context/DECISIONS.md` con: GSAP libre verificado, Plan A descartado, sustituciones de fonts/video, los 4 patterns ADD adoptados de Hugo.
- Update memoria `~/.claude/projects/-Users-marxchavez-Projects-md-design-system/memory/reference_cloning_tools.md` con findings post-hardening.
- Reporte final: ver Fase 5 del comando `/sprint-implement`.

**Commit limpio:**
- Stage: SKILL hardening + arsenal-md/ + clones/pk-hero-2026-05-08/ + src/app/templates/pk-hero/ + public/templates/pk-hero/ + docs updates.
- NO incluir el commit prematuro `b2585ab` revertido (ya desarmado en Sprint 0).
- Mensaje: feat(clones): hardened clone-site SKILL + faithful hero clone of pieterkoopt.nl.

**Criterio de aceptación:**
- Verdict 4-gate ≥ APPROVE_WITH_WARNINGS.
- `tsc --noEmit && eslint && next build` todos clean.
- Commit landed con todos los artefactos.

**Dependencias:** Sprint 3 completo.

## Riesgos identificados

| Riesgo | Mitigación |
|--------|-----------|
| Vimeo video del hero NO accesible directo (DRM, CDN restrictivo) | Sustituir por video stock similar (Pexels) o placeholder MP4 de muestra. Documentar honestamente en license-audit.md. |
| `pieter-koopt-demo.*.schunk.js` minified, AST parsing falle | Fallback: `acorn` o `@babel/parser` permisivos. Si falla, extraer patterns manualmente con grep/regex. Documentar lo que se pudo y no se pudo extraer. |
| SplitText (premium plugin) no transfiere bien aún siendo libre | Verificar con `npm view @gsap/shockingly` o equivalente. Fallback: Splitting.js (MIT). |
| Cormorant Garamond no captura el feel de Ivy Presto | Probar también EB Garamond, Playfair Display, Cormorant Infant. Decisión visual antes de Sprint 3. |
| Builders de Sprint 3 inventan a pesar del spec strict | El post-dispatch verify es el net. Si el spec dice `animations_detected: ["scroll-trigger-pin"]` y el builder retorna 5 timelines GSAP, mismatch → BLOCK + foreman manual fix. |
| 6-gate QA en Sprint 4 falla con 3+ gates | Foreman analiza qué falló: ¿spec mal extraído (Sprint 2)? ¿builder ignoró spec (Sprint 3)? Fix root cause antes de seguir. NO ship con BLOCK. |
| Tiempo total ≈8 hr excede ventana razonable de sesión | Si la sesión necesita continuar mañana, escribir handoff a `.context/HANDOFF` después de cada sprint completo. |
| **Impedancia CSS Webflow→Tailwind** [Gemini] | Gate 1 relajado a tag-hierarchy match (no class similarity). Tailwind utility-first DEBE divergir del Webflow combined classes. Imponer class-match es bug, no feature. |
| **Splitting.js fallback rompe DOM tag count** [Gemini] | Si SplitText premium no se puede usar, documentar en spec frontmatter: `text_splitting_method: "splitting.js"` + `tag_count_exception_reason: "splitting.js wraps each char in span — DOM tree by-design distinct from original"`. Gates aceptan exception si está declarada. |
| **Builders abstraen GSAP animations a custom hooks** [Gemini] | Gate 4 (AST animation match) NO usa conteo de `gsap.*` references — usa estructural match de cada animación declarada en spec contra cualquier file (hook, util, component) en el rebuild. Tolerance: targets pueden mapear a refs/hooks, lo crítico es timings+easings+sequence. |
| **Sprints 1-3 entrelazados (Gemini)** | Aceptado en el plan: marcar `iteration_required: true`. Esperar 1 round de re-trabajo del Sprint 1 después del Sprint 3 antes de declarar cerrado el ciclo. Tiempo ya lo contempla. |

## Reasignación de recursos

- **Agent Teams:** no necesarios. Sprint 3 dispatcha sub-Claudes via Agent tool secuencialmente con verify mechanic entre cada uno (no paralelo — el verify failure modo es difícil de manejar en paralelo).
- **Skills cargadas:**
  - Sprint 0/1: `obsidian-markdown` (escribir docs/arsenal-md/ en formato consistente)
  - Sprint 2: `firecrawl_scrape` con `executeJavascript` actions, `WebFetch` (descargar JS chunks), `Bash` (curl + AST tooling)
  - Sprint 3: `frontend-architect` (sub-agent), `shadcn-ui` (componentes existentes MD DS)
  - Sprint 4: `playwright-testing` (Playwright headless), `Bash` (gates Python)
- **Herramientas externas:** Playwright (ya instalado en venv-clone), Chrome DevTools (no necesario — Playwright cubre el caso), `acorn`/`@babel/parser` Python equiv (ast / esprima-python).

## Verificación post-sprint (loop interno per-sprint)

Después de cada sprint:
- ¿Los archivos del criterio de aceptación existen?
- ¿`tsc --noEmit` pasa?
- ¿`eslint` pasa?
- ¿Tests unitarios pasan? (no aplican aquí — es content + scaffold)
- Si UI: ¿`localhost:3010/templates/pk-hero` renderiza sin errores en consola browser?

Si algo falla → fix antes de avanzar al siguiente sprint. Documentar el fix en `.context/HANDOFF.md` para auditoría.

## Reporte final (Fase 5 del comando)

Al finalizar:
- Update `.context/STATUS.md` con sesión 020 (sprints 0-4 completados, lo que cambió).
- Update `.context/DECISIONS.md` (GSAP libre + Plan A descartado + 4 patterns ADD + sustituciones).
- Reportar al CEO en mensaje final:
  - Sprints completados vs planificados (idealmente 5/5)
  - Cambios respecto al plan (si hubo desvíos)
  - Lo que queda pendiente (probablemente: re-test SKILL contra un target NO-Webflow, re-clonado completo de pieterkoopt full page beyond hero)
  - Próximo paso recomendado
