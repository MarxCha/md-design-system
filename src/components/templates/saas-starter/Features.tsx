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
    // Ensure ScrollTrigger recalculates after Lenis initializes
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");

      gsap.set(".features-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: ".features-heading",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".features-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".features-grid",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
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
      className="bg-[#FAFAFA] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="features-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Features
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything you need to scale
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            From your first commit to your millionth user — we have every layer covered.
          </p>
        </div>

        {/* Grid */}
        <div className="features-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="feature-card group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
