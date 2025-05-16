"use client";

import * as THREE from "three";
import { useRef } from "react";
import { Billboard } from "@react-three/drei";

interface Props {
  poition: [number, number, number];
  isVisible: boolean;
  color?: string;
}

export function Hotspot({ poition, isVisible, color = "#E6FC6A" }: Props) {
  const hotspotRef = useRef<THREE.Mesh>(null);

  return (
    //  Billboard adds a <group /> that always faces the camera. https://drei.docs.pmnd.rs/abstractions/billboard#billboard
    <Billboard position={poition} follow={true}>
      <mesh ref={hotspotRef} visible={isVisible}>
        <circleGeometry args={[0.02, 32]} />
        {/* meshStandardMaterial responds to light */}
        <meshStandardMaterial color={color} transparent opacity={1} />
      </mesh>

      <mesh
        visible={isVisible}
        onPointerOver={() => {
          if (!isVisible) return;

          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <circleGeometry args={[0.03, 32]} />
        {/* meshBasicMaterial does not respond to light */}
        <meshBasicMaterial color={color} />
      </mesh>
    </Billboard>
  );
}
