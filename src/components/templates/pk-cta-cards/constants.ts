// ─── PieterKoopt CTA-Cards Template — Constants & Content ──────────────────────
// Single source of truth. Verbatim from clones/pieterkoopt-2026-05-08/clone-spec/02-cta-cards.md.

export const TEMPLATE_SLUG = "pk-cta-cards";
export const TEMPLATE_NAME = "PieterKoopt CTA Cards (USP)";

export const ctaCardsContent = {
  headingLine1: "Selling your painting?",
  headingLine2: "It starts here",
  paragraph:
    "At Pieter Koopt®, your artwork takes centre stage: we treat each piece with respect and personal attention. Our goal is to offer a hassle-free sales process, so that the story of your artwork lives on.",
  cta: {
    label: "Read more about Pieter Koopt",
    href: "/about",
  },
  /* .uc-circles — 3 polaroid-style cards stacked physically. Scroll-driven rotate
   * + y:-50% per card cycles them through. Original has NO static left-column
   * USP stack — just heading + body + CTA. */
  circleCards: [
    {
      heading: "NO HIDDEN FEES",
      description: "You receive 100% of the offer.",
    },
    {
      heading: "EXPERT ASSESSMENT AT HOME",
      description: "We come to you and arrange everything.",
    },
    {
      heading: "FAST AND PERSONAL PROCESS",
      description: "A response to your submission within 48 hours.",
    },
  ],
} as const;

export const animation = {
  // Source: inline-gsap-blocks.js:402 + 406
  pinBreakpointMin: 992, // matches `if (window.innerWidth > 991)` guard
  rotationStep: 3, // k=3 per block 31 — `let r = 3`
  scrubEase: "power1.out",
} as const;
