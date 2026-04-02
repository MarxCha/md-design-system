"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pricingPlans } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".aw-pricing-card");

      gsap.set(".aw-pricing-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: ".aw-pricing-heading",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".aw-pricing-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".aw-pricing-grid",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
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
      id="pricing"
      ref={containerRef}
      className="bg-slate-50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="aw-pricing-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
            Pricing
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No hidden fees. No surprises. Start free and upgrade when you need to.
          </p>
        </div>

        {/* Grid */}
        <div className="aw-pricing-grid mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`aw-pricing-card relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "aw-pricing-popular border-blue-500 shadow-2xl shadow-blue-200/60"
                  : "border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/80"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-1 text-xs font-bold text-white shadow-md">
                    Most popular
                  </span>
                </div>
              )}

              <p
                className={`text-sm font-semibold uppercase tracking-wider ${
                  plan.highlighted ? "text-blue-200" : "text-slate-400"
                }`}
              >
                {plan.name}
              </p>

              <div className="mt-3 flex items-end gap-1">
                <span
                  className={`text-5xl font-bold ${
                    plan.highlighted ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`mb-1 text-base ${
                      plan.highlighted ? "text-blue-200" : "text-slate-400"
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <p
                className={`mt-2 text-sm ${
                  plan.highlighted ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {plan.description}
              </p>

              <div
                className={`my-6 h-px ${
                  plan.highlighted ? "bg-blue-500/60" : "bg-slate-100"
                }`}
              />

              <ul className="mb-8 flex flex-col gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                        plan.highlighted
                          ? "bg-emerald-400 text-white"
                          : "bg-blue-100 text-blue-600"
                      }`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-blue-50" : "text-slate-600"
                      }`}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-auto w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  plan.highlighted
                    ? "bg-white text-blue-700 hover:bg-blue-50 hover:shadow-md"
                    : "aw-btn-primary text-white hover:shadow-md hover:shadow-blue-200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-slate-400">
          All paid plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
