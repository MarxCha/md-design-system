/**
 * RentaSaaS — Video Composition Config
 *
 * Promotional videos for the rental management SaaS.
 * Screenshots captured from the running renta-saas app.
 */
import { staticFile } from "remotion";
import { type ProductDemoProps } from "../components/video/ProductDemo";

export const SLUG = "renta-saas";

/** Brand colors */
export const brandColors = {
  primary: "#4F46E5",    // Indigo
  accent: "#10B981",     // Emerald
  background: "#0F172A", // Slate-900
};

const brand = {
  tagline: "RentaSaaS",
  bgColor: brandColors.background,
  accentColor: brandColors.primary,
};

const hook = {
  text: "Administra tus rentas. Sin estrés fiscal.",
  subtitle: "Contratos, pagos y CFDI 4.0 en un solo lugar",
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const features = {
  heading: "Todo en una plataforma",
  features: [
    {
      icon: "🧾",
      title: "CFDI 4.0 automático",
      description: "Facturación electrónica integrada con el SAT",
    },
    {
      icon: "📊",
      title: "Dashboard en tiempo real",
      description: "Ocupación, ingresos y morosidad de un vistazo",
    },
    {
      icon: "👥",
      title: "Portal de inquilinos",
      description: "Tus inquilinos pagan y consultan facturas solos",
    },
  ],
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const cta = {
  ctaText: "Comienza gratis",
  url: "rentasaas.com",
  buttonColor: brandColors.primary,
};

/** Vertical reel (1080x1920) — Instagram/TikTok */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("screens/renta-saas/landing-hero-mobile.png"), caption: "Tu plataforma todo-en-uno", device: "iphone" },
    { screenshotSrc: staticFile("screens/renta-saas/landing-features-mobile.png"), caption: "6 herramientas integradas", device: "iphone" },
    { screenshotSrc: staticFile("screens/renta-saas/landing-pricing-mobile.png"), caption: "Planes desde $0/mes", device: "iphone" },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 3.5,
  featureDuration: 4,
  ctaDuration: 3,
};

/** Horizontal demo (1920x1080) — LinkedIn/Web */
export const horizontalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [
    { screenshotSrc: staticFile("screens/renta-saas/landing-hero-desktop.png"), caption: "Dashboard inteligente", device: "laptop", zoom: 1.4 },
    { screenshotSrc: staticFile("screens/renta-saas/landing-features-desktop.png"), caption: "Todo en una plataforma", device: "laptop", zoom: 1.4 },
  ],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
