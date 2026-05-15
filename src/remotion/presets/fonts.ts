/**
 * Font system for Remotion — uses MD Consultoría DS fonts.
 * Loads via Google Fonts for Remotion's rendering engine.
 */
export const FONT_FAMILIES = {
  heading: "'Instrument Sans', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  display: "'Instrument Sans', Georgia, serif",
  elegant: "'Playfair Display', serif",
} as const;

export type FontFamilyKey = keyof typeof FONT_FAMILIES;

const loadedFonts = new Set<string>();

export const loadGoogleFont = (
  fontFamily: string,
  weights = "400;500;600;700;800;900",
) => {
  if (typeof document === "undefined") return;
  if (loadedFonts.has(fontFamily)) return;

  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:wght@${weights}&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
  loadedFonts.add(fontFamily);
};

export const loadDefaultFonts = () => {
  loadGoogleFont("Instrument Sans");
  loadGoogleFont("DM Sans");
  loadGoogleFont("JetBrains Mono", "400;500;700");
};
