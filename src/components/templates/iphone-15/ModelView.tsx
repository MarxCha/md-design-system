"use client";

import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhoneModel from "./IPhoneModel";
import { Suspense } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface ModelViewItem {
  color: string[];
  img: string;
}

interface ModelViewProps {
  index: number;
  groupRef: React.RefObject<THREE.Group | null>;
  gsapType: string;
  controlRef: React.RefObject<OrbitControlsImpl | null>;
  setRotationState: (angle: number) => void;
  size: string;
  item: ModelViewItem;
}

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          if (controlRef.current) {
            setRotationState(controlRef.current.getAzimuthalAngle());
          }
        }}
      />

      <group
        ref={groupRef}
        name={index === 1 ? "small" : "large"}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhoneModel
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
