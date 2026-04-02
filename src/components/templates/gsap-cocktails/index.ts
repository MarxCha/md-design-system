// ─── GSAP Cocktails Template — Barrel Export ─────────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ──────
export { default as Hero } from "./Hero";
export { default as About } from "./About";
export { default as Menu } from "./Menu";
export { default as Experience } from "./Experience";
export { default as Gallery } from "./Gallery";
export { default as CTA } from "./CTA";

// ── Named components (GsapCocktails-prefixed — for use in other contexts) ────
export { default as GsapCocktailsHero } from "./Hero";
export { default as GsapCocktailsAbout } from "./About";
export { default as GsapCocktailsMenu } from "./Menu";
export { default as GsapCocktailsExperience } from "./Experience";
export { default as GsapCocktailsGallery } from "./Gallery";
export { default as GsapCocktailsCTA } from "./CTA";
