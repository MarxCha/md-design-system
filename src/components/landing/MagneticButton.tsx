"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReduced) return;
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center transition-transform duration-300 ease-out",
        className
      )}
      style={{ willChange: "transform" }}
      {...props}
    >
      {children}
    </button>
  );
}
