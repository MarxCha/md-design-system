"use client";

import { promoContent } from "./constants";

export default function PromoBar() {
  const { message, subMessage, countdown } = promoContent;

  return (
    <section
      id="promo"
      className="ec-promo-bar relative overflow-hidden py-14 sm:py-20"
      aria-label="Promotional offer"
    >
      {/* Amber gradient bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-amber-900/20 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Main message */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
          Limited Time Offer
        </p>
        <h2 className="ec-serif mb-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {message}
        </h2>
        <p className="mb-8 text-base text-amber-100">{subMessage}</p>

        {/* Countdown timer (static CSS-only display) */}
        <div className="mb-8 inline-flex items-center gap-1 rounded-2xl bg-white/15 px-6 py-4 backdrop-blur-sm" aria-label="Offer ends in">
          <div className="flex flex-col items-center px-3">
            <span className="ec-countdown-digit text-3xl font-bold tabular-nums text-white sm:text-4xl">
              {countdown.hours}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-amber-200">
              Hours
            </span>
          </div>
          <span className="pb-4 text-2xl font-bold text-amber-200" aria-hidden="true">:</span>
          <div className="flex flex-col items-center px-3">
            <span className="ec-countdown-digit text-3xl font-bold tabular-nums text-white sm:text-4xl">
              {countdown.minutes}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-amber-200">
              Minutes
            </span>
          </div>
          <span className="pb-4 text-2xl font-bold text-amber-200" aria-hidden="true">:</span>
          <div className="flex flex-col items-center px-3">
            <span className="ec-countdown-digit text-3xl font-bold tabular-nums text-white sm:text-4xl">
              {countdown.seconds}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-amber-200">
              Seconds
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-amber-700 no-underline shadow-lg transition-all hover:bg-amber-50 hover:shadow-xl active:scale-95"
          >
            Shop the Sale
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold tracking-wide text-white no-underline backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
          >
            View All Deals
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-amber-200">
          <span className="flex items-center gap-1.5 text-sm">
            <span aria-hidden="true">✓</span> Free Returns
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <span aria-hidden="true">✓</span> Secure Checkout
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <span aria-hidden="true">✓</span> Ships in 2–4 Days
          </span>
        </div>
      </div>
    </section>
  );
}
