// ─── Zentry Template — Asset Paths & Shared Utilities ────────────────────────

const BASE = "/templates/zentry";

// ─── Video Assets ─────────────────────────────────────────────────────────────

/** Four looping background clips for the hero section (hero-1.mp4 … hero-4.mp4) */
export const heroVideos: string[] = [
  `${BASE}/videos/hero-1.mp4`,
  `${BASE}/videos/hero-2.mp4`,
  `${BASE}/videos/hero-3.mp4`,
  `${BASE}/videos/hero-4.mp4`,
];

/** Five feature clips for the bento grid (feature-1.mp4 … feature-5.mp4) */
export const featureVideos: string[] = [
  `${BASE}/videos/feature-1.mp4`,
  `${BASE}/videos/feature-2.mp4`,
  `${BASE}/videos/feature-3.mp4`,
  `${BASE}/videos/feature-4.mp4`,
  `${BASE}/videos/feature-5.mp4`,
];

// ─── Image Assets ─────────────────────────────────────────────────────────────

export const aboutImg           = `${BASE}/img/about.webp`;
export const contactImg1        = `${BASE}/img/contact-1.webp`;
export const contactImg2        = `${BASE}/img/contact-2.webp`;
export const entranceImg        = `${BASE}/img/entrance.webp`;
export const stonesImg          = `${BASE}/img/stones.webp`;
export const swordmanImg        = `${BASE}/img/swordman.webp`;
export const swordmanPartialImg = `${BASE}/img/swordman-partial.webp`;
export const logoImg            = `${BASE}/img/logo.png`;
export const jsmLogoImg         = `${BASE}/img/jsm-logo.png`;
export const playIcon           = `${BASE}/img/play.svg`;

/** Gallery images (gallery-1.webp … gallery-5.webp) */
export const galleryImages: string[] = [
  `${BASE}/img/gallery-1.webp`,
  `${BASE}/img/gallery-2.webp`,
  `${BASE}/img/gallery-3.webp`,
  `${BASE}/img/gallery-4.webp`,
  `${BASE}/img/gallery-5.webp`,
];

/** Contact images tuple — used side-by-side in the contact section */
export const contactImages: string[] = [
  `${BASE}/img/contact-1.webp`,
  `${BASE}/img/contact-2.webp`,
];

// ─── Audio Assets ─────────────────────────────────────────────────────────────

export const audioLoop = `${BASE}/audio/loop.mp3`;

// ─── Clip-path Helpers ────────────────────────────────────────────────────────

/**
 * Returns the correct GSAP-compatible clip-path string for the hero mini-video
 * expanding into full-screen on click.
 */
export function getHeroClipPath(isExpanded: boolean): string {
  if (isExpanded) {
    return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  }
  return "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)";
}

// ─── Math / Scroll Utilities ──────────────────────────────────────────────────

/**
 * Clamps a number between min and max.
 * Useful for mapping scroll progress to opacity / transform values.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Maps a value from one range [inMin, inMax] to another [outMin, outMax].
 * Useful for parallax / scroll-driven animations.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

// ─── Tilt Helpers ─────────────────────────────────────────────────────────────

export interface TiltTransform {
  rotateX: number;
  rotateY: number;
}

/**
 * Calculates tilt X/Y rotation from a mouse position relative to an element.
 * Pass the result directly to a `transform` style.
 */
export function calcTilt(
  mouseX: number,
  mouseY: number,
  rect: DOMRect,
  maxDeg: number = 12
): TiltTransform {
  const relX = mouseX - rect.left;
  const relY = mouseY - rect.top;
  const normX = relX / rect.width - 0.5; // -0.5 → 0.5
  const normY = relY / rect.height - 0.5; // -0.5 → 0.5
  return {
    rotateX: -normY * maxDeg,
    rotateY: normX * maxDeg,
  };
}

// ─── Class Name Helper ────────────────────────────────────────────────────────

/**
 * Minimal cx() — joins truthy class strings.
 * Mirrors what clsx/cn do without adding a dependency inside the template.
 */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
