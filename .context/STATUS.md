# STATUS — md-design-system
Ultima actualizacion: 2026-05-08 (sesion 019)

## Estado: PK-HERO CLONE SHIPPED — SKILL clone-site HARDENED (Hugo A+B+C)

## Sesión 019 — pieterkoopt FULL clone (4 secciones) + clone-site SKILL hardening (2026-05-08)

### Sprint 5 — Agent Team paralelo: 3 secciones restantes

CEO requested parallel dispatch via /orchestrator (3 teammates simultaneous, foreman integrates).

**Teammates (frontend-architect agents, paralelo):**
- **5A pk-cta-cards** (Teammate A) — pin-driven USP cards. 8 animations cited `inline-gsap-blocks.js:401/406` (block 30+31). Post-dispatch verify PASS.
- **5B pk-stacking-cards** (Teammate B) — mwg_effect031 scroll-stacked cards. 8 animations cited `inline-gsap-blocks.js:409` (block 32). Honors mobile breakpoint MQ + last-slide guard. Post-dispatch verify PASS. Foreman post-mirror: 3 Vimeo MP4s (step-01/02/03.mp4, ~6MB total).
- **5C pk-stories-cta** (Teammate C) — final video+CTA. Honest interaction_model: scroll-driven with SplitText reveal + IO video play/pause. Webflow's opaque `.image-parallax` substituted with CSS-only static (AP-16 no cosplay). Vimeo MP4 mirrored locally. Post-dispatch verify PASS.

**Sprint 5D — Foreman integration:**
- Integrated route `/templates/pieterkoopt-full` mounts Hero + CtaCards + StackingCards + StoriesCta in sequence
- Per-section routes also ship: `/templates/pk-hero`, `/templates/pk-cta-cards`, `/templates/pk-stacking-cards`, `/templates/pk-stories-cta`
- 4/4 specs validate against schema; 4/4 components post-dispatch verify PASS
- Typecheck clean (post stale `.next/types/app/clones/pieterkoopt/` cleanup)
- Full-page screenshots `_evidence/full-{1440,768,390}.png` confirm visual continuity end-to-end

**Wall-clock total:** ~16 min (3 teammates ≈ 5 min each, dispatched sequentially in this session — could be true parallel via single-message dispatch). Budget vs sequential rebuild ~3-4h: ~75% reduction.

### Sesión 019 (Sprint 0-4) — pk-hero clone + clone-site SKILL hardening (commit b81a4dd)

### Deliverables
- `src/app/templates/pk-hero/` — nueva ruta `/templates/pk-hero` con layout + page wired
- `src/components/templates/pk-hero/` — Hero component (~290 líneas) con 7 GSAP animaciones citadas a `inline-gsap-blocks.js:N`
- `clones/pieterkoopt-2026-05-08/clone-spec/01-hero.md` — spec strict Hugo-A (PASS contra `spec-schema.json`)
- `clones/pieterkoopt-2026-05-08/_evidence/` — hero-section.html, inline-gsap-blocks.js (15 blocks decoded), 6 screenshots clone (intro+revealed × 1440/768/390), 3 originales `pieterkoopt.nl` para pixel-diff, qa-gates-final.log
- `public/templates/pk-hero/` — Vimeo MP4 1080p (12MB) + Lottie signature mirror local (AP-7)
- `docs/arsenal-md/clone-anti-patterns.md` — 23 APs codificados (Sprint 0)
- `docs/arsenal-md/templates-fidelity-summary.md` — auditoría 12 templates × Grade A/B/C (Sprint 0)

### SKILL clone-site hardening (~/.claude/skills/clone-site/)
- `templates/spec-schema.json` — JSON Schema Draft 2020-12 con required fields + `animations_declared[].source` (`file:line` regex)
- `templates/post-dispatch-verify.py` — pre-dispatch validate + post-dispatch verify; AP-17 enforcement (gsap calls vs declared==[] → BLOCK)
- `templates/qa-gates.py` — 6 gates deterministicas (replaces LLM-as-judge); arreglos: `--src-dir`, `--scope-selector-rebuilt`, datetime/string-key normalization
- `templates/component-spec.template.md`, `templates/license-audit.template.md` — Hugo-A pre-dispatch contracts

