"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ctaContent, footerLinks } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(".pu-cta-content", { opacity: 0, y: 32 });
      gsap.set(".pu-footer-col", { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: ".pu-cta-content",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".pu-cta-content", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".pu-footer-grid",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".pu-footer-col", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: containerRef }
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No-op: demo form
  }

  return (
    <footer ref={containerRef} style={{ background: "#080614" }}>
      {/* CTA band */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        {/* Animated blob background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="pu-blob h-[500px] w-[700px] rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #7C3AED 0%, #4F46E5 50%, transparent 80%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="pu-cta-content">
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {ctaContent.heading}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {ctaContent.subheading}
            </p>

            {/* Email form */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              noValidate
            >
              <label htmlFor="cta-email" className="sr-only">
                Email address
              </label>
              <input
                id="cta-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ctaContent.inputPlaceholder}
                className="w-full rounded-xl border px-5 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors duration-200 focus:border-violet-500 sm:w-80"
                style={{ background: "#13111f", borderColor: "#1e1b30" }}
              />
              <button
                type="submit"
                className="pu-btn-primary w-full sm:w-auto"
              >
                {ctaContent.buttonLabel}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div
        className="border-t px-4 py-16 sm:px-6 lg:px-8"
        style={{ borderColor: "#1e1b30" }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Brand mark */}
          <div className="mb-12 flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ background: "#7C3AED" }}
              aria-hidden="true"
            >
              P
            </span>
            <span className="font-display text-lg font-semibold text-white">
              Page UI
            </span>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer navigation">
            <div className="pu-footer-grid grid grid-cols-2 gap-10 md:grid-cols-4">
              {Object.entries(footerLinks).map(([group, links]) => (
                <div key={group} className="pu-footer-col">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {group}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-slate-500 transition-colors duration-150 hover:text-slate-300"
                          onClick={(e) => e.preventDefault()}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom bar */}
          <div
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
            style={{ borderColor: "#1e1b30" }}
          >
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Page UI. All rights reserved.
            </p>
            <p className="text-xs text-slate-600">
              Built with Page UI by{" "}
              <span className="text-violet-500">MD Consultoría TI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
