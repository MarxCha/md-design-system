import type { OnePagerConfig } from "@/docs-kit/types";

const config: OnePagerConfig = {
  title: "DocSeal-MD",
  subtitle: "Firma Digital para Mexico",
  company: "MD Consultoria TI",
  date: "2026-04-05",
  tagline: "Firma electronica con validez legal mexicana — FES, FEA y NOM-151 en una sola plataforma",
  sections: [
    {
      title: "Que es DocSeal-MD",
      content:
        "Plataforma de firma digital production-ready construida sobre DocuSeal (open-source) con una capa propietaria que agrega cumplimiento normativo mexicano. Soporta Firma Electronica Simple (FES) y Firma Electronica Avanzada (FEA) con e.firma del SAT. Genera constancias de conservacion NOM-151 via PSC acreditados. Arquitectura Clean Room que respeta la licencia AGPL. La llave privada del SAT se procesa 100% en el navegador — nunca toca el servidor.",
    },
    {
      title: "Ventaja competitiva",
      content:
        "DocuSign y Adobe NO cumplen NOM-151. Mifiel cobra $990/mes + $12-89/doc. Weetrust arranca en $8,000/mes. DocSeal-MD ofrece planes desde $499/mes + $8-15/doc (30-50% mas barato) con la ventaja unica de 13 verticales cautivas de MD Consultoria como base instalada. El modelo es Compliance-as-a-Service embebido: no vendemos firma electronica, vendemos tranquilidad legal.",
    },
    {
      title: "Estado del producto",
      content:
        "MVP production-ready desplegado en Vercel. 165+ tests (137 backend + 28 E2E Playwright). Security hardening completo: JWT con refresh tokens (15min + 7d), API proxy server-side, Content-Security-Policy restrictivo, SSRF protection, rate limiting. Portal Next.js 16 con landing premium, dashboard, gestion de firmas/constancias, componente e.firma browser-side, y monitor de salud de servicios.",
    },
    {
      title: "Modelo de negocio",
      content:
        "4 planes: Cumple ($499/mes, 25 docs), Protege ($1,990/mes, 200 docs), Integra ($4,990/mes, 1,000 docs), Enterprise (desde $9,990). Break-even en 18-25 clientes plan Protege. Go-to-market en 3 fases: verticales cautivas (mes 1-3), referral organico (mes 4-6), contenido + SEO (mes 7-12). Proyeccion conservadora: $200K MRR al mes 12 con 100 clientes. Mercado Mexico 2030: USD $1B+ (CAGR 40.1%).",
    },
  ],
  stats: [
    { value: "165+", label: "Tests pasando" },
    { value: "$499", label: "MXN/mes base" },
    { value: "13", label: "Verticales cautivas" },
  ],
  cta: {
    text: "Ver portal demo",
    url: "https://portal-lake-seven-86.vercel.app",
  },
};

export default config;
