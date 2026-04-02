"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroContent, navItems } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(navRef.current, { opacity: 0, y: -30 });
      gsap.set(taglineRef.current, { opacity: 0, y: 30 });
      gsap.set(titleRef.current, { opacity: 0, y: 60 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      gsap.set(glassRef.current, { opacity: 0, scale: 0.8, rotate: -8 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1.1 }, "-=0.4")
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(
          glassRef.current,
          { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "power2.out" },
          "-=0.8"
        );

      // Parallax on scroll
      gsap.to(glassRef.current, {
        y: -120,
        rotate: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="gc-ambient-glow absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      />

      {/* Nav */}
      <nav
        ref={navRef}
        className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12"
      >
        <span className="gc-logo text-xl font-bold tracking-wider">
          COCKTAIL
        </span>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="gc-nav-link text-sm uppercase tracking-widest transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="gc-reserve-btn rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-all"
        >
          Reserve
        </button>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p ref={taglineRef} className="gc-tagline mb-4 text-sm uppercase tracking-[0.3em]">
          {heroContent.tagline}
        </p>
        <h1 ref={titleRef} className="gc-hero-title mb-6 whitespace-pre-line text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl">
          {heroContent.title}
        </h1>
        <p ref={subtitleRef} className="gc-subtitle mb-10 max-w-lg text-lg md:text-xl">
          {heroContent.subtitle}
        </p>
        <div ref={ctaRef} className="flex gap-4">
          <button type="button" className="gc-btn-primary rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all">
            {heroContent.ctaPrimary}
          </button>
          <button type="button" className="gc-btn-outline rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all">
            {heroContent.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Decorative cocktail glass */}
      <div
        ref={glassRef}
        className="gc-glass-art pointer-events-none absolute right-[5%] top-[20%] hidden h-[500px] w-[300px] lg:block"
        aria-hidden="true"
      >
        <div className="gc-glass-stem" />
        <div className="gc-glass-bowl" />
        <div className="gc-glass-liquid" />
        <div className="gc-glass-garnish" />
      </div>

      {/* Scroll indicator */}
      <div className="gc-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div className="gc-scroll-dot" />
      </div>
    </section>
  );
};

export default Hero;
