"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(headingRef.current, { opacity: 0, x: -60 });
      gsap.set(p1Ref.current, { opacity: 0, y: 40 });
      gsap.set(p2Ref.current, { opacity: 0, y: 40 });
      gsap.set(statsRef.current, { opacity: 0, y: 50 });
      gsap.set(imageRef.current, { opacity: 0, scale: 0.9, x: 60 });

      // Heading slide-in
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          });
        },
      });

      // Paragraphs
      ScrollTrigger.create({
        trigger: p1Ref.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(p1Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
          gsap.to(p2Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
          });
        },
      });

      // Stats counter
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(statsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });

      // Image parallax
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          });
        },
      });

      gsap.to(imageRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  const stats = [aboutContent.stat1, aboutContent.stat2, aboutContent.stat3];

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 md:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Text side */}
        <div className="flex flex-col justify-center">
          <h2
            ref={headingRef}
            className="gc-section-heading mb-8 text-4xl font-bold leading-tight md:text-5xl"
          >
            {aboutContent.heading}
          </h2>
          <p ref={p1Ref} className="gc-body-text mb-4 text-lg leading-relaxed">
            {aboutContent.paragraph1}
          </p>
          <p ref={p2Ref} className="gc-body-text mb-10 text-lg leading-relaxed">
            {aboutContent.paragraph2}
          </p>
          <div ref={statsRef} className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="gc-stat-card rounded-xl p-4 text-center">
                <div className="gc-stat-value text-3xl font-bold md:text-4xl">
                  {stat.value}
                </div>
                <div className="gc-stat-label mt-1 text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual side — CSS art of bar interior */}
        <div ref={imageRef} className="gc-bar-visual relative flex items-center justify-center">
          <div className="gc-bar-scene relative h-[400px] w-full overflow-hidden rounded-2xl lg:h-[500px]">
            {/* Shelves */}
            <div className="gc-shelf gc-shelf-1" aria-hidden="true" />
            <div className="gc-shelf gc-shelf-2" aria-hidden="true" />
            <div className="gc-shelf gc-shelf-3" aria-hidden="true" />
            {/* Bottles */}
            <div className="gc-bottle gc-bottle-1" aria-hidden="true" />
            <div className="gc-bottle gc-bottle-2" aria-hidden="true" />
            <div className="gc-bottle gc-bottle-3" aria-hidden="true" />
            <div className="gc-bottle gc-bottle-4" aria-hidden="true" />
            <div className="gc-bottle gc-bottle-5" aria-hidden="true" />
            {/* Bar counter */}
            <div className="gc-bar-counter" aria-hidden="true" />
            {/* Ambient light */}
            <div className="gc-bar-light" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
