import { staticFile } from "remotion";
import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME, heroContent, features } from "./constants";

export const SLUG = "page-ui";

/** Brand colors */
export const brandColors = {
  primary: "#7C3AED",
  accent: "#4F46E5",
  background: "#0c0a1a",
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

const videoFeatures = {
  heading: "Everything you need",
  features: features.map((f) => ({
    icon: f.icon,
    title: f.title,
    description: f.description,
  })),
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const cta = {
  ctaText: "Get Started Free",
  url: "pageui.dev",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/page-ui/screens/hero-mobile.png"), caption: "Hero", device: "iphone" },
    { screenshotSrc: staticFile("templates/page-ui/screens/features-mobile.png"), caption: "Features", device: "iphone" },
  ],
  features: videoFeatures,
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
    { screenshotSrc: staticFile("templates/page-ui/screens/hero-desktop.png"), caption: "Hero", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("templates/page-ui/screens/features-desktop.png"), caption: "Features", device: "laptop", zoom: 1.4 },
  ],
  features: videoFeatures,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
