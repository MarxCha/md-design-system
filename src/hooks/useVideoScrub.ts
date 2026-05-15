"use client";

import { useEffect, useState, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";

interface VideoScrubConfig {
  start?: string;
  end?: string;
}

interface UseVideoScrubReturn {
  progress: number;
  isReady: boolean;
}

export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  config: VideoScrubConfig = {}
): UseVideoScrubReturn {
  const { start = "top top", end = "bottom top" } = config;

  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let trigger: ReturnType<typeof ScrollTrigger.create> | null = null;

    const setupScrub = () => {
      setIsReady(true);

      trigger = ScrollTrigger.create({
        trigger: container,
        start,
        end,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          if (video.duration) {
            video.currentTime = p * video.duration;
          }
        },
      });
    };

    if (video.readyState >= 1) {
      setupScrub();
    } else {
      video.addEventListener("loadedmetadata", setupScrub, { once: true });
    }

    return () => {
      trigger?.kill();
      video.removeEventListener("loadedmetadata", setupScrub);
    };
  }, [videoRef, containerRef, start, end]);

  return { progress, isReady };
}
