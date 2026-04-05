import type { OnePagerConfig } from "@/docs-kit/types";

const config: OnePagerConfig = {
  title: "DocSeal-MD",
  subtitle: "Firma Digital para Mexico",
  company: "MD Consultoria TI",
  date: "2026-04-04",
  tagline: "Firma electronica con validez legal mexicana — FES, FEA y NOM-151 en una sola plataforma",
  sections: [
    {
      title: "Que es DocSeal-MD",
      content:
        "Plataforma de firma digital construida sobre DocuSeal (open-source) con una capa propietaria que agrega cumplimiento normativo mexicano. Soporta Firma Electronica Simple (FES) y Firma Electronica Avanzada (FEA) con e.firma del SAT. Genera constancias de conservacion NOM-151 via Prestadores de Servicios de Certificacion (PSC) acreditados por la Secretaria de Economia. Arquitectura Clean Room que respeta la licencia AGPL de DocuSeal.",
    },
    {
      title: "Problema que resuelve",
      content:
        "Las plataformas de firma digital extranjeras (DocuSign, HelloSign) no cumplen con NOM-151-SCFI-2016, lo que significa que los documentos firmados no tienen plena validez probatoria ante tribunales mexicanos. Ademas, la mayoria de las soluciones exponen la llave privada del SAT al servidor, violando los principios de seguridad de la e.firma. DocSeal-MD garantiza que la llave privada NUNCA sale del navegador del firmante.",
    },
    {
      title: "Stack tecnologico",
      content:
        "Backend: FastAPI (Python 3.12) con 2 microservicios — Crypto Engine (hash SHA-256, X.509, DocuSeal API) y NOM-151 Gateway (PSC Strategy Pattern: Mock, Cincel, Incode). Frontend: Next.js 15 con Tailwind v4 y shadcn/ui. Browser: TypeScript e.firma validator con node-forge (parser .cer/.key + firma RSA). Infra: Docker Compose con DocuSeal, PostgreSQL x2, MinIO, Caddy (SSL), n8n. Security: JWT auth, HMAC webhooks, SSRF protection, rate limiting.",
    },
    {
      title: "Estado y resultados",
      content:
        "MVP funcional con portal desplegado en Vercel. 94 tests unitarios pasando (crypto-engine 40/40, nom151-gateway 21/36, efirma-validator 29/29). 5 auditorias ejecutadas (seguridad, calidad, funcional, diseno, responsive) con score promedio B+. Todos los hallazgos criticos resueltos. Responsive design verificado con Playwright. Video demo de 30s con Remotion. 13 verticales pueden integrarse: VIGIA, MediVista, CFDI-Motor, AgroRentable, ERPNext MX, Odoo MD, entre otras.",
    },
  ],
  stats: [
    { value: "94", label: "Tests pasando" },
    { value: "B+", label: "Score auditorias" },
    { value: "13", label: "Verticales integrables" },
  ],
  cta: {
    text: "Ver portal demo",
    url: "https://portal-lake-seven-86.vercel.app",
  },
};

export default config;
