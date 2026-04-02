import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME, heroContent, products } from "./constants";

export const SLUG = "ecommerce";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#1C1917",   // stone-900
  accent: "#D97706",    // amber-600
  background: "#FFFFFF",
  surface: "#F5F5F4",   // stone-100
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: brandColors.primary,
  accentColor: brandColors.accent,
};

const hook = {
  text: heroContent.title.replace("\n", " "),
  subtitle: heroContent.subtitle,
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const features = {
  heading: "Why Maison",
  features: [
    {
      icon: "✦",
      title: "Curated Selection",
      description: products.slice(0, 2).map((p) => p.name).join(" · "),
    },
    {
      icon: "◈",
      title: "Free Shipping",
      description: "On all orders over $99",
    },
    {
      icon: "◉",
      title: "30-Day Returns",
      description: "No questions asked",
    },
  ] as Array<{ icon: string; title: string; description: string }>,
  bgColor: brandColors.surface,
  accentColor: brandColors.accent,
};

const cta = {
  ctaText: "Shop the collection",
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
