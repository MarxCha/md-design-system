// ─── Page UI Template — Barrel Export ─────────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ──────
export { default as Hero } from "./Hero";
export { default as Features } from "./Features";
export { default as Pricing } from "./Pricing";
export { default as Testimonials } from "./Testimonials";
export { default as FAQ } from "./FAQ";
export { default as CTA } from "./CTA";
export { default as Navbar } from "./Navbar";

// ── Named components (PageUi-prefixed — for use in other contexts) ──────
export { default as PageUiHero } from "./Hero";
export { default as PageUiFeatures } from "./Features";
export { default as PageUiPricing } from "./Pricing";
export { default as PageUiTestimonials } from "./Testimonials";
export { default as PageUiFAQ } from "./FAQ";
export { default as PageUiCTA } from "./CTA";
export { default as PageUiNavbar } from "./Navbar";
