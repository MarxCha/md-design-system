"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const FloatingObjectInner = dynamic(
  () => import("@/components/three/FloatingObjectInner"),
  { ssr: false }
);

type GeometryType = "sphere" | "cube" | "torus" | "dodecahedron";

interface FloatingObjectProps {
  geometry?: GeometryType;
  color?: string;
  size?: number;
  floatSpeed?: number;
  rotateSpeed?: number;
  className?: string;
}

export function FloatingObject({
  geometry = "sphere",
  color = "#a78bfa",
  size = 1,
  floatSpeed = 1,
  rotateSpeed = 0.5,
  className,
}: FloatingObjectProps) {
  return (
    <div className={`w-full h-full ${className ?? ""}`}>
      <Suspense fallback={null}>
        <FloatingObjectInner
          geometry={geometry}
          color={color}
          size={size}
          floatSpeed={floatSpeed}
          rotateSpeed={rotateSpeed}
        />
      </Suspense>
    </div>
  );
}
