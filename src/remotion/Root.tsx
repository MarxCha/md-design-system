import React from "react";
import { Composition, staticFile } from "remotion";
import { BrandReveal } from "../components/video/BrandReveal";
import { DeviceMockup } from "../components/video/DeviceMockup";
import { TextHook } from "../components/video/TextHook";
import { FeatureShowcase } from "../components/video/FeatureShowcase";
import { CTAEnd } from "../components/video/CTAEnd";
import {
  ProductDemo,
  calculateProductDemoDuration,
} from "../components/video/ProductDemo";
import { VIDEO_FPS, VIDEO_SIZES } from "../components/video/video-tokens";
import { templateConfigs } from "./registry";

/* ─── Shared config ─── */
const auditorBrand = {
  logoSrc: staticFile("logo.svg"),
  tagline: "Auditor Ciudadano",
};

const auditorHook = {
  text: "Reporta. Transparenta. Transforma.",
  subtitle: "Tu voz ciudadana, ahora digital",
};

const auditorFeatures = {
  heading: "Todo lo que necesitas",
  features: [
    {
      icon: "📸",
      title: "Evidencia visual",
      description: "Adjunta fotos y ubicacion GPS al reporte",
    },
    {
      icon: "📊",
      title: "Dashboard publico",
      description: "Metricas de transparencia en tiempo real",
    },
    {
      icon: "🔔",
      title: "Notificaciones",
      description: "Seguimiento del estado de tu reporte",
    },
  ],
};

const auditorCta = {
  ctaText: "Reporta ahora",
  url: "consultoriamd.com.mx",
};

/* ─── Vertical (Reel) — Solo pantallas iPhone ─── */
const auditorVerticalProps = {
  brand: auditorBrand,
  hook: auditorHook,
  screens: [
    {
      screenshotSrc: staticFile("screens/auditor-landing.png"),
      caption: "Landing profesional",
      device: "iphone" as const,
    },
    {
      screenshotSrc: staticFile("screens/auditor-splash.png"),
      caption: "Politica de privacidad",
      device: "iphone" as const,
    },
    {
      screenshotSrc: staticFile("screens/auditor-home.png"),
      caption: "Dashboard ciudadano",
      device: "iphone" as const,
    },
    {
      screenshotSrc: staticFile("screens/auditor-report.png"),
      caption: "Reporta en segundos",
      device: "iphone" as const,
    },
    {
      screenshotSrc: staticFile("screens/auditor-confirm.png"),
      caption: "Seguimiento en tiempo real",
      device: "iphone" as const,
    },
  ],
  features: auditorFeatures,
  cta: auditorCta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 3.5,
  featureDuration: 4,
  ctaDuration: 3,
};

/* ─── Horizontal (Web/Presentacion) — Solo pantallas laptop, con zoom ─── */
const auditorHorizontalProps = {
  brand: auditorBrand,
  hook: auditorHook,
  screens: [
    {
      screenshotSrc: staticFile("screens/citizen-landing-desktop.png"),
      caption: "Portal ciudadano",
      device: "laptop" as const,
      zoom: 1.6,
    },
  ],
  features: auditorFeatures,
  cta: auditorCta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};

/* ═══════════════════════════════════════════════════════════
   GUELAGUETZA CONNECT
   ═══════════════════════════════════════════════════════════ */

const guelaguetzaBrand = {
  logoSrc: staticFile("guelaguetza-logo.svg"),
  tagline: "Guelaguetza Connect",
  bgColor: "hsl(350, 70%, 12%)",
  accentColor: "hsl(30, 95%, 55%)",
};

const guelaguetzaHook = {
  text: "La Guelaguetza en tu bolsillo.",
  subtitle: "Julio 21-28, 2025 — Oaxaca, Mexico",
  bgColor: "hsl(350, 70%, 12%)",
  accentColor: "hsl(30, 95%, 55%)",
};

const guelaguetzaFeatures = {
  heading: "Todo en una app",
  features: [
    {
      icon: "🗺️",
      title: "Mapa interactivo",
      description: "Ubica eventos, comida y transporte en tiempo real",
    },
    {
      icon: "🎭",
      title: "Programa completo",
      description: "Todas las delegaciones, horarios y sedes",
    },
    {
      icon: "🛍️",
      title: "Tienda artesanal",
      description: "Productos oaxaquenos directo de artesanos",
    },
    {
      icon: "📸",
      title: "AR Guelaguetza",
      description: "Alebrijes 3D y experiencias de realidad aumentada",
    },
  ],
  bgColor: "hsl(350, 70%, 12%)",
  accentColor: "hsl(30, 95%, 55%)",
};

const guelaguetzaCta = {
  ctaText: "Descarga gratis",
  url: "consultoriamd.com.mx",
  bgGradient: "linear-gradient(180deg, hsl(350, 70%, 12%) 0%, hsl(350, 60%, 8%) 100%)",
  buttonColor: "hsl(30, 95%, 55%)",
};

/* ─── Vertical (Reel) — Solo iPhone ─── */
const guelaguetzaVerticalProps = {
  brand: guelaguetzaBrand,
  hook: guelaguetzaHook,
  screens: [
    {
      screenshotSrc: staticFile("screens/guelaguetza-landing.png"),
      caption: "Elige tu rol",
      device: "iphone" as const,
    },
    {
      screenshotSrc: staticFile("screens/guelaguetza-home.png"),
      caption: "Dashboard del visitante",
      device: "iphone" as const,
    },
  ],
  features: guelaguetzaFeatures,
  cta: guelaguetzaCta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};

