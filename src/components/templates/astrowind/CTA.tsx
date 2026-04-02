"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ctaContent, footerLinks, TEMPLATE_NAME } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      gsap.set(".aw-cta-inner", { opacity: 0, scale: 0.97, y: 24 });
      gsap.set(".aw-footer-col", { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: ".aw-cta-inner",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".aw-cta-inner", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".aw-footer-grid",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".aw-footer-col", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
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

  const currentYear = new Date().getFullYear();

  return (
    <section ref={containerRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA box */}
        <div className="aw-cta-inner aw-cta-gradient relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute left-1/2 top-1/2 h-48 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-2xl" />
          </div>

          <div className="relative">
            <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {ctaContent.badge}
            </span>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {ctaContent.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-blue-100 sm:text-lg">
              {ctaContent.subheading}
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3 sm:flex-row"
              >
                <label htmlFor="aw-cta-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="aw-cta-email"
                  type="email"
                  required
                  placeholder={ctaContent.inputPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-white/20 bg-white/20 px-5 py-3.5 text-sm text-white placeholder-white/60 backdrop-blur-sm outline-none transition-all focus:border-white/60 focus:bg-white/30"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 shadow-md transition-all hover:bg-blue-50 hover:shadow-lg active:scale-95"
                >
                  {ctaContent.buttonLabel}
                </button>
              </form>
            ) : (
              <div className="mx-auto mt-8 max-w-md rounded-xl border border-white/30 bg-white/20 px-6 py-4 text-sm font-medium text-white backdrop-blur-sm">
                You&apos;re on the list! Check your inbox for next steps.
              </div>
            )}

            <p className="mt-4 text-xs text-blue-200">{ctaContent.disclaimer}</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24">
          {/* Footer columns */}
          <div className="aw-footer-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="aw-footer-col">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-500 transition-colors hover:text-slate-800 no-underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer bottom */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                A
              </span>
              <span className="text-sm font-semibold text-slate-700">{TEMPLATE_NAME}</span>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {currentYear} {TEMPLATE_NAME}. Made with care and open source.
            </p>
            <div className="flex gap-5">
              {["Twitter", "GitHub", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-slate-400 transition-colors hover:text-slate-700 no-underline"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
