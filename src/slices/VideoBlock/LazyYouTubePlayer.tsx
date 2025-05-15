"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { KeyTextField } from "@prismicio/client";
import { useRef } from "react";

type VideoProps = {
  youTubeID: KeyTextField;
};

export function LazyYouTubePlayer({ youTubeID }: VideoProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(videoContainerRef, {
    rootMargin: "1500px",
    threshold: 0,
  });

  return (
    <div ref={videoContainerRef} className="relative h-full w-full">
      {isVisible && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="pointer-events-none h-full w-full border-0"
        />
      )}
    </div>
  );
}
