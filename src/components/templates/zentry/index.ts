// ─── Zentry Template — Barrel Export ─────────────────────────────────────────

// ── Foundation ────────────────────────────────────────────────────────────────
export * from "./constants";
export * from "./utils";

// ── Components (internal names — match original filenames) ────────────────────
export { default as AnimatedTitle }  from "./AnimatedTitle";
export { default as Button }         from "./Button";
export { default as VideoPreview }   from "./VideoPreview";

// ── Named components (Zentry-prefixed — for use in other contexts) ────────────
export { default as ZentryNavbar }        from "./Navbar";
export { default as ZentryHero }          from "./Hero";
export { default as ZentryAbout }         from "./About";
export { default as ZentryFeatures }      from "./Features";
export { default as ZentryStory }         from "./Story";
export { default as ZentryContact }       from "./Contact";
export { default as ZentryFooter }        from "./Footer";
export { default as ZentryButton }        from "./Button";
export { default as ZentryAnimatedTitle } from "./AnimatedTitle";
export { default as ZentryVideoPreview }  from "./VideoPreview";

// ── BentoTilt / BentoCard — named exports from Features ──────────────────────
export { BentoTilt, BentoCard } from "./Features";
