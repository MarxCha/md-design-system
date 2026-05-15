/**
 * MD Consultoría TI — Design Tokens (TypeScript)
 * Source of truth for programmatic access (GSAP, Framer Motion, etc.)
 * CSS variables in globals.css remain the canonical runtime values.
 */

export const colors = {
  // Primary — Deep Blue #1e3a5f
  primary: {
    DEFAULT: "hsl(213 51% 24%)",
    foreground: "hsl(0 0% 98%)",
    50:  "hsl(213 60% 96%)",
    100: "hsl(213 55% 90%)",
    200: "hsl(213 52% 78%)",
    300: "hsl(213 51% 62%)",
    400: "hsl(213 51% 46%)",
    500: "hsl(213 51% 36%)",
    600: "hsl(213 51% 24%)",   // DEFAULT
    700: "hsl(213 55% 18%)",
    800: "hsl(213 58% 12%)",
    900: "hsl(213 60% 8%)",
  },
  // Secondary — Warm Amber #d4a853
  secondary: {
    DEFAULT: "hsl(38 62% 58%)",
    foreground: "hsl(38 60% 10%)",
    50:  "hsl(38 100% 97%)",
    100: "hsl(38 90% 90%)",
    200: "hsl(38 80% 78%)",
    300: "hsl(38 70% 68%)",
    400: "hsl(38 65% 60%)",
    500: "hsl(38 62% 58%)",    // DEFAULT
    600: "hsl(38 60% 46%)",
    700: "hsl(38 58% 36%)",
    800: "hsl(38 55% 24%)",
    900: "hsl(38 52% 14%)",
  },
  // Accent — Emerald #10b981
  accent: {
    DEFAULT: "hsl(160 84% 39%)",
    foreground: "hsl(0 0% 98%)",
    50:  "hsl(152 76% 96%)",
    100: "hsl(149 80% 90%)",
    200: "hsl(152 76% 78%)",
    300: "hsl(156 72% 67%)",
    400: "hsl(158 64% 52%)",
    500: "hsl(160 84% 39%)",   // DEFAULT
    600: "hsl(161 94% 30%)",
    700: "hsl(163 94% 24%)",
    800: "hsl(163 88% 16%)",
    900: "hsl(164 86% 10%)",
  },
  // Semantic
  destructive: {
    DEFAULT: "hsl(0 84% 60%)",
    foreground: "hsl(0 0% 98%)",
  },
  muted: {
    DEFAULT: "hsl(213 15% 94%)",
    foreground: "hsl(213 15% 48%)",
  },
  background: "hsl(213 20% 98%)",
  foreground: "hsl(213 40% 10%)",
  card: {
    DEFAULT: "hsl(0 0% 100%)",
    foreground: "hsl(213 40% 10%)",
  },
  popover: {
    DEFAULT: "hsl(0 0% 100%)",
    foreground: "hsl(213 40% 10%)",
  },
  border: "hsl(213 20% 88%)",
  input:  "hsl(213 20% 88%)",
  ring:   "hsl(213 51% 24%)",
} as const;

export const spacing = {
  1:  "0.25rem",   // 4px
  2:  "0.5rem",    // 8px
  3:  "0.75rem",   // 12px
  4:  "1rem",      // 16px
  6:  "1.5rem",    // 24px
  8:  "2rem",      // 32px
  12: "3rem",      // 48px
  16: "4rem",      // 64px
  24: "6rem",      // 96px
  32: "8rem",      // 128px
} as const;

export const typography = {
  fontFamily: {
    display: "var(--font-instrument-sans), 'Instrument Sans', Georgia, serif",
    body:    "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
    mono:    "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
  },
  fontSize: {
    xs:   "0.64rem",    // 10.24px
    sm:   "0.8rem",     // 12.8px
    base: "1rem",       // 16px
    md:   "1.25rem",    // 20px
    lg:   "1.563rem",   // 25px
    xl:   "1.953rem",   // 31.25px
    "2xl": "2.441rem",  // 39px
    "3xl": "3.052rem",  // 48.8px
    "4xl": "3.815rem",  // 61px
  },
  fontWeight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    black:    900,
  },
  lineHeight: {
    tight:   1.2,
    snug:    1.3,
    normal:  1.5,
    relaxed: 1.65,
  },
} as const;

export const borderRadius = {
  sm:   "6px",
  md:   "8px",
  lg:   "12px",
  xl:   "16px",
  "2xl": "24px",
  full: "9999px",
} as const;

export const animation = {
  duration: {
    fast:  150,   // ms
    base:  300,
    slow:  500,
    xslow: 800,
  },
  easing: {
    out:     "cubic-bezier(0.16, 1, 0.3, 1)",
    inOut:   "cubic-bezier(0.45, 0, 0.55, 1)",
    spring:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  // GSAP-ready easing names
  gsap: {
    out:    "power3.out",
    in:     "power3.in",
    inOut:  "power3.inOut",
    spring: "elastic.out(1, 0.5)",
    back:   "back.out(1.7)",
  },
} as const;

export const breakpoints = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",
} as const;

/** Flat token export for GSAP/Framer interpolation */
export const tokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  animation,
  breakpoints,
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
