// ─── PieterKoopt Stories-CTA Template — Constants & Content ───────────────────
// Single source of truth. Verbatim from clones/pieterkoopt-2026-05-08/clone-spec/04-stories-cta.md.

export const TEMPLATE_SLUG = "pk-stories-cta";
export const TEMPLATE_NAME = "PieterKoopt Stories CTA (final video + CTA)";

export const storiesCtaContent = {
  // Heading — split into a leading phrase + italic alt-heading word
  headingLead: "Every painting has a",
  headingAlt: "Story",
  // Paragraph (smart curly apostrophe verbatim from source HTML)
  paragraph:
    "Art is more than an object, it’s a story that lives on. Every painting holds a moment, a memory, an emotion. And stories like these deserve to be shared.",
  cta: {
    label: "See all stories",
    href: "/stories",
    ariaLabel: "staggering button",
  },
  video: {
    // AP-7: Vimeo asset 1138418107/1440p mirrored locally.
    src: "/templates/pk-stories-cta/stories-video.mp4",
    // Per source HTML: <video muted autoplay loop playsinline data-object-fit="cover">
    attrs: {
      muted: true,
      autoPlay: true,
      loop: true,
      playsInline: true,
    } as const,
  },
} as const;

export const animation = {
  // Source: inline-gsap-blocks.js:130 (block 16) — universal text reveal
  reveal: {
    headingDuration: 0.6,
    headingStagger: 0.15,
    paragraphDuration: 0.8,
    paragraphStagger: 0.1,
    extraDuration: 0.7, // [data-gsap-text="true"] non-split fade
    yOffset: 20,
    easing: "cubic-bezier(.509, .188, .041, .989)", // for split lines
    extraEasing: "power2.out", // for non-split data-gsap-text targets
    triggerStart: "top 90%",
  },
  // Source: inline-gsap-blocks.js:288 (block 25) — IntersectionObserver play/pause
  videoIO: {
    threshold: 0.25,
  },
} as const;
