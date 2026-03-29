import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, springConfigs } from "./video-tokens";

export type BrandRevealProps = {
  /** URL or staticFile path to the logo image */
  logoSrc?: string;
  /** Tagline text below logo */
  tagline?: string;
  /** Override background color */
  bgColor?: string;
  /** Override accent color for the glow */
  accentColor?: string;
  /** Logo width in pixels */
  logoWidth?: number;
};

export const BrandReveal: React.FC<BrandRevealProps> = ({
  logoSrc = staticFile("logo.svg"),
  tagline = "MD Consultoria TI",
  bgColor = vc.primary900,
  accentColor = vc.accent,
  logoWidth = 420,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Logo scale-in with bounce
  const logoScale = spring({
    frame,
    fps,
    config: springConfigs.bouncy,
    durationInFrames: 40,
  });

  // Logo opacity
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowScale = spring({
    frame: frame - 8,
    fps,
    config: springConfigs.gentle,
    durationInFrames: 50,
  });

  const glowOpacity = interpolate(frame, [8, 20, 70, 90], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline slide-up
  const taglineProgress = spring({
    frame: frame - 25,
    fps,
    config: springConfigs.smooth,
    durationInFrames: 30,
  });

  const taglineY = interpolate(taglineProgress, [0, 1], [30, 0]);
  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);

  // Line decoration
  const lineWidth = interpolate(frame, [35, 55], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isVertical = height > width;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: isVertical ? 600 : 500,
          height: isVertical ? 600 : 500,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, ${accentColor} 0%, transparent 70%)`,
          transform: `scale(${glowScale})`,
          opacity: glowOpacity,
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={logoSrc}
          style={{
            width: logoWidth,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Tagline + line */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "38%" : "32%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            backgroundColor: accentColor,
            opacity: 0.7,
          }}
        />

        {/* Tagline text */}
        <div
          style={{
            fontFamily: vt.fontFamily.display,
            fontSize: isVertical ? vt.fontSize.xl : vt.fontSize.lg,
            fontWeight: vt.fontWeight.medium,
            color: vc.white,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          {tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};
