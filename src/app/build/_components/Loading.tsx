"use client";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useProgress } from "@react-three/drei";

export default function Loading() {
  const { progress } = useProgress();

  return (
    <div
      className={cn(
        "absolute inset-0 grid place-content-center bg-brand-navy font-sans text-[15vw] text-white opacity-100 transition-opacity duration-1000",
        {
          "pointer-events-none opacity-0": progress >= 100,
        },
      )}
    >
      <Logo className="w-[15vw] animate-squiggle text-brand-pink" />
      <p className="w-full animate-squiggle content-center text-center leading-none text-brand-lime">
        LOADING...
      </p>
    </div>
  );
}
