"use client";

import { KeyTextField } from "@prismicio/client";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  youTubeID: KeyTextField;
};

export function LazyYouTubePlayer({ youTubeID }: VideoProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const videoContainer = videoContainerRef.current;

    if (!videoContainer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "1500px",
        threshold: 0,
      },
    );

    observer.observe(videoContainer);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoContainerRef} className="relative h-full w-full">
      {isIntersecting && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="pointer-events-none h-full w-full border-0"
        />
      )}
    </div>
  );
}
