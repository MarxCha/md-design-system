# STATUS — md-design-system
Ultima actualizacion: 2026-03-29 (sesion 007)

## Estado: REMOTION PIPELINE COMPLETE + AUDITOR CIUDADANO REDESIGN SHIPPED

Branch activo: `feat/design-system-scaffold`
PR: https://github.com/MarxCha/md-design-system/pull/1
Commits: 13

## Lo que existe (~200 source files, 0 TS errors, 88 tests)

### Foundation
- Next.js 15.5.14 + TypeScript + Tailwind 4 + shadcn/ui
- 20 componentes shadcn/ui + 17 custom + 8 hooks + 2 providers
- Design tokens HSL, dark mode, Instrument Sans + DM Sans
- Vitest 4.1: 88 tests, 26 archivos, 100% passing
- Package exports (., ./ui, ./hooks, ./styles, ./theme, ./utils, ./responsive, ./lint, ./video)

### Remotion Video Pipeline (NEW — session 007)
- 6 composiciones: BrandReveal, DeviceMockup, TextHook, FeatureShowcase, CTAEnd, ProductDemo
- Soporta iPhone + laptop mockups con screenshots reales
- video-tokens.ts con paleta de colores para video
- /video skill command para generacion programatica
- zod 4.3.6 (upgrade para Remotion compat)
- npm scripts: video:studio, video:render, video:preview

### Dashboard Components (8 total)
- StatCard, BentoGrid/BentoCard, ChartContainer, ChartPalette
- IVAWaterfall, StatusTimeline, AlertFeed

### Responsive Primitives
- ResponsiveTable, FormGrid, MobileFilterSheet, ResponsiveDialog, TouchActionBar
- useBreakpoint hook

### ESLint Plugin
- 4 rules: no-hardcoded-colors, no-inline-styles, require-aria-label, require-image-alt

### Templates (Design Vault)
- [x] iPhone 15 Pro Clone — 12 componentes, 3D model, VideoCarousel, GSAP scroll
- [~] Zentry Awwwards Clone — 10 componentes, CSS specificity WIP
- [ ] GSAP MacBook Landing + 5 mas pendientes

### Demo Pages (14 rutas)
- / (landing), /showcase, /playground, /animation-lab, /scroll-stories, /product-showcase
- /demo-sidebar, /demo-dashboard, /demo-landing, /demo-responsive
- /motor-iva (CFO dashboard prototype)
- /demo-video (Remotion player preview)
- /templates/iphone-15, /templates/zentry

## Cross-Project: Auditor Ciudadano (session 007)

Rediseno completo ejecutado desde md-design-system y deployado a Vercel:

| App | URL | Stack |
|-----|-----|-------|
| Citizen | citizen-app-ruddy.vercel.app | React 19 + Tailwind v4 + shadcn/ui + Framer Motion |
| Admin | admin-app-pearl-gamma.vercel.app | React 19 + Tailwind v4 + shadcn/ui + Leaflet + Lucide |
| Backend | backend-seven-rho-lfztzeru9z.vercel.app | Express 5 + Prisma + Neon PostgreSQL |

Cambios: ~2990 lineas CSS vanilla eliminadas, 8 componentes extraidos, sidebar responsive,
AnimatePresence transitions, POST /api/transcribe (Whisper), Neon DB seeded (8 reportes).

## CFDI-Motor Audit (session 006)
- Backlog: `cfdi-motor/apps/web/src/DEUDA-TECNICA.md` (~35h remediacion)

## Issues conocidos
- Node 25 no funciona — usar Node 22 LTS
- Zentry CSS specificity WIP
- h1-h6 globals.css override Tailwind — usar p tags

## Proximos pasos
- [ ] Motor IVA segunda pasada: HoloCard, CountUp, stagger
- [ ] Migrar CFDI-Motor a DS (DEUDA-TECNICA.md)
- [ ] Factory process para template porting
- [ ] Template #3: GSAP MacBook Landing
- [ ] CI/CD con GitHub Actions
