// ─── iPhone 15 Pro Template — Barrel Export ─────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────────
export * from "./constants";
export * from "./utils";

// ── Components (internal names — for use within the template page) ──────────
export { default as Navbar } from "./Navbar";
export { default as Hero } from "./Hero";
export { default as Highlights } from "./Highlights";
export { default as Features } from "./Features";
export { default as HowItWorks } from "./HowItWorks";
export { default as Footer } from "./Footer";

// ── Named components (IPhone15-prefixed — for use in other contexts) ────────
export { default as IPhone15Navbar } from "./Navbar";
export { default as IPhone15Hero } from "./Hero";
export { default as IPhone15Highlights } from "./Highlights";
export { default as IPhone15Features } from "./Features";
export { default as IPhone15HowItWorks } from "./HowItWorks";
export { default as IPhone15Footer } from "./Footer";
