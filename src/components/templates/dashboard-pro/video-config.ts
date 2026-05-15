import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME, kpiData, sidebarLinks } from "./constants";
import { staticFile } from "remotion";

export const SLUG = "dashboard-pro";

/** Brand colors for video compositions */
export const brandColors = {
  primary:    "#3B82F6",
  accent:     "#10B981",
  background: "#0f172a",
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const hook = {
  text: "Your metrics. Instantly.",
  subtitle: "A SaaS admin dashboard built for speed and clarity.",
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const features = {
  heading: "Built for SaaS teams",
  features: [
    {
      icon: "📊",
      title: "Live KPIs",
      description: `${kpiData.length} real-time metrics with sparklines and trend indicators`,
    },
    {
      icon: "⚡",
      title: "Instant navigation",
      description: `${sidebarLinks.length}-section sidebar with active state and mobile collapse`,
    },
    {
      icon: "🎯",
      title: "GSAP entrance",
      description: "Staggered card animations driven by ScrollTrigger",
    },
  ],
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const cta = {
  ctaText: "See the template",
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/dashboard-pro/screens/dashboard-pro-mobile.png"), caption: "Live KPI Dashboard", device: "iphone" },
  ],
  features,
  cta,
  brandDuration:   3,
  hookDuration:    2.5,
  screenDuration:  3.5,
  featureDuration: 4,
  ctaDuration:     3,
};

/** Horizontal demo (1920x1080) */
export const horizontalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("templates/dashboard-pro/screens/dashboard-pro-desktop.png"), caption: "SaaS Admin Dashboard", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration:   3,
  hookDuration:    2.5,
  screenDuration:  4,
  featureDuration: 4,
  ctaDuration:     3,
};
