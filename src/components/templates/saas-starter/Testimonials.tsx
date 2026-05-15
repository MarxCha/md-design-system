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
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");

      gsap.set(".testimonials-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: ".testimonials-heading",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".testimonials-heading", {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".testimonials-grid",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
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
      className="bg-[#FAFAFA] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="testimonials-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Testimonials
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Loved by engineering teams
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Don&apos;t take our word for it — hear from the teams shipping faster.
          </p>
        </div>

        <div className="testimonials-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.author}
              className="testimonial-card relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="mb-4 block text-5xl font-serif leading-none text-indigo-200 select-none">
                &ldquo;
              </span>
              <blockquote className="flex-1 text-base leading-relaxed text-slate-600">
                {t.quote}
              </blockquote>
              <footer className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 text-sm font-bold text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.author}</p>
                  <p className="text-xs text-slate-400">
                    {t.role},{" "}
                    <span className="font-medium text-indigo-600">{t.company}</span>
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
            {["TechFlow", "DataPulse", "ScaleUp", "BuildCo", "LaunchPad", "DevStack"].map(
              (name) => (
                <span key={name} className="text-base font-bold tracking-tight text-slate-600">
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
