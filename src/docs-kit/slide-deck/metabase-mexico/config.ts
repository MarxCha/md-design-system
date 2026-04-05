import type { SlideDeckConfig } from "@/docs-kit/types";

const config: SlideDeckConfig = {
  title: "MD Analytics",
  subtitle: "Dashboards inteligentes para tu industria",
  author: "MD Consultoria TI",
  company: "MD Consultoria SC",
  date: "2026-04-04",
  layout: "clean-corporate",
  logo: undefined,
  slides: [
    {
      id: "title",
      type: "title",
      title: "MD Analytics",
      subtitle:
        "Dashboards inteligentes verticalizados para construccion, agua, fiscal y agro en Mexico",
    },
    {
      id: "problem",
      type: "content",
      title: "El problema: datos sin inteligencia",
      bullets: [
        "Excel sigue siendo la herramienta #1 para reportar avance de obra, consumo de agua y cumplimiento fiscal",
        "Power BI cuesta $10 USD/usuario/mes y requiere licencia Microsoft — inaccesible para PyMEs mexicanas",
        "Las herramientas genericas no entienden partidas BIMSA, NOM-127, determinacion de IVA ni precios SNIIM",
        "Los directores de obra toman decisiones con informacion de hace 2 semanas, no de hoy",
      ],
    },
    {
      id: "solution",
      type: "content",
      title: "MD Analytics: BI verticalizado para Mexico",
      bullets: [
        "Dashboards pre-construidos por industria — Curva S, Indice BFF, semaforo por partida, agua no contabilizada, determinacion IVA",
        "Conectado a tus datos existentes — PostgreSQL, OpenProject, CFDI-Motor, datos publicos CONAGUA/INEGI/SNIIM",
        "Alertas automaticas por WhatsApp — cuando el BFF cae debajo de 0.9 o un proveedor entra a lista 69-B",
        "Embebido en tu portal actual — se integra como modulo, no como herramienta separada",
      ],
    },
    {
      id: "verticals",
      type: "content",
      title: "4 verticales listos para produccion",
      bullets: [
        "Construccion — Curva S, semaforo financiero, productividad por contratista, indice BFF con historico",
        "Organismos de Agua — Agua no contabilizada, mapa de fugas PostGIS, cumplimiento NOM-127, eficiencia de recaudacion",
        "Fiscal / CFDI — Determinacion IVA mensual, conciliacion bancaria, proveedores 69-B, semaforo SAT",
        "Agro — Precios SNIIM por central, aptitud por cultivo, costo de produccion vs ingreso",
      ],
    },
    {
      id: "metrics",
      type: "stats",
      title: "Numeros que importan",
      stats: [
        { value: "<3s", label: "Tiempo de carga por dashboard" },
        {
          value: "15+",
          label: "Dashboards pre-construidos",
          delta: "4 verticales",
        },
        {
          value: "80%",
          label: "Menos tiempo vs Excel",
          delta: "en reporteo semanal",
        },
      ],
    },
    {
      id: "pricing",
      type: "stats",
      title: "Precio justo para Mexico",
      stats: [
        {
          value: "$999",
          label: "MXN/mes — Basico",
          delta: "1 vertical, 5 usuarios",
        },
        {
          value: "$2,499",
          label: "MXN/mes — Profesional",
          delta: "2 verticales, 15 usuarios",
        },
        {
          value: "$4,999",
          label: "MXN/mes — Enterprise",
          delta: "4 verticales, usuarios ilimitados",
        },
      ],
    },
    {
      id: "quote",
      type: "quote",
      quote:
        "Lo que antes me tomaba medio dia en Excel ahora lo veo en 3 segundos. Y si algo se desvio, me llega la alerta por WhatsApp antes de que llegue a la oficina.",
      author: "Director de Obra",
      role: "Constructora regional, Jalisco",
    },
    {
      id: "cta",
      type: "cta",
      title: "Empieza con una demo gratuita",
      subtitle:
        "Conectamos tus datos reales y en 48 horas tienes dashboards funcionando",
      buttonText: "Agendar demo",
      url: "https://consultoriamd.com.mx/analytics",
    },
  ],
};

export default config;
