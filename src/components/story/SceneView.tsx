"use client";

type Overlay = "dark" | "light" | "none";

interface SceneViewProps {
  children: React.ReactNode;
  background?: string;
  overlay?: Overlay;
  className?: string;
}

const overlayMap: Record<Overlay, string> = {
  dark: "bg-black/50",
  light: "bg-white/40",
  none: "",
};

export function SceneView({
  children,
  background,
  overlay = "dark",
  className,
}: SceneViewProps) {
  const isImage = background && (background.startsWith("http") || background.startsWith("/") || background.startsWith("data:"));

  return (
    <section
      className={`relative flex items-center justify-center min-h-screen w-full overflow-hidden ${className ?? ""}`}
      style={
        isImage
          ? { backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }
          : background
          ? { backgroundColor: background }
          : {}
      }
    >
      {/* Overlay */}
      {overlay !== "none" && (
        <div
          className={`absolute inset-0 ${overlayMap[overlay]}`}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
