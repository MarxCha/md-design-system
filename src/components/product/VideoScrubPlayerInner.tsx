"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface VideoScrubPlayerInnerProps {
  src: string;
  poster?: string;
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
}

export default function VideoScrubPlayerInner({
  src,
  poster,
  containerRef,
  className,
}: VideoScrubPlayerInnerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let scrollTriggerInstance: { kill: () => void } | null = null;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const trigger = containerRef?.current ?? video.parentElement;

      const initScrub = () => {
        const duration = video.duration;
        if (!isFinite(duration) || duration === 0) return;

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: trigger ?? video,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            video.currentTime = self.progress * duration;
          },
        });
      };

      if (video.readyState >= 1) {
        initScrub();
      } else {
        video.addEventListener("loadedmetadata", initScrub, { once: true });
      }
    };

    setup();

    return () => {
      scrollTriggerInstance?.kill();
    };
  }, [reducedMotion, containerRef, src]);

  if (reducedMotion) {
    return (
      <div className={`w-full h-full relative ${className ?? ""}`}>
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt="Video preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      preload="auto"
      playsInline
      muted
      className={`w-full h-full object-cover ${className ?? ""}`}
    />
  );
}
