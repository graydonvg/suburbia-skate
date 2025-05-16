"use client";

import * as THREE from "three";
import { Skateboard } from "@/components/Skateboard";
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Hotspot } from "./Hotspot";
import { WavyPaths } from "./WavyPaths";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const;

type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

export function InteractiveSkateboard({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        camera={{
          position: INITIAL_CAMERA_POSITION,
          fov: 55,
        }}
        className="min-h-[60rem] w-full"
      >
        <Suspense fallback={null}>
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
  const { camera } = useThree();
  const originRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);
  const [showHotspot, setShowHotspot] = useState({
    front: true,
    middle: true,
    back: true,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0));

    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1); // Always between 1 and 2.2

      camera.position.x = INITIAL_CAMERA_POSITION[0] * scale;
      camera.position.y = INITIAL_CAMERA_POSITION[1] * scale;
      camera.position.z = INITIAL_CAMERA_POSITION[2] * scale;
    }

    setZoom();

    const controller = new AbortController();
    window.addEventListener("resize", setZoom, { signal: controller.signal });

    return () => controller.abort();
  }, [camera]);

  const handleClick = contextSafe((event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    const origin = originRef.current;
    const board = containerRef.current;

    if (!board || !origin || isAnimating) return;

    const { name } = event.object;

    setShowHotspot((current) => ({ ...current, [name]: false }));

    jumpBoard(board);

    if (name === "back") ollie(board);
    if (name === "middle") kickflip(board);
    if (name === "front") frontside360(board, origin);
  });

  const jumpBoard = contextSafe((board: THREE.Group) => {
    setIsAnimating(true);

    gsap
      .timeline({ onComplete: () => setIsAnimating(false) })
      .to(board.position, {
        y: 0.8,
        duration: 0.51,
        ease: "power2.out",
        delay: 0.26,
      })
      .to(board.position, {
        y: 0,
        duration: 0.43,
        ease: "power2.in",
      });
  });

  const ollie = contextSafe((board: THREE.Group) => {
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: "none",
      });
  });

  const kickflip = contextSafe((board: THREE.Group) => {
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(
        board.rotation,
        {
          z: `+=${Math.PI * 2}`,
          duration: 0.78,
          ease: "none",
        },
        0.3,
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: "none",
      });
  });

  const frontside360 = contextSafe(
    (board: THREE.Group, origin: THREE.Group) => {
      gsap
        .timeline()
        .to(board.rotation, {
          x: -0.6,
          duration: 0.26,
          ease: "none",
        })
        .to(board.rotation, {
          x: 0.4,
          duration: 0.82,
          ease: "power2.in",
        })
        .to(
          origin.rotation,
          {
            y: `+=${Math.PI * 2}`,
            duration: 0.77,
            ease: "none",
          },
          0.3,
        )
        .to(board.rotation, {
          x: 0,
          duration: 0.14,
          ease: "none",
        });
    },
  );

  return (
    <group>
      <OrbitControls enableZoom={false} />
      <Environment files={"/hdr/warehouse-256.hdr"} />
      {/* Origin group is to allow the board to rotate from it's center */}
      <group ref={originRef}>
        {/* Group below is shifted back to recenter after shifting forward */}
        <group ref={containerRef} position={[0, 0, -0.635]}>
          {/* Group below is shifted forward to allow the board to rotate from it's back wheel on ollie */}
          <group position={[0, -0.086, 0.635]}>
            <Skateboard
              deckTextureURLs={[deckTextureURL]}
              deckTextureURL={deckTextureURL}
              wheelTextureURLs={[wheelTextureURL]}
              wheelTextureURL={wheelTextureURL}
              truckColor={truckColor}
              boltColor={boltColor}
              constantWheelSpin
            />
            <Hotspot
              isVisible={showHotspot.front && !isAnimating}
              poition={[0, 0.38, 1]}
              color="#B8FC39"
            />
            <mesh position={[0, 0.27, 0.9]} name="front" onClick={handleClick}>
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <Hotspot
              isVisible={showHotspot.middle && !isAnimating}
              poition={[0, 0.33, 0]}
              color="#FF7A51"
            />
            <mesh position={[0, 0.27, 0]} name="middle" onClick={handleClick}>
              <boxGeometry args={[0.6, 0.1, 1.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <Hotspot
              isVisible={showHotspot.back && !isAnimating}
              poition={[0, 0.35, -0.9]}
              color="#46ACFA"
            />
            <mesh position={[0, 0.27, -0.9]} name="back" onClick={handleClick}>
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -0.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      >
        <Html
          transform
          zIndexRange={[1, 0]}
          occlude="blending"
          wrapperClass="pointer-events-none"
        >
          <WavyPaths />
        </Html>
      </group>
    </group>
  );
}
