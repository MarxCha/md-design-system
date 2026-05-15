"use client";

import React from "react";
import { staticFile } from "remotion";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { ProductDemo } from "@/components/video/ProductDemo";
import { BrandReveal } from "@/components/video/BrandReveal";
import { calculateProductDemoDuration } from "@/components/video/ProductDemo";
import { VIDEO_FPS } from "@/components/video/video-tokens";

const auditorDemoProps = {
  brand: {
    logoSrc: staticFile("logo.svg"),
    tagline: "Auditor Ciudadano",
  },
  hook: {
    text: "Reporta. Transparenta. Transforma.",
    subtitle: "Tu voz ciudadana, ahora digital",
  },
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
    {
      screenshotSrc: staticFile("screens/citizen-landing-desktop.png"),
      caption: "Portal ciudadano — desktop",
      device: "laptop" as const,
    },
    {
      screenshotSrc: staticFile("screens/admin-login.png"),
      caption: "Panel administrativo",
      device: "laptop" as const,
    },
  ],
  features: {
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
  },
  cta: {
    ctaText: "Reporta ahora",
    url: "consultoriamd.com.mx",
  },
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 3.5,
  featureDuration: 4,
  ctaDuration: 3,
};

const demoDuration = calculateProductDemoDuration(auditorDemoProps, VIDEO_FPS);

export default function DemoVideoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "hsl(213, 60%, 8%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 64,
        padding: "64px 24px",
      }}
    >
      <h1
        style={{
          fontFamily: "'Instrument Sans', Georgia, serif",
          fontSize: 40,
          fontWeight: 700,
          color: "white",
          textAlign: "center",
        }}
      >
        Auditor Ciudadano — Demo Interactivo
      </h1>

      {/* Vertical reel player */}
      <section style={{ textAlign: "center" }}>
        <p
          style={{
            color: "hsl(213, 52%, 78%)",
            fontFamily: "'DM Sans', system-ui",
            fontSize: 16,
            marginBottom: 24,
          }}
        >
          Reel vertical (1080x1920) — Dale play
        </p>
        <VideoPlayer
          component={ProductDemo as React.ComponentType<Record<string, unknown>>}
          inputProps={auditorDemoProps}
          durationInFrames={demoDuration}
          orientation="vertical"
          maxWidth={540}
          controls
          clickToPlay
          loop
        />
      </section>

      {/* Horizontal demo player */}
      <section style={{ textAlign: "center" }}>
        <p
          style={{
            color: "hsl(213, 52%, 78%)",
            fontFamily: "'DM Sans', system-ui",
            fontSize: 16,
            marginBottom: 24,
          }}
        >
          Demo horizontal (1920x1080) — Para web y presentaciones
        </p>
        <VideoPlayer
          component={ProductDemo as React.ComponentType<Record<string, unknown>>}
          inputProps={auditorDemoProps}
          durationInFrames={demoDuration}
          orientation="horizontal"
          maxWidth={800}
          controls
          clickToPlay
          loop
        />
      </section>

      {/* Brand reveal solo */}
      <section style={{ textAlign: "center" }}>
        <p
          style={{
            color: "hsl(213, 52%, 78%)",
            fontFamily: "'DM Sans', system-ui",
            fontSize: 16,
            marginBottom: 24,
          }}
        >
          Brand Reveal (3s) — Para usar como intro
        </p>
        <VideoPlayer
          component={BrandReveal as React.ComponentType<Record<string, unknown>>}
          inputProps={{
            logoSrc: staticFile("logo.svg"),
            tagline: "Auditor Ciudadano",
          }}
          durationInFrames={Math.round(4 * VIDEO_FPS)}
          orientation="horizontal"
          maxWidth={600}
          autoPlay
          loop
        />
      </section>
    </main>
  );
}