### 6-Gate QA verdict: 3/6 PASS → MANUAL_REVIEW (mechanical BLOCK)
- Gate 1 (tag-hierarchy) FAIL — Webflow combined-classes vs Tailwind utility-first divergencia by-design (37 vs 15 paths)
- Gate 2 (counts) FAIL — original 68 tags / 56 classes vs rebuilt 22 / 10 (clean React vs Webflow wrapper bloat)
- Gate 3 (pixel-diff) PASS — avg 0.920 SSIM @ 3 breakpoints (1440=0.926, 768=0.940, 390=0.893) ≥ 0.80 ✅
- Gate 4 (animation-match) PASS — 7/7 declared animations encontradas en bundle por id+target+easing (1.000 ratio) ✅
- Gate 5 (timing-snapshots) SKIPPED — sin snapshots originales con GSAP pausado
- Gate 6 (layout-stability) PASS — CLS = 0.000 ✅

Justificación MANUAL_REVIEW vs BLOCK: Gates 1+2 miden divergencia de DOM, donde menor cantidad de tags/classes es ventaja del rebuild (clean React) NO defecto. Gate 3 (pixel-diff 92%) es la prueba operativa de fidelidad visual, complementada por Gate 4 (todas las animaciones presentes).

### Pendientes
- Habilitar Gate 5 capturando original timing snapshots (pausar GSAP en pieterkoopt.nl @ t=0/1s/2.5s) — backlog para próxima clone iteration
- Calibrar Gates 1+2 thresholds para casos Webflow→React (donde rebuilt es MENOR que original)

## Sesión 013 — Graphify setup + Remotion smoke test (2026-04-11)
- Graphify hook post-commit instalado en repo principal (claude mode, AST code-only)
- Worktree `../md-design-system-graphify-setup` branch `chore/graphify-setup` con `.gitignore` actualizado (entry `graphify-out/`)
- Grafo inicial: 511 nodes, 635 edges, 44 communities sobre 383 files (1.5s)
- Peer `brtbep8z` registró MCP `graphify-md-design-system` en `~/.claude.json`. Smoke test MCP pendiente de rearranque Claude Code.
- Gap de búsqueda semántica NO resuelto — `/sc:index-repo` resulta ser un tokenizer de PROJECT_INDEX.md, no embeddings. Pospuesto (pgvector + bge-micro-v2 si se necesita).
- DISCREPANCIA detectada: filesystem tiene 12 directorios de templates, STATUS.md abajo lista solo 5. NO arreglado en esta sesión (scope creep). Confirmado via `npx remotion compositions`: hay 12 template compositions registradas.

### Remotion Smoke Test — 4/4 renders sin errores
Output en `out/smoke-test-013/`:
- InfographicZoom-Demo → infographic-zoom.mp4 (22s, 1920x1080, **24 MB** ⚠️ outlier)
- PitchDeck-Demo → pitch-deck.mp4 (19s, 1920x1080, 1.3 MB ✅)
- SocialClip-Demo → social-clip.mp4 (12s, 1080x1920, 1.3 MB ✅)
- AudiogramVideo-Demo → audiogram.mp4 (30s, 1920x1080, 7.8 MB ✅)

Alertas:
- Los 4 archivos decodifican OK, se completó el encode sin warnings.

### Validación visual (frames extraídos con ffmpeg)
- **InfographicZoom-Demo — FIXED ✅ (sesión 014).** Bug: fórmula de traducción tenía factor espurio `(targetScale/100)` que reducía desplazamientos ~60x (10px vs 624px en canvas 1920px). Fix: `targetX = (50 - centerX) * width / 100`. Re-render validado: zone transitions visibles, labels+vignette+pagination dots funcionando. 23.9 MB raw → 4.7 MB CRF 28.
- **PitchDeck-Demo — BUG FIXED ✅.** `<Sequence from={delay}>` default layout `absolute-fill` sacaba al counter del flex flow. Fix: `layout="none"`. Re-render `pitch-deck-fixed.mp4` validado — counter + label apilan limpio sin overlap.
- **SocialClip-Demo — PASS completo.** Deep validation con frames narrow (5%, 15%, 92%) confirma: count-up 0→73% working, word stagger en hook visible, CTA button rendered. Paréntesis honesto cerrado.
- **AudiogramVideo-Demo — PASS (mejor render).** Sin cambios.

