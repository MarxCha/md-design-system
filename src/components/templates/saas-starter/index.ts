// ─── SaaS Starter Template — Barrel Export ─────────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ──────
export { default as Navbar } from "./Navbar";
export { default as Hero } from "./Hero";
export { default as Features } from "./Features";
export { default as Pricing } from "./Pricing";
export { default as Testimonials } from "./Testimonials";
export { default as CTA } from "./CTA";
export { default as Footer } from "./Footer";

// ── Named components (SaasStarter-prefixed — for use in other contexts) ────
export { default as SaasStarterNavbar } from "./Navbar";
export { default as SaasStarterHero } from "./Hero";
export { default as SaasStarterFeatures } from "./Features";
export { default as SaasStarterPricing } from "./Pricing";
export { default as SaasStarterTestimonials } from "./Testimonials";
export { default as SaasStarterCTA } from "./CTA";
export { default as SaasStarterFooter } from "./Footer";
