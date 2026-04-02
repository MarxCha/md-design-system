"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { howItWorks } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>(".as-hiw-step");

      gsap.set(".as-hiw-heading", { opacity: 0, y: 24 });
      gsap.set(steps, { opacity: 0, y: 32 });
      gsap.set(".as-hiw-connector", { opacity: 0, scaleX: 0 });

      ScrollTrigger.create({
        trigger: ".as-hiw-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".as-hiw-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".as-hiw-steps",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(steps, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.15,
            ease: "power3.out",
          });
          gsap.to(".as-hiw-connector", {
            opacity: 1,
            scaleX: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.3,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="bg-slate-50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="as-hiw-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
            How It Works
          </span>
          <h2 className="font-['Outfit',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Three simple steps to transform how your sales team operates.
          </p>
        </div>

        {/* Steps */}
        <div className="as-hiw-steps relative">
          {/* Connector line — desktop only */}
          <div
            className="pointer-events-none absolute left-1/6 right-1/6 top-10 hidden h-px bg-slate-200 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {howItWorks.map((step, i) => (
              <article
                key={step.step}
                className="as-hiw-step relative flex flex-col items-center text-center lg:items-center"
              >
                {/* Connector arrow between steps — desktop */}
                {i < howItWorks.length - 1 && (
                  <div
                    className="as-hiw-connector pointer-events-none absolute left-full top-9 z-10 hidden origin-left -translate-y-1/2 lg:block"
                    style={{ width: "calc(50% + 1rem)" }}
                    aria-hidden="true"
                  >
                    <svg
                      width="100%"
                      height="20"
                      viewBox="0 0 80 20"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 10 H70 M60 4 L76 10 L60 16"
                        stroke="#F97316"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Step number circle */}
                <div
                  className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-orange-500 shadow-lg shadow-orange-200/60"
                  aria-hidden="true"
                >
                  <span className="font-['Outfit',sans-serif] text-2xl font-black text-white">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-3 font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="max-w-xs text-base leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
