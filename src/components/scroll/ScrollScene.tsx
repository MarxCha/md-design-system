"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollSceneProps {
  children: ReactNode;
  height?: string;
  pin?: boolean;
  enterAnimation?: Record<string, unknown>;
  exitAnimation?: Record<string, unknown>;
  onEnter?: () => void;
  onLeave?: () => void;
  className?: string;
  id?: string;
}

export function ScrollScene({
  children,
  height = "100vh",
  pin = false,
  enterAnimation,
  exitAnimation,
  onEnter,
  onLeave,
  className,
  id,
}: ScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!sceneRef.current) return;

    let gsapModule: typeof import("gsap") | null = null;
    let scrollTriggerModule: typeof import("gsap/ScrollTrigger") | null = null;
    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsapModule = { gsap } as typeof import("gsap");
      scrollTriggerModule = { ScrollTrigger } as typeof import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = sceneRef.current;
      if (!el) return;

      // Set initial state for enter animation (skip if reduced motion)
      if (enterAnimation && !prefersReduced) {
        gsap.set(el, enterAnimation);
      }

      trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        pin: pin && !prefersReduced,
        pinSpacing: pin,
        onEnter: () => {
          onEnter?.();
          if (enterAnimation && !prefersReduced) {
            gsap.to(el, {
              ...enterAnimation,
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
        onLeave: () => {
          onLeave?.();
          if (exitAnimation && !prefersReduced) {
            gsap.to(el, { ...exitAnimation, duration: 0.6, ease: "power2.in" });
          }
        },
        onEnterBack: () => {
          onEnter?.();
        },
        onLeaveBack: () => {
          onLeave?.();
        },
      });
    };

    init();

    return () => {
      trigger?.kill();
    };
  }, [pin, prefersReduced, onEnter, onLeave, enterAnimation, exitAnimation]);

  return (
    <div
      ref={sceneRef}
      id={id}
      className={className}
      style={{ height, position: "relative", overflow: "hidden" }}
      data-scroll-scene
    >
      {children}
    </div>
  );
}
