"use client";

import { useEffect, useState, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";

interface ScrubProgressConfig {
  start?: string;
  end?: string;
}

interface UseScrubProgressReturn {
  progress: number;
  isActive: boolean;
}

export function useScrubProgress(
  containerRef: RefObject<HTMLElement | null>,
  config: ScrubProgressConfig = {}
): UseScrubProgressReturn {
  const { start = "top top", end = "bottom top" } = config;

  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
        setIsActive(self.isActive);
      },
      onLeave: () => setIsActive(false),
      onLeaveBack: () => setIsActive(false),
    });

    return () => trigger.kill();
  }, [containerRef, start, end]);

  return { progress, isActive };
}
