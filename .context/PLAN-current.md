# PLAN: Render & Compare — 4 Video Pipelines

**Fecha:** 2026-04-04
**Objetivo:** Renderizar un video real con cada una de las 4 nuevas composiciones de Remotion usando datos de MD Analytics. Comparar resultados.

## Sprint 1: Render InfographicZoom
**Objetivo:** Renderizar la infografia de metabase-mexico con pan/zoom por zonas
**Comando:** `npx remotion render InfographicZoom-Demo out/videos/infographic-zoom.mp4`
**Criterio:** MP4 renderizado, tamaño > 500KB, dura ~22s

## Sprint 2: Render PitchDeck
**Objetivo:** Renderizar el pitch deck de MD Analytics como video
**Comando:** `npx remotion render PitchDeck-Demo out/videos/pitch-deck.mp4`
**Criterio:** MP4 renderizado, dura ~19s (4s intro + 3 slides x 5s)

## Sprint 3: Render SocialClip
**Objetivo:** Renderizar un clip vertical para redes
**Comando:** `npx remotion render SocialClip-Demo out/videos/social-clip.mp4`
**Criterio:** MP4 vertical 1080x1920, dura 12s

## Sprint 4: Render AudiogramVideo (smoke test solo)
**Objetivo:** Verificar que AudiogramVideo renderiza con audio (30s preview)
**Comando:** `npx remotion render AudiogramVideo-Demo --frames=0-900 out/videos/audiogram-preview.mp4`
**Criterio:** MP4 con audio audible en los primeros 30s

## Sprint 5: Comparar y reportar
**Objetivo:** Tabla comparativa de los 4 videos + recomendaciones
**Criterio:** CEO puede decidir que pipelines usar para cada producto

## Dependencias
Sprints 1-4 son independientes (se pueden paralelizar)
Sprint 5 depende de 1-4
