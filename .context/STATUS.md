# STATUS — md-design-system
Ultima actualizacion: 2026-04-10 (sesion 012)

## Estado: EDITOR PRO MAX INTEGRATED + 4 COMPOSICIONES REESCRITAS

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

### Templates (4 completed, 1 WIP)
- [x] iPhone 15 Pro Clone — 12 componentes, 3D R3F, VideoCarousel, GSAP scroll
- [x] GSAP MacBook Landing — 6 componentes, dark Apple-style, horizontal scroll
- [x] SaaS Starter — 7 componentes, Linear/Vercel-style, pricing tiers
- [~] Zentry Awwwards Clone — 10 componentes, CSS specificity WIP
- [ ] GSAP Cocktails + 4 mas pendientes

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

## Proximos pasos
- [ ] Render smoke test de las 4 composiciones reescritas (verificar visual)
- [ ] Template #5: GSAP Cocktails (npm run template:new -- --slug=gsap-cocktails)
- [ ] Capture screenshots MacBook + SaaS (npm run template:screenshot)
- [ ] Render promotional videos via Remotion
- [ ] Motor IVA segunda pasada: HoloCard, CountUp, stagger
- [ ] Migrar CFDI-Motor a DS (DEUDA-TECNICA.md)
- [ ] CI/CD con GitHub Actions
