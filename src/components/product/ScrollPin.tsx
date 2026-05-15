"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollPinProps {
  children: ReactNode | ((progress: number) => ReactNode);
  height?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  className?: string;
  onProgress?: (progress: number) => void;
}

export function ScrollPin({
  children,
  height = "200vh",
  start = "top top",
  end = "bottom top",
  scrub = true,
  className,
  onProgress,
}: ScrollPinProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: outer,
      start,
      end,
      pin: inner,
      scrub,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        onProgress?.(p);
      },
    });

    return () => {
      trigger.kill();
      gsap.set(inner, { clearProps: "all" });
    };
  }, [start, end, scrub, reducedMotion, onProgress]);

  const renderChildren =
    typeof children === "function" ? children(progress) : children;

  return (
    <div ref={outerRef} style={{ height: reducedMotion ? "auto" : height }}>
      <div ref={innerRef} className={className}>
        {renderChildren}
      </div>
    </div>
  );
}
