// ─── GSAP MacBook Template — Constants & Content ───────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "gsap-macbook";
export const TEMPLATE_NAME = "GSAP MacBook";

/** Navigation items */
export const navItems: string[] = [];

/** Hero section content */
export const heroContent = {
  title: "MacBook Pro",
  subtitle: "Supercharged for pros.",
  tagline: "The most powerful MacBook Pro ever.",
};

/** Feature cards */
export const features = [
  {
    icon: "⚡",
    title: "M3 Pro & M3 Max",
    description:
      "Unprecedented performance and power efficiency in every task you throw at it.",
    value: "11-core",
    valueLabel: "CPU",
  },
  {
    icon: "🔋",
    title: "All-day battery",
    description:
      "Go all day — and then some — with up to 18 hours of battery life.",
    value: "18h",
    valueLabel: "Battery",
  },
  {
    icon: "🖥️",
    title: "Liquid Retina XDR",
    description:
      "The best display ever in a laptop. Stunning brightness, contrast, and color.",
    value: "120Hz",
    valueLabel: "ProMotion",
  },
];

/** Performance metrics for horizontal scroll section */
export const performanceMetrics = [
  { value: 11, unit: "cores", label: "CPU cores" },
  { value: 16, unit: "cores", label: "GPU cores" },
  { value: 36, unit: "GB", label: "Unified Memory" },
  { value: 22, unit: "hrs", label: "Battery life" },
];

/** Specs grid */
export const specs = [
  { label: "Chip", value: "Apple M3 Pro" },
  { label: "Memory", value: "18GB Unified" },
  { label: "Storage", value: "512GB SSD" },
  { label: "Battery", value: "Up to 18 hours" },
  { label: "Display", value: '14.2" Liquid Retina XDR' },
  { label: "Weight", value: "1.55 kg" },
  { label: "Ports", value: "3x Thunderbolt 4" },
  { label: "Refresh", value: "120Hz ProMotion" },
];
