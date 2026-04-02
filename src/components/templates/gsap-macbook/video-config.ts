import { staticFile } from "remotion";
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
    { screenshotSrc: staticFile("templates/gsap-macbook/screens/hero-mobile.png"), caption: "MacBook Pro", device: "iphone" },
    { screenshotSrc: staticFile("templates/gsap-macbook/screens/features-mobile.png"), caption: "Pro Features", device: "iphone" },
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
    { screenshotSrc: staticFile("templates/gsap-macbook/screens/hero-desktop.png"), caption: "Supercharged for pros", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("templates/gsap-macbook/screens/features-desktop.png"), caption: "Pro Features", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
