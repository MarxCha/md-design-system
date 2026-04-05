/**
 * docs-kit — Document & Presentation Toolkit
 *
 * Barrel export for all docs-kit types, utilities, and components.
 */

// ─── Types ─────────────────────────────────────────────────────────────────
export type {
  Slide,
  TitleSlide,
  ContentSlide,
  ImageSlide,
  StatsSlide,
  QuoteSlide,
  CTASlide,
  SlideBase,
  SlideLayout,
  SlideDeckConfig,
  OnePagerSection,
  OnePagerConfig,
  NotebookDoc,
  NotebookDocType,
  NotebookPackConfig,
  DocsKitFormat,
  DocsKitProject,
} from "./types";

// ─── Theme Bridge ──────────────────────────────────────────────────────────
export {
  defaultDocsTheme,
  layoutThemes,
  resolveTheme,
  themeToCssVars,
  type DocsTheme,
} from "./theme-bridge";

// ─── Slide Deck ────────────────────────────────────────────────────────────
// ─── Slide Deck ────────────────────────────────────────────────────────────
export { SlideDeck } from "./slide-deck/SlideDeck";
export { getLayout, layouts } from "./slide-deck/layouts";
export { generateStandaloneHtml } from "./slide-deck/export-html";

// ─── One-Pager ─────────────────────────────────────────────────────────────
export { OnePager } from "./one-pager/OnePager";

// ─── Notebook Pack ─────────────────────────────────────────────────────────
export {
  generateNotebookPack,
  generateNotebookDocs,
  generateAudioSummary,
} from "./notebook-pack/generate";
