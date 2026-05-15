import { staticFile } from "remotion";
import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { HERO_TAGLINE, ABOUT_SUBHEADING } from "./constants";

export const SLUG = "zentry";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#5724ff",
  accent: "#edff66",
  background: "#DFDFF0",
};

const brand = {
  tagline: "Zentry — Metagame Layer",
  bgColor: "#010101",
  accentColor: brandColors.accent,
};

const hook = {
  text: HERO_TAGLINE,
  subtitle: ABOUT_SUBHEADING,
  bgColor: "#010101",
  accentColor: brandColors.accent,
};

const features = {
  heading: "The Zentry Universe",
  features: [
    {
      icon: "🤖",
      title: "Radiant",
      description: "Cross-world AI Agent for elevated gameplay",
    },
    {
      icon: "🎨",
      title: "Zigma",
      description: "Anime & gaming-inspired NFT collection",
    },
    {
      icon: "🌐",
      title: "Nexus",
      description: "Gamified social hub for play and connection",
    },
  ],
  bgColor: "#010101",
  accentColor: brandColors.accent,
};

const cta = {
  ctaText: "Enter the universe",
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.accent,
  buttonTextColor: "#010101",
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/zentry/screens/hero-mobile.png"), caption: "Zentry Universe", device: "iphone" },
    { screenshotSrc: staticFile("templates/zentry/screens/about-mobile.png"), caption: "The Metagame", device: "iphone" },
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
    { screenshotSrc: staticFile("templates/zentry/screens/hero-desktop.png"), caption: "Enter the Universe", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("templates/zentry/screens/about-desktop.png"), caption: "About Zentry", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
