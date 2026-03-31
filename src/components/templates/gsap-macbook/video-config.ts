import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME, heroContent, features as featureData } from "./constants";

export const SLUG = "gsap-macbook";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#3b82f6",
  accent: "#a855f7",
  background: "#000000",
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const hook = {
  text: heroContent.subtitle,
  subtitle: heroContent.tagline,
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const features = {
  heading: "Pro Features",
  features: featureData.map((f) => ({
    icon: f.icon,
    title: f.title,
    description: f.description,
  })),
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
    // Populate after: npm run template:screenshot -- --slug=gsap-macbook
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
    // Populate after: npm run template:screenshot -- --slug=gsap-macbook
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
