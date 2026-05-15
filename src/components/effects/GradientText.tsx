"use client";

type Direction = "left" | "right" | "top" | "bottom";
type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface GradientTextProps {
  children: string;
  from?: string;
  to?: string;
  via?: string;
  direction?: Direction;
  animate?: boolean;
  as?: Tag;
  className?: string;
}

const directionMap: Record<Direction, string> = {
  left: "to left",
  right: "to right",
  top: "to top",
  bottom: "to bottom",
};

export function GradientText({
  children,
  from = "#a78bfa",
  to = "#38bdf8",
  via,
  direction = "right",
  animate = false,
  as: Tag = "span",
  className,
}: GradientTextProps) {
  const gradient = via
    ? `linear-gradient(${directionMap[direction]}, ${from}, ${via}, ${to})`
    : `linear-gradient(${directionMap[direction]}, ${from}, ${to})`;

  return (
    <>
      {animate && (
        <style>{`
          @keyframes md-gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      )}
      <Tag
        className={className}
        style={{
          backgroundImage: animate
            ? via
              ? `linear-gradient(${directionMap[direction]}, ${from}, ${via}, ${to}, ${from})`
              : `linear-gradient(${directionMap[direction]}, ${from}, ${to}, ${from})`
            : gradient,
          backgroundSize: animate ? "200% auto" : "100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          animation: animate ? "md-gradient-shift 4s linear infinite" : undefined,
          display: "inline-block",
        }}
      >
        {children}
      </Tag>
    </>
  );
}
