/**
 * Value cards — captures the three benefit cards from the live site.
 *
 * Source (verbatim from rendered HTML):
 *   - "No commission fees" / "100% of the offer is yours."
 *   - "Expert assessment at home" / "We come to you and arrange everything."
 *   - "Fast and personal process" / "A response to your submission within 48 hours."
 */

const VALUES = [
  {
    title: "No commission fees",
    body: "100% of the offer is yours. No surprises, no fine print.",
  },
  {
    title: "Expert assessment at home",
    body: "We come to you. Pieter and a specialist evaluate your painting in person.",
  },
  {
    title: "Fast and personal process",
    body: "A response to your submission within 48 hours.",
  },
];

export function ValueCardsSection() {
  return (
    <section className="bg-[color:var(--color-canvas-2)] py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-2xl">
          <span className="eyebrow text-[color:var(--color-ink)]/60">
            Every painting has a story
          </span>
          <h2 className="mt-4 text-[color:var(--color-ink)]">
            Why owners choose us.
          </h2>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <article
              key={v.title}
              className="group rounded-[var(--radius-card)] bg-[color:var(--color-cream-soft)] p-8 ring-1 ring-[color:var(--color-ink)]/10 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full rounded-[calc(var(--radius-card)-4px)] bg-[color:var(--color-ink)]/[0.06]" />
              <h3 className="mt-6 text-[color:var(--color-ink)]">{v.title}</h3>
              <p className="mt-3 text-[color:var(--color-ink)]/75 leading-relaxed">
                {v.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
