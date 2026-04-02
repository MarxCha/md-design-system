// ─── AstroWind Template — Barrel Export ──────────────────────────────────────

// ── Foundation ───────────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ────────────
export { default as Navbar } from "./Navbar";
export { default as Hero } from "./Hero";
export { default as Features } from "./Features";
export { default as Stats } from "./Stats";
export { default as Steps } from "./Steps";
export { default as Pricing } from "./Pricing";
export { default as CTA } from "./CTA";

// ── Named components (Astrowind-prefixed — for use in other contexts) ──────────
export { default as AstrowindNavbar } from "./Navbar";
export { default as AstrowindHero } from "./Hero";
export { default as AstrowindFeatures } from "./Features";
export { default as AstrowindStats } from "./Stats";
export { default as AstrowindSteps } from "./Steps";
export { default as AstrowindPricing } from "./Pricing";
export { default as AstrowindCTA } from "./CTA";
