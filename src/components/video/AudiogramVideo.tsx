import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs } from "./video-tokens";
import { GradientBackground } from "../../remotion/components/GradientBackground";
import { ProgressBar } from "../../remotion/components/ProgressBar";

export type AudiogramVideoProps = {
  audioSrc: string;
  imageSrc: string;
  title: string;
  subtitle?: string;
  bgColor?: string;
  accentColor?: string;
  barCount?: number;
};

/**
 * Spring-based waveform bar height — each bar uses a spring offset
 * by its index for organic stagger. Combined with multi-frequency
 * waves for more natural movement.
 */
function getBarHeight(frame: number, index: number, barCount: number): number {
  // Multiple wave frequencies for organic feel
  const wave1 = Math.sin((frame * 0.18 + index * 0.9) * 1.0) * 0.25;
  const wave2 = Math.sin((frame * 0.12 + index * 0.6) * 1.3) * 0.2;
  const wave3 = Math.cos((frame * 0.08 + index * 1.2) * 0.7) * 0.15;
  const wave4 = Math.sin((frame * 0.25 + index * 0.3) * 0.5) * 0.1;

  const base = 0.2 + Math.abs(wave1 + wave2 + wave3 + wave4);

  // Center-weighted distribution
  const centerFactor =
    1 - (Math.abs(index - barCount / 2) / (barCount / 2)) * 0.5;

  // Beat-like pulses every ~30 frames
  const beatPulse =
    Math.pow(Math.sin(frame * 0.1 + index * 0.05), 8) * 0.25;

  return Math.min(1, (base + beatPulse) * centerFactor + 0.08);
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

  // ─── Title entrance: word-by-word stagger ───
  const titleWords = title.split(" ");
  const titleDelay = Math.round(fps * 0.5);

  // ─── Subtitle fade ───
  const subtitleOpacity = interpolate(
    frame,
    [fps * 1.5, fps * 2.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ─── Waveform area ───
  const waveHeight = isVertical ? 140 : 100;
  const barWidth = Math.max(3, Math.floor((width * 0.7) / barCount) - 2);
  const barGap = 2;

  // ─── Background image Ken Burns ───
  const bgScale = interpolate(frame, [0, fps * 60], [1, 1.08], {
    extrapolateRight: "clamp",
  });
  const bgPanX = interpolate(frame, [0, fps * 60], [0, -2], {
    extrapolateRight: "clamp",
  });

  // ─── Cover image entrance ───
  const coverSpring = spring({
    frame: Math.max(0, frame - Math.round(fps * 0.3)),
    fps,
    config: springConfigs.smooth,
    durationInFrames: 30,
  });

  // ─── Accent dot glow pulse ───
  const dotGlow = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [12, 28],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Audio track */}
      <Audio src={audioSrc} />

      {/* Layer 1: Animated gradient background */}
      <GradientBackground
        colors={[bgColor, `${accentColor}0a`, "hsl(213, 55%, 12%)"]}
        angle={180}
        animateAngle
        animateSpeed={0.15}
      />

      {/* Layer 2: Background image with Ken Burns */}
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
            opacity: 0.2,
            filter: "blur(3px)",
            transform: `scale(${bgScale}) translateX(${bgPanX}%)`,
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: bgColor,
          opacity: 0.55,
        }}
      />

      {/* Title + Subtitle — word-by-word stagger */}
      <div
        style={{
          position: "absolute",
          top: isVertical ? "15%" : "12%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: vs[8],
        }}
      >
        {/* Accent dot with glow */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: accentColor,
            marginBottom: vs[4],
            boxShadow: `0 0 ${dotGlow}px ${accentColor}`,
          }}
        />

        {/* Title: word-by-word */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 10px",
            maxWidth: "80%",
          }}
        >
          {titleWords.map((word, i) => {
            const wordDelay = titleDelay + i * 3;
            const wordProgress = spring({
              frame: frame - wordDelay,
              fps,
              config: springConfigs.snappy,
              durationInFrames: 18,
            });

            return (
              <span
                key={i}
                style={{
                  fontFamily: vt.fontFamily.display,
                  fontSize: isVertical
                    ? vt.fontSize["3xl"]
                    : vt.fontSize["2xl"],
                  fontWeight: vt.fontWeight.bold,
                  color: vc.white,
                  opacity: interpolate(wordProgress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(wordProgress, [0, 1], [15, 0])}px)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {subtitle && (
          <div
            style={{
              fontFamily: vt.fontFamily.body,
              fontSize: vt.fontSize.lg,
              color: vc.primary200,
              marginTop: vs[2],
              textAlign: "center",
              opacity: subtitleOpacity,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Central infographic with spring entrance */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isVertical ? "85%" : "55%",
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
            boxShadow: `0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}15`,
            opacity: interpolate(coverSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(coverSpring, [0, 1], [0.92, 1])})`,
          }}
        />
      </div>

      {/* Waveform — spring-based bars with stagger */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "10%" : "8%",
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

          // Color gradient: center bars are accent, edges are muted
          const centerDist =
            Math.abs(i - barCount / 2) / (barCount / 2);
          const barOpacity = 0.5 + h * 0.5;

          return (
            <div
              key={i}
              style={{
                width: barWidth,
                height: `${h * 100}%`,
                backgroundColor: accentColor,
                borderRadius: barWidth / 2,
                opacity: barOpacity * (1 - centerDist * 0.3),
                boxShadow:
                  h > 0.6
                    ? `0 0 6px ${accentColor}44`
                    : undefined,
              }}
            />
          );
        })}
      </div>

      {/* Playback indicator */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "6%" : "4%",
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

      {/* Progress bar */}
      <ProgressBar color={accentColor} height={3} />
    </AbsoluteFill>
  );
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
