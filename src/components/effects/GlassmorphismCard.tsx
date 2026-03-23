"use client";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  blur?: number;
  opacity?: number;
  borderOpacity?: number;
  className?: string;
}

export function GlassmorphismCard({
  children,
  blur = 16,
  opacity = 0.1,
  borderOpacity = 0.2,
  className,
}: GlassmorphismCardProps) {
  return (
    <div
      className={`rounded-xl shadow-xl ${className ?? ""}`}
      style={{
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
      }}
    >
      {children}
    </div>
  );
}
