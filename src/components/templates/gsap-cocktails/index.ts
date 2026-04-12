// ─── GSAP Cocktails Template — Barrel Export ─────────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ──────
export { default as Navbar } from "./Navbar";
export { default as Hero } from "./Hero";
export { default as Cocktails } from "./Cocktails";
export { default as About } from "./About";
export { default as Art } from "./Art";
export { default as Menu } from "./Menu";
export { default as Contact } from "./Contact";

// ── Named components (GsapCocktails-prefixed — for use in other contexts) ────
export { default as GsapCocktailsNavbar } from "./Navbar";
export { default as GsapCocktailsHero } from "./Hero";
export { default as GsapCocktailsCocktails } from "./Cocktails";
export { default as GsapCocktailsAbout } from "./About";
export { default as GsapCocktailsArt } from "./Art";
export { default as GsapCocktailsMenu } from "./Menu";
export { default as GsapCocktailsContact } from "./Contact";
