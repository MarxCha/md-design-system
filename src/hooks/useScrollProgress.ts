"use client";

import { useEffect, useState, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";

interface UseScrollProgressReturn {
  progress: number;
  isInView: boolean;
}

export function useScrollProgress(
  containerRef?: RefObject<HTMLElement | null>
): UseScrollProgressReturn {
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef?.current ?? document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgress(self.progress);
        setIsInView(self.isActive);
      },
    });

    return () => trigger.kill();
  }, [containerRef]);

  return { progress, isInView };
}
