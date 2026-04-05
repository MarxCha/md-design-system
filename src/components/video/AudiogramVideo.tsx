import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr } from "./video-tokens";

export type AudiogramVideoProps = {
  /** Path to the audio file (MP3) */
  audioSrc: string;
  /** Path to background image (infographic or cover) */
  imageSrc: string;
  /** Title overlay */
  title: string;
  /** Subtitle */
  subtitle?: string;
  /** Background color (behind image) */
  bgColor?: string;
  /** Accent color for waveform bars */
  accentColor?: string;
  /** Number of waveform bars */
  barCount?: number;
};

/**
 * Generates pseudo-random but deterministic values for waveform visualization.
 * Uses frame + index to create varied bar heights that feel organic.
 */
function getBarHeight(frame: number, index: number, barCount: number): number {
  const seed = (frame * 7 + index * 13) % 100;
  const wave1 = Math.sin((frame + index * 8) * 0.15) * 0.3;
  const wave2 = Math.sin((frame * 0.7 + index * 5) * 0.1) * 0.2;
  const wave3 = Math.cos((frame + index * 12) * 0.08) * 0.15;
  const base = 0.15 + Math.abs(wave1 + wave2 + wave3);
  // Center bars are taller
  const centerFactor = 1 - Math.abs(index - barCount / 2) / (barCount / 2) * 0.4;
  return Math.min(1, base * centerFactor + 0.05);
}

export const AudiogramVideo: React.FC<AudiogramVideoProps> = ({
  audioSrc,
  imageSrc,
  title,
  subtitle,
  bgColor = vc.primary900,
  accentColor = vc.accent,
  barCount = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // Title fade in
  const titleOpacity = interpolate(frame, [0, fps * 1.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Waveform area height
  const waveHeight = isVertical ? 120 : 80;
  const barWidth = Math.max(3, Math.floor((width * 0.7) / barCount) - 2);
  const barGap = 2;

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Audio track */}
      <Audio src={audioSrc} />

      {/* Background image with slow zoom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
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
            objectFit: "cover",
            opacity: 0.25,
            filter: "blur(2px)",
            transform: `scale(${interpolate(frame, [0, fps * 60], [1, 1.1], { extrapolateRight: "clamp" })})`,
          }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: bgColor,
          opacity: 0.6,
        }}
      />

      {/* Title + Subtitle */}
      <div
        style={{
          position: "absolute",
          top: isVertical ? "15%" : "12%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: titleOpacity,
          padding: vs[8],
        }}
      >
        {/* Accent dot */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: accentColor,
            marginBottom: vs[4],
            boxShadow: `0 0 20px ${accentColor}`,
          }}
        />
        <div
          style={{
            fontFamily: vt.fontFamily.display,
            fontSize: isVertical ? vt.fontSize["3xl"] : vt.fontSize["2xl"],
            fontWeight: vt.fontWeight.bold,
            color: vc.white,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: vt.fontFamily.body,
              fontSize: vt.fontSize.lg,
              color: vc.primary200,
              marginTop: vs[2],
              textAlign: "center",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Central infographic (small, sharp, in center) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isVertical ? "85%" : "60%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Img
          src={imageSrc}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: vr.lg,
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            transform: `scale(${interpolate(frame, [0, fps * 2], [0.95, 1], { extrapolateRight: "clamp" })})`,
          }}
        />
      </div>

      {/* Waveform visualization at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "8%" : "6%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "flex-end",
          gap: barGap,
          height: waveHeight,
        }}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          const h = getBarHeight(frame, i, barCount);
          return (
            <div
              key={i}
              style={{
                width: barWidth,
                height: `${h * 100}%`,
                backgroundColor: accentColor,
                borderRadius: barWidth / 2,
                opacity: 0.6 + h * 0.4,
              }}
            />
          );
        })}
      </div>

      {/* Playback indicator */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "5%" : "3%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: vt.fontFamily.mono,
          fontSize: vt.fontSize.sm,
          color: vc.primary200,
          opacity: 0.6,
        }}
      >
        {formatTime(frame / fps)}
      </div>
    </AbsoluteFill>
  );
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
