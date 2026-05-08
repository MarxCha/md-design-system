import Link from "next/link";
import { Button } from "./ui/button";

/**
 * Bottom hero — recreates the dark/charcoal section with classical Dutch maritime
 * painting from the original. We use a placeholder linear gradient that matches the
 * dark olive→ink mood; production swaps for the real licensed image asset.
 *
 * Source content:
 *   H2:    "Selling a painting? Pieter arranges it."
 *   CTAs:  primary "Sell your painting" / secondary "Read more about Pieter"
 */
export function BottomHero() {
  return (
    <section
      aria-label="Selling a painting? Pieter arranges it."
      className="relative overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-cream)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,198,185,0.18),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(122,139,105,0.25),transparent_55%)]"
      />
      {/* Imagery placeholder — replace with real painting in production */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-[#2a2f2c]/0 via-[#1a1f1d] to-[#0c0f0e]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-[calc(var(--space-section)*1.4)]">
        <div className="max-w-3xl">
          <span className="eyebrow text-[color:var(--color-cream)]/70">
            City tour Dordrecht — by appointment
          </span>
          <h2 className="mt-4 text-[color:var(--color-cream)]">
            Selling a painting?{" "}
            <span className="italic">Pieter arranges it.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[color:var(--color-cream)]/85 leading-relaxed">
            One conversation. One honest offer. No fees taken from your sale.
            Send your painting in — Pieter handles the rest.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link href="/sell-your-painting">Sell your painting</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-[color:var(--color-cream)] hover:bg-[color:var(--color-cream)]/10">
              <Link href="/about">Read more about Pieter</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
