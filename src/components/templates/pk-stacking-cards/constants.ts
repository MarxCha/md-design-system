// ─── PieterKoopt Stacking-Cards Template — Constants & Content ────────────────
// Single source of truth. Verbatim from clones/pieterkoopt-2026-05-08/clone-spec/03-stacking-cards.md.

export const TEMPLATE_SLUG = "pk-stacking-cards";
export const TEMPLATE_NAME = "PieterKoopt Stacking Cards (How It Works)";

export const stackingCardsContent = {
  headingLine1: "SELLING PAINTINGS",
  headingLine2: "WITHOUT THE HASSLE",
  paragraph:
    "At PieterKoopt®, we keep things simple, fast and transparent. Follow the steps below and we will take care of the rest.",
  steps: [
    {
      number: "01",
      headingLead: "Upload your",
      headingAlt: "Artwork",
      description:
        "Take clear photos, tell the story behind your artwork and upload everything easily via our platform.",
      videoSrc: "/templates/pk-stacking-cards/step-01.mp4",
    },
    {
      number: "02",
      headingLead: "Review",
      headingAlt: "by Pieter",
      description:
        "We carefully review your submission. If your painting qualifies, we'll arrange a personal viewing. You will hear from us within 48 hours.",
      videoSrc: "/templates/pk-stacking-cards/step-02.mp4",
    },
    {
      number: "03",
      headingLead: "personal",
      headingAlt: "appointment",
      description:
        "If your artwork is suitable, we will schedule an appointment. Pieter will visit you together with a specialist and give you a fair offer straight away.",
      videoSrc: "/templates/pk-stacking-cards/step-03.mp4",
    },
  ],
} as const;

export const animation = {
  // Source: inline-gsap-blocks.js:409 (block 32 — mwg_effect031)
  scale: 0.7,
  rotationX: 40,
  rotationZJitter: 10, // → 10 * (rand - 0.5) = range [-5°, +5°]
  ease: "power1.in",
  startDesktop: "top 20%",
  startMobile: "top 10%",
  mobileBreakpointMax: 991,
  fadeStart: "top -80%",
  fadeEndFraction: 0.2, // → 0.2 * window.innerHeight
} as const;
