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
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".pu-testimonial-card");

      gsap.set(".pu-testimonials-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: ".pu-testimonials-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".pu-testimonials-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".pu-testimonials-grid",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      id="testimonials"
      ref={containerRef}
      className="py-24 sm:py-32"
      style={{ background: "#080614" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="pu-testimonials-heading mx-auto mb-16 max-w-2xl text-center">
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "#1e1a35", color: "#a78bfa" }}
          >
            Testimonials
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Loved by builders
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Real words from real developers who ship with Page UI.
          </p>
        </div>

        {/* Cards */}
        <div className="pu-testimonials-grid grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="pu-testimonial-card flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "#1e1b30", background: "#0f0d1c" }}
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} aria-hidden="true" style={{ color: "#7C3AED" }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="mt-6 flex items-center gap-3">
                {/* Avatar gradient */}
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${t.gradient}`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{t.author}</p>
                  <p className="text-xs text-slate-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
