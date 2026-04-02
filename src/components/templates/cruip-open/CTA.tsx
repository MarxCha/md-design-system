"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ctaContent, footerLinks } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      gsap.set(".co-cta-inner", { opacity: 0, y: 32 });
      gsap.set(".co-footer-inner", { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: ".co-cta-inner",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".co-cta-inner", {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".co-footer-inner",
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.to(".co-footer-inner", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#0D1117] py-24 sm:py-32">
        {/* Top border glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
        />

        {/* Background glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="co-glow-orb co-glow-orb--indigo absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
        </div>

        <div className="co-cta-inner relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <span className="co-eyebrow mb-5 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            {ctaContent.eyebrow}
          </span>

          {/* Heading */}
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {ctaContent.heading.split("\n").map((line, i) => (
              <span key={i} className={`block ${i === 1 ? "co-gradient-text" : ""}`}>
                {line}
              </span>
            ))}
          </h2>

          <p className="mb-10 text-lg text-slate-400">{ctaContent.subheading}</p>

          {/* Email form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
            noValidate
          >
            <div className="relative flex-1 sm:max-w-xs">
              <label htmlFor="co-email-input" className="sr-only">
                Email address
              </label>
              <input
                id="co-email-input"
                type="email"
                autoComplete="email"
                placeholder={ctaContent.placeholder}
                className="co-email-input w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="co-btn-primary flex-shrink-0 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
            >
              {ctaContent.buttonText}
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-600">{ctaContent.disclaimer}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080C14] pb-10 pt-16">
        <div className="co-footer-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top: brand + columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white"
                >
                  C
                </span>
                <span className="text-base font-bold text-white">Cruip Open</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                The open-source SaaS toolkit. Build, ship, and own your product.
              </p>
              {/* Social links */}
              <div className="mt-5 flex gap-3">
                {["GitHub", "Twitter", "Discord"].map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    aria-label={`${platform} profile`}
                    className="co-social-btn flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-slate-400 transition-colors hover:text-white"
                  >
                    {platform.charAt(0)}
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {col.heading}
                </h3>
                <ul className="space-y-3" role="list">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Cruip Open. MIT License.
            </p>
            <p className="text-xs text-slate-700">
              Built with{" "}
              <span aria-label="love" role="img">
                ♥
              </span>{" "}
              by the open-source community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
