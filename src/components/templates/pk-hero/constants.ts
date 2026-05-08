// ─── PieterKoopt Hero Template — Constants & Content ───────────────────────────────
// Single source of truth. Verbatim from clones/pieterkoopt-2026-05-08/clone-spec/01-hero.md.

export const TEMPLATE_SLUG = "pk-hero";
export const TEMPLATE_NAME = "PieterKoopt Hero";

export const navItems: string[] = [];

export const heroContent = {
  callout: {
    line1: "VINCENT VAN GOGH — STERRENNACHT",
    line2: "1889",
  },
  titleLine1: "Time changes everything.",
  titleLine2: "Except history.",
  paragraph:
    "Want to sell a painting or collection? You can, with the respect it deserves! PieterKoopt® keeps the painting and its story alive.",
  cta: {
    label: "Sell your painting",
    href: "/sell-your-painting",
  },
  intro: {
    body: "For the best experience, we recommend turning on your sound.",
    primary: "With audio",
    secondary: "Without audio",
  },
} as const;

export const assets = {
  heroVideo: "/templates/pk-hero/videos/hero-vincent.mp4",
  introSignature: "/templates/pk-hero/images/intro-signature.lottie",
} as const;

export const animation = {
  customEase: "cubic-bezier(.87,0,.13,1)",
  splitTextEase: "cubic-bezier(.509,.188,.041,.989)",
  introPlayedKey: "pkIntroPlayed",
  initialClipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
  fullClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
} as const;
