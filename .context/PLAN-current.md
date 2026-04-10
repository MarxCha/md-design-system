# PLAN: Editor Pro Max Integration + Composiciones Rechazadas Rewrite

**Fecha:** 2026-04-10
**Objetivo:** (1) Integrar componentes reusables de editor-pro-max en md-design-system, (2) Reescribir 4 composiciones rechazadas con animaciones reales usando primitivos de editor-pro-max + remotion-bits.

---

## Sprint 1: Integrar componentes de editor-pro-max (cherry-pick, no copy-paste)
**Estimado:** 2-3h | **Agentes:** backend, frontend | **Skills:** remotion-best-practices

### 1a. Copiar componentes reusables (25 → selección)
**Source:** `/Users/marxchavez/Projects/editor-pro-max/src/components/`
**Target:** `src/remotion/components/` (nueva carpeta)

Componentes a integrar (priorizados por uso inmediato):
- **text/AnimatedTitle.tsx** — 8 animation styles (fade, slideUp, typewriter, blur...)
- **text/TypewriterText.tsx** — char-by-char typing + cursor
- **text/CaptionOverlay.tsx** — TikTok-style captions (para AudiogramVideo)
- **backgrounds/GradientBackground.tsx** — gradients animados con rotación
- **backgrounds/ParticleField.tsx** — partículas animadas (para SocialClip, BrandReveal)
- **overlays/ProgressBar.tsx** — barra de progreso de video
- **overlays/CallToAction.tsx** — CTA con spring animation
- **overlays/CountdownTimer.tsx** — countdown con pulse
- **media/FitImage.tsx** — Ken Burns real (zoomIn, zoomOut, panLeft, panRight)
- **media/Slideshow.tsx** — crossfade slideshow (para PitchDeck)
- **layout/SafeArea.tsx** — safe areas para mobile video
- **transitions/TransitionPresets.ts** — 12 transiciones (crossfade, slide, wipe, clockwise)

Componentes a NO integrar (no los necesitamos ahora):
- VideoClip, JumpCut, FitVideo — edición de video real, no nuestro caso
- PictureInPicture, SplitScreen — layouts complejos que no usamos
- Watermark — ya tenemos branding propio
- LowerThird, WordByWordCaption — muy específicos de editing

### 1b. Copiar presets útiles
**Source:** `editor-pro-max/src/presets/`
**Target:** `src/remotion/presets/`

- **easings.ts** — 12 easing functions (linear, easeIn/Out, bounce, elastic, back, sharp)
- **dimensions.ts** — 9 platform specs (TikTok, IG Story/Reel/Post, YouTube, YT Short)
- **colors.ts** — 7 palettes + 8 gradients (adaptar a tokens MD)
- **fonts.ts** — Google Font loader utility (adaptar a nuestras fonts)
- **brand.ts** — REESCRIBIR para MD Consultoría (no copiar @soyenriquerocha)

