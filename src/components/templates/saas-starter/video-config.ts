import { staticFile } from "remotion";
import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME, heroContent, features as featureData } from "./constants";

export const SLUG = "saas-starter";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#4F46E5",
  accent: "#06B6D4",
  background: "#FAFAFA",
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: "#0F172A",
  accentColor: brandColors.primary,
};

const hook = {
  text: "Build faster. Ship smarter.",
  subtitle: heroContent.badge,
  bgColor: "#0F172A",
  accentColor: brandColors.accent,
};

const features = {
  heading: "Everything you need",
  features: featureData.slice(0, 3).map((f) => ({
    icon: f.icon,
    title: f.title,
    description: f.description,
  })),
  bgColor: "#0F172A",
  accentColor: brandColors.accent,
};

const cta = {
  ctaText: heroContent.ctaPrimary,
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/saas-starter/screens/hero-mobile.png"), caption: "Build faster. Ship smarter.", device: "iphone" },
    { screenshotSrc: staticFile("templates/saas-starter/screens/features-mobile.png"), caption: "Everything you need", device: "iphone" },
    { screenshotSrc: staticFile("templates/saas-starter/screens/pricing-mobile.png"), caption: "Simple pricing", device: "iphone" },
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
    { screenshotSrc: staticFile("templates/saas-starter/screens/hero-desktop.png"), caption: "Build faster. Ship smarter.", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("templates/saas-starter/screens/pricing-desktop.png"), caption: "Simple pricing", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