/* ─── Horizontal (Web) — Solo laptop, con zoom ─── */
const guelaguetzaHorizontalProps = {
  brand: guelaguetzaBrand,
  hook: guelaguetzaHook,
  screens: [
    {
      screenshotSrc: staticFile("screens/guelaguetza-desktop.png"),
      caption: "Portal Guelaguetza Connect",
      device: "laptop" as const,
      zoom: 1.4,
    },
  ],
  features: guelaguetzaFeatures,
  cta: guelaguetzaCta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ─── Individual Compositions (for previewing/testing) ─── */}

      <Composition
        id="BrandReveal"
        component={BrandReveal}
        durationInFrames={Math.round(4 * VIDEO_FPS)}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.vertical.width}
        height={VIDEO_SIZES.vertical.height}
        defaultProps={{
          tagline: "MD Consultoria TI",
        }}
      />

      <Composition
        id="BrandReveal-H"
        component={BrandReveal}
        durationInFrames={Math.round(4 * VIDEO_FPS)}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.horizontal.width}
        height={VIDEO_SIZES.horizontal.height}
        defaultProps={{
          tagline: "MD Consultoria TI",
        }}
      />

      <Composition
        id="TextHook"
        component={TextHook}
        durationInFrames={Math.round(2.5 * VIDEO_FPS)}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.vertical.width}
        height={VIDEO_SIZES.vertical.height}
        defaultProps={{
          text: "Tu app. En produccion.",
          subtitle: "De idea a deploy",
        }}
      />

      <Composition
        id="DeviceMockup"
        component={DeviceMockup}
        durationInFrames={Math.round(4 * VIDEO_FPS)}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.vertical.width}
        height={VIDEO_SIZES.vertical.height}
        defaultProps={{
          screenshotSrc: staticFile("screens/auditor-landing.png"),
          device: "iphone" as const,
          caption: "Landing profesional",
        }}
      />

      <Composition
        id="DeviceMockup-Laptop"
        component={DeviceMockup}
        durationInFrames={Math.round(4 * VIDEO_FPS)}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.horizontal.width}
        height={VIDEO_SIZES.horizontal.height}
        defaultProps={{
          screenshotSrc: staticFile("screens/citizen-landing-desktop.png"),
          device: "laptop" as const,
          caption: "Vista desktop",
          zoom: 1.6,
        }}
      />

      <Composition
        id="FeatureShowcase"
        component={FeatureShowcase}
        durationInFrames={Math.round(4 * VIDEO_FPS)}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.vertical.width}
        height={VIDEO_SIZES.vertical.height}
        defaultProps={{
          heading: "Funcionalidades",
          features: [
            { icon: "📸", title: "Evidencia visual", description: "Fotos + GPS" },
            { icon: "📊", title: "Dashboard", description: "Metricas en tiempo real" },
            { icon: "🔔", title: "Alertas", description: "Notificaciones push" },
          ],
        }}
      />

      <Composition
        id="CTAEnd"
        component={CTAEnd}
        durationInFrames={Math.round(3.5 * VIDEO_FPS)}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.vertical.width}
        height={VIDEO_SIZES.vertical.height}
        defaultProps={{
          ctaText: "Comenzar ahora",
          url: "consultoriamd.com.mx",
        }}
      />

      {/* ─── Full Product Demos ─── */}

      <Composition
        id="AuditorCiudadano-Vertical"
        component={ProductDemo}
        durationInFrames={calculateProductDemoDuration(
          auditorVerticalProps,
          VIDEO_FPS,
        )}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.vertical.width}
        height={VIDEO_SIZES.vertical.height}
        defaultProps={auditorVerticalProps}
      />

      <Composition
        id="AuditorCiudadano-Horizontal"
        component={ProductDemo}
        durationInFrames={calculateProductDemoDuration(
          auditorHorizontalProps,
          VIDEO_FPS,
        )}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.horizontal.width}
        height={VIDEO_SIZES.horizontal.height}
        defaultProps={auditorHorizontalProps}
      />

      {/* ─── Guelaguetza Connect ─── */}

      <Composition
        id="GuelaguetzaConnect-Vertical"
        component={ProductDemo}
        durationInFrames={calculateProductDemoDuration(
          guelaguetzaVerticalProps,
          VIDEO_FPS,
        )}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.vertical.width}
        height={VIDEO_SIZES.vertical.height}
        defaultProps={guelaguetzaVerticalProps}
      />

      <Composition
        id="GuelaguetzaConnect-Horizontal"
        component={ProductDemo}
        durationInFrames={calculateProductDemoDuration(
          guelaguetzaHorizontalProps,
          VIDEO_FPS,
        )}
        fps={VIDEO_FPS}
        width={VIDEO_SIZES.horizontal.width}
        height={VIDEO_SIZES.horizontal.height}
        defaultProps={guelaguetzaHorizontalProps}
      />

      {/* ─── Template Video Compositions (from registry) ─── */}
      {Object.entries(templateConfigs).map(([name, config]) => (
        <React.Fragment key={name}>
          <Composition
            id={`Template-${name}-Vertical`}
            component={ProductDemo}
            durationInFrames={calculateProductDemoDuration(
              config.verticalProps,
              VIDEO_FPS,
            )}
            fps={VIDEO_FPS}
            width={VIDEO_SIZES.vertical.width}
            height={VIDEO_SIZES.vertical.height}
            defaultProps={config.verticalProps}
          />
          <Composition
            id={`Template-${name}-Horizontal`}
            component={ProductDemo}
            durationInFrames={calculateProductDemoDuration(
              config.horizontalProps,
              VIDEO_FPS,
            )}
            fps={VIDEO_FPS}
            width={VIDEO_SIZES.horizontal.width}
            height={VIDEO_SIZES.horizontal.height}
            defaultProps={config.horizontalProps}
          />
        </React.Fragment>
      ))}
    </>
  );
};
