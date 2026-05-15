"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Direction = "left" | "right" | "top" | "bottom";

interface ImageMaskRevealProps {
  src: string;
  alt: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  trigger?: "scroll" | "mount";
  className?: string;
}

const CLIP_FROM: Record<Direction, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  top: "inset(100% 0 0 0)",
  bottom: "inset(0 0 100% 0)",
};

const CLIP_TO: Record<Direction, string> = {
  left: "inset(0 0% 0 0)",
  right: "inset(0 0 0 0%)",
  top: "inset(0% 0 0 0)",
  bottom: "inset(0 0 0% 0)",
};

export function ImageMaskReveal({
  src,
  alt,
  direction = "left",
  delay = 0,
  duration = 1.2,
  trigger = "scroll",
  className,
}: ImageMaskRevealProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const img = imgRef.current;
    if (!img) return;

    let scrollTriggerInstance: { kill: () => void } | null = null;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(img, { clipPath: CLIP_FROM[direction] });

      const animProps = {
        clipPath: CLIP_TO[direction],
        duration,
        delay,
        ease: "power3.out",
      };

      if (trigger === "scroll") {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: img,
          start: "top 85%",
          onEnter: () => {
            gsap.to(img, animProps);
          },
          once: true,
        });
      } else {
        gsap.to(img, animProps);
      }
    };

    setup();

    return () => {
      scrollTriggerInstance?.kill();
    };
  }, [reducedMotion, direction, delay, duration, trigger]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
