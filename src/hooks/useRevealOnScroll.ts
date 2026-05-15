"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { gsapPresets } from "@/lib/animation-presets";
import { useReducedMotion } from "./useReducedMotion";

type GsapPresetName = keyof typeof gsapPresets;

interface RevealOptions {
  animation?: GsapPresetName | gsap.TweenVars;
  threshold?: number;
  once?: boolean;
}

export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const { animation = "fadeUp", threshold = 0.2, once = true } = options;
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const preset =
      typeof animation === "string" ? gsapPresets[animation as GsapPresetName] : null;
    const fromVars = preset ? preset.from : (animation as gsap.TweenVars);
    const toVars = preset
      ? preset.to
      : { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 };

    gsap.set(el, fromVars);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top ${100 - threshold * 100}%`,
      onEnter: () => {
        gsap.to(el, {
          ...toVars,
          duration: 0.8,
          ease: "power3.out",
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.set(el, fromVars);
          },
      once,
    });

    return () => trigger.kill();
  }, [animation, threshold, once, reducedMotion]);

  return ref;
}
