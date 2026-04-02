"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { footerLinks, testimonials } from "./constants";

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
      gsap.set(".ec-testimonials-row", { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: ".ec-testimonials-row",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".ec-testimonials-row", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" });
        },
      });

      gsap.set(".ec-newsletter-block", { opacity: 0, y: 20, scale: 0.98 });
      ScrollTrigger.create({
        trigger: ".ec-newsletter-block",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".ec-newsletter-block", {
            opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
          });
        },
      });

      gsap.set(".ec-footer-inner", { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: ".ec-footer-inner",
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.to(".ec-footer-inner", { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
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
    <div ref={containerRef}>
      {/* Testimonials */}
      <section className="bg-stone-50 py-20 sm:py-24" aria-label="Customer testimonials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
              Testimonials
            </p>
            <h2 className="ec-serif text-3xl font-bold text-stone-900 sm:text-4xl">
              What our customers say
            </h2>
          </div>

          <div className="ec-testimonials-row grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s} className="ec-star-filled text-sm" aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-stone-600">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-5 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 text-sm font-bold text-stone-600"
                    aria-hidden="true"
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{t.author}</p>
                    <p className="text-xs text-stone-400">{t.location}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-20 sm:py-24" aria-label="Newsletter signup">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ec-newsletter-block ec-newsletter-gradient relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                Stay in the loop
              </p>
              <h2 className="ec-serif mx-auto mb-3 max-w-xl text-3xl font-bold text-white sm:text-4xl">
                Join our community
              </h2>
              <p className="mx-auto mb-8 max-w-sm text-base text-amber-100">
                New arrivals, styling guides, and behind-the-scenes from our makers. No spam, ever.
              </p>

              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="ec-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="ec-newsletter-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-full border border-white/25 bg-white/20 px-5 py-3.5 text-sm text-white placeholder-white/50 backdrop-blur-sm outline-none transition-all focus:border-white/60 focus:bg-white/30"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-amber-700 shadow-md transition-all hover:bg-amber-50 hover:shadow-lg active:scale-95"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="mx-auto max-w-md rounded-2xl border border-white/25 bg-white/20 px-6 py-4 text-sm font-medium text-white backdrop-blur-sm">
                  Welcome to the community! Check your inbox for a confirmation.
                </div>
              )}

              <p className="mt-4 text-xs text-amber-200/70">
                Unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 pt-16 pb-8" aria-label="Site footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ec-footer-inner">
            {/* Top: logo + columns */}
            <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-sm font-bold text-stone-900 tracking-widest">
                    M
                  </span>
                  <span className="text-base font-semibold tracking-[0.15em] uppercase text-white">
                    Maison
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-stone-400">
                  Thoughtfully made goods for everyday life.
                </p>
              </div>

              {/* Link columns */}
              {Object.entries(footerLinks).map(([col, links]) => (
                <div key={col}>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-300">
                    {col}
                  </p>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-stone-500 no-underline transition-colors hover:text-stone-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom: copyright + social */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 sm:flex-row">
              <p className="text-xs text-stone-500">
                &copy; 2026 Maison. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                {["Instagram", "Pinterest", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={social}
                    className="text-xs font-medium text-stone-500 no-underline transition-colors hover:text-stone-200"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
