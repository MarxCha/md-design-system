import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, springConfigs } from "./video-tokens";

export type TextHookProps = {
  /** Main hook text (1-2 lines max) */
  text: string;
  /** Smaller subtitle below */
  subtitle?: string;
  /** Background color */
  bgColor?: string;
  /** Text color */
  textColor?: string;
  /** Accent color for the underline */
  accentColor?: string;
};

export const TextHook: React.FC<TextHookProps> = ({
  text,
  subtitle,
  bgColor = vc.primary900,
  textColor = vc.white,
  accentColor = vc.secondary,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const words = text.split(" ");

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        padding: isVertical ? 64 : 80,
      }}
    >
      {/* Main text — word by word reveal */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: isVertical ? 12 : 16,
          maxWidth: isVertical ? "90%" : "70%",
        }}
      >
        {words.map((word, i) => {
          const wordDelay = i * 3;
          const wordProgress = spring({
            frame: frame - wordDelay,
            fps,
            config: springConfigs.snappy,
            durationInFrames: 18,
          });

          const wordY = interpolate(wordProgress, [0, 1], [40, 0]);
          const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
          const wordScale = interpolate(wordProgress, [0, 1], [0.85, 1]);

          return (
            <span
              key={i}
              style={{
                fontFamily: vt.fontFamily.display,
                fontSize: isVertical ? vt.fontSize["6xl"] : vt.fontSize["4xl"],
                fontWeight: vt.fontWeight.black,
                color: textColor,
                lineHeight: vt.lineHeight.tight,
                opacity: wordOpacity,
                transform: `translateY(${wordY}px) scale(${wordScale})`,
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Accent underline */}
      <div
        style={{
          marginTop: 24,
          height: 4,
          width: interpolate(
            frame,
            [words.length * 3 + 5, words.length * 3 + 20],
            [0, isVertical ? 200 : 160],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
          backgroundColor: accentColor,
          borderRadius: 2,
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            marginTop: 20,
            fontFamily: vt.fontFamily.body,
            fontSize: isVertical ? vt.fontSize.xl : vt.fontSize.lg,
            fontWeight: vt.fontWeight.regular,
            color: textColor,
            opacity: interpolate(
              frame,
              [words.length * 3 + 10, words.length * 3 + 22],
              [0, 0.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
