"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

type ProgressPosition = "top" | "bottom" | "left" | "right";

interface ScrollProgressProps {
  position?: ProgressPosition;
  color?: string;
  height?: number;
  className?: string;
}

const POSITION_STYLES: Record<ProgressPosition, React.CSSProperties> = {
  top: { top: 0, left: 0, right: 0 },
  bottom: { bottom: 0, left: 0, right: 0 },
  left: { top: 0, left: 0, bottom: 0, width: 3 },
  right: { top: 0, right: 0, bottom: 0, width: 3 },
};

const isHorizontal = (pos: ProgressPosition) =>
  pos === "top" || pos === "bottom";

export function ScrollProgress({
  position = "top",
  color = "hsl(var(--color-primary, 217 91% 60%))",
  height = 3,
  className,
}: ScrollProgressProps) {
  const { progress } = useScrollProgress();
  const horizontal = isHorizontal(position);

  const barStyle: React.CSSProperties = {
    ...POSITION_STYLES[position],
    backgroundColor: color,
    transformOrigin: horizontal ? "left center" : "center top",
    transform: horizontal
      ? `scaleX(${progress})`
      : `scaleY(${progress})`,
    ...(horizontal
      ? { height: `${height}px` }
      : { width: `${height}px` }),
    transition: "transform 0.1s linear",
    willChange: "transform",
    zIndex: 9999,
    position: "fixed",
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de scroll"
      style={barStyle}
      className={className}
    />
  );
}
