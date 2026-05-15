"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface Scene3DInnerProps {
  children?: React.ReactNode;
  camera: { position: [number, number, number]; fov?: number };
  controls: boolean;
  background: string;
}

export default function Scene3DInner({
  children,
  camera,
  controls,
  background,
}: Scene3DInnerProps) {
  return (
    <Canvas
      camera={{ position: camera.position, fov: camera.fov ?? 60 }}
      style={{ background }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, -2, -5]} intensity={0.3} />

      {children}

      {controls && (
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1}
          maxDistance={20}
        />
      )}
    </Canvas>
  );
}
