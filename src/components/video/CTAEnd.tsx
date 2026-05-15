import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs, gradients } from "./video-tokens";

export type CTAEndProps = {
  /** Main CTA text */
  ctaText?: string;
  /** URL or handle below CTA */
  url?: string;
  /** Background gradient (CSS) */
  bgGradient?: string;
  /** CTA button color */
  buttonColor?: string;
  /** CTA button text color */
  buttonTextColor?: string;
};

export const CTAEnd: React.FC<CTAEndProps> = ({
  ctaText = "Comenzar ahora",
  url = "mdconsultoria.com",
  bgGradient = gradients.primaryDark,
  buttonColor = vc.accent,
  buttonTextColor = vc.white,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // Glow appear
  const glowOpacity = interpolate(frame, [0, 15, 80, 95], [0, 0.5, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button scale-in
  const ctaProgress = spring({
    frame: frame - 5,
    fps,
    config: springConfigs.bouncy,
    durationInFrames: 30,
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.7, 1]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  // URL fade-in
  const urlOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlY = interpolate(frame, [25, 40], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse effect on button
  const pulse = interpolate(
    frame % 40,
    [0, 20, 40],
    [1, 1.03, 1],
  );

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          width: isVertical ? 500 : 400,
          height: isVertical ? 500 : 400,
          borderRadius: "50%",
          background: gradients.accentGlow,
          opacity: glowOpacity,
        }}
      />

      {/* CTA button */}
      <div
        style={{
          backgroundColor: buttonColor,
          borderRadius: vr.xl,
          paddingTop: vs[4],
          paddingBottom: vs[4],
          paddingLeft: isVertical ? vs[12] : vs[8],
          paddingRight: isVertical ? vs[12] : vs[8],
          transform: `scale(${ctaScale * pulse})`,
          opacity: ctaOpacity,
          boxShadow: `0 ${vs[2]}px ${vs[8]}px hsla(160, 84%, 39%, 0.35)`,
        }}
      >
        <span
          style={{
            fontFamily: vt.fontFamily.display,
            fontSize: isVertical ? vt.fontSize["2xl"] : vt.fontSize.xl,
            fontWeight: vt.fontWeight.bold,
            color: buttonTextColor,
            letterSpacing: 1,
          }}
        >
          {ctaText}
        </span>
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "25%" : "22%",
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: vt.fontFamily.mono,
            fontSize: isVertical ? vt.fontSize.lg : vt.fontSize.md,
            fontWeight: vt.fontWeight.medium,
            color: vc.primary200,
            letterSpacing: 2,
          }}
        >
          {url}
        </span>
      </div>
    </AbsoluteFill>
  );
};
