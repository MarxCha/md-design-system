import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FitImage, type KenBurnsDirection } from "../../remotion/components/FitImage";
import { vc, vt, vs, vr } from "./video-tokens";
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

/**
 * InfographicZoom — Ruta B (Ken Burns simple)
 *
 * Sequences the infographic through overview → zone segments → outro,
 * each segment using FitImage with a Ken Burns direction.
 * Replaces the broken spring-based zone transitions with a reliable pipeline.
 */

const KB_DIRECTIONS: KenBurnsDirection[] = [
  "zoomIn",
  "panRight",
  "panLeft",
  "zoomOut",
  "panUp",
  "panDown",
];

/** Label overlay that fades in/out within its segment */
const ZoneLabel: React.FC<{
  label: string;
  accentColor: string;
  durationInFrames: number;
}> = ({ label, accentColor, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = Math.round(fps * 0.4);
  const fadeOut = Math.round(fps * 0.4);

  const opacity = interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const slideY = interpolate(frame, [0, fadeIn], [12, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "6%",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${slideY}px)`,
        pointerEvents: "none",
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
          {label}
        </span>
      </div>
    </div>
  );
};

/** Title overlay with fade in/out */
const TitleOverlay: React.FC<{
  title: string;
  durationInFrames: number;
}> = ({ title, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = Math.round(fps * 0.5);
  const fadeOut = Math.round(fps * 0.5);

  const opacity = interpolate(
    frame,
    [fadeIn, fadeIn + 10, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const slideY = interpolate(frame, [fadeIn, fadeIn + 10], [20, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "8%",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${slideY}px)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(12px)",
          borderRadius: vr.lg,
          padding: `${vs[3]}px ${vs[8]}px`,
          border: `1px solid ${vc.accent}22`,
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
  );
};

/** Pagination dots */
const DotIndicators: React.FC<{
  total: number;
  active: number;
  accentColor: string;
}> = ({ total, active, accentColor }) => {
  if (total <= 1) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "3%",
        right: "4%",
        display: "flex",
        gap: 6,
        opacity: 0.7,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 20 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              i <= active ? accentColor : `${vc.white}44`,
          }}
        />
      ))}
    </div>
  );
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
  const { fps } = useVideoConfig();

  const overviewFrames = Math.round(overviewDuration * fps);
  const zoneFramesList = zones.map((z) =>
    Math.round((z.duration ?? zoneDuration) * fps),
  );
  const outroFrames = Math.round(outroDuration * fps);
  const totalZoneFrames = zoneFramesList.reduce((a, b) => a + b, 0);

  // Build zone offsets
  const zoneOffsets: number[] = [];
  let acc = overviewFrames;
  for (const dur of zoneFramesList) {
    zoneOffsets.push(acc);
    acc += dur;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* ─── Overview: gentle zoom in ─── */}
      <Sequence from={0} durationInFrames={overviewFrames}>
        <FitImage
          src={imageSrc}
          fit="contain"
          kenBurns="zoomIn"
          kenBurnsIntensity={0.06}
        />
        {title && (
          <TitleOverlay
            title={title}
            durationInFrames={overviewFrames}
          />
        )}
      </Sequence>

      {/* ─── Zone segments: each with distinct Ken Burns direction ─── */}
      {zones.map((zone, i) => {
        const direction = KB_DIRECTIONS[i % KB_DIRECTIONS.length];

        return (
          <Sequence key={i} from={zoneOffsets[i]} durationInFrames={zoneFramesList[i]}>
            <FitImage
              src={imageSrc}
              fit="contain"
              kenBurns={direction}
              kenBurnsIntensity={0.12}
            />
            {/* Vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Zone label */}
            {zone.label && (
              <ZoneLabel
                label={zone.label}
                accentColor={accentColor}
                durationInFrames={zoneFramesList[i]}
              />
            )}
            {/* Dot indicators */}
            <DotIndicators
              total={zones.length}
              active={i}
              accentColor={accentColor}
            />
          </Sequence>
        );
      })}

      {/* ─── Outro: zoom out ─── */}
      <Sequence
        from={overviewFrames + totalZoneFrames}
        durationInFrames={outroFrames}
      >
        <FitImage
          src={imageSrc}
          fit="contain"
          kenBurns="zoomOut"
          kenBurnsIntensity={0.08}
        />
      </Sequence>

      {/* Progress bar spans entire composition */}
      <ProgressBar color={accentColor} height={3} />
    </AbsoluteFill>
  );
};

/** Calculate total duration in frames — API unchanged */
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
