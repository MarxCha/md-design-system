import Link from "next/link";
import { Button } from "./ui/button";

/**
 * Hero — pieterkoopt.nl rebuild
 *
 * Source content (verified verbatim from rendered HTML):
 *   H1:    "Time changes everything. Except history."
 *   H2:    "Selling your painting? It starts here"
 *   Lede:  "No commission fees, personal guidance, and an honest offer within 48 hours."
 *
 * Distinctive elements visible in the original screenshot:
 *   - Sticky / index-card aesthetic floating above the canvas
 *   - Olive/sage canvas with charcoal type
 *   - Eyebrow tag in mono ("EST. 2025")
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-ink)]/10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-32 pt-20 md:grid-cols-12 md:gap-16 md:pb-44 md:pt-32">
        <div className="md:col-span-7">
          <span className="eyebrow text-[color:var(--color-ink)]/70">
            Selling paintings · since 2025
          </span>
          <h1 className="mt-6 max-w-[14ch] text-balance text-[color:var(--color-ink)]">
            Time changes everything.
            <br />
            <span className="italic text-[color:var(--color-ink)]/80">
              Except history.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--color-ink)]/85 md:text-lg">
            No commission fees, personal guidance, and an honest offer within 48
            hours. Pieter visits you in person — anywhere in the Netherlands.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href="/sell-your-painting">Sell your painting</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/about">Read more about Pieter</Link>
            </Button>
          </div>
        </div>

        {/* Sticky cards stack — recreates the index-card motif of the original */}
        <div className="md:col-span-5">
          <div className="relative h-full min-h-[22rem]">
            <StickyCard
              className="absolute left-0 top-0 -rotate-3"
              eyebrow="No fees"
              title="100% of the offer is yours."
              note="No commission. No surprises."
            />
            <StickyCard
              className="absolute right-2 top-16 rotate-2"
              eyebrow="At your home"
              title="Expert assessment, in person."
              note="We come to you, anywhere in NL."
            />
            <StickyCard
              className="absolute left-6 top-44 -rotate-1"
              eyebrow="48 hours"
              title="Fast, personal response."
              note="Reply within two working days."
            />
          </div>
        </div>
      </div>

      {/* Bottom rule with the H2 from the original */}
      <div className="border-t border-[color:var(--color-ink)]/10 bg-[color:var(--color-canvas-2)]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <h2 className="max-w-[16ch] text-balance text-[color:var(--color-ink)]">
            Selling your painting?{" "}
            <span className="italic">It starts here.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

function StickyCard({
  className,
  eyebrow,
  title,
  note,
}: {
  className?: string;
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <article
      className={`w-[19rem] rounded-[var(--radius-card)] bg-[color:var(--color-cream-soft)] p-6 shadow-[0_30px_60px_-25px_rgba(23,28,28,0.5)] ring-1 ring-[color:var(--color-ink)]/10 ${className ?? ""}`}
    >
      <span className="eyebrow text-[color:var(--color-ink)]/60">
        {eyebrow}
      </span>
      <h3 className="mt-3 text-balance text-[color:var(--color-ink)]">
        {title}
      </h3>
      <p className="mt-3 text-sm text-[color:var(--color-ink)]/70">{note}</p>
    </article>
  );
}
