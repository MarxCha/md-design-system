import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs } from "./video-tokens";

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

  // Phase 1: Stat reveal (frames 0-45)
  const statScale = spring({ frame, fps, config: springConfigs.bouncy, durationInFrames: 30 });
  const statOpacity = interpolate(statScale, [0, 1], [0, 1]);

  // Phase 2: Hook text (frames 30-90)
  const hookDelay = 30;
  const hookProgress = spring({ frame: frame - hookDelay, fps, config: springConfigs.smooth, durationInFrames: 25 });

  // Phase 3: CTA pulse (frames 60+)
  const ctaDelay = 60;
  const ctaProgress = spring({ frame: frame - ctaDelay, fps, config: springConfigs.bouncy, durationInFrames: 25 });
  const ctaPulse = interpolate(Math.max(0, frame - ctaDelay - 25) % 40, [0, 20, 40], [1, 1.04, 1]);

  // Brand fade
  const brandOpacity = interpolate(frame, [5, 20], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
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

      {/* Stat */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: statOpacity,
          transform: `scale(${statScale})`,
        }}
      >
        <span
          style={{
            fontFamily: vt.fontFamily.display,
            fontSize: isVertical ? vt.fontSize["6xl"] : vt.fontSize["5xl"],
            fontWeight: vt.fontWeight.black,
            color: accentColor,
            lineHeight: 1,
          }}
        >
          {stat.value}
        </span>
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

      {/* Accent line */}
      <div
        style={{
          width: interpolate(hookProgress, [0, 1], [0, 120]),
          height: 3,
          backgroundColor: accentColor,
          borderRadius: 2,
          marginTop: vs[8],
          marginBottom: vs[6],
        }}
      />

      {/* Hook */}
      <div
        style={{
          fontFamily: vt.fontFamily.body,
          fontSize: isVertical ? vt.fontSize.xl : vt.fontSize.lg,
          fontWeight: vt.fontWeight.medium,
          color: vc.white,
          textAlign: "center",
          maxWidth: isVertical ? "85%" : "60%",
          lineHeight: vt.lineHeight.normal,
          opacity: interpolate(hookProgress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(hookProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        {hook}
      </div>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "12%" : "10%",
          opacity: interpolate(ctaProgress, [0, 1], [0, 1]),
          transform: `scale(${interpolate(ctaProgress, [0, 1], [0.8, 1]) * ctaPulse})`,
        }}
      >
        <div
          style={{
            backgroundColor: accentColor,
            borderRadius: vr.lg,
            padding: `${vs[3]}px ${vs[8]}px`,
            boxShadow: `0 4px 20px ${accentColor}55`,
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
  );
};
