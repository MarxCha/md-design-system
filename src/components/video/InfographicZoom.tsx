import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs } from "./video-tokens";
import { GradientBackground } from "../../remotion/components/GradientBackground";
import { ProgressBar } from "../../remotion/components/ProgressBar";

/**
 * A zone within the infographic to highlight.
 * Coordinates are percentages (0-100) relative to the image.
 */
export type InfographicZone = {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  duration?: number;
};

export type InfographicZoomProps = {
  imageSrc: string;
  zones: InfographicZone[];
  overviewDuration?: number;
  zoneDuration?: number;
  outroDuration?: number;
  bgColor?: string;
  accentColor?: string;
  title?: string;
};

export const InfographicZoom: React.FC<InfographicZoomProps> = ({
  imageSrc,
  zones,
  overviewDuration = 3,
  zoneDuration = 4,
  outroDuration = 2,
  bgColor = vc.primary900,
  accentColor = vc.accent,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ─── Calculate Phases ───
  const overviewFrames = Math.round(overviewDuration * fps);
  const zoneFramesList = zones.map((z) =>
    Math.round((z.duration ?? zoneDuration) * fps),
  );
  const outroFrames = Math.round(outroDuration * fps);
  const totalZoneFrames = zoneFramesList.reduce((a, b) => a + b, 0);

  let phase: "overview" | "zone" | "outro" = "overview";
  let zoneIndex = 0;
  let localFrame = frame;

  if (frame < overviewFrames) {
    phase = "overview";
    localFrame = frame;
  } else if (frame < overviewFrames + totalZoneFrames) {
    phase = "zone";
    let accumulated = overviewFrames;
    for (let i = 0; i < zones.length; i++) {
      if (frame < accumulated + zoneFramesList[i]) {
        zoneIndex = i;
        localFrame = frame - accumulated;
        break;
      }
      accumulated += zoneFramesList[i];
    }
  } else {
    phase = "outro";
    localFrame = frame - overviewFrames - totalZoneFrames;
  }

  // ─── Calculate Transform ───
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let labelText = "";
  let labelOpacity = 0;

  if (phase === "overview") {
    // Gentle Ken Burns zoom during overview
    scale = interpolate(localFrame, [0, overviewFrames], [1, 1.04], {
      extrapolateRight: "clamp",
    });
  } else if (phase === "zone") {
    const zone = zones[zoneIndex];
    const zoneFrames = zoneFramesList[zoneIndex];

    const targetScale = Math.min(100 / zone.w, 100 / zone.h) * 0.85;
    const centerX = zone.x + zone.w / 2;
    const centerY = zone.y + zone.h / 2;
    const targetX = (50 - centerX) * width / 100;
    const targetY = (50 - centerY) * height / 100;

    // Spring-based transition (not linear)
    const transitionFrames = Math.min(
      Math.round(zoneFrames * 0.3),
      Math.round(fps * 0.8),
    );
    const springProgress = spring({
      frame: localFrame,
      fps,
      config: springConfigs.smooth,
      durationInFrames: transitionFrames,
    });

    scale = interpolate(springProgress, [0, 1], [1, targetScale]);
    translateX = interpolate(springProgress, [0, 1], [0, targetX]);
    translateY = interpolate(springProgress, [0, 1], [0, targetY]);

    // Label with slide-up + blur entrance
    if (zone.label) {
      labelText = zone.label;
      labelOpacity = interpolate(
        localFrame,
        [
          transitionFrames,
          transitionFrames + 10,
          zoneFrames - 15,
          zoneFrames - 5,
        ],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
    }
  } else {
    // Outro: zoom back out with spring
    const outroSpring = spring({
      frame: localFrame,
      fps,
      config: springConfigs.gentle,
      durationInFrames: Math.round(outroFrames * 0.6),
    });
    scale = interpolate(outroSpring, [0, 1], [1.5, 1]);
  }

  // ─── Title overlay for overview ───
  const titleSpring =
    phase === "overview"
      ? spring({
          frame: Math.max(0, localFrame - Math.round(fps * 0.3)),
          fps,
          config: springConfigs.smooth,
          durationInFrames: 25,
        })
      : 0;

  const titleExitOpacity =
    phase === "overview"
      ? interpolate(
          localFrame,
          [overviewFrames - Math.round(fps * 0.5), overviewFrames],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 0;

  const titleOpacity = Math.min(titleSpring, titleExitOpacity);

  // ─── Zone indicator dots ───
  const zoneProgress =
    phase === "zone" ? (zoneIndex + 1) / zones.length : phase === "outro" ? 1 : 0;

  // ─── Label slide-up animation ───
  const labelSlideUp =
    phase === "zone"
      ? interpolate(
          localFrame,
          [
            Math.min(Math.round(zoneFramesList[zoneIndex] * 0.3), Math.round(fps * 0.8)),
            Math.min(Math.round(zoneFramesList[zoneIndex] * 0.3), Math.round(fps * 0.8)) + 10,
          ],
          [15, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 0;

  const labelBlur =
    phase === "zone"
      ? interpolate(
          localFrame,
          [
            Math.min(Math.round(zoneFramesList[zoneIndex] * 0.3), Math.round(fps * 0.8)),
            Math.min(Math.round(zoneFramesList[zoneIndex] * 0.3), Math.round(fps * 0.8)) + 8,
          ],
          [4, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Subtle gradient overlay */}
      <GradientBackground
        colors={[bgColor, `${accentColor}08`, bgColor]}
        type="radial"
        style={{ opacity: 0.5 }}
      />

      {/* Infographic image with spring-based transform */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Img
          src={imageSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          }}
        />
      </div>

      {/* Zone vignette overlay — dims edges when zoomed */}
      {phase === "zone" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
            opacity: interpolate(
              localFrame,
              [0, 15],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
            pointerEvents: "none",
          }}
        />
      )}

      {/* Title overlay (overview phase) with spring entrance */}
      {title && titleOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: titleOpacity,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(12px)",
              borderRadius: vr.lg,
              padding: `${vs[3]}px ${vs[8]}px`,
              border: `1px solid ${accentColor}22`,
            }}
          >
            <span
              style={{
                fontFamily: vt.fontFamily.display,
                fontSize: vt.fontSize["2xl"],
                fontWeight: vt.fontWeight.bold,
                color: vc.white,
              }}
            >
              {title}
            </span>
          </div>
        </div>
      )}

      {/* Zone label with slide-up + blur entrance */}
      {labelText && labelOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "6%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: labelOpacity,
            transform: `translateY(${labelSlideUp}px)`,
            filter: `blur(${labelBlur}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(12px)",
              borderRadius: vr.md,
              padding: `${vs[2]}px ${vs[6]}px`,
              display: "flex",
              alignItems: "center",
              gap: vs[2],
              border: `1px solid ${accentColor}33`,
            }}
          >
            {/* Accent dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: accentColor,
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
            <span
              style={{
                fontFamily: vt.fontFamily.body,
                fontSize: vt.fontSize.xl,
                fontWeight: vt.fontWeight.semibold,
                color: vc.white,
              }}
            >
              {labelText}
            </span>
          </div>
        </div>
      )}

      {/* Zone indicator dots (bottom-right) */}
      {zones.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "3%",
            right: "4%",
            display: "flex",
            gap: 6,
            opacity: phase === "overview" ? 0 : 0.7,
          }}
        >
          {zones.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === zoneIndex && phase === "zone" ? 20 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  i <= zoneIndex || phase === "outro"
                    ? accentColor
                    : `${vc.white}44`,
                transition: "width 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      <ProgressBar color={accentColor} height={3} />
    </AbsoluteFill>
  );
};

/** Calculate total duration in frames */
export function calculateInfographicDuration(
  props: InfographicZoomProps,
  fps: number = 30,
): number {
  const overview = Math.round((props.overviewDuration ?? 3) * fps);
  const zones = props.zones.reduce(
    (acc, z) =>
      acc + Math.round((z.duration ?? props.zoneDuration ?? 4) * fps),
    0,
  );
  const outro = Math.round((props.outroDuration ?? 2) * fps);
  return overview + zones + outro;
}
