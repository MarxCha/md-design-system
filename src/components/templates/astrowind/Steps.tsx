"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Steps() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const stepEls = gsap.utils.toArray<HTMLElement>(".aw-step-item");

      gsap.set(".aw-steps-heading", { opacity: 0, y: 24 });
      gsap.set(stepEls, { opacity: 0, x: -24 });
      gsap.set(".aw-timeline-line", { scaleY: 0, transformOrigin: "top center" });

      ScrollTrigger.create({
        trigger: ".aw-steps-heading",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".aw-steps-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".aw-steps-timeline",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".aw-timeline-line", {
            scaleY: 1,
            duration: 1.0,
            ease: "power2.inOut",
          });
          gsap.to(stepEls, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.18,
            ease: "power3.out",
            delay: 0.1,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="aw-steps-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-600">
            How it works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            From idea to launch
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Four simple steps to get your project online and performing.
          </p>
        </div>

        {/* Timeline */}
        <div className="aw-steps-timeline relative mx-auto max-w-2xl">
          {/* Connector line */}
          <div
            className="aw-timeline-line absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-400 to-emerald-400 sm:left-8"
            aria-hidden="true"
          />

          <ol className="relative flex flex-col gap-10">
            {steps.map((step, i) => (
              <li
                key={step.number}
                className="aw-step-item relative flex gap-6 sm:gap-8"
              >
                {/* Step number bubble */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all sm:h-16 sm:w-16 sm:text-base ${
                      i % 2 === 0
                        ? "border-blue-200 bg-blue-50 text-blue-600"
                        : "border-emerald-200 bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center pb-2 pt-1 sm:pt-3">
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
