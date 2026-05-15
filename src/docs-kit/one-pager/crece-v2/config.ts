import type { OnePagerConfig } from "@/docs-kit/types";

const config: OnePagerConfig = {
  title: "CRECE v2.0",
  subtitle: "Plataforma de Inteligencia Electoral y Social",
  company: "MD Consultoria TI",
  date: "2026-04-06",
  tagline: "Convertir datos sociales en estrategia politica accionable — monitoreo, diagnostico y planes con IA a costo cero",
  sections: [
    {
      title: "Que es CRECE",
      content:
        "Plataforma de inteligencia politica que reemplaza el sistema Oracle APEX de Movimiento Ciudadano CDMX. Integra monitoreo de redes sociales en 6 plataformas, analisis de sentimiento con 8 modelos NLP, diagnostico digital automatizado (IPD 0-10), generacion de planes estrategicos con IA local, y CRM politico con voter scoring por machine learning. Relacion de 4+ años con MC via ConsultoriaMD.",
    },
    {
      title: "El problema",
      content:
        "Los dirigentes de MC CDMX tienen presencia digital dormida (IPD promedio 3.7/10) mientras competidores como Marti Batres acumulan 285,000 seguidores en Twitter. Las crisis de reputacion se detectan horas despues. Las decisiones estrategicas se toman sin datos: sin benchmarks, sin metricas de engagement, sin analisis de sentimiento. El sistema anterior era lento, costoso y no integraba redes sociales.",
    },
    {
      title: "La solucion",
      content:
        "CRECE v2.0 ofrece: (1) IPD — indice de penetracion digital 0-10 por dirigente con datos reales scrapeados de Twitter, Instagram, Facebook, TikTok, YouTube y Bluesky; (2) NLP — 8 modelos de sentimiento, emociones, toxicidad y crisis en tiempo real; (3) Planes IA — diagnosticos profesionales generados con Ollama/Gemma 3 local ($0 costo) incluyendo FODA, KPIs y calendario editorial; (4) Voter Scoring — ML con Random Forest sobre datos INEGI Census 2020; (5) Content Factory — generacion automatica de posts y video vertical.",
    },
    {
      title: "Resultados y estado",
      content:
        "381 posts reales scrapeados de perfiles de dirigentes (Pina, Solano). 148 tests automatizados — 100% green. 145 endpoints REST, 37 tablas PostgreSQL+PostGIS, 20 paginas de dashboard. Stack: FastAPI + Next.js 14 + Ollama. Desplegado en Coolify + Vercel. 98% del plan completado (16/18 tareas + 4 sprints bonus). Costo operativo de IA y scraping: $0 — todo open source.",
    },
  ],
  stats: [
    { value: "381", label: "Posts reales scrapeados" },
    { value: "148", label: "Tests (100% green)" },
    { value: "$0", label: "Costo IA/scraping" },
  ],
  cta: {
    text: "Agendar demo en vivo",
    url: "https://consultoriamd.com.mx",
  },
};

export default config;
