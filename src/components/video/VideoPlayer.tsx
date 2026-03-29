"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import type { Orientation } from "./video-tokens";
import { VIDEO_FPS, VIDEO_SIZES } from "./video-tokens";

export type VideoPlayerProps = {
  /** The Remotion composition component to render */
  component: React.ComponentType<Record<string, unknown>>;
  /** Props to pass to the composition */
  inputProps?: Record<string, unknown>;
  /** Duration in frames */
  durationInFrames: number;
  /** Orientation — determines width/height */
  orientation?: Orientation;
  /** Show native playback controls */
  controls?: boolean;
  /** Autoplay on mount */
  autoPlay?: boolean;
  /** Loop playback */
  loop?: boolean;
  /** Click to play/pause */
  clickToPlay?: boolean;
  /** CSS class for the container */
  className?: string;
  /** Container max width in px */
  maxWidth?: number;
  /** FPS override */
  fps?: number;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  component,
  inputProps = {},
  durationInFrames,
  orientation = "vertical",
  controls = true,
  autoPlay = false,
  loop = true,
  clickToPlay = true,
  className,
  maxWidth,
  fps = VIDEO_FPS,
}) => {
  const size = VIDEO_SIZES[orientation];
  const playerRef = React.useRef<PlayerRef>(null);

  const style: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      maxWidth: maxWidth ?? (orientation === "vertical" ? 400 : 800),
      aspectRatio: `${size.width} / ${size.height}`,
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
    }),
    [maxWidth, orientation, size],
  );

  return (
    <div className={className} style={style}>
      <Player
        ref={playerRef}
        component={component}
        inputProps={inputProps}
        durationInFrames={durationInFrames}
        compositionWidth={size.width}
        compositionHeight={size.height}
        fps={fps}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        clickToPlay={clickToPlay}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
