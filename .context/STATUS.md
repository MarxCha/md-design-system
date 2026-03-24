# STATUS — md-design-system
Ultima actualizacion: 2026-03-23 (sesion 004)

## Estado: IPHONE 15 TEMPLATE COMPLETE

Branch activo: `feat/design-system-scaffold`
PR: https://github.com/MarxCha/md-design-system/pull/1
Commits: 7

## Lo que existe (148 source files, 0 TS errors)

### Foundation
- Next.js 15.5.14 + TypeScript + Tailwind 4 + shadcn/ui
- 20 componentes shadcn/ui + 17 custom + 7 hooks + 2 providers
- Design tokens HSL, dark mode, Instrument Sans + DM Sans
- Vitest 4.1: 55 tests, 17 archivos, 100% passing
- Package exports (., ./ui, ./hooks, ./styles, ./theme, ./utils)

### Cross-Project Patterns
- AppSidebar + AppShell (from cfdi-motor)
- BentoGrid + StatCard + ChartContainer + ChartPalette (from agrorentable-geosuite)
- TextAnimations + HoloCard + MagneticButton + ScrollSection + LandingHero (from agrorentable-landing)

### Templates (Design Vault)
- [x] iPhone 15 Pro Clone (adrianhajdin/iphone) — 12 componentes, 3D model, VideoCarousel, GSAP scroll, dark theme
- [ ] Zentry Awwwards Clone
- [ ] GSAP MacBook Landing
- [ ] GSAP Cocktails
- [ ] SaaS Boilerplate
- [ ] Page UI / Shipixen
- [ ] Cruip Open React Template
- [ ] AstroWind
- [ ] Awesome Landing Pages

### Tooling
- Remotion v4.0.438 (remotion + @remotion/cli + @remotion/player)
- Playwright (visual verification con GPU: --use-angle=metal)
- R3F v9.5.0 + drei v10.7.7 (React 19 compatible)

### Demo Pages (10 rutas)
- / (landing), /showcase, /playground, /animation-lab, /scroll-stories, /product-showcase
- /demo-sidebar, /demo-dashboard, /demo-landing
- /templates/iphone-15

## Issues conocidos
- Node 25 no funciona con Next.js 15 — usar Node 22 LTS
- Chrome DevTools MCP + Docker MCP necesitan reinicio de sesion para reconectar
- Assets de iPhone 15 (videos 29.2MB + GLB 867KB) estan en .gitignore — clonar de repo original

## Proximos pasos
- [ ] Template #2: Zentry Awwwards Clone
- [ ] Setup Remotion video pipeline
- [ ] Restaurar MCPs (reiniciar sesion)
- [ ] Mapa Leaflet reusable
- [ ] CI/CD con GitHub Actions
- [ ] Storybook
