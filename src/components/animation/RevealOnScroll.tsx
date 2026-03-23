"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsapPresets } from "@/lib/animation-presets";

type AnimationPreset =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "rotateIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealOnScrollProps {
  children: ReactNode;
  animation?: AnimationPreset;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function RevealOnScroll({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  once = true,
  className,
}: RevealOnScrollProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!elRef.current) return;

    // If reduced motion: show immediately, no animation
    if (prefersReduced) {
      if (elRef.current) {
        elRef.current.style.opacity = "1";
      }
      return;
    }

    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const el = elRef.current;
      if (!el) return;

      const preset = gsapPresets[animation as keyof typeof gsapPresets] ?? gsapPresets.fadeUp;

      // Set initial hidden state
      gsap.set(el, preset.from);

      trigger = ScrollTrigger.create({
        trigger: el,
        start: `top ${(1 - threshold) * 100}%`,
        once,
        onEnter: () => {
          gsap.to(el, {
            ...preset.to,
            duration,
            delay,
            ease: "power2.out",
          });
        },
        onEnterBack: once
          ? undefined
          : () => {
              gsap.to(el, {
                ...preset.to,
                duration,
                ease: "power2.out",
              });
            },
        onLeave: once
          ? undefined
          : () => {
              gsap.to(el, {
                ...preset.from,
                duration: duration * 0.6,
                ease: "power2.in",
              });
            },
        onLeaveBack: once
          ? undefined
          : () => {
              gsap.to(el, {
                ...preset.from,
                duration: duration * 0.6,
                ease: "power2.in",
              });
            },
      });
    };

    init();

    return () => {
      trigger?.kill();
    };
  }, [animation, delay, duration, threshold, once, prefersReduced]);

  return (
    <div ref={elRef} className={className} style={{ opacity: prefersReduced ? 1 : undefined }}>
      {children}
    </div>
  );
}
