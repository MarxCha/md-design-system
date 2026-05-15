"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { useReducedMotion } from "./useReducedMotion";

interface ParallaxConfig {
  speed?: number;
  direction?: "vertical" | "horizontal";
  clamp?: boolean;
  pointerInfluence?: number;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  config: ParallaxConfig = {}
) {
  const {
    speed = 0.5,
    direction = "vertical",
    clamp = true,
    pointerInfluence = 0,
  } = config;
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    // Scroll-based parallax
    const scrollCtx = gsap.context(() => {
      const prop = direction === "vertical" ? "y" : "x";
      gsap.to(el, {
        [prop]: () => {
          const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          return scrollHeight * (speed - 1) * 0.3;
        },
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          ...(clamp && { clamp: true }),
        },
      });
    });

    // Pointer-based parallax
    let pointerCleanup: (() => void) | undefined;
    if (pointerInfluence > 0) {
      const onPointerMove = (e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * pointerInfluence * 20;
        const y =
          (e.clientY / window.innerHeight - 0.5) * pointerInfluence * 20;
        gsap.to(el, {
          x: direction === "horizontal" ? x : x * 0.5,
          y: direction === "vertical" ? y : y * 0.5,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      window.addEventListener("pointermove", onPointerMove);
      pointerCleanup = () =>
        window.removeEventListener("pointermove", onPointerMove);
    }

    return () => {
      scrollCtx.revert();
      pointerCleanup?.();
    };
  }, [speed, direction, clamp, pointerInfluence, reducedMotion]);

  return ref;
}
