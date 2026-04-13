# PLAN ACTIVO — Visual Annotation Integration + Template Replication v3

**Fecha:** 2026-04-13 (sesión 017, sprint-review)
**Owner:** Enrique (Design System Lead)
**Revisado por:** Sprint-review post-investigación de herramientas de anotación visual
**Cambios vs plan anterior:** Se agrega Sprint 0 (Visual Annotation) como habilitador del ciclo de revisión. Template Replication baja a Sprint 1+. Estado actualizado con merges de Flor y hallazgos de sesión 017.

## Contexto actualizado

### Problema raíz (sesión 017)
El ciclo de revisión visual de templates es ineficiente: CEO ve errores en browser → los describe en texto → AI no entiende precisamente qué elemento/propiedad corregir. Investigación exhaustiva (7 fuentes, 4 agentes, Gemini) identificó herramientas que resuelven esto.

### Estado actual del DS (post-merge Flor, sesión 017)
- 315+ source files, 151 tests passing, 0 TS errors
- 12 templates (1A, 1B, 6C rewrites genéricos, 4 sin ref externa)
- 10 Remotion compositions funcionando + InfographicKenBurns
- 3 componentes nuevos de Flor mergeados: InfographicZoom fix, CinematicSection, PageTransition
- Chrome DevTools MCP funcional (workaround documentado para Chrome 147)
- CRECE v2 design review completado (10 decisiones, 8 implementadas por Carlos)

### Principio rector
1. PRIMERO habilitar el flujo de anotación visual → AI lee → corrige
2. DESPUÉS usar ese flujo para replicar templates eficientemente
3. REPLICAR del repo fuente, NO emular desde cero

---

## SPRINT 0 — Visual Annotation Tool (30-60 min)
**Objetivo:** Instalar y validar herramienta de anotación visual para cerrar el gap de feedback.

### 0.1 Probar Agentation (15 min) ✅ COMPLETADO
- [x] `npm install agentation@3.0.2 -D`
- [x] Agregar `<Agentation />` al layout via dynamic import (ssr: false) + client wrapper
- [x] MCP server: `npx agentation-mcp server --port 4747` (HTTP, no stdio)
- [x] Registrado en `~/.claude.json` (tools nativos se activan al reiniciar Claude Code)
- [x] Test: CEO anotó "las letras no se ven todas. Están cortadas" → AI leyó via HTTP con selectores CSS + estilos computados
- [x] Fix aplicado basado en anotación: h2 global override detectado, cambiado a p tag
- [ ] Test animation freeze con GSAP/Lenis — pendiente (probar en gsap-cocktails Sprint 1)

**Hallazgos:**
- React 19 + Next.js 15: COMPATIBLE (tsc limpio, renderiza sin errores)
- endpoint prop SIN server corriendo = página se pasma. Server DEBE estar up antes.
- MCP server command: `npx agentation-mcp server --port 4747` (no `npx agentation-mcp` solo)

**Criterio de aceptación:** CEO deja 3 anotaciones en una página con GSAP → AI las lee como JSON con selectores CSS.

**Si Agentation falla (GSAP conflict o React 19 issue):**

### 0.2 Fallback: Vibe Annotations (10 min)
- [ ] Instalar extensión Chrome desde Web Store
- [ ] `npm install -g vibe-annotations-server`
- [ ] Configurar MCP en `~/.claude.json`
- [ ] Test: mismos 3 anotaciones → AI lee JSON

### 0.3 Fallback: onUI (15 min)
- [ ] Instalar extensión Chrome (GPL-3.0)
- [ ] Configurar MCP server local (8 tools)
- [ ] Test con nivel de verbosidad "estándar" y "forense"

**Dependencia:** Sprint 0 desbloquea TODOS los sprints siguientes. Sin herramienta de anotación, el ciclo de revisión sigue siendo ineficiente.

---

## SPRINT 1 — gsap-cocktails Polish (1-2 hrs)
**Prerequisito:** Sprint 0 completado (herramienta de anotación funcional)
**Estado actual:** WIP — 35 imágenes + 2 videos + font copiados, 7 componentes portados. Hero video z-index pendiente.

### 1.1 Fix hero video z-index
- [ ] CEO anota problemas exactos via herramienta de anotación
- [ ] AI lee anotaciones → aplica fixes con selectores precisos
- [ ] Video z-0, textos z-20, hojas z-10 — ajuste fino

### 1.2 Verificar scroll sections
- [ ] Cocktails, About, Art, Menu, Contact — cada sección funcional
- [ ] Comparar visualmente vs demo original
- [ ] Capturar screenshots retina

### 1.3 Capturar video Playwright
- [ ] `npm run template:record -- --slug=gsap-cocktails`
- [ ] FFmpeg post-producción (intro + compress)

**Criterio de aceptación:** Comparación lado a lado con <15% diferencia visual vs original. Video promo de 15-20s.

---

## SPRINT 2 — gsap-macbook Replication (2-3 hrs)
**Estado actual:** C-grade — 0/46 assets, sin R3F, sin 3D. Rehacer completo.

### 2.1 Clonar y auditar repo fuente
- [ ] `git clone github.com/adrianhajdin/gsap_macbook_landing /tmp/gsap-macbook`
- [ ] Inventariar assets: imágenes, videos, 3D models
- [ ] Mapear componentes originales → nuestra estructura

