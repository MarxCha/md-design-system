# STATUS — md-design-system
Ultima actualizacion: 2026-04-04 (sesion 009)

## Estado: DOCS-KIT MODULE SHIPPED + FACTORY PROCESS COMPLETE + 4 TEMPLATES

Branch activo: `feat/design-system-scaffold`
PR: https://github.com/MarxCha/md-design-system/pull/1
Commits: 15

## Lo que existe (~280 source files, 0 TS errors, 138 tests)

### Foundation
- Next.js 15.5.14 + TypeScript + Tailwind 4 + shadcn/ui
- 20 componentes shadcn/ui + 17 custom + 8 hooks + 2 providers
- Design tokens HSL, dark mode, Instrument Sans + DM Sans
- Vitest 4.1: 88 tests, 26 archivos, 100% passing
- Package exports (., ./ui, ./hooks, ./styles, ./theme, ./utils, ./responsive, ./lint, ./video, ./docs-kit)

### Template & Video Factory Process (NEW — session 008)
- Generator: `npm run template:new -- --slug=X --name="Y"` scaffolds 7 files + asset dirs
- Screenshot: `npm run template:screenshot -- --slug=X` Playwright retina 2x capture
- CSS standard: scoped `.{slug}-template` selectors, NO @layer utilities
- Font namespacing: `{slug}-{fontname}` prevents @font-face collisions
- Dual barrel exports (internal + prefixed for external consumption)
- Remotion registry (`src/remotion/registry.ts`) centralizes video-configs
- video-config.ts co-located per template, imports copy from constants.ts
- Gemini cross-reviewed and approved

### Templates (4 completed, 1 WIP)
- [x] iPhone 15 Pro Clone — 12 componentes, 3D R3F, VideoCarousel, GSAP scroll
- [x] GSAP MacBook Landing — 6 componentes, dark Apple-style, horizontal scroll, pin-zoom, CSS laptop mockup
- [x] SaaS Starter — 7 componentes, Linear/Vercel-style, pricing tiers, mock dashboard, gradient CTA
- [~] Zentry Awwwards Clone — 10 componentes, CSS specificity WIP
- [ ] GSAP Cocktails + 4 mas pendientes

### Remotion Video Pipeline (10 composiciones)
- Original 6: BrandReveal, DeviceMockup, TextHook, FeatureShowcase, CTAEnd, ProductDemo
- NEW 4 pipelines (session 009):
  - InfographicZoom — Pan/zoom animado sobre infografia PNG (Ken Burns por zonas)
  - PitchDeck — Renderiza SlideDeckConfig de docs-kit como video con transiciones
  - SocialClip — Clips cortos 10-15s para redes (stat + hook + CTA)
  - AudiogramVideo — Video podcast (audio MP3 + infografia + waveform)
- Registry pattern: Root.tsx iterates templateConfigs for compositions
- 4 videos renderizados (Auditor Ciudadano + Guelaguetza)
- video-config.ts en 4 templates (iPhone 15, Zentry, MacBook, SaaS)
- Demo compositions: InfographicZoom-Demo, PitchDeck-Demo, SocialClip-Demo, AudiogramVideo-Demo

### Dashboard Components (8 total)
- StatCard, BentoGrid/BentoCard, ChartContainer, ChartPalette
- IVAWaterfall, StatusTimeline, AlertFeed

### docs-kit — Document & Presentation Toolkit (NEW — session 009)
- 3 formats: slide-deck (HTML interactivo), one-pager (print-ready), notebook-pack (NotebookLM)
- Generator: `npm run docs:new [format] [slug] --name="X"` (or `all` for 3 formats)
- Export: `npm run docs:export [slug]` outputs to out/docs/
- SlideDeck React component with keyboard nav + click zones + a11y
- 6 slide types: title, content, image, stats, quote, cta
- 3 layout variants: dark-tech, clean-corporate, bold-creative
- HTML standalone export (single .html, no dependencies, print support)
- OnePager component with print CSS (@media print)
- NotebookLM pack generator (single MD, split MDs, audio summary)
- Theme bridge connects DS tokens to all document formats
- Demo pages: /docs-kit, /docs-kit/slide-deck, /docs-kit/one-pager
- 42 tests (types, theme-bridge, layouts, notebook-pack, export-html)

### Responsive Primitives + ESLint Plugin
- 5 responsive components + useBreakpoint hook
- 4 lint rules exportables

### Demo Pages (16 rutas)
- /, /showcase, /playground, /animation-lab, /scroll-stories, /product-showcase
- /demo-sidebar, /demo-dashboard, /demo-landing, /demo-responsive
- /motor-iva, /demo-video
- /docs-kit, /docs-kit/slide-deck, /docs-kit/one-pager
- /templates/iphone-15, /templates/zentry, /templates/gsap-macbook, /templates/saas-starter

## Cross-Project: Auditor Ciudadano (session 007)
| App | URL |
|-----|-----|
| Citizen | auditor-ciudadano.vercel.app |
| Admin | admin-app-pearl-gamma.vercel.app (manual deploy) |
| Backend | backend-seven-rho-lfztzeru9z.vercel.app |

## Issues conocidos
- Node 25 no funciona — usar Node 22 LTS
- Zentry CSS specificity WIP
- h1-h6 globals.css override Tailwind — usar p tags
- Lenis + gsap.from opacity:0 — usar gsap.set + ScrollTrigger.create + onEnter
- lint rules no-explicit-any — pre-existing

## Proximos pasos
- [ ] Template #5: GSAP Cocktails (npm run template:new -- --slug=gsap-cocktails)
- [ ] Capture screenshots MacBook + SaaS (npm run template:screenshot)
- [ ] Render promotional videos via Remotion
- [ ] Motor IVA segunda pasada: HoloCard, CountUp, stagger
- [ ] Migrar CFDI-Motor a DS (DEUDA-TECNICA.md)
- [ ] CI/CD con GitHub Actions
