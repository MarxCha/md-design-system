import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME } from "./constants";
import { staticFile } from "remotion";

export const SLUG = "form-builder";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#4F46E5",
  accent: "#10B981",
  background: "#FFFFFF",
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const hook = {
  text: "Onboard users faster",
  subtitle: "A polished multi-step wizard for any flow",
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const features = {
  heading: "Built for conversion",
  features: [
    { icon: "✓", title: "4-step wizard", description: "Account, Profile, Preferences, Review" },
    { icon: "✓", title: "Inline validation", description: "Real-time feedback on every field" },
    { icon: "✓", title: "Accessible", description: "WCAG AA labels, ARIA, keyboard nav" },
  ] as Array<{ icon: string; title: string; description: string }>,
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const cta = {
  ctaText: "Use this template",
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/form-builder/screens/form-builder-mobile.png"), caption: "Multi-step Wizard", device: "iphone" },
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
    { screenshotSrc: staticFile("templates/form-builder/screens/form-builder-desktop.png"), caption: "Multi-step Form Wizard", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
