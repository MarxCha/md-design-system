# STATUS — md-design-system
Última actualización: 2026-03-23

## Estado: SCAFFOLD COMPLETO

Branch activo: `feat/design-system-scaffold`
PR: https://github.com/MarxCha/md-design-system/pull/1

## Lo que existe
- Next.js 15.3.2 + TypeScript + Tailwind 4 + shadcn/ui config
- 47 archivos fuente, 0 errores TypeScript
- 17 componentes (scroll, parallax, animation, interactive, audio, nav, effects, story, three)
- 7 hooks custom (smooth-scroll, scroll-progress, parallax, audio-engine, reveal, word-highlight, reduced-motion)
- 2 providers (SmoothScroll con Lenis+GSAP, Audio con Howler)
- Design tokens HSL completos (colores, spacing 4px, tipografía modular scale, sombras)
- 3 demos: /playground, /scroll-stories, /animation-lab
- Fonts: Instrument Sans (display) + DM Sans (body)

## Lo que falta
- [ ] Verificar build desde Mac Mini (SMB share hace build imposible desde iMac)
- [ ] Instalar componentes shadcn/ui base (button, card, input, dialog)
- [ ] Configurar package exports para consumo externo
- [ ] Importar componentes de CuentosIA / Palabras Vivas
- [ ] Tests con Vitest + Testing Library
- [ ] Storybook (opcional)

## Issues conocidos
- SMB share hace npm install/build/dev extremadamente lento desde iMac
- R3F requiere --legacy-peer-deps por conflict con React 19
