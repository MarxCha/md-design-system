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
    // Populate after: npm run template:screenshot -- --slug=saas-starter
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
    // Populate after: npm run template:screenshot -- --slug=saas-starter
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
