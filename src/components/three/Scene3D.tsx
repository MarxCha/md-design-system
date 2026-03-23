"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic import of inner scene to avoid SSR issues with WebGL
const Scene3DInner = dynamic(() => import("@/components/three/Scene3DInner"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-black/20">
      <span className="text-white/40 text-sm">Loading 3D scene...</span>
    </div>
  ),
});

interface Scene3DProps {
  children?: React.ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
  controls?: boolean;
  background?: string;
  className?: string;
}

export function Scene3D({
  children,
  camera = { position: [0, 0, 5], fov: 60 },
  controls = true,
  background = "#000000",
  className,
}: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className ?? ""}`}>
      <Suspense fallback={null}>
        <Scene3DInner
          camera={camera}
          controls={controls}
          background={background}
        >
          {children}
        </Scene3DInner>
      </Suspense>
    </div>
  );
}
