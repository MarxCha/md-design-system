"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".co-testimonial-card");

      gsap.set(".co-testimonials-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 36 });

      ScrollTrigger.create({
        trigger: ".co-testimonials-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".co-testimonials-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".co-testimonials-grid",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative bg-[#111827] py-24 sm:py-32"
    >
      {/* Top border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="co-testimonials-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="co-eyebrow mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Trusted by teams who{" "}
            <span className="co-gradient-text">value ownership</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            From solo founders to Fortune 500 engineering orgs — here&apos;s what they say.
          </p>
        </div>

        {/* Grid */}
        <div className="co-testimonials-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.author}
              className="co-testimonial-card co-feature-card group flex flex-col rounded-2xl p-8 transition-all duration-300"
            >
              {/* Quote mark */}
              <span
                aria-hidden="true"
                className="mb-4 block select-none font-serif text-5xl leading-none text-indigo-500/40"
              >
                &ldquo;
              </span>

              <blockquote className="flex-1 text-base leading-relaxed text-slate-300">
                {t.quote}
              </blockquote>

              <footer className="mt-6 flex items-center gap-3">
                {/* Gradient avatar */}
                <div
                  aria-hidden="true"
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white shadow-lg`}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-slate-500">
                    {t.role},{" "}
                    <span className="font-medium text-indigo-400">{t.company}</span>
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Trusted-by logos row */}
        <div className="mt-20">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-slate-600">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["Veritas Labs", "Stacknode", "FluxCore", "BuildOS", "ShipFast", "Devoptics"].map(
              (name) => (
                <span
                  key={name}
                  className="text-sm font-bold tracking-tight text-slate-400"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
