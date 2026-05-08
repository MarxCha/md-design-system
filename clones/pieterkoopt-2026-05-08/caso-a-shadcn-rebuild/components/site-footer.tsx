import Link from "next/link";

/**
 * Site footer — verbatim contact data extracted by Firecrawl Cloud (Caso C3).
 *   address: Johan de Wittstraat 33, 3311 KG Dordrecht
 *   phone:   +31 6 53 29 29 39
 *   email:   info@pieterkoopt.nl
 *   social:  IG, TikTok, Google Maps
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--color-ink)]/10 bg-[color:var(--color-canvas)] py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-ink)]">
            PieterKoopt®
          </span>
          <p className="mt-3 max-w-sm text-sm text-[color:var(--color-ink)]/75">
            Selling a painting? Pieter arranges it. Honest offers within 48
            hours, anywhere in the Netherlands.
          </p>
        </div>
        <div>
          <span className="eyebrow text-[color:var(--color-ink)]/60">
            Contact
          </span>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--color-ink)]/85">
            <li>
              <a className="hover:underline" href="tel:+31653292939">
                +31 6 53 29 29 39
              </a>
            </li>
            <li>
              <a className="hover:underline" href="mailto:info@pieterkoopt.nl">
                info@pieterkoopt.nl
              </a>
            </li>
            <li>
              <a
                className="hover:underline"
                href="https://wa.me/31653292939"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span className="eyebrow text-[color:var(--color-ink)]/60">
            Visit
          </span>
          <address className="mt-3 not-italic text-sm leading-relaxed text-[color:var(--color-ink)]/85">
            Johan de Wittstraat 33
            <br />
            3311 KG Dordrecht
          </address>
          <div className="mt-5 flex gap-4 text-sm">
            <Link
              className="hover:underline"
              href="https://instagram.com/pieterkoopt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
            <Link
              className="hover:underline"
              href="https://www.tiktok.com/@pieterkoopt"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </Link>
            <Link
              className="hover:underline"
              href="https://maps.app.goo.gl/gGH6CHMic8usXeKUA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-[color:var(--color-ink)]/10 px-6 pt-6 text-xs text-[color:var(--color-ink)]/60">
        <span>© 2026 PieterKoopt B.V. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms-conditions" className="hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
