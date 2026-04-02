"use client";

import { useState } from "react";
import { navItems } from "./constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  return (
    <header className="ec-navbar sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 no-underline" aria-label="Home">
          <span className="ec-logo-mark flex h-8 w-8 items-center justify-center rounded-sm bg-stone-900 text-sm font-bold text-white tracking-widest">
            M
          </span>
          <span className="hidden text-base font-semibold tracking-[0.15em] uppercase text-stone-900 sm:inline">
            Maison
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium tracking-wide text-stone-500 transition-colors hover:text-stone-900 no-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Cart */}
          <button
            type="button"
            aria-label={`Cart — ${cartCount} items`}
            className="ec-cart-btn relative flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="ec-cart-badge absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            type="button"
            className="ec-btn-ghost rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition-all hover:bg-stone-100"
          >
            Sign in
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label={`Cart — ${cartCount} items`}
            className="ec-cart-btn relative flex h-9 w-9 items-center justify-center rounded-full text-stone-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="ec-cart-badge absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-stone-700 transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-stone-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-stone-700 transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-stone-100 bg-white/98 transition-all duration-300 md:hidden ${menuOpen ? "max-h-64" : "max-h-0"}`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-700 no-underline transition-colors hover:bg-stone-50 hover:text-stone-900"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 border-t border-stone-100 pt-3">
            <button type="button" className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-stone-600 hover:bg-stone-50">
              Sign in
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
