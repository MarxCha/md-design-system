"use client";

import type { ReactNode } from "react";

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  overflow?: boolean;
}

export function ParallaxContainer({
  children,
  className,
  overflow = false,
}: ParallaxContainerProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: overflow ? "visible" : "hidden",
        isolation: "isolate",
      }}
      data-parallax-container
    >
      {children}
    </div>
  );
}
