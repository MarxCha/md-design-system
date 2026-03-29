# STATUS — md-design-system
Ultima actualizacion: 2026-03-29 (sesion 006)

## Estado: MOTOR IVA PROTOTYPE COMPLETE + CFDI-MOTOR AUDIT DONE

Branch activo: `feat/design-system-scaffold`
PR: https://github.com/MarxCha/md-design-system/pull/1
Commits: 12

## Lo que existe (~189 source files, 0 TS errors, 88 tests)

### Foundation
- Next.js 15.5.14 + TypeScript + Tailwind 4 + shadcn/ui
- 20 componentes shadcn/ui + 17 custom + 8 hooks + 2 providers
- Design tokens HSL, dark mode, Instrument Sans + DM Sans
- Vitest 4.1: 88 tests, 26 archivos, 100% passing
- Package exports (., ./ui, ./hooks, ./styles, ./theme, ./utils, ./responsive, ./lint)

### Dashboard Components (8 total)
- StatCard, BentoGrid/BentoCard, ChartContainer, ChartPalette (session 003)
- IVAWaterfall — waterfall chart Cobrado→Pagado→Neto (session 006)
- StatusTimeline — horizontal period tracker with status dots (session 006)
- AlertFeed — severity-based alert feed with left border (session 006)

### Responsive Primitives (session 005)
- ResponsiveTable, FormGrid, MobileFilterSheet, ResponsiveDialog, TouchActionBar
- useBreakpoint hook

### ESLint Plugin (session 005)
- 4 rules: no-hardcoded-colors, no-inline-styles, require-aria-label, require-image-alt

### Cross-Project Patterns
- AppSidebar + AppShell (from cfdi-motor)
- BentoGrid + StatCard + ChartContainer + ChartPalette (from agrorentable-geosuite)
- TextAnimations + HoloCard + MagneticButton + ScrollSection + LandingHero (from agrorentable-landing)

### Templates (Design Vault)
- [x] iPhone 15 Pro Clone — 12 componentes, 3D model, VideoCarousel (Safari fixed), GSAP scroll
- [~] Zentry Awwwards Clone — 10 componentes portados, CSS specificity WIP, needs factory process
- [ ] GSAP MacBook Landing
- [ ] GSAP Cocktails + 5 mas pendientes

### Demo Pages (13 rutas)
- / (landing), /showcase, /playground, /animation-lab, /scroll-stories, /product-showcase
- /demo-sidebar, /demo-dashboard, /demo-landing, /demo-responsive
- /motor-iva (NEW — CFO dashboard prototype)
- /templates/iphone-15, /templates/zentry

## CFDI-Motor Audit (session 006)
Auditoria completa de CFDI-Motor vs design system:
- 200+ violaciones de DS en 17 archivos de paginas
- Backlog creado: `cfdi-motor/apps/web/src/DEUDA-TECNICA.md`
- P0: tokens --cfdi-* (8h), P1: KpiCard x3 (4h), P2: formatMXN x6 (2h)
- P3: MESES x11 (1h), P4: badges x8+ (6h), P5: componentes duplicados (6h)
- Total estimado: ~35h

## Issues conocidos
- Node 25 no funciona — usar Node 22 LTS
- Zentry CSS specificity: @theme inline no funciona en imported CSS, @layer pierde vs globals
- Safari video autoplay: necesita IntersectionObserver fallback + .catch() en .play()
- h1-h6 en globals.css tienen font-size fijo que overridea Tailwind — usar p tags o CSS layers
- Assets de templates (videos 80MB+) en .gitignore

## Proximos pasos
- [ ] Motor IVA segunda pasada: HoloCard tilt, GlassmorphismCard, CountUp, stagger
- [ ] Migrar CFDI-Motor a DS (DEUDA-TECNICA.md: P0→P1→P4→P5→P2→P3→P6)
- [ ] Factory process para template porting eficiente
- [ ] Polish Zentry (grid Features, colores restantes)
- [ ] Template #3: GSAP MacBook Landing
