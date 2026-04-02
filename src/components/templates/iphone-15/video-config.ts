import { staticFile } from "remotion";
import { type ProductDemoProps } from "@/components/video/ProductDemo";

export const SLUG = "iphone-15";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#2997FF",
  accent: "#86868b",
  background: "#000000",
};

const brand = {
  tagline: "iPhone 15 Pro",
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const hook = {
  text: "Titanium. So strong. So light.",
  subtitle: "A17 Pro chip. Game-changing performance.",
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const features = {
  heading: "Pro Features",
  features: [
    {
      icon: "🔬",
      title: "A17 Pro Chip",
      description: "GPU 6-core, hardware-accelerated ray tracing",
    },
    {
      icon: "📷",
      title: "48MP Camera",
      description: "Pro camera system with 5x optical zoom",
    },
    {
      icon: "⚡",
      title: "Action Button",
      description: "Customizable shortcut, always within reach",
    },
  ],
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const cta = {
  ctaText: "Explore the design",
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/iphone-15/screens/hero-mobile.png"), caption: "Titanium", device: "iphone" },
    { screenshotSrc: staticFile("templates/iphone-15/screens/highlights-mobile.png"), caption: "Highlights", device: "iphone" },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 3.5,
  featureDuration: 4,
  ctaDuration: 3,
};

/** Horizontal demo (1920x1080) */
export const horizontalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/iphone-15/screens/hero-desktop.png"), caption: "Titanium design", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("templates/iphone-15/screens/highlights-desktop.png"), caption: "Pro highlights", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
