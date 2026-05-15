/**
 * theme-bridge.ts — Connects design system tokens to docs-kit formats
 *
 * Provides CSS variables and token values for slide decks, one-pagers,
 * and other document formats, ensuring brand consistency.
 */

import { colors, typography, spacing, borderRadius, animation } from "../lib/theme";
import type { SlideLayout } from "./types";

export interface DocsTheme {
  colors: {
    primary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
  };
  fonts: {
    display: string;
    body: string;
    mono: string;
  };
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  animation: typeof animation;
}

/** Default theme derived from the design system tokens */
export const defaultDocsTheme: DocsTheme = {
  colors: {
    primary: colors.primary.DEFAULT,
    accent: colors.accent.DEFAULT,
    background: colors.background,
    foreground: colors.foreground,
    muted: colors.muted.DEFAULT,
    mutedForeground: colors.muted.foreground,
    border: colors.border,
  },
  fonts: {
    display: typography.fontFamily.display,
    body: typography.fontFamily.body,
    mono: typography.fontFamily.mono,
  },
  spacing,
  borderRadius,
  animation,
};

/** Layout-specific theme overrides */
export const layoutThemes: Record<SlideLayout, Partial<DocsTheme["colors"]>> = {
  "dark-tech": {
    background: "hsl(213 40% 6%)",
    foreground: "hsl(0 0% 95%)",
    muted: "hsl(213 20% 15%)",
    mutedForeground: "hsl(213 15% 60%)",
    border: "hsl(213 20% 20%)",
  },
  "clean-corporate": {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(213 40% 10%)",
    muted: "hsl(213 15% 96%)",
    mutedForeground: "hsl(213 15% 48%)",
    border: "hsl(213 20% 90%)",
  },
  "bold-creative": {
    background: "hsl(38 62% 58%)",
    foreground: "hsl(213 40% 6%)",
    primary: "hsl(213 51% 24%)",
    accent: "hsl(0 0% 100%)",
    muted: "hsl(38 50% 48%)",
    mutedForeground: "hsl(38 30% 20%)",
    border: "hsl(38 40% 45%)",
  },
};

/** Resolve full theme for a given layout */
export function resolveTheme(layout: SlideLayout, overrides?: Partial<DocsTheme["colors"]>): DocsTheme {
  return {
    ...defaultDocsTheme,
    colors: {
      ...defaultDocsTheme.colors,
      ...layoutThemes[layout],
      ...overrides,
    },
  };
}

/** Generate inline CSS variables string for embedding in HTML */
export function themeToCssVars(theme: DocsTheme): string {
  return [
    `--dk-primary: ${theme.colors.primary};`,
    `--dk-accent: ${theme.colors.accent};`,
    `--dk-bg: ${theme.colors.background};`,
    `--dk-fg: ${theme.colors.foreground};`,
    `--dk-muted: ${theme.colors.muted};`,
    `--dk-muted-fg: ${theme.colors.mutedForeground};`,
    `--dk-border: ${theme.colors.border};`,
    `--dk-font-display: ${theme.fonts.display};`,
    `--dk-font-body: ${theme.fonts.body};`,
    `--dk-font-mono: ${theme.fonts.mono};`,
    `--dk-radius-sm: ${theme.borderRadius.sm};`,
    `--dk-radius-md: ${theme.borderRadius.md};`,
    `--dk-radius-lg: ${theme.borderRadius.lg};`,
  ].join("\n  ");
}
