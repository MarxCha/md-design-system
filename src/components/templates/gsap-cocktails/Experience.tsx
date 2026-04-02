"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(headingRef.current, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
      });

      // Pinned horizontal scroll for features
      const cards = cardsRef.current?.querySelectorAll(".gc-experience-card");
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 });

        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.2,
              ease: "power3.out",
            });
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative px-6 py-24 md:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2
          ref={headingRef}
          className="gc-section-heading mb-16 text-center text-4xl font-bold md:text-5xl"
        >
          The Experience
        </h2>

        <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="gc-experience-card group rounded-2xl p-8 text-center transition-all"
            >
              <div className="gc-experience-icon mb-6 text-5xl" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="gc-experience-title mb-3 text-lg font-bold">
                {feature.title}
              </h3>
              <p className="gc-experience-desc text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
