import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs } from "./video-tokens";

export type Feature = {
  /** Emoji or icon character */
  icon: string;
  /** Feature title */
  title: string;
  /** Short description */
  description: string;
};

export type FeatureShowcaseProps = {
  /** Section title */
  heading?: string;
  /** Array of 3-4 features */
  features: Feature[];
  /** Background color */
  bgColor?: string;
  /** Card background color */
  cardBgColor?: string;
  /** Accent color for icons */
  accentColor?: string;
};

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  heading = "Funcionalidades",
  features,
  bgColor = vc.primary800,
  cardBgColor = "hsla(213, 51%, 24%, 0.6)",
  accentColor = vc.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // Heading animation
  const headingProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
    durationInFrames: 25,
  });

  const headingY = interpolate(headingProgress, [0, 1], [30, 0]);
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);

  const cardWidth = isVertical ? width - 100 : 420;
  const cardHeight = isVertical ? 180 : 180;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: isVertical ? "center" : "center",
        alignItems: "center",
        padding: isVertical ? 48 : 64,
      }}
    >
      {/* Heading */}
      <div
        style={{
          fontFamily: vt.fontFamily.display,
          fontSize: isVertical ? vt.fontSize["3xl"] : vt.fontSize["2xl"],
          fontWeight: vt.fontWeight.bold,
          color: vc.white,
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          marginBottom: isVertical ? vs[8] : vs[6],
          textAlign: "center",
        }}
      >
        {heading}
      </div>

      {/* Feature cards */}
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          flexWrap: isVertical ? "nowrap" : "wrap",
          gap: isVertical ? vs[4] : vs[4],
          justifyContent: "center",
          alignItems: "center",
          maxWidth: isVertical ? "100%" : width - 160,
        }}
      >
        {features.slice(0, 4).map((feature, i) => {
          const cardDelay = 10 + i * 8;
          const cardProgress = spring({
            frame: frame - cardDelay,
            fps,
            config: springConfigs.snappy,
            durationInFrames: 25,
          });

          const cardY = interpolate(cardProgress, [0, 1], [50, 0]);
          const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
          const cardScale = interpolate(cardProgress, [0, 1], [0.92, 1]);

          return (
            <div
              key={i}
              style={{
                width: cardWidth,
                minHeight: cardHeight,
                backgroundColor: cardBgColor,
                borderRadius: vr.lg,
                padding: vs[6],
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: vs[4],
                opacity: cardOpacity,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                border: `1px solid hsla(213, 51%, 46%, 0.2)`,
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: vr.lg,
                  backgroundColor: accentColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 36,
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: vt.fontFamily.display,
                    fontSize: vt.fontSize.lg,
                    fontWeight: vt.fontWeight.semibold,
                    color: vc.white,
                    marginBottom: 4,
                  }}
                >
                  {feature.title}
                </div>
                <div
                  style={{
                    fontFamily: vt.fontFamily.body,
                    fontSize: vt.fontSize.base,
                    fontWeight: vt.fontWeight.regular,
                    color: vc.primary200,
                    lineHeight: vt.lineHeight.normal,
                  }}
                >
                  {feature.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
