"use client";

import { useState } from "react";
import { navLinks } from "./constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="ss-navbar sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 text-slate-900 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            A
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900">Acme</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button type="button" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Sign in
          </button>
          <button type="button" className="ss-btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95">
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-5 bg-slate-700 transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-md transition-all duration-300 md:hidden ${menuOpen ? "max-h-64" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => scrollTo(link)}
              className="rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {link}
            </button>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
            <button type="button" className="rounded-md px-3 py-2 text-left text-sm font-medium text-slate-600 hover:text-slate-900">
              Sign in
            </button>
            <button type="button" className="ss-btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
