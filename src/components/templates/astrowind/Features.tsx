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
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".aw-feature-card");

      gsap.set(".aw-features-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: ".aw-features-heading",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".aw-features-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".aw-features-grid",
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
      className="bg-slate-50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="aw-features-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
            Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            What you get
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Everything you need to build a professional website — without the complexity.
          </p>
        </div>

        {/* Grid */}
        <div className="aw-features-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="aw-feature-card group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/60"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                <span aria-hidden="true">{feature.icon}</span>
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
