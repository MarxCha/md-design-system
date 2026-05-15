import { staticFile } from "remotion";
import { type ProductDemoProps } from "@/components/video/ProductDemo";

export const SLUG = "gsap-cocktails";
const TEMPLATE_NAME = "Velvet Pour — Cocktail Bar";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#e7d393",
  accent: "#722F37",
  background: "#000000",
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const hook = {
  text: "Where Mixology Meets Art",
  subtitle: "Hand-crafted cocktails with locally sourced ingredients",
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const features = {
  heading: "The Experience",
  features: [
    { icon: "🍸", title: "Classic Mojito", description: "Simple ingredients, bold flavor" },
    { icon: "🌿", title: "Fresh Ingredients", description: "Handpicked from local markets" },
    { icon: "✨", title: "Bartending Artistry", description: "Crafted with passion and precision" },
  ],
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const cta = {
  ctaText: "View Cocktails",
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/gsap-cocktails/screens/gsap-cocktails-mobile.png"), caption: "Where Mixology Meets Art", device: "iphone" },
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
    { screenshotSrc: staticFile("templates/gsap-cocktails/screens/gsap-cocktails-desktop.png"), caption: "Velvet Pour — Cocktail Bar", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
