import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME } from "./constants";

export const SLUG = "pk-hero";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#000000",
  accent: "#ffffff",
  background: "#000000",
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const hook = {
  text: "TODO: compelling hook",
  subtitle: "TODO: subtitle",
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const features = {
  heading: "Features",
  features: [] as Array<{ icon: string; title: string; description: string }>,
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const cta = {
  ctaText: "Learn more",
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.accent,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [],
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
  screens: [],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
