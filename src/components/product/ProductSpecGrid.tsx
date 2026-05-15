"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Spec {
  label: string;
  value: string;
  unit?: string;
}

interface ProductSpecGridProps {
  specs: Spec[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const GRID_COLS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function ProductSpecGrid({
  specs,
  columns = 3,
  className,
}: ProductSpecGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(
      grid.querySelectorAll<HTMLDivElement>("[data-spec-card]")
    );
    if (cards.length === 0) return;

    let scrollTriggerInstance: { kill: () => void } | null = null;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(cards, { opacity: 0, y: 30 });

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: grid,
        start: "top 85%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          });
        },
        once: true,
      });
    };

    setup();

    return () => {
      scrollTriggerInstance?.kill();
    };
  }, [reducedMotion, specs]);

  return (
    <div
      ref={gridRef}
      className={`grid gap-4 ${GRID_COLS[columns]} ${className ?? ""}`}
    >
      {specs.map((spec, i) => (
        <div
          key={i}
          data-spec-card
          className="border border-border rounded-xl p-6 flex flex-col gap-1"
        >
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-black leading-none tracking-tight">
              {spec.value}
            </span>
            {spec.unit && (
              <span className="text-lg font-medium text-muted-foreground leading-none">
                {spec.unit}
              </span>
            )}
          </div>
          <span className="text-sm text-muted-foreground font-light">
            {spec.label}
          </span>
        </div>
      ))}
    </div>
  );
}
