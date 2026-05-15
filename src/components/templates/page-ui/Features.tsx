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
      const cards = gsap.utils.toArray<HTMLElement>(".pu-feature-card");

      gsap.set(".pu-features-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: ".pu-features-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".pu-features-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".pu-features-grid",
        start: "top 88%",
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
      className="py-24 sm:py-32"
      style={{ background: "#0c0a1a" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="pu-features-heading mx-auto mb-16 max-w-2xl text-center">
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "#1e1a35", color: "#a78bfa" }}
          >
            Features
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Every tool you need to build, launch, and grow — all in one place.
          </p>
        </div>

        {/* Feature grid */}
        <div className="pu-features-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="pu-feature-card group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "#1e1b30",
                background: "#0f0d1c",
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, rgba(124,58,237,0.12), transparent 70%)",
                  boxShadow: "inset 0 0 0 1px rgba(124,58,237,0.25)",
                }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: "#1e1a35" }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="relative mb-2 text-base font-semibold text-slate-100">
                {feature.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
