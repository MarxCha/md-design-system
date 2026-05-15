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
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");

      gsap.set(".pricing-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: ".pricing-heading",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".pricing-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".pricing-grid",
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
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pricing-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Pricing
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </div>

        <div className="pricing-grid mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "ss-pricing-popular shadow-2xl shadow-indigo-200/60"
                  : "border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-1 text-xs font-bold text-white shadow-md">
                    Most popular
                  </span>
                </div>
              )}
              <p className={`text-sm font-semibold uppercase tracking-wider ${plan.highlighted ? "text-indigo-200" : "text-slate-400"}`}>
                {plan.name}
              </p>
              <div className="mt-3 flex items-end gap-1">
                <span className={`text-5xl font-extrabold ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`mb-1 text-base ${plan.highlighted ? "text-indigo-200" : "text-slate-400"}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={`mt-2 text-sm ${plan.highlighted ? "text-indigo-100" : "text-slate-500"}`}>
                {plan.description}
              </p>
              <div className={`my-6 h-px ${plan.highlighted ? "bg-indigo-500" : "bg-slate-100"}`} />
              <ul className="mb-8 flex flex-col gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-xs ${plan.highlighted ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-600"}`}>
                      ✓
                    </span>
                    <span className={`text-sm ${plan.highlighted ? "text-indigo-50" : "text-slate-600"}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-auto w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  plan.highlighted
                    ? "bg-white text-indigo-700 hover:bg-indigo-50 hover:shadow-md"
                    : "ss-btn-primary text-white hover:shadow-md hover:shadow-indigo-200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-slate-400">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
