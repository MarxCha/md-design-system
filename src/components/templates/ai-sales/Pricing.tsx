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
      const cards = gsap.utils.toArray<HTMLElement>(".as-pricing-card");

      gsap.set(".as-pricing-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: ".as-pricing-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".as-pricing-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".as-pricing-grid",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.65,
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
      id="pricing"
      ref={containerRef}
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="as-pricing-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
            Pricing
          </span>
          <h2 className="font-['Outfit',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="as-pricing-grid grid gap-8 lg:grid-cols-2 lg:gap-6">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`as-pricing-card relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "as-pricing-card-featured border-orange-200 bg-orange-50 shadow-xl shadow-orange-100/60"
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute right-6 top-6">
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Decorative glow */}
              {plan.highlighted && (
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-200/40 blur-2xl"
                  aria-hidden="true"
                />
              )}

              <div className="relative">
                {/* Plan name */}
                <p
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    plan.highlighted ? "text-orange-600" : "text-slate-500"
                  }`}
                >
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-['Outfit',sans-serif] text-5xl font-black text-slate-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="mb-1.5 text-base text-slate-400">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {plan.description}
                </p>

                {/* CTA */}
                <button
                  type="button"
                  className={`mt-6 w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    plan.highlighted
                      ? "as-btn-primary text-white shadow-md shadow-orange-200/60 hover:shadow-lg hover:shadow-orange-200"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:shadow-md"
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Feature list */}
                <ul className="mt-8 space-y-3" aria-label={`${plan.name} features`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                          plan.highlighted
                            ? "bg-orange-500 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Enterprise note */}
        <p className="mt-12 text-center text-sm text-slate-400">
          Need enterprise features?{" "}
          <button
            type="button"
            className="font-semibold text-orange-500 underline-offset-2 hover:underline"
          >
            Contact sales
          </button>
          {" "}for custom pricing and volume discounts.
        </p>
      </div>
    </section>
  );
}
