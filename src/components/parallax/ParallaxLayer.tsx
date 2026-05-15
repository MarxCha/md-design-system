"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxLayerProps {
  children?: ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = "vertical",
  className,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !layerRef.current) return;

    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const el = layerRef.current;
      if (!el) return;

      // Calculate parallax distance based on element height and speed delta
      const container = el.closest("[data-parallax-container]") as HTMLElement | null;
      const isVertical = direction === "vertical";

      trigger = ScrollTrigger.create({
        trigger: container ?? el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          const offset = (progress - 0.5) * 200 * (1 - speed);
          if (isVertical) {
            gsap.set(el, { y: offset, force3D: true });
          } else {
            gsap.set(el, { x: offset, force3D: true });
          }
        },
      });
    };

    init();

    return () => {
      trigger?.kill();
    };
  }, [speed, direction, prefersReduced]);

  return (
    <div
      ref={layerRef}
      className={className}
      style={{
        willChange: prefersReduced ? "auto" : "transform",
        position: "relative",
      }}
      data-parallax-layer
      data-speed={speed}
    >
      {children}
    </div>
  );
}
