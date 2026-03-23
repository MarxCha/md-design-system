"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/scroll/ScrollProgress";

interface ScrollStoryContainerProps {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  onSceneChange?: (sceneIndex: number) => void;
  showProgress?: boolean;
  className?: string;
}

export function ScrollStoryContainer({
  children,
  direction = "vertical",
  onSceneChange,
  showProgress = false,
  className,
}: ScrollStoryContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const lenisRef = useRef<import("lenis").default | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const handleSceneChange = useCallback(
    (index: number) => {
      setActiveScene(index);
      onSceneChange?.(index);
    },
    [onSceneChange]
  );

  useEffect(() => {
    let rafId: number;

    const init = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis smooth scroll
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: direction === "horizontal" ? "horizontal" : "vertical",
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Connect Lenis to GSAP ticker
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Track active scenes
      const container = containerRef.current;
      if (container) {
        const scenes = container.querySelectorAll("[data-scroll-scene]");
        scenes.forEach((scene, index) => {
          ScrollTrigger.create({
            trigger: scene,
            start: "top center",
            end: "bottom center",
            onEnter: () => handleSceneChange(index),
            onEnterBack: () => handleSceneChange(index),
          });
        });
      }

      const tick = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      cleanupRef.current = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        gsap.ticker.remove(() => {});
      };
    };

    init();

    return () => {
      cleanupRef.current?.();
    };
  }, [direction, handleSceneChange]);

  const progressPosition =
    direction === "horizontal" ? "bottom" : "right";

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        ...(direction === "horizontal"
          ? { display: "flex", flexDirection: "row" }
          : {}),
      }}
      data-scroll-story
    >
      {showProgress && (
        <ScrollProgress
          position={progressPosition}
          height={4}
        />
      )}

      {/* Scene indicator */}
      {showProgress && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Escena {activeScene + 1}
        </div>
      )}

      {children}
    </div>
  );
}
