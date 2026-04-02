// ─── E-Commerce Template — Barrel Export ─────────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ──────
export { default as Navbar } from "./Navbar";
export { default as Hero } from "./Hero";
export { default as Categories } from "./Categories";
export { default as ProductGrid } from "./ProductGrid";
export { default as PromoBar } from "./PromoBar";
export { default as CTA } from "./CTA";

// ── Named components (Ecommerce-prefixed — for use in other contexts) ────
export { default as EcommerceNavbar } from "./Navbar";
export { default as EcommerceHero } from "./Hero";
export { default as EcommerceCategories } from "./Categories";
export { default as EcommerceProductGrid } from "./ProductGrid";
export { default as EcommercePromoBar } from "./PromoBar";
export { default as EcommerceCTA } from "./CTA";
