import type { SlideDeckConfig } from "@/docs-kit/types";

const config: SlideDeckConfig = {
  title: "DocSeal-MD",
  subtitle: "Firma Digital para Mexico",
  author: "MD Consultoria TI",
  company: "MD Consultoria TI",
  date: "2026-04-05",
  layout: "dark-tech",
  slides: [
    {
      id: "title",
      type: "title",
      title: "DocSeal-MD",
      subtitle: "Firma electronica legal para Mexico — FES + FEA + NOM-151",
    },
    {
      id: "problem",
      type: "content",
      title: "El problema de la firma digital en Mexico",
      bullets: [
        "Las firmas electronicas sin NOM-151 no tienen validez legal plena ante tribunales",
        "Plataformas extranjeras (DocuSign, HelloSign) no cumplen con la normatividad mexicana",
        "La e.firma del SAT requiere que la llave privada NUNCA salga del dispositivo del firmante",
        "Sin constancia de conservacion de un PSC acreditado, los documentos no son probatorios",
      ],
    },
    {
      id: "solution",
      type: "content",
      title: "DocSeal-MD: Firma legal mexicana",
      bullets: [
        "FES (Simple) + FEA (Avanzada con e.firma SAT) — ambos tipos soportados",
        "NOM-151-SCFI-2016 — constancias de conservacion via PSC acreditado (Cincel/Incode)",
        "La llave privada (.key) se procesa 100% en el navegador — nunca toca el servidor",
        "Arquitectura Clean Room sobre DocuSeal open-source — sin contaminacion AGPL",
        "Integra con 13 verticales MD: VIGIA, MediVista, CFDI-Motor, AgroRentable...",
      ],
    },
    {
      id: "metrics",
      type: "stats",
      title: "Producto production-ready",
      stats: [
        { value: "165+", label: "Tests pasando", delta: "137 backend + 28 E2E Playwright" },
        { value: "6", label: "Capas de seguridad", delta: "JWT refresh, CSP, SSRF, Rate limit, HSTS, API proxy" },
        { value: "$499", label: "MXN/mes plan base", delta: "30-50% menos que Mifiel" },
      ],
    },
    {
      id: "security",
      type: "content",
      title: "Seguridad auditada y hardened",
      bullets: [
        "JWT auth con refresh tokens (15min access + 7d refresh) — rotacion automatica",
        "API proxy server-side — URLs internas ocultas del client bundle",
        "Content-Security-Policy restrictivo: script-src 'self', frame-ancestors 'none'",
        "SSRF protection con IP blocklist + host allowlist en endpoints",
        "Rate limiting con slowapi en todos los endpoints",
        "28 tests E2E verifican headers de seguridad automaticamente",
      ],
    },
    {
      id: "market",
      type: "stats",
      title: "Mercado de firma digital en Mexico",
      stats: [
        { value: "$1B+", label: "Mercado 2030", delta: "USD — CAGR 40.1%" },
        { value: "13", label: "Verticales cautivas", delta: "Base instalada MD Consultoria" },
        { value: "25", label: "Clientes break-even", delta: "Plan Protege $1,990/mes" },
      ],
    },
    {
      id: "demo",
      type: "content",
      title: "Demo en vivo",
      bullets: [
        "Portal: portal-lake-seven-86.vercel.app",
        "Login con demo de un click — dashboard con KPIs y actividad",
        "Firmas: lista con filtros, detalle con audit log y certificacion",
        "Constancias NOM-151: stats, tabla con hash, acciones (validar/renovar/descargar)",
        "e.firma: wizard 5 pasos — llave privada nunca sale del browser",
        "Responsive mobile-first con sidebar colapsable",
      ],
    },
    {
      id: "cta",
      type: "cta",
      title: "Listo para produccion",
      subtitle: "Pendiente: contratar PSC acreditado (Cincel/Incode) para constancias NOM-151 reales",
      buttonText: "Ver portal demo",
      url: "https://portal-lake-seven-86.vercel.app",
    },
  ],
};

export default config;
