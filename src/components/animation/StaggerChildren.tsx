"use client";

import { useEffect, useRef, Children } from "react";
import type { ReactNode } from "react";
import { gsapPresets } from "@/lib/animation-presets";

type StaggerAnimationPreset = "fadeUp" | "fadeIn" | "scaleIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StaggerChildrenProps {
  children: ReactNode;
  animation?: StaggerAnimationPreset;
  stagger?: number;
  delay?: number;
  trigger?: "scroll" | "mount";
  className?: string;
}

export function StaggerChildren({
  children,
  animation = "fadeUp",
  stagger = 0.1,
  delay = 0,
  trigger = "scroll",
  className,
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    let scrollTrigger: import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      if (!container) return;

      const targets = Array.from(
        container.querySelectorAll<HTMLElement>("[data-stagger-child]")
      );

      if (!targets.length) return;

      const presetKey = animation === "fadeIn" ? "fadeUp" : animation;
      const preset = gsapPresets[presetKey as keyof typeof gsapPresets] ?? gsapPresets.fadeUp;

      // Set initial state
      gsap.set(targets, preset.from);

      const runAnimation = () => {
        gsap.to(targets, {
          ...preset.to,
          duration: 0.7,
          stagger,
          delay,
          ease: "power2.out",
        });
      };

      if (trigger === "scroll") {
        scrollTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          once: true,
          onEnter: runAnimation,
        });
      } else {
        // mount: run on next frame so initial hidden state is applied first
        requestAnimationFrame(runAnimation);
      }
    };

    init();

    return () => {
      scrollTrigger?.kill();
    };
  }, [animation, stagger, delay, trigger, prefersReduced]);

  return (
    <div ref={containerRef} className={className} data-stagger-container>
      {Children.map(children, (child, index) => (
        <div
          key={index}
          data-stagger-child
          style={{ opacity: prefersReduced ? 1 : undefined }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
