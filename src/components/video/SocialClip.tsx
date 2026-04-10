import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs } from "./video-tokens";
import { GradientBackground } from "../../remotion/components/GradientBackground";
import { ParticleField } from "../../remotion/components/ParticleField";
import { ProgressBar } from "../../remotion/components/ProgressBar";

export type SocialClipProps = {
  /** Big stat/number to highlight */
  stat: { value: string; label: string };
  /** Hook line (1 sentence) */
  hook: string;
  /** CTA text */
  ctaText?: string;
  /** Brand name */
  brand?: string;
  /** Background color */
  bgColor?: string;
  /** Accent color */
  accentColor?: string;
};

/**
 * Animated numeric counter — extracts digits from stat value and counts up.
 */
function AnimatedStat({
  value,
  accentColor,
  fontSize,
  fps,
}: {
  value: string;
  accentColor: string;
  fontSize: number;
  fps: number;
}) {
  const frame = useCurrentFrame();

  // Extract numeric portion: "73%" → 73, "$999" → 999
  const numMatch = value.match(/(\d+\.?\d*)/);
  const numericValue = numMatch ? parseFloat(numMatch[1]) : 0;
  const prefix = value.slice(0, value.indexOf(numMatch?.[0] ?? ""));
  const suffix = value.slice(
    value.indexOf(numMatch?.[0] ?? "") + (numMatch?.[0]?.length ?? 0),
  );

  // Count up over 35 frames with easing
  const countProgress = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 140 },
    durationInFrames: 35,
  });

  const displayNum =
    numericValue % 1 === 0
      ? Math.round(numericValue * countProgress)
      : (numericValue * countProgress).toFixed(1);

  return (
    <span
      style={{
        fontFamily: vt.fontFamily.display,
        fontSize,
        fontWeight: vt.fontWeight.black,
        color: accentColor,
        lineHeight: 1,
      }}
    >
      {prefix}
      {displayNum}
      {suffix}
    </span>
  );
}

export const SocialClip: React.FC<SocialClipProps> = ({
  stat,
  hook,
  ctaText = "Conoce mas",
  brand = "MD Consultoria TI",
  bgColor = vc.primary900,
  accentColor = vc.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // ─── Phase 1: Stat reveal (frames 0-45) ───
  const statScale = spring({
    frame,
    fps,
    config: springConfigs.bouncy,
    durationInFrames: 30,
  });
  const statOpacity = interpolate(statScale, [0, 1], [0, 1]);

  // ─── Phase 2: Hook words stagger (frames 30+) ───
  const hookDelay = 30;
  const hookWords = hook.split(" ");

  // ─── Phase 3: CTA with glow (frames 60+) ───
  const ctaDelay = 60;
  const ctaProgress = spring({
    frame: frame - ctaDelay,
    fps,
    config: springConfigs.bouncy,
    durationInFrames: 25,
  });

  // CTA glow pulse — smooth spring-based
  const glowCycle = Math.max(0, frame - ctaDelay - 25);
  const glowPulse =
    1 +
    0.04 *
      Math.sin(
        interpolate(glowCycle, [0, 60], [0, Math.PI * 2], {
          extrapolateRight: "extend",
        }),
      );
  const glowOpacity = interpolate(
    Math.sin(
      interpolate(glowCycle, [0, 60], [0, Math.PI * 2], {
        extrapolateRight: "extend",
      }),
    ),
    [-1, 1],
    [0.3, 0.8],
  );

  // ─── Brand fade ───
  const brandOpacity = interpolate(frame, [5, 20], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ─── Accent line: grows from center ───
  const accentLineDelay = 25;
  const lineProgress = spring({
    frame: frame - accentLineDelay,
    fps,
    config: springConfigs.smooth,
    durationInFrames: 20,
  });

  return (
    <AbsoluteFill>
      {/* Layer 1: Animated gradient background */}
      <GradientBackground
        colors={[bgColor, "hsl(213, 55%, 14%)", bgColor]}
        angle={135}
        animateAngle
        animateSpeed={0.3}
      />

      {/* Layer 2: Subtle particle field */}
      <ParticleField
        count={isVertical ? 25 : 15}
        color={`${accentColor}33`}
        speed={0.5}
        direction="up"
      />

      {/* Layer 3: Content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? 64 : 48,
        }}
      >
        {/* Brand watermark top */}
        <div
          style={{
            position: "absolute",
            top: isVertical ? 80 : 40,
            fontFamily: vt.fontFamily.mono,
            fontSize: vt.fontSize.sm,
            color: vc.white,
            opacity: brandOpacity,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {brand}
        </div>

        {/* Stat with count-up animation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: statOpacity,
            transform: `scale(${statScale})`,
          }}
        >
          <AnimatedStat
            value={stat.value}
            accentColor={accentColor}
            fontSize={
              isVertical ? vt.fontSize["6xl"] : vt.fontSize["5xl"]
            }
            fps={fps}
          />
          <span
            style={{
              fontFamily: vt.fontFamily.body,
              fontSize: isVertical ? vt.fontSize.xl : vt.fontSize.lg,
              color: vc.primary200,
              marginTop: vs[2],
            }}
          >
            {stat.label}
          </span>
        </div>

        {/* Accent line (animated width) */}
        <div
          style={{
            width: interpolate(lineProgress, [0, 1], [0, 120]),
            height: 3,
            backgroundColor: accentColor,
            borderRadius: 2,
            marginTop: vs[8],
            marginBottom: vs[6],
            boxShadow: `0 0 12px ${accentColor}66`,
          }}
        />

        {/* Hook — word-by-word stagger */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 8px",
            maxWidth: isVertical ? "85%" : "60%",
          }}
        >
          {hookWords.map((word, i) => {
            const wordDelay = hookDelay + i * 3;
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
                  fontFamily: vt.fontFamily.body,
                  fontSize: isVertical
                    ? vt.fontSize.xl
                    : vt.fontSize.lg,
                  fontWeight: vt.fontWeight.medium,
                  color: vc.white,
                  lineHeight: vt.lineHeight.normal,
                  opacity: interpolate(wordProgress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(wordProgress, [0, 1], [20, 0])}px)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* CTA with glow pulse */}
        <div
          style={{
            position: "absolute",
            bottom: isVertical ? "12%" : "10%",
            opacity: interpolate(ctaProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(ctaProgress, [0, 1], [0.8, 1]) * glowPulse})`,
          }}
        >
          {/* Glow behind button */}
          <div
            style={{
              position: "absolute",
              inset: -20,
              borderRadius: vr.xl,
              background: `radial-gradient(ellipse at center, ${accentColor}44 0%, transparent 70%)`,
              opacity: glowOpacity,
            }}
          />
          <div
            style={{
              backgroundColor: accentColor,
              borderRadius: vr.lg,
              padding: `${vs[3]}px ${vs[8]}px`,
              boxShadow: `0 4px 24px ${accentColor}55, 0 0 40px ${accentColor}22`,
              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily: vt.fontFamily.display,
                fontSize: vt.fontSize.lg,
                fontWeight: vt.fontWeight.bold,
                color: bgColor,
              }}
            >
              {ctaText}
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Layer 4: Progress bar */}
      <ProgressBar color={accentColor} height={3} margin={24} />
    </AbsoluteFill>
  );
};