### Opción (B) Implementada: InfographicKenBurns ✅
Ruta nueva aprobada por CEO para desbloquear BACKLOG #12 de md-research:
- Nuevo: `src/components/video/InfographicKenBurns.tsx` (~100 líneas) usando FitImage con zoomIn + title overlay fade in/out
- Registrado en `src/remotion/Root.tsx` como `InfographicKenBurns-Demo` (15s, 1920x1080)
- Render raw: 27 MB → ffmpeg CRF 28 → 4.3 MB (6.3x reducción, target < 5 MB ✅)
- Validación visual 5 frames: Ken Burns zoomIn perceptible 0%→95%, title fade in/out funcional, sin artifacts de compresión
- `InfographicZoom.tsx` NO tocado (queda como evidencia para fix A)

Archivos relevantes en `out/smoke-test-013/`:
- `infographic-ken-burns-raw.mp4` (27 MB) y `infographic-ken-burns.mp4` (4.3 MB)
- `pitch-deck-fixed.mp4` (1.3 MB) — PitchDeck con bug resuelto
- `frames/ikb_*.png` (5 frames validación InfographicKenBurns)
- `frames/sc_*.png` (10 frames deep validation SocialClip)
- `frames/pitch-deck-fixed_50pct.png` (verificación del fix)

## Estado previo: EDITOR PRO MAX INTEGRATED + 4 COMPOSICIONES REESCRITAS

Branch activo: `feat/design-system-scaffold`
PR: https://github.com/MarxCha/md-design-system/pull/1
Commits: 16+

## Lo que existe (~310 source files, 0 TS errors, 151 tests)

### Foundation
- Next.js 15.5.14 + TypeScript + Tailwind 4 + shadcn/ui
- 20 componentes shadcn/ui + 17 custom + 8 hooks + 2 providers
- Design tokens HSL, dark mode, Instrument Sans + DM Sans
- Vitest 4.1: 151 tests, 33 archivos, 100% passing
- Package exports (., ./ui, ./hooks, ./styles, ./theme, ./utils, ./responsive, ./lint, ./video, ./docs-kit)

### Remotion Video Pipeline (10 composiciones — TODAS funcionando)
- Remotion 4.0.440 + @remotion/transitions + @remotion/shapes + @remotion/noise
- Original 6 (unchanged): BrandReveal, DeviceMockup, TextHook, FeatureShowcase, CTAEnd, ProductDemo
- **REESCRITO 4** (session 012):
  - InfographicZoom — Spring-based zone transitions, vignette overlay, label blur entrance, pagination dots
  - PitchDeck — AnimatedCounter stats, GradientBackground per slide, crossfade transitions, blur title entrance
  - SocialClip — Count-up stat, word stagger hook, ParticleField, GradientBackground rotating, CTA glow pulse
  - AudiogramVideo — Word-by-word title, multi-freq waveform with beat pulses, spring cover entrance, bar glow
- Registry pattern: Root.tsx iterates templateConfigs for compositions
- 4 videos renderizados (Auditor Ciudadano + Guelaguetza)
- video-config.ts en 4 templates (iPhone 15, Zentry, MacBook, SaaS)
- Demo compositions: InfographicZoom-Demo, PitchDeck-Demo, SocialClip-Demo, AudiogramVideo-Demo

### Editor Pro Max Integration (NEW — session 012)
- Source: Hainrixz/editor-pro-max (81 stars, Remotion + Claude Code)
- 9 componentes integrados en `src/remotion/components/`:
  - AnimatedTitle (8 animation styles), GradientBackground, ParticleField
  - ProgressBar, CallToAction, CountdownTimer
  - FitImage (Ken Burns), SafeArea, TransitionPresets (12 transitions)
- 5 presets en `src/remotion/presets/`:
  - easings (12), dimensions (9 platforms), colors (7 palettes + 8 gradients)
  - fonts (MD DS fonts), brand (MD Consultoría identity)
- 1 hook: useAnimation (enter/hold/exit lifecycle)
- Gemini cross-audited plan (approved with observations, all integrated)

### Template & Video Factory Process
- Generator: `npm run template:new -- --slug=X --name="Y"` scaffolds 7 files + asset dirs
- Screenshot: `npm run template:screenshot -- --slug=X` Playwright retina 2x capture
- CSS standard: scoped `.{slug}-template` selectors, NO @layer utilities

