/**
 * Slide Deck Layout Definitions
 *
 * 3 visual variants that control fonts, colors, and decorative elements.
 * Each layout maps to a set of Tailwind-compatible class strings.
 */

import type { SlideLayout } from "../types";

export interface LayoutClasses {
  /** Root wrapper */
  root: string;
  /** Title slide */
  titleBg: string;
  titleText: string;
  subtitleText: string;
  /** Content slides */
  contentBg: string;
  headingText: string;
  bodyText: string;
  bulletMarker: string;
  /** Stats */
  statValue: string;
  statLabel: string;
  statDelta: string;
  /** Quote */
  quoteText: string;
  quoteAuthor: string;
  /** CTA */
  ctaBg: string;
  ctaButton: string;
  /** Navigation */
  navDot: string;
  navDotActive: string;
  /** Decorative */
  accentBar: string;
  slideNumber: string;
}

export const layouts: Record<SlideLayout, LayoutClasses> = {
  "dark-tech": {
    root: "bg-[hsl(213_40%_6%)] text-[hsl(0_0%_95%)]",
    titleBg: "bg-[hsl(213_40%_6%)]",
    titleText: "text-[hsl(0_0%_98%)] font-black tracking-tight",
    subtitleText: "text-[hsl(213_15%_60%)] font-light tracking-wide",
    contentBg: "bg-[hsl(213_40%_6%)]",
    headingText: "text-[hsl(0_0%_98%)] font-bold",
    bodyText: "text-[hsl(213_15%_72%)]",
    bulletMarker: "text-[hsl(160_84%_39%)]",
    statValue: "text-[hsl(160_84%_39%)] font-black",
    statLabel: "text-[hsl(213_15%_60%)]",
    statDelta: "text-[hsl(160_84%_50%)]",
    quoteText: "text-[hsl(0_0%_90%)] italic",
    quoteAuthor: "text-[hsl(213_15%_60%)]",
    ctaBg: "bg-[hsl(213_40%_6%)]",
    ctaButton: "bg-[hsl(160_84%_39%)] text-[hsl(213_40%_6%)] font-semibold hover:bg-[hsl(160_84%_45%)]",
    navDot: "bg-[hsl(213_20%_25%)]",
    navDotActive: "bg-[hsl(160_84%_39%)]",
    accentBar: "bg-[hsl(160_84%_39%)]",
    slideNumber: "text-[hsl(213_15%_40%)]",
  },

  "clean-corporate": {
    root: "bg-white text-[hsl(213_40%_10%)]",
    titleBg: "bg-[hsl(213_51%_24%)]",
    titleText: "text-white font-bold tracking-tight",
    subtitleText: "text-[hsl(213_30%_80%)] font-light",
    contentBg: "bg-white",
    headingText: "text-[hsl(213_51%_24%)] font-bold",
    bodyText: "text-[hsl(213_20%_30%)]",
    bulletMarker: "text-[hsl(38_62%_58%)]",
    statValue: "text-[hsl(213_51%_24%)] font-black",
    statLabel: "text-[hsl(213_15%_48%)]",
    statDelta: "text-[hsl(160_84%_39%)]",
    quoteText: "text-[hsl(213_20%_25%)] italic",
    quoteAuthor: "text-[hsl(213_15%_48%)]",
    ctaBg: "bg-[hsl(213_51%_24%)]",
    ctaButton: "bg-[hsl(38_62%_58%)] text-white font-semibold hover:bg-[hsl(38_62%_50%)]",
    navDot: "bg-[hsl(213_20%_88%)]",
    navDotActive: "bg-[hsl(213_51%_24%)]",
    accentBar: "bg-[hsl(38_62%_58%)]",
    slideNumber: "text-[hsl(213_15%_70%)]",
  },

  "bold-creative": {
    root: "bg-[hsl(38_62%_58%)] text-[hsl(213_40%_6%)]",
    titleBg: "bg-[hsl(213_40%_6%)]",
    titleText: "text-[hsl(38_62%_58%)] font-black tracking-tighter",
    subtitleText: "text-[hsl(38_40%_80%)] font-light",
    contentBg: "bg-[hsl(38_100%_97%)]",
    headingText: "text-[hsl(213_40%_6%)] font-black",
    bodyText: "text-[hsl(213_30%_20%)]",
    bulletMarker: "text-[hsl(38_62%_45%)]",
    statValue: "text-[hsl(213_40%_6%)] font-black",
    statLabel: "text-[hsl(38_30%_30%)]",
    statDelta: "text-[hsl(160_84%_30%)]",
    quoteText: "text-[hsl(213_40%_6%)] italic",
    quoteAuthor: "text-[hsl(38_30%_30%)]",
    ctaBg: "bg-[hsl(213_40%_6%)]",
    ctaButton: "bg-[hsl(38_62%_58%)] text-[hsl(213_40%_6%)] font-bold hover:bg-[hsl(38_62%_65%)]",
    navDot: "bg-[hsl(38_40%_45%)]",
    navDotActive: "bg-[hsl(213_40%_6%)]",
    accentBar: "bg-[hsl(213_40%_6%)]",
    slideNumber: "text-[hsl(38_30%_35%)]",
  },
};

export function getLayout(name: SlideLayout): LayoutClasses {
  return layouts[name];
}
