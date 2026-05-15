"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navItems, heroContent } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const containerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useGSAP(
    () => {
      gsap.set(".as-nav-inner", { opacity: 0, y: -16 });
      gsap.to(".as-nav-inner", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <header
      ref={containerRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "as-nav-scrolled border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="as-nav-inner mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" aria-label="AI Sales home">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white"
            aria-hidden="true"
          >
            A
          </span>
          <span className="text-base font-bold text-slate-900">AISales</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-orange-500"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Sign in
          </button>
          <button
            type="button"
            className="as-btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            {heroContent.ctaPrimary}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex flex-col items-center justify-center gap-1.5 rounded-md p-2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-slate-700 transition-all duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            aria-hidden="true"
          />
          <span
            className={`block h-0.5 w-5 bg-slate-700 transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`}
            aria-hidden="true"
          />
          <span
            className={`block h-0.5 w-5 bg-slate-700 transition-all duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="border-t border-slate-100 bg-white px-4 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-sm font-medium text-slate-700 hover:text-orange-500"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700"
            >
              Sign in
            </button>
            <button
              type="button"
              className="as-btn-primary w-full rounded-lg py-2.5 text-sm font-semibold text-white"
            >
              {heroContent.ctaPrimary}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
