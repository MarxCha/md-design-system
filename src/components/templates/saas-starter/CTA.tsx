"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(".cta-inner", { opacity: 0, scale: 0.97, y: 24 });

      ScrollTrigger.create({
        trigger: ".cta-inner",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".cta-inner", {
            opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out",
          });
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section ref={containerRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="cta-inner ss-cta-gradient relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative">
            <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Get started today
            </span>
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-indigo-100 sm:text-lg">
              Join 10,000+ engineering teams. Ship your first project in under 5 minutes.
            </p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-white/20 bg-white/20 px-5 py-3.5 text-sm text-white placeholder-white/60 backdrop-blur-sm outline-none transition-all focus:border-white/60 focus:bg-white/30"
                />
                <button type="submit" className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-indigo-700 shadow-md transition-all hover:bg-indigo-50 hover:shadow-lg active:scale-95">
                  Start for free
                </button>
              </form>
            ) : (
              <div className="mx-auto mt-8 max-w-md rounded-xl border border-white/30 bg-white/20 px-6 py-4 text-sm font-medium text-white backdrop-blur-sm">
                You&apos;re on the list! Check your inbox for next steps.
              </div>
            )}
            <p className="mt-4 text-xs text-indigo-200">
              No credit card required. Free forever on Starter plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
