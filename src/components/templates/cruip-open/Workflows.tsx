"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflows } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Workflows() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>(".co-workflow-step");

      gsap.set(".co-workflows-heading", { opacity: 0, y: 24 });
      gsap.set(steps, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: ".co-workflows-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".co-workflows-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".co-workflows-track",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(steps, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.18,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="workflows"
      ref={containerRef}
      className="relative bg-[#111827] py-24 sm:py-32"
    >
      {/* Subtle top border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="co-workflows-heading mx-auto mb-20 max-w-2xl text-center">
          <span className="co-eyebrow mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            How it works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            From zero to production{" "}
            <span className="co-gradient-text">in three steps</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            No proprietary abstractions. No surprise bills. Just open tools that work the way you expect.
          </p>
        </div>

        {/* Steps track */}
        <div className="co-workflows-track relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="co-connector-line absolute left-1/2 top-12 hidden h-[calc(100%-6rem)] w-px -translate-x-1/2 lg:block"
          />

          <div className="grid gap-10 lg:gap-0">
            {workflows.map((step, i) => (
              <div
                key={step.number}
                className={`co-workflow-step relative flex flex-col items-center gap-8 lg:flex-row lg:gap-16 ${
                  i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content side */}
                <div className="flex-1 text-center lg:text-left">
                  <span className="co-step-number mb-4 inline-block text-5xl font-bold opacity-20 lg:text-6xl">
                    {step.number}
                  </span>
                  <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-slate-400 lg:max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Icon node (sits on the center line on desktop) */}
                <div className="flex flex-shrink-0 flex-col items-center lg:relative lg:z-10">
                  <div className="co-step-icon flex h-20 w-20 items-center justify-center rounded-2xl text-3xl shadow-lg shadow-indigo-900/40">
                    <span aria-hidden="true">{step.icon}</span>
                  </div>
                  {/* Connector dot */}
                  {i < workflows.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="mt-6 block h-px w-full bg-gradient-to-b from-indigo-500/30 to-transparent lg:hidden"
                    />
                  )}
                </div>

                {/* Spacer for alternating layout balance */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
      />
    </section>
  );
}
