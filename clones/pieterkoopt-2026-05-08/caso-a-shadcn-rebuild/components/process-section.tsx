/**
 * Process steps section — verbatim copy from rendered HTML
 *
 *   01  Upload your Artwork
 *       Take clear photos, tell the story behind your artwork and upload
 *       everything easily via our platform.
 *
 *   02  Review by Pieter
 *       We carefully review your submission. If your painting qualifies,
 *       we'll arrange a personal viewing. You will hear from us within 48 hours.
 *
 *   03  Personal Appointment
 *       If your artwork is suitable, we will schedule an appointment.
 *       Pieter will visit you together with a specialist and give you a
 *       fair offer straight away.
 */

const STEPS = [
  {
    n: "01",
    title: "Upload your Artwork",
    body: "Take clear photos, tell the story behind your artwork and upload everything easily via our platform.",
  },
  {
    n: "02",
    title: "Review by Pieter",
    body: "We carefully review your submission. If your painting qualifies, we'll arrange a personal viewing. You will hear from us within 48 hours.",
  },
  {
    n: "03",
    title: "Personal Appointment",
    body: "If your artwork is suitable, we will schedule an appointment. Pieter will visit you together with a specialist and give you a fair offer straight away.",
  },
];

export function ProcessSection() {
  return (
    <section className="border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-canvas)] py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-3xl">
          <span className="eyebrow text-[color:var(--color-ink)]/60">
            How it works
          </span>
          <h2 className="mt-4 text-balance text-[color:var(--color-ink)]">
            Selling paintings <em>without</em> the hassle.
          </h2>
        </header>

        <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.n} className="group relative">
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="font-[family-name:var(--font-mono)] text-5xl font-light text-[color:var(--color-ink)]/30"
                >
                  {s.n}
                </span>
                <h3 className="text-[color:var(--color-ink)]">{s.title}</h3>
              </div>
              <p className="mt-4 max-w-md text-[color:var(--color-ink)]/80 leading-relaxed">
                {s.body}
              </p>
              {i < STEPS.length - 1 ? (
                <div
                  aria-hidden
                  className="mt-8 h-px w-full bg-[color:var(--color-ink)]/15 md:hidden"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
