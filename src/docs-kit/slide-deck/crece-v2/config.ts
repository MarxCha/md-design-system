import type { SlideDeckConfig } from "@/docs-kit/types";

const config: SlideDeckConfig = {
  title: "CRECE v2.0",
  subtitle: "Inteligencia Electoral y Social",
  author: "MD Consultoria TI",
  company: "MD Consultoria TI",
  date: "2026-04-06",
  layout: "dark-tech",
  slides: [
    {
      id: "title",
      type: "title",
      title: "CRECE v2.0",
      subtitle: "Plataforma de inteligencia electoral, monitoreo social y estrategia digital con IA — Movimiento Ciudadano CDMX",
    },
    {
      id: "problem",
      type: "content",
      title: "El dirigente invisible",
      bullets: [
        "IPD promedio de MC CDMX: 3.7/10 — presencia digital dormida mientras competidores acumulan 285,000 seguidores",
        "Las crisis de reputacion se detectan horas despues, cuando el daño ya impacto la opinion publica",
        "Decisiones estrategicas basadas en intuicion: sin benchmarks, sin engagement, sin analisis de sentimiento",
        "El sistema anterior (Oracle APEX) no integraba redes sociales, costaba mantenerlo y no generaba inteligencia accionable",
      ],
    },
    {
      id: "solution",
      type: "content",
      title: "Inteligencia accionable, no dashboards decorativos",
      bullets: [
        "Indice de Penetracion Digital (IPD) 0-10 — diagnostico automatico en 6 plataformas con datos reales scrapeados",
        "Monitoreo Social + 8 modelos NLP — sentimiento, emociones, toxicidad, deteccion de crisis en tiempo real",
        "Planes estrategicos con IA local (Gemma 3, $0 costo) — FODA, KPIs, calendario editorial profesional",
        "Voter Scoring ML — 606 ciudadanos perfilados, segmentacion por colonia e intencion de voto",
        "Content Factory — generacion automatica de posts y video vertical con Remotion",
      ],
    },
    {
      id: "data",
      type: "stats",
      title: "Datos reales, no promesas",
      stats: [
        { value: "381", label: "Posts scrapeados de 6 plataformas", delta: "$0 en APIs" },
        { value: "148", label: "Tests automatizados", delta: "100% green" },
        { value: "8", label: "Modelos NLP operativos", delta: "Sentimiento + crisis" },
      ],
    },
    {
      id: "architecture",
      type: "content",
      title: "Arquitectura production-ready",
      bullets: [
        "FastAPI + PostgreSQL 16 + PostGIS — 145 endpoints REST, 37 tablas, RLS multi-tenant",
        "Next.js 14 + TypeScript + shadcn/ui — 20 paginas de dashboard responsive",
        "3 capas de IA: Claude (estrategia) + Gemini (analisis 1M tokens) + Ollama/Gemma 3 (ejecucion local, datos sensibles)",
        "8 scrapers gratuitos: Twitter, Instagram, Facebook, TikTok, YouTube, Bluesky, Telegram",
        "Docker Compose en Coolify + Vercel — n8n con 6 workflows automatizados",
      ],
    },
    {
      id: "market",
      type: "stats",
      title: "Diferenciadores competitivos",
      stats: [
        { value: "$0", label: "Costo operativo IA/scrapers", delta: "Ollama local + librerias open source" },
        { value: "98%", label: "Plan completado", delta: "16 de 18 tareas + 4 sprints bonus" },
        { value: "INE", label: "Cumplimiento electoral", delta: "Modo veda, trazabilidad, etiquetado IA" },
      ],
    },
    {
      id: "quote",
      type: "quote",
      quote: "La presencia digital de un dirigente no se construye con followers comprados. Se construye con datos reales, contenido estrategico y monitoreo constante. CRECE transforma datos en accion politica.",
      author: "MD Consultoria TI",
      role: "Equipo de Inteligencia Electoral",
    },
    {
      id: "cta",
      type: "cta",
      title: "Demo en vivo con datos reales",
      subtitle: "No son slides — es la plataforma corriendo con perfiles de dirigentes reales. 30 minutos para ver CRECE con tus propios candidatos.",
      buttonText: "Agendar Demo",
      url: "https://consultoriamd.com.mx",
    },
  ],
};

export default config;
