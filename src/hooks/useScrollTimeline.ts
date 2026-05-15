"use client";

import { useEffect, useRef, type MutableRefObject, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "./useReducedMotion";

interface ScrollTimelineConfig {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  anticipatePin?: number;
}

interface UseScrollTimelineReturn {
  timelineRef: MutableRefObject<gsap.core.Timeline | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function useScrollTimeline(
  config: ScrollTimelineConfig = {}
): UseScrollTimelineReturn {
  const {
    start = "top top",
    end = "bottom top",
    scrub = true,
    pin = false,
    anticipatePin = 1,
  } = config;

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        pin,
        ...(pin && { anticipatePin }),
      },
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === el)
        .forEach((st) => st.kill());
      timelineRef.current = null;
    };
  }, [start, end, scrub, pin, anticipatePin, reducedMotion]);

  return { timelineRef, containerRef };
}
