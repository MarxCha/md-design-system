"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroContent } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance: staggered fade-up
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          laptopRef.current,
          { opacity: 0, scale: 0.88, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power2.out" },
          "-=0.7"
        )
        .fromTo(
          indicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      // Parallax scroll: laptop rises gently as user scrolls
      gsap.to(laptopRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Scroll indicator pulse loop
      gsap.to(indicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 2,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 pt-20 pb-16"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-blue-500/20 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Headline */}
      <div ref={headlineRef} className="relative z-10 text-center opacity-0">
        <h1 className="gm-heading text-[clamp(3.5rem,10vw,8rem)] font-bold leading-none tracking-tight text-white">
          {heroContent.title}
        </h1>
      </div>

      {/* Subtitle with gradient text */}
      <p
        ref={subtitleRef}
        className="gm-gradient-text relative z-10 mt-4 text-center text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-tight opacity-0"
      >
        {heroContent.subtitle}
      </p>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="relative z-10 mt-4 text-center text-[clamp(0.9rem,2vw,1.2rem)] font-light tracking-wide text-gray-400 opacity-0"
      >
        {heroContent.tagline}
      </p>

      {/* CSS Laptop Mockup */}
      <div
        ref={laptopRef}
        className="gm-laptop-hero relative z-10 mt-12 w-full max-w-3xl opacity-0"
        aria-hidden="true"
      >
        {/* Lid / Screen */}
        <div className="gm-laptop-lid mx-auto w-full max-w-2xl">
          <div className="gm-laptop-screen-outer relative w-full rounded-[12px] border border-gray-700 bg-gray-900 p-2 shadow-2xl shadow-black/80">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 z-10 h-3 w-14 -translate-x-1/2 rounded-b-lg bg-gray-900" />
            {/* Screen content */}
            <div className="gm-laptop-screen relative w-full overflow-hidden rounded-[8px]" style={{ aspectRatio: "16/10" }}>
              <div className="gm-screen-gradient absolute inset-0" />
              {/* Fake menubar */}
              <div className="absolute top-0 inset-x-0 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm z-10">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              {/* Fake "content" lines */}
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 pt-8">
                <div className="h-2 w-2/3 rounded-full bg-white/10" />
                <div className="h-2 w-1/2 rounded-full bg-white/10" />
                <div className="h-2 w-3/5 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Hinge line */}
        <div className="gm-hinge mx-auto mt-0.5 h-1 w-[85%] rounded-b bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800" />

        {/* Base / Keyboard */}
        <div className="gm-laptop-base mx-auto w-full max-w-2xl rounded-b-[10px] rounded-t-[3px] bg-gradient-to-b from-gray-800 to-gray-900 pt-1.5 pb-3 px-6 shadow-xl">
          {/* Keyboard rows (decorative) */}
          <div className="flex flex-col gap-1 opacity-40">
            {[80, 92, 88, 75].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded bg-gray-600"
                style={{ width: `${w}%`, marginLeft: i === 1 ? "0" : i === 3 ? "12%" : "0" }}
              />
            ))}
          </div>
          {/* Trackpad */}
          <div className="mx-auto mt-3 h-10 w-32 rounded-md border border-gray-700 bg-gray-800/60 sm:w-40" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
