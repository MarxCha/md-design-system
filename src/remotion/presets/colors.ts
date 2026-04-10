/**
 * Video color palettes — extends the DS tokens for Remotion compositions.
 * Adapted from editor-pro-max, rebranded for MD Consultoría.
 */
export const PALETTES = {
  dark: {
    bg: "#0a0a0a",
    surface: "#1a1a1a",
    text: "#ffffff",
    textMuted: "#a0a0a0",
    accent: "#10b981",
    accentAlt: "#06b6d4",
  },
  light: {
    bg: "#ffffff",
    surface: "#f5f5f5",
    text: "#0a0a0a",
    textMuted: "#6b7280",
    accent: "#2d5a8e",
    accentAlt: "#10b981",
  },
  vibrant: {
    bg: "#0f0f23",
    surface: "#1a1a3e",
    text: "#ffffff",
    textMuted: "#c4b5fd",
    accent: "#f43f5e",
    accentAlt: "#ec4899",
  },
  warm: {
    bg: "#1c1917",
    surface: "#292524",
    text: "#fef3c7",
    textMuted: "#d6d3d1",
    accent: "#f59e0b",
    accentAlt: "#ef4444",
  },
  cool: {
    bg: "#0c1222",
    surface: "#162032",
    text: "#e0f2fe",
    textMuted: "#94a3b8",
    accent: "#06b6d4",
    accentAlt: "#3b82f6",
  },
  neon: {
    bg: "#000000",
    surface: "#111111",
    text: "#ffffff",
    textMuted: "#888888",
    accent: "#00ff88",
    accentAlt: "#ff0080",
  },
  brand: {
    bg: "hsl(213, 60%, 8%)",
    surface: "hsl(213, 55%, 12%)",
    text: "#ffffff",
    textMuted: "hsl(213, 52%, 78%)",
    accent: "hsl(160, 84%, 39%)",
    accentAlt: "hsl(38, 62%, 58%)",
  },
} as const;

export type PaletteKey = keyof typeof PALETTES;
export type Palette = (typeof PALETTES)[PaletteKey];

export const GRADIENTS = {
  sunset: ["#f43f5e", "#f59e0b"],
  ocean: ["#06b6d4", "#3b82f6"],
  forest: ["#10b981", "#059669"],
  purple: ["#8b5cf6", "#6366f1"],
  fire: ["#ef4444", "#f59e0b"],
  midnight: ["hsl(213, 60%, 8%)", "hsl(213, 55%, 18%)"],
  aurora: ["#06b6d4", "#10b981", "#f59e0b"],
  brand: ["hsl(213, 51%, 24%)", "hsl(160, 84%, 39%)"],
} as const;

export type GradientKey = keyof typeof GRADIENTS;
