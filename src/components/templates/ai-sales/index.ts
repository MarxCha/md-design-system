// ─── AI Sales Template — Barrel Export ───────────────────────────────────────

// ── Foundation ────────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ────────
export { default as Navbar } from "./Navbar";
export { default as Hero } from "./Hero";
export { default as Features } from "./Features";
export { default as HowItWorks } from "./HowItWorks";
export { default as SocialProof } from "./SocialProof";
export { default as Pricing } from "./Pricing";
export { default as CTA } from "./CTA";

// ── Named components (AiSales-prefixed — for use in other contexts) ───────
export { default as AiSalesNavbar } from "./Navbar";
export { default as AiSalesHero } from "./Hero";
export { default as AiSalesFeatures } from "./Features";
export { default as AiSalesHowItWorks } from "./HowItWorks";
export { default as AiSalesSocialProof } from "./SocialProof";
export { default as AiSalesPricing } from "./Pricing";
export { default as AiSalesCTA } from "./CTA";
