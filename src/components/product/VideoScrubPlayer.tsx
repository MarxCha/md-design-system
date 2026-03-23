"use client";

import dynamic from "next/dynamic";
import { Suspense, type RefObject } from "react";

const VideoScrubPlayerInner = dynamic(
  () => import("@/components/product/VideoScrubPlayerInner"),
  { ssr: false }
);

interface VideoScrubPlayerProps {
  src: string;
  poster?: string;
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
}

export function VideoScrubPlayer(props: VideoScrubPlayerProps) {
  return (
    <div className={`w-full h-full ${props.className ?? ""}`}>
      <Suspense fallback={<div className="w-full h-full bg-muted animate-pulse" />}>
        <VideoScrubPlayerInner {...props} />
      </Suspense>
    </div>
  );
}
