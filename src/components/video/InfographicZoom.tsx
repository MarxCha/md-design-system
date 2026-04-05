import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs } from "./video-tokens";
import { spring } from "remotion";

/**
 * A zone within the infographic to highlight.
 * Coordinates are percentages (0-100) relative to the image.
 */
export type InfographicZone = {
  /** Left edge as percentage of image width */
  x: number;
  /** Top edge as percentage of image height */
  y: number;
  /** Width as percentage */
  w: number;
  /** Height as percentage */
  h: number;
  /** Optional label overlay */
  label?: string;
  /** Duration in seconds for this zone */
  duration?: number;
};

export type InfographicZoomProps = {
  /** Path to the infographic image */
  imageSrc: string;
  /** Zones to pan/zoom into, in sequence */
  zones: InfographicZone[];
  /** Duration in seconds for the initial full view */
  overviewDuration?: number;
  /** Duration in seconds per zone (default for zones without own duration) */
  zoneDuration?: number;
  /** Duration in seconds for the final full view */
  outroDuration?: number;
  /** Background color */
  bgColor?: string;
  /** Title overlay on the overview */
  title?: string;
};

export const InfographicZoom: React.FC<InfographicZoomProps> = ({
  imageSrc,
  zones,
  overviewDuration = 3,
  zoneDuration = 4,
  outroDuration = 2,
  bgColor = vc.primary900,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Calculate total frames
  const overviewFrames = Math.round(overviewDuration * fps);
  const zoneFramesList = zones.map((z) =>
    Math.round((z.duration ?? zoneDuration) * fps)
  );
  const outroFrames = Math.round(outroDuration * fps);
  const totalZoneFrames = zoneFramesList.reduce((a, b) => a + b, 0);

  // Determine which phase we're in
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

  // Calculate transform based on phase
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let labelText = "";
  let labelOpacity = 0;

  if (phase === "overview") {
    // Slight zoom-in during overview
    scale = interpolate(localFrame, [0, overviewFrames], [1, 1.02], {
      extrapolateRight: "clamp",
    });
  } else if (phase === "zone") {
    const zone = zones[zoneIndex];
    const zoneFrames = zoneFramesList[zoneIndex];

    // Target scale: how much to zoom in (based on zone width)
    const targetScale = Math.min(100 / zone.w, 100 / zone.h) * 0.85;

    // Target position: center on the zone
    const centerX = zone.x + zone.w / 2;
    const centerY = zone.y + zone.h / 2;
    const targetX = -(centerX - 50) * (targetScale / 100) * width * 0.01;
    const targetY = -(centerY - 50) * (targetScale / 100) * height * 0.01;

    // Smooth transition in
    const transitionIn = Math.min(zoneFrames * 0.3, fps * 0.8);
    const progress = interpolate(localFrame, [0, transitionIn], [0, 1], {
      extrapolateRight: "clamp",
    });

    // Ease
    const eased = interpolate(progress, [0, 1], [0, 1]);

    scale = interpolate(eased, [0, 1], [1, targetScale]);
    translateX = interpolate(eased, [0, 1], [0, targetX]);
    translateY = interpolate(eased, [0, 1], [0, targetY]);

    // Label
    if (zone.label) {
      labelText = zone.label;
      labelOpacity = interpolate(
        localFrame,
        [transitionIn, transitionIn + 10, zoneFrames - 15, zoneFrames - 5],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
    }
  } else {
    // Outro: zoom back out
    const progress = interpolate(localFrame, [0, outroFrames * 0.5], [0, 1], {
      extrapolateRight: "clamp",
    });
    scale = interpolate(progress, [0, 1], [1.5, 1]);
  }

  // Title overlay for overview phase
  const titleOpacity =
    phase === "overview"
      ? interpolate(localFrame, [fps * 0.5, fps * 1, overviewFrames - fps * 0.5, overviewFrames], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Infographic image with transform */}
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
            transition: phase === "zone" ? "none" : undefined,
          }}
        />
      </div>

      {/* Title overlay (overview phase) */}
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
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              borderRadius: vr.lg,
              padding: `${vs[3]}px ${vs[8]}px`,
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

      {/* Zone label overlay */}
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
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
              borderRadius: vr.md,
              padding: `${vs[2]}px ${vs[6]}px`,
            }}
          >
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
    </AbsoluteFill>
  );
};

/** Calculate total duration in frames */
export function calculateInfographicDuration(
  props: InfographicZoomProps,
  fps: number = 30
): number {
  const overview = Math.round((props.overviewDuration ?? 3) * fps);
  const zones = props.zones.reduce(
    (acc, z) => acc + Math.round((z.duration ?? props.zoneDuration ?? 4) * fps),
    0
  );
  const outro = Math.round((props.outroDuration ?? 2) * fps);
  return overview + zones + outro;
}
