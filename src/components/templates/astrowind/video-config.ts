import { staticFile } from "remotion";
import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME, heroContent, features } from "./constants";

export const SLUG = "astrowind";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#3B82F6",
  accent: "#10B981",
  background: "#FFFFFF",
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

const featuresConfig = {
  heading: "What you get",
  features: features.map((f) => ({
    icon: f.icon,
    title: f.title,
    description: f.description,
  })),
  bgColor: "#F8FAFC",
  accentColor: brandColors.primary,
};

const cta = {
  ctaText: heroContent.ctaPrimary,
  url: "astrowind.vercel.app",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/astrowind/screens/hero-mobile.png"), caption: "Hero", device: "iphone" },
    { screenshotSrc: staticFile("templates/astrowind/screens/features-mobile.png"), caption: "Features", device: "iphone" },
  ],
  features: featuresConfig,
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
    { screenshotSrc: staticFile("templates/astrowind/screens/hero-desktop.png"), caption: "Hero", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("templates/astrowind/screens/features-desktop.png"), caption: "Features", device: "laptop", zoom: 1.4 },
  ],
  features: featuresConfig,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
