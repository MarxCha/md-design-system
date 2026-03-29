/**
 * Video Tokens — Design tokens adapted for Remotion compositions.
 *
 * Remotion runs outside the browser CSS runtime, so we provide raw color
 * values, pixel sizes, and spring configs derived from the canonical
 * design tokens in src/lib/theme.ts.
 */

/* ─── Colors (raw HSL strings for CSS-in-JS) ─── */
export const vc = {
  // Primary — Deep Blue
  primary:    "hsl(213, 51%, 24%)",
  primary50:  "hsl(213, 60%, 96%)",
  primary100: "hsl(213, 55%, 90%)",
  primary200: "hsl(213, 52%, 78%)",
  primary400: "hsl(213, 51%, 46%)",
  primary700: "hsl(213, 55%, 18%)",
  primary800: "hsl(213, 58%, 12%)",
  primary900: "hsl(213, 60%, 8%)",

  // Secondary — Warm Amber
  secondary:    "hsl(38, 62%, 58%)",
  secondary50:  "hsl(38, 100%, 97%)",
  secondary100: "hsl(38, 90%, 90%)",
  secondary400: "hsl(38, 65%, 60%)",
  secondary700: "hsl(38, 58%, 36%)",

  // Accent — Emerald
  accent:    "hsl(160, 84%, 39%)",
  accent50:  "hsl(152, 76%, 96%)",
  accent400: "hsl(158, 64%, 52%)",
  accent700: "hsl(163, 94%, 24%)",

  // Neutrals
  background: "hsl(213, 20%, 98%)",
  foreground: "hsl(213, 40%, 10%)",
  muted:      "hsl(213, 15%, 94%)",
  mutedFg:    "hsl(213, 15%, 48%)",
  white:      "hsl(0, 0%, 100%)",
  black:      "hsl(0, 0%, 0%)",

  // Semantic
  destructive: "hsl(0, 84%, 60%)",
} as const;

/* ─── Typography (pixel values for Remotion) ─── */
export const vt = {
  fontFamily: {
    display: "'Instrument Sans', Georgia, serif",
    body:    "'DM Sans', system-ui, sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
  fontSize: {
    xs:   10,
    sm:   13,
    base: 16,
    md:   20,
    lg:   25,
    xl:   31,
    "2xl": 39,
    "3xl": 49,
    "4xl": 61,
    "5xl": 76,   // extra for video headlines
    "6xl": 96,   // extra for video headlines
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

/* ─── Spacing (px) ─── */
export const vs = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  6:  24,
  8:  32,
  12: 48,
  16: 64,
  24: 96,
  32: 128,
} as const;

/* ─── Border Radius (px) ─── */
export const vr = {
  sm:   6,
  md:   8,
  lg:   12,
  xl:   16,
  "2xl": 24,
  full: 9999,
} as const;

/* ─── Video Presets ─── */
export const VIDEO_FPS = 30;

export const VIDEO_SIZES = {
  vertical:   { width: 1080, height: 1920 },
  horizontal: { width: 1920, height: 1080 },
  square:     { width: 1080, height: 1080 },
} as const;

export type Orientation = keyof typeof VIDEO_SIZES;

/* ─── Remotion Spring Configs ─── */
export const springConfigs = {
  snappy:  { damping: 18, mass: 0.8, stiffness: 200 },
  smooth:  { damping: 20, mass: 1,   stiffness: 120 },
  bouncy:  { damping: 12, mass: 0.6, stiffness: 180 },
  gentle:  { damping: 26, mass: 1.2, stiffness: 80  },
  elastic: { damping: 10, mass: 0.5, stiffness: 220 },
} as const;

/* ─── Gradient Helpers ─── */
export const gradients = {
  primaryToAccent: `linear-gradient(135deg, ${vc.primary} 0%, ${vc.accent} 100%)`,
  primaryDark:     `linear-gradient(180deg, ${vc.primary900} 0%, ${vc.primary700} 100%)`,
  warmOverlay:     `linear-gradient(135deg, ${vc.secondary} 0%, ${vc.accent400} 100%)`,
  darkFade:        `linear-gradient(180deg, transparent 0%, ${vc.primary900} 100%)`,
  accentGlow:      `radial-gradient(ellipse at center, ${vc.accent400} 0%, transparent 70%)`,
} as const;
