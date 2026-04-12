# PLAN ACTIVO — Template Replication Sprint + Video Pipeline v2

**Fecha:** 2026-04-12 (sesión 014, post-sprint-review)
**Owner:** Claude Code (md-design-system)
**Trigger:** CEO detectó que los 12 templates son scaffolds genéricos, no clones reales de los repos fuente.
**Principio rector:** REPLICAR del repo fuente, NO emular desde cero. Copiar assets, portar código, adaptar al stack.

## Contexto

Los templates fueron scaffoldeados con contenido genérico en vez de portar el código real de los repos originales. Resultado: páginas que no se parecen a las originales (ej: gsap-cocktails tiene 35 imágenes de cocktails/hojas que nunca se copiaron). Videos de templates vacíos son inútiles.

### Lecciones de sesiones previas
- iPhone-15 y Zentry: se emularon en vez de replicar → costó mucho esfuerzo extra para arreglar
- InfographicZoom: bug de fórmula (targetScale/100) no detectado hasta smoke test visual manual
- Video configs con `screens: []` producen videos blancos sin detección temprana
- Remotion Studio debería usarse para preview antes de render ciego

## Repos fuente (9 templates con referencia conocida)

| Template | Repo fuente | Demo |
|----------|-------------|------|
| iphone-15 | github.com/adrianhajdin/iphone | apple-iphone-v.vercel.app |
| zentry | github.com/adrianhajdin/award-winning-website | — |
| gsap-macbook | github.com/adrianhajdin/gsap_macbook_landing | — |
| gsap-cocktails | github.com/adrianhajdin/gsap_cocktails | — |
| saas-starter | github.com/ixartz/SaaS-Boilerplate | react-saas.com |
| page-ui | github.com/danmindru/page-ui | pageui.shipixen.com |
| cruip-open | github.com/cruip/open-react-template | open.cruip.com |
| astrowind | github.com/onwidget/astrowind | astrowind.vercel.app |
| ai-sales | — (pendiente localizar) | — |

### Templates sin repo fuente conocido (3)
- dashboard-pro, ecommerce, form-builder — posiblemente diseños originales MD Consultoría

## FASE 1 — Audit de fidelidad (por template)

Para cada template con repo fuente:
1. Clonar repo original a /tmp/<slug>
2. Comparar: assets (imágenes, fuentes), componentes, CSS/animaciones, estructura
3. Documentar gap: qué falta, qué se inventó, qué se adaptó correctamente
4. Categorizar: A (>80% fiel), B (40-80%), C (<40% — rehacer)

**Criterio de aceptación:** Tabla de fidelidad con score por template.

## FASE 2 — Replicación correcta (por prioridad)

Orden por valor visual (A-tier del audit de scroll):
1. gsap-cocktails (11 scroll sections, 35 assets faltantes)
2. gsap-macbook (12 scroll sections)
3. astrowind (11 scroll sections)
4. page-ui (10 scroll sections)
5. ai-sales (9 scroll sections)
6. cruip-open (8 scroll sections)
7. ecommerce (7 scroll sections)
8. saas-starter (7 scroll sections + Lenis)
9. iphone-15 (Three.js, ya parcialmente portado)
10. zentry (mouse-driven, ya parcialmente portado)

Para cada template:
1. Copiar TODOS los assets del repo original → public/templates/<slug>/
2. Portar componentes JSX → TSX respetando estructura original
3. Adaptar imports a Next.js App Router + Tailwind v4
4. Preservar GSAP animations exactas del original
5. Verificar visualmente vs demo original
6. Capturar screenshots retina

**Criterio de aceptación:** Comparación visual lado a lado con <10% diferencia.

## FASE 3 — Video Pipeline v2

Solo después de templates verificados:

### Templates A-tier (8 con scroll):
- Playwright recording → FFmpeg post (intro + compress)
- Script: `scripts/record-template.mjs` (ya creado)

### Templates B/C-tier (4 sin scroll):
- Remotion ProductDemo con screenshots reales
- Video configs con screenshots conectados (ya arreglado para 3)

### Composiciones creativas:
- Remotion puro (InfographicZoom ✅, InfographicKenBurns ✅, PitchDeck ✅, SocialClip ✅, AudiogramVideo ✅)

### Herramientas disponibles:
- Remotion Studio (preview en vivo antes de render)
- Playwright recording (scroll en vivo)
- FFmpeg 8.x (post-producción, sin drawtext)
- Blender 5.0 + CLI skill (3D intros si se necesitan)
- ImageMagick 7 (text overlays, cubre gap drawtext)
- GIMP + Inkscape CLIs (assets estáticos)

**Criterio de aceptación:** 24 videos (12 vertical + 12 horizontal) de templates que se parecen a los originales.

## FASE 4 — CI/CD + Publicación

- GitHub Actions workflow creado (.github/workflows/ci.yml ✅)
- Template YAML documentado en md-research para replicar en 9 repos
- npm publish cuando templates estén verificados

## Fuera de scope
- mdmem (reasignado a md-research para prototipo)
- Duix.Avatar (backlog, spike futuro)
- Motor IVA segunda pasada (sesión dedicada)
- CFDI-Motor migración (sesión dedicada)

## Riesgos
1. **Assets con copyright** — repos fuente son open source pero verificar licencias
2. **Fuentes custom** — originales usan Google Fonts o fonts embedidas, verificar disponibilidad
3. **GSAP plugins** — algunos originales pueden usar GSAP premium (ScrollSmoother, SplitText)
4. **Scope creep** — 9 templates es mucho para una sesión. Priorizar 2-3 A-tier primero.
