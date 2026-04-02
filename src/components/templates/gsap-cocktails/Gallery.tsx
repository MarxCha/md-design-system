"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** CSS-only gallery with masking and parallax effects */
const galleryItems = [
  { label: "Ambiance", gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #D4A574 100%)" },
  { label: "Craftsmanship", gradient: "linear-gradient(135deg, #0a1a0a 0%, #1a3d2a 50%, #A8C4B8 100%)" },
  { label: "Ingredients", gradient: "linear-gradient(135deg, #1a0000 0%, #3d0a0a 50%, #C75B5B 100%)" },
  { label: "Presentation", gradient: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3d 50%, #9B8EC4 100%)" },
  { label: "Community", gradient: "linear-gradient(135deg, #1a1a00 0%, #3d3d0a 50%, #D4C574 100%)" },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const items = trackRef.current?.querySelectorAll(".gc-gallery-item");
      if (!items) return;

      // Reveal on scroll
      gsap.set(items, { opacity: 0, y: 40, scale: 0.92 });

      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
      });

      // Individual parallax per item
      items.forEach((item) => {
        const inner = item.querySelector(".gc-gallery-inner");
        if (inner) {
          gsap.to(inner, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative px-6 py-24 md:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="gc-section-heading mb-16 text-center text-4xl font-bold md:text-5xl">
          Moments
        </h2>

        <div
          ref={trackRef}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5"
        >
          {galleryItems.map((item) => (
            <div
              key={item.label}
              className="gc-gallery-item group relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <div
                className="gc-gallery-inner absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ background: item.gradient }}
              />
              {/* Overlay label */}
              <div className="absolute inset-0 flex items-end p-4">
                <span className="gc-gallery-label text-sm font-medium uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
