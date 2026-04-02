"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".as-feature-card");

      gsap.set(".as-features-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 36 });

      ScrollTrigger.create({
        trigger: ".as-features-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".as-features-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".as-features-grid",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="features"
      ref={containerRef}
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="as-features-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
            Features
          </span>
          <h2 className="font-['Outfit',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything you need to sell smarter
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Our AI works across your entire sales funnel — from the first touch
            to the closed deal.
          </p>
        </div>

        {/* Feature cards */}
        <div className="as-features-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="as-feature-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/60"
            >
              {/* Decorative gradient circle */}
              <div
                className="as-feature-glow pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-100/50 blur-2xl transition-all duration-500 group-hover:bg-orange-200/60 group-hover:blur-xl"
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-3xl transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="relative mb-3 font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="relative text-base leading-relaxed text-slate-500">
                {feature.description}
              </p>

              {/* Orange accent line on hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-500 group-hover:w-full"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
