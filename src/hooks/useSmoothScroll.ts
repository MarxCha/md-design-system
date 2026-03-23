"use client";

import { useCallback, useEffect, useState } from "react";
import { useLenis } from "@/providers/SmoothScrollProvider";

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

export function useSmoothScroll() {
  const { lenis } = useLenis();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      const { scroll, limit } = lenis;
      if (limit > 0) {
        setScrollProgress(scroll / limit);
      }
    };

    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      if (!lenis) return;
      lenis.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.2,
        immediate: options?.immediate ?? false,
      });
    },
    [lenis]
  );

  return { lenis, scrollTo, scrollProgress };
}
