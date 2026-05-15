import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/process-section";
import { ValueCardsSection } from "@/components/value-cards-section";
import { BottomHero } from "@/components/bottom-hero";
import { SiteFooter } from "@/components/site-footer";

/**
 * Caso A3 — MD-Design custom rebuild of pieterkoopt.nl
 *
 * Composes the six sections that match the structure of the live site:
 *   1. Sticky header with primary CTA
 *   2. Hero with sticky-card stack
 *   3. 01/02/03 process steps
 *   4. Value cards
 *   5. Bottom hero (dark, with Dordrecht city tour mention)
 *   6. Footer with verified contact data
 *
 * Tokens come from caso-a-shadcn-rebuild/tokens.json (Firecrawl branding extract).
 *
 * NOT integrated into the main DS app on purpose — review-only artifact.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[color:var(--color-canvas)] text-[color:var(--color-ink)]">
      <SiteHeader />
      <HeroSection />
      <ProcessSection />
      <ValueCardsSection />
      <BottomHero />
      <SiteFooter />
    </main>
  );
}

export const metadata = {
  title: "Sell Your Painting Quickly & Safely | PieterKoopt® — rebuild",
  description:
    "Caso A3 rebuild — token-faithful reconstruction of pieterkoopt.nl using MD Design System primitives (Tailwind v4 + shadcn).",
};
