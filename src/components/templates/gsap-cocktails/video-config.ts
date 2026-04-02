import { staticFile } from "remotion";
import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME, heroContent, features as featureData } from "./constants";

export const SLUG = "gsap-cocktails";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#D4A574",
  accent: "#722F37",
  background: "#0A0A0A",
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

const features = {
  heading: "The Experience",
  features: featureData.map((f) => ({
    icon: f.icon,
    title: f.title,
    description: f.description,
  })),
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
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
    { screenshotSrc: staticFile("templates/gsap-cocktails/screens/hero-mobile.png"), caption: "Where Mixology Meets Art", device: "iphone" },
    { screenshotSrc: staticFile("templates/gsap-cocktails/screens/menu-mobile.png"), caption: "Signature Cocktails", device: "iphone" },
    { screenshotSrc: staticFile("templates/gsap-cocktails/screens/experience-mobile.png"), caption: "The Experience", device: "iphone" },
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
    { screenshotSrc: staticFile("templates/gsap-cocktails/screens/hero-desktop.png"), caption: "Artisan Cocktail Bar", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("templates/gsap-cocktails/screens/menu-desktop.png"), caption: "Signature Cocktails", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