### 1c. Copiar hooks + schemas
- **useAnimation.ts** — lifecycle enter/hold/exit
- **schemas/** — zod schemas para props validation
- Adaptar imports, verificar compatibilidad con nuestro Remotion 4.0.438 (ellos usan 4.0.440)

### Criterios de aceptación Sprint 1:
- [ ] `src/remotion/components/` con 12 componentes importables
- [ ] `src/remotion/presets/` con 5 archivos de presets (brand.ts = MD)
- [ ] 0 TypeScript errors
- [ ] Barrel export en `src/remotion/index.ts` actualizado
- [ ] Composiciones existentes (6 working) siguen funcionando

---

## Sprint 2: Reescribir SocialClip (más rápido, mayor impacto)
**Estimado:** 1.5h | **Agentes:** frontend | **Skills:** motion-designer

### Diagnóstico actual:
- Solo 3 fases secuenciales, stat estático, hook sin stagger, CTA con simple sine wave
- No hay profundidad visual (sin partículas, sin gradientes, sin glow)

### Rewrite plan:
1. **Stat → AnimatedCounter** de remotion-bits: `0 → 73` con postfix "%"
2. **Hook → AnimatedTitle** de editor-pro-max: word-by-word con `slideUp` animation style
3. **CTA → CallToAction** de editor-pro-max: spring animation + glow
4. **Background → GradientBackground** animada (en lugar de color sólido)
5. **Accent line → ProgressBar** de editor-pro-max (subtle, bottom)
6. **Agregar ParticleField** como layer detrás del contenido (subtle, 15-20 particles)

### Criterios:
- [ ] Video renderizado 1080x1920, 12s
- [ ] Al menos 5 animaciones concurrentes (stat count, hook stagger, CTA spring, gradient shift, particles)
- [ ] Visualmente superior al rejected version

---

## Sprint 3: Reescribir PitchDeck
**Estimado:** 2-3h | **Agentes:** frontend | **Skills:** motion-designer

### Diagnóstico actual:
- Slides estáticas, stats muestran valor final inmediato, bullets sin stagger
- Sin transiciones slide-to-slide, sin gradientes dinámicos

### Rewrite plan:
1. **Stats → AnimatedCounter**: cada stat cuenta de 0 → valor
2. **Bullets → AnimatedTitle** con stagger por línea (slideUp, 6 frames delay)
3. **Slide transitions → TransitionPresets**: crossfade entre slides (12 frames)
4. **Background → GradientBackground** por slide con colores del theme
5. **Image slides → FitImage** con Ken Burns (zoomIn sutil 1.0 → 1.05)
6. **Title slides → TypewriterText** para heading principal
7. **Quote slides → AnimatedTitle** con fade + blur effect

### Criterios:
- [ ] Video renderizado 1920x1080, ~19s (4s intro + 3 slides x 5s)
- [ ] Stats count-up visible y smooth
- [ ] Transiciones entre slides fluidas
- [ ] Al menos 3 tipos de animación distintos por slide

---

## Sprint 4: Reescribir InfographicZoom
**Estimado:** 2h | **Agentes:** frontend | **Skills:** motion-designer

### Diagnóstico actual:
- Solo Ken Burns (pan/zoom) sobre PNG estática
- Labels aparecen/desaparecen con opacity, sin stagger ni entrance effects
- No hay overlays animados sobre las zonas

### Rewrite plan:
1. **Pan/zoom base → FitImage** de editor-pro-max: Ken Burns propio con intensity control
2. **Zone labels → AnimatedTitle** con slideUp + blur entrance por zona
3. **Zone overlays → GradientBackground** semitransparente que pulsa al entrar zona
4. **Stat callouts → AnimatedCounter** si la zona tiene métricas
5. **Transiciones entre zonas → fade-through** (dim zona anterior, brighten siguiente)
6. **ProgressBar** bottom mostrando progreso del recorrido

### Criterios:
- [ ] Video renderizado, duración ~22s
- [ ] Cada zona tiene al menos 2 animaciones (label + overlay o counter)
- [ ] Transición entre zonas visible y smooth

---

## Sprint 5: Reescribir AudiogramVideo
**Estimado:** 2-3h | **Agentes:** frontend | **Skills:** motion-designer

### Diagnóstico actual:
- Waveform FAKE (sine/cosine pseudo-random, no análisis real de audio)
- Title fade-in una vez, sin animación continua
- Background zoom lineal lento (1.0 → 1.1)

### Rewrite plan:
1. **Title → AnimatedTitle** con typewriter o word-by-word entrance
2. **Background → GradientBackground** con shift de color (no solo zoom)
3. **Waveform bars → spring-based** animation con stagger por barra
4. **Agregar ProgressBar** bottom mostrando duración del audio
5. **Agregar CountdownTimer** al final (fade out countdown)
6. **Cover image → FitImage** con panRight sutil (Ken Burns horizontal)

**Nota sobre FFT real:** Generar datos FFT reales requiere pipeline extra con ffmpeg. Para v1, mejorar la estética de las barras pseudo-random con springs y stagger. Para v2 (futura sesión), implementar FFT real.

### Criterios:
- [ ] Video renderizado con audio audible (30s preview)
- [ ] Barras visualmente orgánicas (springs, no sine waves lineales)
- [ ] Al menos 4 animaciones (title, bars, gradient, progress)

---

## Sprint 6: Tests + Registry + Report
**Estimado:** 1h | **Agentes:** test-v2

1. Vitest tests para nuevos componentes importados
2. Actualizar registry.ts con las 4 composiciones reescritas
3. Verificar que las 6 composiciones existentes siguen funcionando
4. Render smoke test de las 4 composiciones
5. Actualizar STATUS.md, context.json, DECISIONS.md

### Criterios:
- [ ] Tests passing (existentes + nuevos)
- [ ] 0 TS errors
- [ ] 4 MP4 renderizados como evidencia
- [ ] Archivos de contexto actualizados

---

## Dependencias
- Sprint 1 es prerequisito de Sprints 2-5
- Sprints 2-5 son independientes entre sí (paralelizables)
- Sprint 6 depende de 2-5

## Estimado total: 10-13h (2 sesiones)
- Sesión hoy: Sprint 1 + Sprint 2 + Sprint 3 (6-8h)
- Sesión siguiente: Sprint 4 + Sprint 5 + Sprint 6 (4-5h)

## Riesgo principal
- Remotion version mismatch (nosotros 4.0.438, editor-pro-max 4.0.440) — probablemente compatible pero verificar
- Imports de @remotion/transitions, @remotion/shapes que no tenemos instalados
