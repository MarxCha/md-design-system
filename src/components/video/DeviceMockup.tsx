import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { vc, vt, vs, vr, springConfigs } from "./video-tokens";

export type DeviceType = "iphone" | "laptop";

export type DeviceMockupProps = {
  /** Screenshot to display inside the device */
  screenshotSrc: string;
  /** Device type */
  device?: DeviceType;
  /** Caption below the device */
  caption?: string;
  /** Background color */
  bgColor?: string;
  /** Entry animation delay in frames */
  delay?: number;
  /** Zoom level to crop into content area (1 = no zoom, 1.5 = 50% closer) */
  zoom?: number;
};

const IPHONE_ASPECT = 844 / 390; // ~2.164
const LAPTOP_ASPECT = 900 / 1440; // 0.625

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  screenshotSrc,
  device = "iphone",
  caption,
  bgColor = vc.primary800,
  delay = 0,
  zoom = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const adjustedFrame = frame - delay;

  // Device slide-up + scale
  const entryProgress = spring({
    frame: adjustedFrame,
    fps,
    config: springConfigs.snappy,
    durationInFrames: 35,
  });

  const deviceY = interpolate(entryProgress, [0, 1], [80, 0]);
  const deviceOpacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const deviceScale = interpolate(entryProgress, [0, 1], [0.9, 1]);

  // Screenshot reveal (clip from top)
  const screenshotReveal = interpolate(adjustedFrame, [10, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Caption
  const captionProgress = spring({
    frame: adjustedFrame - 20,
    fps,
    config: springConfigs.smooth,
    durationInFrames: 25,
  });

  // Device dimensions
  const isIphone = device === "iphone";
  // Frame only in vertical — horizontal always frameless for seamless look
  const showDeviceFrame = isVertical;

  const deviceWidth = isIphone
    ? isVertical ? 720 : 380
    : isVertical ? 960 : width * 0.78;
  const deviceHeight = isIphone
    ? deviceWidth * IPHONE_ASPECT
    : deviceWidth * LAPTOP_ASPECT;
  const bezelRadius = isIphone ? 40 : 12;
  const bezelPadding = isIphone ? 12 : 0;
  const topBarHeight = isIphone ? 32 : 28;

  // Fullscreen mode: iPhone in horizontal canvas — no frame, big screenshot
  const fullscreenWidth = width * 0.85;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: vs[4],
          transform: `translateY(${deviceY}px) scale(${deviceScale})`,
          opacity: deviceOpacity,
        }}
      >
        {showDeviceFrame ? (
          /* ─── Device Frame Mode (vertical iPhone / all laptops) ─── */
          <div
            style={{
              width: deviceWidth + bezelPadding * 2,
              height: deviceHeight + bezelPadding * 2 + topBarHeight,
              backgroundColor: vc.foreground,
              borderRadius: bezelRadius,
              padding: bezelPadding,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: `0 ${vs[6]}px ${vs[16]}px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Top bar */}
            <div
              style={{
                height: topBarHeight,
                backgroundColor: isIphone ? vc.foreground : "hsl(213, 15%, 18%)",
                display: "flex",
                alignItems: "center",
                justifyContent: isIphone ? "center" : "flex-start",
                paddingLeft: isIphone ? 0 : 12,
                gap: 6,
                flexShrink: 0,
              }}
            >
              {isIphone ? (
                <div
                  style={{
                    width: 90,
                    height: 22,
                    backgroundColor: vc.black,
                    borderRadius: vr.full,
                  }}
                />
              ) : (
                <>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "hsl(0, 70%, 55%)" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "hsl(45, 80%, 55%)" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "hsl(120, 60%, 45%)" }} />
                </>
              )}
            </div>

            {/* Screenshot area */}
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                position: "relative",
                backgroundColor: vc.primary900,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  clipPath: isIphone
                    ? `inset(0 0 ${100 - screenshotReveal}% 0)`
                    : `inset(0 ${100 - screenshotReveal}% 0 0)`,
                }}
              >
                <Img
                  src={screenshotSrc}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
                    transform: `scale(${zoom})`,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* ─── Clean Card Mode (horizontal) — rounded card with subtle glow ─── */
          <div
            style={{
              width: width * 0.88,
              height: height * 0.82,
              borderRadius: vr["2xl"],
              overflow: "hidden",
              position: "relative",
              opacity: interpolate(screenshotReveal, [0, 100], [0, 1]),
              transform: `scale(${interpolate(screenshotReveal, [0, 100], [0.95, 1])})`,
              boxShadow: `
                0 0 0 1px hsla(200, 80%, 60%, 0.15),
                0 0 40px hsla(200, 80%, 50%, 0.08),
                0 20px 60px rgba(0, 0, 0, 0.4)
              `,
            }}
          >
            <Img
              src={screenshotSrc}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                transform: `scale(${zoom})`,
              }}
            />
          </div>
        )}

        {/* Caption */}
        {caption && (
          <div
            style={{
              fontFamily: vt.fontFamily.body,
              fontSize: isVertical ? vt.fontSize.xl : vt.fontSize.lg,
              fontWeight: vt.fontWeight.medium,
              color: vc.white,
              opacity: interpolate(captionProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(captionProgress, [0, 1], [16, 0])}px)`,
              textAlign: "center",
              maxWidth: isVertical ? deviceWidth + 80 : fullscreenWidth,
            }}
          >
            {caption}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
