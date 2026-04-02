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
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      gsap.set([".aw-hero-badge", ".aw-hero-title", ".aw-hero-subtitle", ".aw-hero-ctas", ".aw-hero-social"], {
        opacity: 0,
        y: 20,
      });

      ScrollTrigger.create({
        trigger: ".aw-hero-badge",
        start: "top 95%",
        once: true,
        onEnter: () => {
          gsap.to(".aw-hero-badge", { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
          gsap.to(".aw-hero-title", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 });
          gsap.to(".aw-hero-subtitle", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.22 });
          gsap.to(".aw-hero-ctas", { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.34 });
          gsap.to(".aw-hero-social", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.44 });
        },
      });
    },
    { scope: containerRef }
  );

  const titleLines = heroContent.title.split("\n");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white pb-16 pt-20 sm:pb-24 sm:pt-28"
    >
      {/* Decorative blur circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -right-24 top-0 h-[400px] w-[400px] rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-blue-50/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="aw-hero-badge mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm">
            <span className="aw-pulse h-2 w-2 rounded-full bg-blue-500" aria-hidden="true" />
            {heroContent.tagline}
          </span>
        </div>

        {/* Title */}
        <h1 className="aw-hero-title mx-auto max-w-3xl text-center text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          {titleLines.map((line, i) =>
            i === 0 ? (
              <span key={i} className="block">
                {line}
              </span>
            ) : (
              <span key={i} className="aw-gradient-text block">
                {line}
              </span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p className="aw-hero-subtitle mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-slate-500 sm:text-xl">
          {heroContent.subtitle}
        </p>

        {/* CTAs */}
        <div className="aw-hero-ctas mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="aw-btn-primary w-full rounded-xl px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-200/60 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 active:scale-95 sm:w-auto"
          >
            {heroContent.ctaPrimary}
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md active:scale-95 sm:w-auto"
          >
            <span className="mr-2 text-slate-400" aria-hidden="true">▶</span>
            {heroContent.ctaSecondary}
          </button>
        </div>

        {/* Social proof */}
        <div className="aw-hero-social mt-6 flex justify-center">
          <p className="text-sm text-slate-400">
            Trusted by{" "}
            <span className="font-semibold text-slate-600">10,000+</span>{" "}
            developers and businesses worldwide
          </p>
        </div>

        {/* Hero visual — mock browser window */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="aw-hero-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" aria-hidden="true" />
              <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white px-3">
                <span className="text-xs text-slate-400">astrowind.vercel.app</span>
              </div>
            </div>

            {/* Fake page content */}
            <div className="flex min-h-[320px] flex-col gap-0">
              {/* Fake hero */}
              <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-50 to-white px-8 py-14">
                <div className="h-3 w-24 rounded-full bg-blue-200" />
                <div className="h-5 w-64 rounded-full bg-slate-300 sm:w-80" />
                <div className="h-4 w-48 rounded-full bg-slate-200 sm:w-64" />
                <div className="mt-2 flex gap-3">
                  <div className="h-9 w-28 rounded-lg bg-blue-500" />
                  <div className="h-9 w-28 rounded-lg border border-slate-300 bg-white" />
                </div>
              </div>

              {/* Fake feature strip */}
              <div className="hidden grid-cols-3 gap-4 border-t border-slate-100 bg-white px-8 py-8 sm:grid">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-100" />
                    <div className="h-3 w-24 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-32 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-28 rounded-full bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fade out bottom */}
          <div className="h-16 w-full bg-gradient-to-b from-transparent to-white" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
