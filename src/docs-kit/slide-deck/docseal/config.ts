import type { SlideDeckConfig } from "@/docs-kit/types";

const config: SlideDeckConfig = {
  title: "DocSeal-MD",
  subtitle: "Firma Digital para Mexico",
  author: "MD Consultoria TI",
  company: "MD Consultoria TI",
  date: "2026-04-04",
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
      id: "architecture",
      type: "content",
      title: "Arquitectura del sistema",
      bullets: [
        "DocuSeal (vanilla) — motor de firma con templates y webhooks",
        "Crypto Engine (FastAPI) — hashing SHA-256, validacion X.509, integracion DocuSeal",
        "NOM-151 Gateway (FastAPI) — constancias via PSC con Strategy Pattern",
        "e.firma Validator (TypeScript) — parser .cer/.key + firma RSA en browser",
        "Portal (Next.js 15) — dashboard con KPIs, firmas, constancias, health monitor",
      ],
    },
    {
      id: "metrics",
      type: "stats",
      title: "Estado del proyecto",
      stats: [
        { value: "94", label: "Tests pasando", delta: "de 105 total" },
        { value: "5", label: "Auditorias ejecutadas", delta: "Seguridad, Calidad, Funcional, Diseno, Responsive" },
        { value: "B+", label: "Score promedio", delta: "De D inicial a B+ post-fix" },
      ],
    },
    {
      id: "security",
      type: "content",
      title: "Seguridad auditada",
      bullets: [
        "JWT auth en todos los endpoints (health excluido)",
        "Webhook HMAC verification (X-DocuSeal-Signature)",
        "SSRF protection con allowlist de hosts",
        "Docker hardening: imagenes fijas, puertos localhost, credentials required",
        "Caddy: HSTS, X-Frame-Options, CSP, nosniff",
        "Rate limiting con slowapi",
      ],
    },
    {
      id: "demo",
      type: "content",
      title: "Demo en vivo",
      bullets: [
        "Portal: portal-lake-seven-86.vercel.app",
        "Dashboard con KPIs, actividad reciente, desglose por vertical",
        "Firmas: lista con filtros, detalle con audit log",
        "Constancias NOM-151: stats, tabla con hash copy, badges PSC",
        "Responsive: funciona en mobile con sidebar colapsable",
      ],
    },
    {
      id: "cta",
      type: "cta",
      title: "Proximos pasos",
      subtitle: "Fase 5: Conectar a APIs reales, componente e.firma, Docker Compose, contratar PSC",
      buttonText: "Ver portal",
      url: "https://portal-lake-seven-86.vercel.app",
    },
  ],
};

export default config;
