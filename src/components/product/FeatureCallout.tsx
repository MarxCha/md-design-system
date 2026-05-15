"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Feature {
  title: string;
  description: string;
  tag?: string;
}

interface FeatureCalloutProps {
  image: string;
  imageAlt?: string;
  features: Feature[];
  reverse?: boolean;
  height?: string;
  className?: string;
}

export function FeatureCallout({
  image,
  imageAlt = "",
  features,
  reverse = false,
  height = "300vh",
  className,
}: FeatureCalloutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const imageCol = imageColRef.current;
    if (!container || !imageCol) return;

    // No pin or scroll animations on mobile — CSS handles layout
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;
    if (reducedMotion) return;

    let triggers: Array<{ kill: () => void }> = [];

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      // Pin the image column for the duration of the outer container
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: imageCol,
        pinSpacing: false,
      });
      triggers.push(pinTrigger);

      // Reveal each feature card as it enters the viewport
      featureRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 40 });
        const t = ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            });
          },
          once: true,
        });
        triggers.push(t);
      });
    };

    setup();

    return () => {
      triggers.forEach((t) => t.kill());
      triggers = [];
    };
  }, [reducedMotion, features]);

  const imageColumn = (
    <div
      ref={imageColRef}
      className="w-full md:w-1/2 h-screen flex items-center justify-center bg-muted/30"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover"
      />
    </div>
  );

  const textColumn = (
    <div className="w-full md:w-1/2 flex flex-col justify-center gap-24 py-24 px-8 md:px-12">
      {features.map((feature, i) => (
        <div
          key={i}
          ref={(el) => {
            featureRefs.current[i] = el;
          }}
          className="flex flex-col gap-3"
        >
          {feature.tag && (
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {feature.tag}
            </span>
          )}
          <h3 className="text-2xl font-bold leading-tight tracking-tight">
            {feature.title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground font-light">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={`relative w-full ${className ?? ""}`}
    >
      {/* Mobile: stacked layout, no pin */}
      <div
        className={`md:hidden flex flex-col gap-12`}
      >
        <div className="w-full h-64 bg-muted/30 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col gap-3 px-6">
            {feature.tag && (
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {feature.tag}
              </span>
            )}
            <h3 className="text-xl font-bold leading-tight tracking-tight">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground font-light">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: side-by-side with pinned image */}
      <div
        className={`hidden md:flex w-full h-full ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {imageColumn}
        {textColumn}
      </div>
    </div>
  );
}
