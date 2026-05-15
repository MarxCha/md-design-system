// ─── GSAP MacBook Template — Barrel Export ─────────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ──────
export { default as Hero } from "./Hero";
export { default as Features } from "./Features";
export { default as Performance } from "./Performance";
export { default as Display } from "./Display";
export { default as Specs } from "./Specs";
export { default as Footer } from "./Footer";

// ── Named components (GsapMacbook-prefixed — for use in other contexts) ─
export { default as GsapMacbookHero } from "./Hero";
export { default as GsapMacbookFeatures } from "./Features";
export { default as GsapMacbookPerformance } from "./Performance";
export { default as GsapMacbookDisplay } from "./Display";
export { default as GsapMacbookSpecs } from "./Specs";
export { default as GsapMacbookFooter } from "./Footer";
