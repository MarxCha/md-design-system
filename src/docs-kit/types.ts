/**
 * docs-kit — Shared Types for Document & Presentation Toolkit
 *
 * Used by slide-deck, one-pager, and notebook-pack generators.
 */

// ─── Slide Deck ────────────────────────────────────────────────────────────

export type SlideLayout = "dark-tech" | "clean-corporate" | "bold-creative";

export interface SlideBase {
  id: string;
  notes?: string;
}

export interface TitleSlide extends SlideBase {
  type: "title";
  title: string;
  subtitle?: string;
  logo?: string;
}

export interface ContentSlide extends SlideBase {
  type: "content";
  title: string;
  bullets: string[];
  image?: string;
}

export interface ImageSlide extends SlideBase {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  fit?: "cover" | "contain";
}

export interface StatsSlide extends SlideBase {
  type: "stats";
  title: string;
  stats: Array<{
    value: string;
    label: string;
    delta?: string;
  }>;
}

export interface QuoteSlide extends SlideBase {
  type: "quote";
  quote: string;
  author: string;
  role?: string;
}

export interface CTASlide extends SlideBase {
  type: "cta";
  title: string;
  subtitle?: string;
  buttonText?: string;
  url?: string;
}

export type Slide =
  | TitleSlide
  | ContentSlide
  | ImageSlide
  | StatsSlide
  | QuoteSlide
  | CTASlide;

export interface SlideDeckConfig {
  title: string;
  subtitle?: string;
  author: string;
  company: string;
  date: string;
  layout: SlideLayout;
  slides: Slide[];
  logo?: string;
  brandColors?: {
    primary: string;
    accent: string;
    background: string;
    foreground: string;
  };
}

// ─── One-Pager ─────────────────────────────────────────────────────────────

export interface OnePagerSection {
  title: string;
  content: string;
  icon?: string;
}

export interface OnePagerConfig {
  title: string;
  subtitle: string;
  company: string;
  date: string;
  logo?: string;
  heroImage?: string;
  tagline: string;
  sections: OnePagerSection[];
  stats?: Array<{ value: string; label: string }>;
  cta?: { text: string; url: string };
  brandColors?: {
    primary: string;
    accent: string;
    background: string;
    foreground: string;
  };
}

// ─── Notebook Pack (NotebookLM) ────────────────────────────────────────────

export type NotebookDocType =
  | "overview"
  | "technical"
  | "features"
  | "roadmap"
  | "faq";

export interface NotebookDoc {
  type: NotebookDocType;
  title: string;
  content: string;
}

export interface NotebookPackConfig {
  projectName: string;
  projectSlug: string;
  description: string;
  docs: NotebookDoc[];
  metadata?: {
    version?: string;
    audience?: string;
    generatedAt?: string;
  };
}

// ─── Shared ────────────────────────────────────────────────────────────────

export type DocsKitFormat = "slide-deck" | "one-pager" | "notebook-pack";

export interface DocsKitProject {
  slug: string;
  name: string;
  format: DocsKitFormat;
}
