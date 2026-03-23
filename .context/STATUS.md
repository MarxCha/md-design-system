# STATUS — md-design-system
Ultima actualizacion: 2026-03-23

## Estado: COMPONENTS INSTALLED + TESTED

Branch activo: `feat/design-system-scaffold`
PR: https://github.com/MarxCha/md-design-system/pull/1

## Lo que existe
- Next.js 15.5.14 + TypeScript + Tailwind 4 + shadcn/ui
- 107 archivos fuente, 0 errores TypeScript, 0 ESLint warnings
- 20 componentes shadcn/ui (button, card, input, dialog, badge, separator, dropdown-menu, tabs, sonner, tooltip, avatar, sheet, skeleton, select, textarea, label, switch, popover, command, scroll-area)
- 17 componentes custom (scroll, parallax, animation, interactive, audio, nav, effects, story, three, product)
- 7 hooks custom (smooth-scroll, scroll-progress, parallax, audio-engine, reveal, word-highlight, reduced-motion)
- 2 providers (SmoothScroll con Lenis+GSAP, Audio con Howler)
- Design tokens HSL completos (colores, spacing 4px, tipografia modular scale, sombras)
- 5 demos: /playground, /scroll-stories, /animation-lab, /product-showcase, /showcase
- Fonts: Instrument Sans (display) + DM Sans (body)
- Vitest + Testing Library: 35 tests passing en 10 archivos
- Package exports configurados para consumo externo (., ./ui, ./hooks, ./styles, ./theme, ./utils)

## Lo que falta
- [ ] Importar componentes de CuentosIA / Palabras Vivas
- [ ] Storybook (opcional)
- [ ] CI/CD con GitHub Actions
- [ ] Publicar como paquete npm privado
- [ ] Mas tests (hooks custom, providers, integración)

## Issues conocidos
- Node 25 no funciona con Next.js 15. Usar Node 22 LTS: `export PATH="/opt/homebrew/opt/node@22/bin:$PATH"`
- R3F requiere --legacy-peer-deps por conflict con React 19
