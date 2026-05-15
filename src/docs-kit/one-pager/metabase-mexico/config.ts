import type { OnePagerConfig } from "@/docs-kit/types";

const config: OnePagerConfig = {
  title: "MD Analytics",
  subtitle: "Dashboards inteligentes verticalizados para Mexico",
  company: "MD Consultoria SC",
  date: "2026-04-04",
  logo: undefined,
  tagline:
    "Business Intelligence pre-construido por industria: construccion, agua, fiscal y agro",
  sections: [
    {
      title: "Que es MD Analytics",
      content:
        "Plataforma de analytics basada en Metabase open source, verticalizada para industrias mexicanas. No es una herramienta generica: cada vertical incluye dashboards pre-construidos con la logica de negocio que tu industria necesita — partidas BIMSA, NOM-127, determinacion de IVA, precios SNIIM. Se conecta a tus datos existentes y genera valor desde el dia 1.",
    },
    {
      title: "El problema",
      content:
        "El 73% de las PyMEs mexicanas siguen reportando con Excel. Power BI cuesta $10 USD/usuario/mes y requiere ecosistema Microsoft. Tableau es inaccesible ($70+ USD/mes). Ninguna herramienta entiende partidas de obra publica, agua no contabilizada, o cumplimiento fiscal mexicano. Los directores toman decisiones con datos de hace semanas.",
    },
    {
      title: "Como funciona",
      content:
        "Desplegamos Metabase gestionado conectado a tu base de datos existente (PostgreSQL, MySQL). Activamos el vertical que necesitas con dashboards pre-configurados. Configuramos alertas automaticas por WhatsApp cuando se detectan desviaciones. Los dashboards se embeben directamente en tu portal — sin cambiar de herramienta. Setup en 48 horas.",
    },
    {
      title: "Verticales disponibles",
      content:
        "Construccion: Curva S, indice BFF, semaforo por partida, productividad por contratista. Agua: consumo vs facturacion, mapa de fugas, NOM-127, eficiencia de recaudacion. Fiscal: determinacion IVA, conciliacion bancaria, proveedores 69-B. Agro: precios SNIIM, aptitud por cultivo, rentabilidad por hectarea.",
    },
  ],
  stats: [
    { value: "$999", label: "MXN/mes desde" },
    { value: "<3s", label: "Carga de dashboard" },
    { value: "15+", label: "Dashboards por vertical" },
  ],
  cta: {
    text: "Agendar demo gratuita",
    url: "https://consultoriamd.com.mx/analytics",
  },
};

export default config;