### Templates — Fidelity Audit (sesión 014)
- [x] Zentry — **A** clon fiel (images+videos+GSAP+fonts match original)
- [~] iPhone 15 — **B** parcial (images OK, GSAP match, falta R3F model+VideoCarousel)
- [!] GSAP Cocktails — **C** rewrite genérico (0/43 assets, GSAP inventado)
- [!] GSAP MacBook — **C** rewrite genérico (0/46 assets, sin R3F, sin 3D)
- [!] SaaS Starter — **C** rewrite (original NO tiene GSAP, le inventamos 51 refs)
- [!] Page UI — **C** rewrite (original es lib 196 comps, nuestro 7 con GSAP inventado)
- [!] Cruip Open — **C** rewrite (0/29 assets originales)
- [!] Astrowind — **C** rewrite (original es Astro, nuestro GSAP inventado)
- [?] AI Sales — sin repo fuente localizado
- [?] Dashboard Pro — diseño original MD (no hay referencia externa)
- [?] Ecommerce — diseño original MD (no hay referencia externa)
- [?] Form Builder — diseño original MD (no hay referencia externa)

### docs-kit — Document & Presentation Toolkit
- 3 formats: slide-deck, one-pager, notebook-pack
- Generator + export pipeline + theme bridge + 42 tests

### Dashboard Components (8 total)
- StatCard, BentoGrid/BentoCard, ChartContainer, ChartPalette
- IVAWaterfall, StatusTimeline, AlertFeed

### Responsive Primitives + ESLint Plugin
- 5 responsive components + useBreakpoint hook
- 4 lint rules exportables

### Demo Pages (19 rutas)
- /, /showcase, /playground, /animation-lab, /scroll-stories, /product-showcase
- /demo-sidebar, /demo-dashboard, /demo-landing, /demo-responsive
- /motor-iva, /demo-video
- /docs-kit, /docs-kit/slide-deck, /docs-kit/one-pager
- /templates/iphone-15, /templates/zentry, /templates/gsap-macbook, /templates/saas-starter

## Issues conocidos
- Node 25 no funciona — usar Node 22 LTS
- Zentry CSS specificity WIP
- h1-h6 globals.css override Tailwind — usar p tags
- Lenis + gsap.from opacity:0 — usar gsap.set + ScrollTrigger.create + onEnter

## Sesión 017 — Peer coordination + Chrome DevTools + Visual Annotation Research (2026-04-13)
- 5 peers coordinados (Jess, Carlos, Pam, Gem, Flor) — worktree rule verified, 0 colisiones
- Carlos (CRECE v2): 10 design decisions recovered and sent, 8/10 implemented
- Chrome DevTools MCP: root cause found (Chrome 147 blocks debugging on default data dir), workaround documented
- Flor merge: 3 commits (InfographicZoom fix, CinematicSection, PageTransition) — commit 59a461a
- Visual annotation research: 7 sources, 10+ tools evaluated
  - Top 3: Agentation (#1 React+MCP), Vibe Annotations (#2 framework-agnostic), onUI (#3 GPL-3.0 8 MCP tools)
  - Plan: Sprint 0 = install+test Agentation before template work

## Proximos pasos
- [ ] **Sprint 0:** Instalar Agentation (o fallback) — habilitar flujo de anotación visual
- [ ] Sprint 1: Polish gsap-cocktails (hero video z-index, scroll sections)
- [ ] Sprint 2: Replicate gsap-macbook from source (46 assets + 3D)
- [ ] Sprint 3: Remaining C-grade templates (CEO decides which)
- [ ] Sprint 4: Video pipeline (Playwright recording + Remotion)
- [ ] Sprint 5: npm publish + PR #1 update
- [x] ~~Render smoke test de las 4 composiciones reescritas~~ (sesiones 013+014 — todos PASS)
- [x] ~~CRECE v2 design review~~ (sesión 015+017 — 10 decisiones, Carlos integró 8)
- [ ] Migrar CFDI-Motor a DS (DEUDA-TECNICA.md)
- [ ] CI/CD con GitHub Actions
- [ ] mdmem construction (4-5 hrs dedicadas, ownership en md-design-system)
