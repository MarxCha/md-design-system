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
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(".as-cta-inner", { opacity: 0, scale: 0.97, y: 28 });
      gsap.set(".as-footer-cols", { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: ".as-cta-inner",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".as-cta-inner", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".as-footer-cols",
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.to(".as-footer-cols", {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const footerColumns = Object.entries(footerLinks);

  return (
    <div ref={containerRef}>
      {/* CTA Section */}
      <section id="contact" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="as-cta-inner as-cta-gradient relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
            {/* Decorative blobs */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative">
              {/* Badge */}
              <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {ctaContent.badge}
              </span>

              {/* Heading */}
              <h2 className="mx-auto max-w-2xl font-['Outfit',sans-serif] text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {ctaContent.heading.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              {/* Subheading */}
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-orange-100 sm:text-lg">
                {ctaContent.subheading}
              </p>

              {/* Form */}
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3 sm:flex-row"
                >
                  <label htmlFor="as-cta-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="as-cta-email"
                    type="email"
                    required
                    placeholder={ctaContent.inputPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-xl border border-white/20 bg-white/20 px-5 py-3.5 text-sm text-white placeholder-white/60 outline-none backdrop-blur-sm transition-all focus:border-white/60 focus:bg-white/30"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-orange-600 shadow-md transition-all hover:bg-orange-50 hover:shadow-lg active:scale-95"
                  >
                    {ctaContent.buttonText}
                  </button>
                </form>
              ) : (
                <div className="mx-auto mt-8 max-w-md rounded-xl border border-white/30 bg-white/20 px-6 py-4 text-sm font-medium text-white backdrop-blur-sm">
                  You&apos;re in! Check your inbox — your trial link is on its way.
                </div>
              )}

              {/* Footnote */}
              <p className="mt-4 text-xs text-orange-200">{ctaContent.footnote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top row: brand + columns */}
          <div className="as-footer-cols grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  A
                </span>
                <span className="text-base font-bold text-slate-900">
                  {TEMPLATE_NAME}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                AI-powered sales automation for modern teams. Close more deals
                with less effort.
              </p>
            </div>

            {/* Link columns */}
            {footerColumns.map(([category, links]) => (
              <nav key={category} aria-label={`${category} links`}>
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
                  {category}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-500 transition-colors hover:text-orange-500"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom row */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} {TEMPLATE_NAME}. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={`${TEMPLATE_NAME} on ${social}`}
                  className="text-xs text-slate-400 transition-colors hover:text-orange-500"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
