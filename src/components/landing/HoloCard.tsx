"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  tiltAmount?: number;
  glowColor?: string;
}

export function HoloCard({
  children,
  className,
  href,
  tiltAmount = 8,
  glowColor = "hsl(var(--primary))",
}: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * tiltAmount;
      const rotateY = (x - 0.5) * tiltAmount;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      glow.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glowColor} / 0.15, transparent 60%)`;
    },
    [tiltAmount, glowColor, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    glow.style.background = "transparent";
  }, []);

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn("block", href && "cursor-pointer")}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-lg,12px)] transition-transform duration-300 ease-out",
          className
        )}
        style={{ willChange: "transform" }}
      >
        {children}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-10 transition-[background] duration-300"
          aria-hidden="true"
        />
      </div>
    </Wrapper>
  );
}
