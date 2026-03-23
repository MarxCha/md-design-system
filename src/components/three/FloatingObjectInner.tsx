"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import type * as THREE from "three";

type GeometryType = "sphere" | "cube" | "torus" | "dodecahedron";

interface MeshProps {
  geometry: GeometryType;
  color: string;
  size: number;
  rotateSpeed: number;
}

function ObjectMesh({ geometry, color, size, rotateSpeed }: MeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotateSpeed * 0.3;
      meshRef.current.rotation.y += delta * rotateSpeed;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "cube":
        return <boxGeometry args={[size, size, size]} />;
      case "torus":
        return <torusGeometry args={[size * 0.6, size * 0.25, 16, 64]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[size]} />;
      case "sphere":
      default:
        return <sphereGeometry args={[size, 64, 64]} />;
    }
  };

  return (
    <mesh ref={meshRef}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
}

interface FloatingObjectInnerProps {
  geometry: GeometryType;
  color: string;
  size: number;
  floatSpeed: number;
  rotateSpeed: number;
}

export default function FloatingObjectInner({
  geometry,
  color,
  size,
  floatSpeed,
  rotateSpeed,
}: FloatingObjectInnerProps) {
  return (
    <Canvas camera={{ position: [0, 0, size * 3.5], fov: 50 }} gl={{ antialias: true }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, -3]} intensity={0.4} color="#a78bfa" />

      <Float
        speed={floatSpeed * 2}
        rotationIntensity={0}
        floatIntensity={0.5}
      >
        <ObjectMesh
          geometry={geometry}
          color={color}
          size={size}
          rotateSpeed={rotateSpeed}
        />
      </Float>

      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}
