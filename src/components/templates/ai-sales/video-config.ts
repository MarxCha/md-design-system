import { staticFile } from "remotion";
import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME, heroContent, features } from "./constants";

export const SLUG = "ai-sales";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#F97316",
  accent: "#ffffff",
  background: "#0f172a",
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const hook = {
  text: heroContent.title.replace("\n", " "),
  subtitle: heroContent.subtitle,
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const featuresSlide = {
  heading: "Key Features",
  features: features.map((f) => ({
    icon: f.icon,
    title: f.title,
    description: f.description,
  })),
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const cta = {
  ctaText: "Start Free Trial",
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/ai-sales/screens/hero-mobile.png"), caption: "Hero", device: "iphone" },
    { screenshotSrc: staticFile("templates/ai-sales/screens/features-mobile.png"), caption: "Features", device: "iphone" },
  ],
  features: featuresSlide,
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
    { screenshotSrc: staticFile("templates/ai-sales/screens/hero-desktop.png"), caption: "Hero", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("templates/ai-sales/screens/features-desktop.png"), caption: "Features", device: "laptop", zoom: 1.4 },
  ],
  features: featuresSlide,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
