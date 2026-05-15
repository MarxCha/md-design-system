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
      const cards = gsap.utils.toArray<HTMLElement>(".co-feature-card");

      gsap.set(".co-features-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 36 });

      ScrollTrigger.create({
        trigger: ".co-features-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".co-features-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".co-features-grid",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.65,
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
      className="relative bg-[#0D1117] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="co-features-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="co-eyebrow mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything your team needs,{" "}
            <span className="co-gradient-text">nothing it doesn&apos;t</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Built by engineers for engineers. Every feature is open, documented, and yours to extend.
          </p>
        </div>

        {/* Grid */}
        <div className="co-features-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="co-feature-card group rounded-2xl p-6 transition-all duration-300"
            >
              <div className="co-feature-icon mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110">
                <span aria-hidden="true">{feature.icon}</span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
