"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroContent } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".ec-hero-badge", { opacity: 0, y: 12, duration: 0.5 })
        .from(".ec-hero-title", { opacity: 0, y: 28, duration: 0.75 }, "-=0.25")
        .from(".ec-hero-subtitle", { opacity: 0, y: 18, duration: 0.6 }, "-=0.4")
        .from(".ec-hero-ctas", { opacity: 0, y: 14, duration: 0.5 }, "-=0.35")
        .from(".ec-hero-art", { opacity: 0, x: 40, duration: 0.9, scale: 0.96 }, "-=0.6");
    },
    { scope: containerRef }
  );

  const titleLines = heroContent.title.split("\n");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white pb-0 pt-16 sm:pt-24"
    >
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-amber-50/60 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-[320px] w-[320px] rounded-full bg-stone-100/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            {/* Badge */}
            <div className="ec-hero-badge mb-6 inline-flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                {heroContent.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="ec-hero-title mb-6 text-5xl font-bold leading-[1.08] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
              {titleLines.map((line, i) =>
                i === 0 ? (
                  <span key={i} className="block">
                    {line}
                  </span>
                ) : (
                  <span key={i} className="ec-serif block">
                    {line}
                  </span>
                )
              )}
            </h1>

            {/* Subtitle */}
            <p className="ec-hero-subtitle mb-8 max-w-md text-base leading-relaxed text-stone-500 sm:text-lg">
              {heroContent.subtitle}
            </p>

            {/* CTAs */}
            <div className="ec-hero-ctas flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#products"
                className="ec-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                {heroContent.ctaPrimary}
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-stone-700 no-underline transition-all hover:border-stone-400 hover:shadow-md active:scale-95"
              >
                <span aria-hidden="true">→</span>
                {heroContent.ctaSecondary}
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-10 flex items-center gap-6">
              <div className="text-center">
                <p className="text-xl font-bold text-stone-900">4,200+</p>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Happy customers</p>
              </div>
              <div className="h-8 w-px bg-stone-200" aria-hidden="true" />
              <div className="text-center">
                <p className="text-xl font-bold text-stone-900">Free</p>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Returns 30 days</p>
              </div>
              <div className="h-8 w-px bg-stone-200" aria-hidden="true" />
              <div className="text-center">
                <p className="text-xl font-bold text-stone-900">B Corp</p>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Certified</p>
              </div>
            </div>
          </div>

          {/* Right: abstract product grid art */}
          <div className="ec-hero-art" aria-hidden="true">
            <div className="ec-product-grid-art relative mx-auto max-w-[480px]">
              {/* Grid of product card mockups */}
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1 — tall */}
                <div className="ec-art-card-tall row-span-2 flex flex-col overflow-hidden rounded-2xl shadow-lg">
                  <div className="flex-1 bg-[#C8B8A2]" style={{ minHeight: "220px" }}>
                    <div className="flex h-full items-end p-5">
                      <div className="h-16 w-16 rounded-full bg-white/30 backdrop-blur-sm" />
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3">
                    <div className="mb-1.5 h-2.5 w-28 rounded-full bg-stone-100" />
                    <div className="flex items-center justify-between">
                      <div className="h-2 w-16 rounded-full bg-stone-200" />
                      <div className="h-6 w-6 rounded-full bg-amber-100" />
                    </div>
                  </div>
                </div>

                {/* Card 2 — normal */}
                <div className="flex flex-col overflow-hidden rounded-2xl shadow-md">
                  <div className="bg-[#E8E0D5]" style={{ height: "120px" }}>
                    <div className="flex h-full items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-white/50" />
                    </div>
                  </div>
                  <div className="bg-white px-3 py-2.5">
                    <div className="mb-1 h-2 w-20 rounded-full bg-stone-100" />
                    <div className="h-2 w-12 rounded-full bg-amber-200" />
                  </div>
                </div>

                {/* Card 3 — normal */}
                <div className="flex flex-col overflow-hidden rounded-2xl shadow-md">
                  <div className="bg-[#8B7355]" style={{ height: "120px" }}>
                    <div className="flex h-full items-end justify-end p-3">
                      <div className="h-8 w-8 rounded-full bg-white/20" />
                    </div>
                  </div>
                  <div className="bg-white px-3 py-2.5">
                    <div className="mb-1 h-2 w-24 rounded-full bg-stone-100" />
                    <div className="h-2 w-14 rounded-full bg-stone-200" />
                  </div>
                </div>

                {/* Card 4 — wide accent */}
                <div className="col-span-2 flex items-center gap-4 overflow-hidden rounded-2xl bg-amber-600 px-5 py-4 shadow-md shadow-amber-200/60">
                  <div className="flex-1">
                    <div className="mb-2 h-2.5 w-32 rounded-full bg-white/50" />
                    <div className="h-2 w-20 rounded-full bg-amber-300/60" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <div className="h-3 w-3 rounded-sm bg-white/70" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -left-4 top-20 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-xl">
                <span className="text-xs font-semibold text-stone-700">★ 4.9</span>
                <span className="text-xs text-stone-400">2,400+ reviews</span>
              </div>

              {/* Floating tag */}
              <div className="absolute -right-2 bottom-28 rounded-xl bg-stone-900 px-3 py-2 shadow-lg">
                <p className="text-xs font-semibold text-white">New in</p>
                <p className="text-[10px] text-stone-400">Spring 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
