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
      const cards = gsap.utils.toArray<HTMLElement>(".pu-pricing-card");

      gsap.set(".pu-pricing-heading", { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: ".pu-pricing-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".pu-pricing-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".pu-pricing-grid",
        start: "top 88%",
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
      className="py-24 sm:py-32"
      style={{ background: "#0c0a1a" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="pu-pricing-heading mx-auto mb-16 max-w-2xl text-center">
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "#1e1a35", color: "#a78bfa" }}
          >
            Pricing
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            No hidden fees. Start free, scale when you need to.
          </p>
        </div>

        {/* Cards */}
        <div className="pu-pricing-grid mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`pu-pricing-card relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "pu-pricing-popular"
                  : "border hover:-translate-y-1"
              }`}
              style={
                plan.highlighted
                  ? {}
                  : { borderColor: "#1e1b30", background: "#0f0d1c" }
              }
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-bold text-white shadow-lg"
                    style={{ background: "linear-gradient(to right, #7C3AED, #4F46E5)" }}
                  >
                    Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: plan.highlighted ? "#c4b5fd" : "#6b7280" }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-end gap-1">
                <span
                  className="font-display text-5xl font-bold"
                  style={{ color: plan.highlighted ? "#ffffff" : "#f1f5f9" }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className="mb-1 text-base"
                    style={{ color: plan.highlighted ? "#c4b5fd" : "#6b7280" }}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className="mt-2 text-sm"
                style={{ color: plan.highlighted ? "#ddd6fe" : "#9ca3af" }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div
                className="my-6 h-px"
                style={{
                  background: plan.highlighted
                    ? "rgba(139,92,246,0.4)"
                    : "#1e1b30",
                }}
              />

              {/* Features list */}
              <ul className="mb-8 flex flex-col gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={
                        plan.highlighted
                          ? { background: "#7C3AED", color: "#ffffff" }
                          : { background: "#1e1a35", color: "#a78bfa" }
                      }
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: plan.highlighted ? "#ede9fe" : "#cbd5e1",
                      }}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                type="button"
                className="mt-auto w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 active:scale-95"
                style={
                  plan.highlighted
                    ? {
                        background: "#ffffff",
                        color: "#7C3AED",
                      }
                    : {
                        background: "#1e1a35",
                        color: "#a78bfa",
                        border: "1px solid #2d2550",
                      }
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm" style={{ color: "#6b7280" }}>
          All paid plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
