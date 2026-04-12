# PLAN ACTIVO — Opción (B): InfographicKenBurns (ruta rápida)

**Fecha:** 2026-04-11 (sesión 013, post-smoke-test)
**Owner:** Claude Code (md-design-system)
**Decisión CEO:** Opción (B) aprobada. Desbloquea BACKLOG #12 md-research + decisión urgente #5.
**ETA:** 45 min

## Contexto

- `InfographicZoom` (composition existente, sesión 012) visualmente NO funciona — frames 0%/50%/95% prácticamente idénticos. Zone transitions, vignette, pagination dots NO aparecen.
- `FitImage` component (`src/remotion/components/FitImage.tsx`) está completo y probado: 6 direcciones Ken Burns, interpolación `progress` sobre duration, 0 dependencias externas.
- Asset disponible: `public/docs/metabase-mexico/infographic.png` (ya usado por InfographicZoom + AudiogramVideo, confirmado funcionando en AudiogramVideo).

## Diseño

**NO tocar `InfographicZoom.tsx`.** Plan aditivo: nueva composition alongside la rota.

### Nuevo archivo: `src/components/video/InfographicKenBurns.tsx`
```tsx
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FitImage } from "../../remotion/components/FitImage";

export interface InfographicKenBurnsProps {
  imageSrc: string;
  title?: string;
  subtitle?: string;
  direction?: "zoomIn" | "zoomOut" | "panLeft" | "panRight";
  intensity?: number;  // 0-1, default 0.15
}

export const InfographicKenBurns: React.FC<InfographicKenBurnsProps> = ({
  imageSrc,
  title,
  subtitle,
  direction = "zoomIn",
  intensity = 0.15,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Title overlay fade in/out (first 1s in, last 1s out)
  const titleOpacity = interpolate(
    frame,
    [0, fps, durationInFrames - fps, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0e1a" }}>
      <FitImage
        src={imageSrc}
        fit="contain"
        kenBurns={direction}
        kenBurnsIntensity={intensity}
      />
      {title && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 60,
            opacity: titleOpacity,
            background: "linear-gradient(to top, rgba(10,14,26,0.85) 0%, transparent 40%)",
          }}
        >
          <div style={{ textAlign: "center", color: "white", padding: "0 80px" }}>
            <div style={{ fontSize: 48, fontWeight: 700, fontFamily: "serif", marginBottom: 12 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 24, opacity: 0.8, fontFamily: "sans-serif" }}>
                {subtitle}
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const calculateInfographicKenBurnsDuration = (
  durationSeconds: number,
  fps: number
) => Math.round(durationSeconds * fps);
```

### Edit: `src/remotion/Root.tsx`
Añadir import + Composition alongside `InfographicZoom-Demo`:
```tsx
import { InfographicKenBurns, calculateInfographicKenBurnsDuration } from "../components/video/InfographicKenBurns";

// ... en el JSX, después de InfographicZoom-Demo:
<Composition
  id="InfographicKenBurns-Demo"
  component={InfographicKenBurns}
  durationInFrames={calculateInfographicKenBurnsDuration(15, VIDEO_FPS)}
  fps={VIDEO_FPS}
  width={VIDEO_SIZES.horizontal.width}
  height={VIDEO_SIZES.horizontal.height}
  defaultProps={{
    imageSrc: staticFile("docs/metabase-mexico/infographic.png"),
    title: "MD Analytics",
    subtitle: "Business Intelligence para Mexico",
    direction: "zoomIn" as const,
    intensity: 0.15,
  }}
/>
```

### Integración ffmpeg CRF 28 (post-process)
Script simple, ejecutado manualmente en el smoke test:
```bash
ffmpeg -y -i out/smoke-test-013/infographic-ken-burns-raw.mp4 \
  -c:v libx264 -crf 28 -preset slow \
  out/smoke-test-013/infographic-ken-burns.mp4
```
No se agrega al pipeline automático todavía — eso es decisión de sesión 014 para integración en `npm run` scripts.

## Sprint ejecución

### Sprint 1 — Create + register (15 min)
1. Crear `src/components/video/InfographicKenBurns.tsx`
2. Editar `src/remotion/Root.tsx` — import + Composition
3. Verificar TypeScript: `npx tsc --noEmit`
4. Verificar composition list: `npx remotion compositions | grep Ken`

**Aceptación:** `InfographicKenBurns-Demo` aparece en la lista, 0 TS errors.

### Sprint 2 — Render + post-process (10 min)
1. `npx remotion render InfographicKenBurns-Demo out/smoke-test-013/infographic-ken-burns-raw.mp4`
2. `ffmpeg -y -i raw.mp4 -c:v libx264 -crf 28 -preset slow infographic-ken-burns.mp4`
3. Verificar tamaños: raw vs compressed. Target: compressed < 5 MB.

**Aceptación:** 2 archivos rendereados, compressed bajo 5 MB, sin errores.

### Sprint 3 — Visual validation (10 min)
1. Extraer 5 frames con ffmpeg (0%, 25%, 50%, 75%, 95%) de la versión compressed
2. Leer PNGs con Read tool
3. Verificar que:
   - Se ve la infografía completa (contain fit, letterboxed OK)
   - Se ve el título "MD Analytics" con fade in/out
   - Ken Burns zoomIn perceptible entre 0% y 95%
   - No hay artifacts visibles por la compresión CRF 28

**Aceptación:** frames 0% y 95% son visualmente distintos (confirmar que Ken Burns animando).

### Sprint 4 — Reporte (10 min)
1. Actualizar `.context/STATUS.md`
2. Actualizar `.context/DECISIONS.md`
3. Notificar peers `5ltrtdxj` y `brtbep8z` con resultado
4. Reporte al CEO

## Fuera de scope de (B)
- NO arreglar `InfographicZoom.tsx` — eso es tarea (A) sesión 014
- NO arreglar PitchDeck counter overlap bug — tarea (A) sesión 014
- NO integrar ffmpeg post-process al pipeline `npm run` — decisión de integración sesión 014
- NO mergear `chore/graphify-setup` — pendiente del CEO
- NO reiniciar para smoke test MCP graphify — pendiente del CEO

## Riesgos
- **FitImage con `fit="contain"` puede dejar bandas negras** si aspect ratio de la infografía ≠ 16:9. Mitigación: el background de `AbsoluteFill` es `#0a0e1a` (consistente con el design system dark), letterboxing es aceptable visualmente.
- **Ken Burns con intensity=0.15** puede ser demasiado sutil o demasiado agresivo. Mitigación: arrancamos con 0.15 (visible pero no mareante), ajustamos si el frame-diff a 0% vs 95% es imperceptible.
- **TypeScript errors** en Root.tsx si import path está mal. Mitigación: verificar con `npx tsc --noEmit` antes de render.

## Post-completion
- Reportar a `5ltrtdxj` para que pueda cerrar BACKLOG #12 en md-research con status `RESUELTO (Opción B implementada, A pendiente)`
- Reportar a `brtbep8z` para que pase corrección al CEO
- Pedir al peer la lista de tareas adicionales de md-research que mencionó el CEO
