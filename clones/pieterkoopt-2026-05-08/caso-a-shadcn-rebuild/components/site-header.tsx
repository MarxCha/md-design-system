import Link from "next/link";
import { Button } from "./ui/button";

const NAV = [
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
  { label: "Stories", href: "/stories" },
  { label: "City tour", href: "/stadstour" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[color:var(--color-ink)]/10 bg-[color:var(--color-canvas)]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="PieterKoopt — home"
          className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[color:var(--color-ink)]"
        >
          PieterKoopt®
        </Link>
        <nav className="hidden gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[color:var(--color-ink)]/80 transition-colors hover:text-[color:var(--color-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="https://wa.me/31653292939"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-[color:var(--color-ink)]/80 transition-colors hover:text-[color:var(--color-ink)] sm:inline"
          >
            WhatsApp
          </Link>
          <Button asChild variant="primary" size="sm">
            <Link href="/sell-your-painting">Sell your painting</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
