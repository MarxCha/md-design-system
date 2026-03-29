# STATUS — md-design-system
Ultima actualizacion: 2026-03-24 (sesion 005)

## Estado: ZENTRY WIP + RESPONSIVE PRIMITIVES COMPLETE

Branch activo: `feat/design-system-scaffold`
PR: https://github.com/MarxCha/md-design-system/pull/1
Commits: 11

## Lo que existe (~185 source files, 0 TS errors, 88 tests)

### Foundation
- Next.js 15.5.14 + TypeScript + Tailwind 4 + shadcn/ui
- 20 componentes shadcn/ui + 17 custom + 8 hooks + 2 providers
- Design tokens HSL, dark mode, Instrument Sans + DM Sans
- Vitest 4.1: 88 tests, 26 archivos, 100% passing
- Package exports (., ./ui, ./hooks, ./styles, ./theme, ./utils, ./responsive, ./lint)

### Responsive Primitives (NEW — session 005)
- ResponsiveTable (table→cards on mobile)
- FormGrid (responsive form layout)
- MobileFilterSheet (inline→bottom sheet)
- ResponsiveDialog (dialog→bottom sheet)
- TouchActionBar (mobile-only floating actions)
- useBreakpoint hook

### ESLint Plugin (NEW — session 005)
- no-hardcoded-colors (prevents bg-white, text-gray-500)
- no-inline-styles (forces Tailwind)
- require-aria-label (onClick without label)
- require-image-alt (missing/placeholder alt text)
- Configs: recommended (warn) + strict (error)

### Cross-Project Patterns
- AppSidebar + AppShell (from cfdi-motor)
- BentoGrid + StatCard + ChartContainer + ChartPalette (from agrorentable-geosuite)
- TextAnimations + HoloCard + MagneticButton + ScrollSection + LandingHero (from agrorentable-landing)

### Templates (Design Vault)
- [x] iPhone 15 Pro Clone — 12 componentes, 3D model, VideoCarousel (Safari fixed), GSAP scroll
- [~] Zentry Awwwards Clone — 10 componentes portados, CSS specificity WIP, needs factory process
- [ ] GSAP MacBook Landing
- [ ] GSAP Cocktails
- [ ] SaaS Boilerplate
- [ ] Page UI / Shipixen
- [ ] Cruip Open React Template
- [ ] AstroWind
- [ ] Awesome Landing Pages

### Demo Pages (12 rutas)
- / (landing), /showcase, /playground, /animation-lab, /scroll-stories, /product-showcase
- /demo-sidebar, /demo-dashboard, /demo-landing, /demo-responsive
- /templates/iphone-15, /templates/zentry

## Issues conocidos
- Node 25 no funciona — usar Node 22 LTS
- Zentry CSS specificity: @theme inline no funciona en imported CSS, @layer pierde vs globals
- Safari video autoplay: necesita IntersectionObserver fallback + .catch() en .play()
- Assets de templates (videos 80MB+) en .gitignore

## Proximos pasos
- [ ] Factory process para template porting eficiente
- [ ] Polish Zentry (grid Features, colores restantes)
- [ ] Integrar responsive + lint en medivista-pro
- [ ] Template #3: GSAP MacBook Landing
- [ ] Remotion video pipeline