### 2.2 Copiar assets + portar componentes
- [ ] Copiar TODOS los assets → public/templates/gsap-macbook/
- [ ] Portar componentes JSX → TSX
- [ ] Adaptar GSAP animations exactas del original
- [ ] R3F model si existe en el original

### 2.3 Review visual con herramienta de anotación
- [ ] CEO anota diferencias vs original
- [ ] AI corrige basado en anotaciones estructuradas
- [ ] 2-3 rondas de iteración

### 2.4 Screenshot + video
- [ ] Screenshots retina
- [ ] Playwright recording

**Criterio de aceptación:** A/B grade (>80% fidelidad). Video promo capturado.

---

## SPRINT 3 — Remaining C-grade templates (por priorizar)
**Templates pendientes (6):** saas-starter, page-ui, cruip-open, astrowind, ai-sales, ecommerce

### Decisiones pendientes del CEO:
- [ ] ¿Cuáles de estos 6 replicar vs descartar?
- [ ] saas-starter: original NO tiene GSAP — ¿quitar nuestro GSAP inventado?
- [ ] page-ui: original es lib de 196 componentes — ¿nuestro es un demo de 7?
- [ ] astrowind: original es Astro — ¿replicar en Next.js tiene sentido?
- [ ] ai-sales: sin repo fuente — ¿diseño original MD?

**Para cada template aprobado:** mismo proceso que Sprint 2 (clonar → assets → portar → review visual → video).

---

## SPRINT 4 — Video Pipeline Final
**Prerequisito:** Sprints 1-3 completados (templates verificados)

### 4.1 Videos Playwright (templates A-tier con scroll)
- [ ] Grabar cada template con `scripts/record-template.mjs`
- [ ] FFmpeg post: intro card + compress CRF 28

### 4.2 Videos Remotion (templates estáticos)
- [ ] dashboard-pro, form-builder con screenshots reales
- [ ] Remotion Studio para preview antes de render

### 4.3 Composiciones creativas
- [ ] InfographicKenBurns ✅, PitchDeck ✅, SocialClip ✅, AudiogramVideo ✅
- [ ] InfographicZoom (fixed by Flor) — validar render

**Criterio de aceptación:** 12+ videos (vertical + horizontal) de templates que se parecen a los originales.

---

## SPRINT 5 — CI/CD + Publicación
- [x] GitHub Actions workflow creado (.github/workflows/ci.yml)
- [ ] npm publish cuando templates estén verificados
- [ ] Actualizar PR #1 con todos los cambios

---

## Fuera de scope
- mdmem (en md-research para prototipo)
- Duix.Avatar (backlog, spike futuro)
- Motor IVA segunda pasada (sesión dedicada)
- CFDI-Motor migración (sesión dedicada)
- CRECE v2 breakpoints/Framer Motion (Carlos ejecuta)

## Gemini Cross-Audit (2026-04-13)
**Score:** Plan agresivo y funcional, subestima deuda técnica de portar otros frameworks.

**Observaciones integradas:**
1. ✅ React 19 + Agentation: probar en branch aislado ANTES de Sprint 0. Agregado como paso 0.1 pre-check.
2. ✅ R3F en Sprint 2: 2-3 hrs puede ser poco realista si hay 3D models. Ajustar estimación.
3. ✅ astrowind (Astro→Next.js): reescritura total. **Recomendación: descartar o backlog bajo.**
4. ✅ page-ui (196 comps): seleccionar solo 10 componentes visuales, no portar todo.
5. ✅ GSAP plugin licensing: verificar ScrollSmoother, DrawSVG, SplitText antes de replicar.
6. ⚠️ Tokenización: templates portados deben consumir components del DS, no duplicar código.
7. ⚠️ Playwright recording + GSAP pesado = posible dropped frames. Considerar pre-render.

**Observaciones NO integradas (razones):**
- "Mover pipeline Remotion a Sprint 1" — ya tenemos el pipeline funcional, no necesita setup adicional.
- "Lenis global entre templates" — cada template es independiente, no comparten scroll.

## Riesgos (actualizado con Gemini)
1. **React 19 + Agentation** — Concurrent Rendering puede romper refs/DOM de Agentation. Pre-check obligatorio.
2. **GSAP + animation freeze** — puede romper. Si rompe, Vibe Annotations o onUI.
3. **GSAP plugins de pago** — ScrollSmoother, DrawSVG, SplitText. Verificar licencias antes de replicar.
4. **Assets con copyright** — repos fuente son open source pero verificar licencias.
5. **Scope creep en templates** — priorizar 2-3 A-tier. Descartar astrowind (Astro→Next.js rewrite total).
6. **R3F + React 19 + Next.js 15** — fricción conocida con Server Components. Sprint 2 puede necesitar más tiempo.
7. **Playwright dropped frames** — GSAP pesado durante recording. Monitorear calidad de video.

## Herramientas disponibles
- **Anotación visual:** Agentation (primary) → Vibe Annotations (fallback) → onUI (fallback 2)
- **Browser:** Chrome DevTools MCP (workaround Chrome 147), Playwright MCP
- **Video:** Remotion Studio, Playwright recording, FFmpeg 8.x
- **Assets:** Blender 5.0 CLI, GIMP CLI, Inkscape CLI, ImageMagick 7
- **Peers:** Flor (DS read-only/worktree), Carlos (CRECE v2), Gem+Pam (md-research)
