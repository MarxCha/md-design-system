"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navItems } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(".pu-nav-inner", { opacity: 0, y: -12 });
      gsap.to(".pu-nav-inner", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.05,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <header
      ref={containerRef}
      className="fixed inset-x-0 top-0 z-50"
      style={{ background: "rgba(12,10,26,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="pu-nav-inner mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{ background: "#7C3AED" }}
            aria-hidden="true"
          >
            P
          </span>
          <span className="font-display text-base font-semibold text-white">
            Page UI
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-white md:block"
          >
            Sign in
          </button>
          <button
            type="button"
            className="pu-btn-primary py-2 text-sm"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, #1e1b30 30%, #1e1b30 70%, transparent)" }}
        aria-hidden="true"
      />
    </header>
  );
}
