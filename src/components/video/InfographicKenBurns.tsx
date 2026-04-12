import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FitImage } from "../../remotion/components/FitImage";

export type InfographicKenBurnsDirection =
  | "zoomIn"
  | "zoomOut"
  | "panLeft"
  | "panRight";

export interface InfographicKenBurnsProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  direction?: InfographicKenBurnsDirection;
  intensity?: number;
}

export const InfographicKenBurns: React.FC<InfographicKenBurnsProps> = ({
  imageSrc = "",
  title,
  subtitle,
  direction = "zoomIn",
  intensity = 0.15,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const titleOpacity = interpolate(
    frame,
    [0, fps, durationInFrames - fps, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (!imageSrc) {
    return <AbsoluteFill style={{ backgroundColor: "#0a0e1a" }} />;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0e1a" }}>
      <FitImage
        src={imageSrc}
        fit="contain"
        kenBurns={direction}
        kenBurnsIntensity={intensity}
      />
      {title && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 60,
            opacity: titleOpacity,
            background:
              "linear-gradient(to top, rgba(10,14,26,0.88) 0%, rgba(10,14,26,0.0) 40%)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#f8fafc",
              padding: "0 80px",
              maxWidth: 1400,
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                fontFamily: "'Instrument Serif', 'DM Serif Display', serif",
                marginBottom: 14,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: 26,
                  opacity: 0.82,
                  fontFamily: "'DM Sans', 'Inter', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const calculateInfographicKenBurnsDuration = (
  durationSeconds: number,
  fps: number,
) => Math.round(durationSeconds * fps);
