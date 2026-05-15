import type { NotebookPackConfig } from "@/docs-kit/types";

const config: NotebookPackConfig = {
  projectName: "CRECE v2.0",
  projectSlug: "crece-v2",
  description: "Plataforma de inteligencia electoral y social para Movimiento Ciudadano CDMX — monitoreo, diagnostico digital, planes IA y CRM politico",
  docs: [
    {
      type: "overview",
      title: "CRECE v2.0 — Vision General",
      content: `
# CRECE v2.0 — Plataforma de Inteligencia Electoral y Social

## Que es
CRECE v2.0 es una plataforma de inteligencia politica desarrollada por MD Consultoria TI para Movimiento Ciudadano CDMX. Reemplaza el sistema anterior basado en Oracle APEX con una solucion moderna que integra monitoreo de redes sociales, analisis de sentimiento con inteligencia artificial, diagnostico digital automatizado y generacion de estrategias con IA.

## Para quien
- **Movimiento Ciudadano CDMX** — relacion de consultoria de 4+ años via ConsultoriaMD
- **Dirigentes politicos** que necesitan entender su presencia digital y competir efectivamente
- **Equipos de comunicacion** que requieren contenido estrategico basado en datos reales
- **Operadores de campo** que necesitan CRM politico y segmentacion de votantes

## El problema que resuelve
Los dirigentes de MC CDMX tienen un Indice de Penetracion Digital (IPD) promedio de 3.7 sobre 10. Su presencia digital esta dormida mientras competidores como Marti Batres Guadarrama de MORENA acumulan 285,000 seguidores en Twitter. Las crisis de reputacion se detectan horas despues de que el daño ya impacto la opinion publica. Las decisiones estrategicas se toman por intuicion, sin benchmarks, sin metricas de engagement, sin analisis de sentimiento.

## Ecosistema de IA (3 capas)
1. **Claude** (Anthropic) — planificacion estrategica, arquitectura, decisiones complejas
2. **Gemini** (Google) — analisis de codebase con 1M tokens de contexto, cross-audit
3. **Ollama/Gemma 3** (local) — generacion de contenido, datos sensibles, $0 costo operativo
`,
    },
    {
      type: "features",
      title: "CRECE v2.0 — Modulos y Funcionalidades",
      content: `
# Modulos de CRECE v2.0

## 1. Diagnostico Digital (IPD)
Indice de Penetracion Digital de 0 a 10 por dirigente. Se calcula automaticamente analizando presencia en 6 plataformas (Twitter, Instagram, Facebook, TikTok, YouTube, Bluesky) con datos reales scrapeados. Incluye breakdown por plataforma con grafico radar, comparacion contra benchmarks de politicos mexicanos similares, y recomendaciones especificas.

Ejemplo real: Alejandro Pina Medina tiene IPD 4.1 — Twitter 3,100 seguidores, Instagram 2,231, Facebook 1,800. Engagement excepcional en Instagram (7.74%) pero baja frecuencia de publicacion.

## 2. Monitoreo Social + NLP
8 modelos de procesamiento de lenguaje natural operativos:
- Sentimiento (positivo/negativo/neutro)
- Emociones (alegria, enojo, tristeza, miedo, sorpresa)
- Deteccion de discurso de odio
- Toxicidad
- Deteccion de propaganda
- Reconocimiento de entidades (NER)
- Clasificacion zero-shot por temas
- Deteccion de crisis en tiempo real

381 posts reales scrapeados de perfiles de dirigentes. Filtro inteligente de retweets vs contenido original. Pie chart de distribucion de sentimiento calculado client-side.

## 3. Planes Estrategicos con IA
Generacion profesional de diagnosticos usando Ollama/Gemma 3 12B corriendo localmente en el VPS de Coolify ($0 costo). Tipos de plan:
- **DIAGNOSTICO** — analisis de presencia digital con FODA, KPIs, calendario editorial, tabla comparativa vs competidores
- **CONSOLIDACION** — plan de 90 dias para expandir presencia
- **CRISIS** — protocolo de manejo de crisis digital
- **CONTENIDO** — calendario editorial de 30 dias con posts listos

Cada plan tiene ~8,000 caracteres, se renderiza con markdown profesional (tablas, headers, listas), incluye campo modelo_ia para trazabilidad.

## 4. CRM Politico + Voter Scoring
606 ciudadanos perfilados con datos sinteticos basados en INEGI Census 2020 CDMX (16 alcaldias, distribucion real de edad/genero/escolaridad). Segmentacion:
- 495 opositor
- 90 promotable (alta probabilidad MC)
- 21 persuadible (indecisos convertibles)

Random Forest classifier con data_source='synthetic_census_2020'. Filtros por intencion de voto, escolaridad, colonia, seccion electoral.

## 5. Content Factory
Generacion automatica de contenido para redes sociales usando Ollama. Formatos: post, reel, story, carrusel, video, infografia. Tonos: formal, cercano, energico, informativo, motivacional. Video vertical con Remotion (6 escenas animadas, 1080x1920, colores MC).

## 6. Blindaje Legal / Compliance
Monitoreo de cumplimiento INE: trazabilidad de gastos por categoria (9 categorias INE), alertas de tope de gasto, importacion masiva de gastos via Excel, deteccion de bots, modo veda electoral. Datos electorales CDMX 2024 de referencia.

## 7. Salud Digital
Auditoria de autenticidad de perfiles: engagement rate real, ratio comentarios/likes, % posts sin interaccion, variacion de engagement (coeficiente de variacion). Health score 0-100 con semaforo (verde >= 70, amarillo >= 40, rojo < 40). Validado con Gemini: thresholds calibrados para politicos mexicanos (2-5% engagement = saludable).

## 8. Campaign Manager
Gestion de campañas de comunicacion directa (WhatsApp, SMS, email). Selector de dirigente, segmento objetivo (Todos, Promotable, Persuadible, Indeciso), preview de alcance. Funnel de conversion: enviados → entregados → leidos → respondidos.
`,
    },
    {
      type: "technical",
      title: "CRECE v2.0 — Arquitectura Tecnica",
      content: `
# Arquitectura Tecnica de CRECE v2.0

## Stack Principal
- **Backend**: FastAPI (Python 3.12+), SQLAlchemy 2.0 async, PostgreSQL 16 + PostGIS 3.4
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Workers**: Celery + Redis (scrapers, NLP, generacion IA)
- **Storage**: MinIO (S3-compatible)
- **Deploy**: Docker Compose en Coolify sobre VPS (163.245.208.96) + Vercel para frontend

## Metricas del sistema
- 145 endpoints REST
- 37 tablas en PostgreSQL
- 36 modelos SQLAlchemy
- 148 tests automatizados (100% green)
- 20 paginas de dashboard
- 14 servicios backend

## Scrapers (8 plataformas, $0 costo)
| Plataforma | Libreria | Auth |
|-----------|---------|------|
| Twitter/X | Scweet v5.2 | auth_token cookie |
| Instagram | ensta (Guest mode) | No auth |
| YouTube | scrapetube + yt-dlp | No API key |
| TikTok | yt-dlp | No auth |
| Facebook | curl-cffi (Chrome TLS) | No auth |
| Bluesky | AT Protocol httpx | No auth |
| Telegram | Telethon | API key |
| Threads | stub (baja adopcion MX) | - |

## Integraciones
- **n8n**: 6 workflows, 30 nodos custom, dominio n8n.mdconsultoria-ti.org
- **Chatwoot**: chatmx.mdconsultoria-ti.org — webhook para CRM automatico
- **Ollama**: Gemma 3 12B en VPS Coolify, CPU-only (~480s/request)

## Base de datos
PostgreSQL 16 con PostGIS 3.4 para datos geoespaciales. Row Level Security (RLS) en 5 tablas multi-tenant. SRID 4326 (WGS84) para coordenadas Mexico. Alembic para migraciones (37 tablas).

## Seguridad
- JWT auth con refresh tokens
- API Key auth para integraciones n8n
- Veda Electoral Middleware (modo veda INE)
- Etiquetado IA obligatorio (campo modelo_ia en contenido generado)
- Proxy headers para HTTPS detras de Cloudflare/Coolify
`,
    },
    {
      type: "roadmap",
      title: "CRECE v2.0 — Estado y Roadmap",
      content: `
# Estado del Proyecto

## Completado (98%)
16 de 18 tareas del plan original completadas + 4 sprints bonus:
- Diagnostico Digital (IPD) ✓
- Monitoreo Social + NLP ✓
- Benchmarking competitivo ✓
- Planes IA con streaming ✓
- Voter Scoring ML ✓
- Content Factory ✓
- Blindaje Legal ✓
- WhatsApp Campaigns ✓
- Smart Canvassing ✓
- Participacion Ciudadana ✓
- CRM Ciudadanos ✓
- Bot Detection → Salud Digital ✓
- Importacion Excel gastos ✓
- n8n integration (6 workflows) ✓
- Deploy Coolify + Vercel ✓
- Mobile app (React Native Expo, 4 screens) ✓

## Pendiente (3 items)
1. Geometrias INE — descargar shapefiles y poblar secciones_electorales.geometry
2. Proxies — decision de compra para scraping en produccion
3. Decidim — proyecto separado en ~/Projects/decidim-mc/ (Ruby on Rails)

## Proximos pasos
- Deploy final en Coolify (Carlos)
- Configurar DNS: crece.mdconsultoria-ti.org + api-crece.mdconsultoria-ti.org
- Conectar n8n a API de produccion
- Pipeline NLP completo sobre los 381 posts scrapeados
- Scraping de followers para analisis de bots reales
`,
    },
    {
      type: "faq",
      title: "CRECE v2.0 — Preguntas Frecuentes",
      content: `
# Preguntas Frecuentes sobre CRECE v2.0

## Cuanto cuesta operar CRECE?
El costo operativo de IA y scraping es $0. Todos los scrapers usan librerias open source gratuitas. La generacion de contenido usa Ollama con Gemma 3 corriendo localmente en el VPS. Los modelos NLP son de HuggingFace (tier gratuito). El unico costo es el VPS de Coolify y el dominio.

## Los datos de dirigentes son reales?
Si. Cada feature se prueba contra datos reales de dos perfiles: Alejandro Pina Medina (Coordinador Comision Operativa Estatal, MC CDMX) con 3,100 seguidores en Twitter y 2,231 en Instagram; y Rafael Solano Perez (Miembro Comision Estatal, Analista en La Razon). Los 381 posts en la base de datos son scrapeados de sus cuentas reales.

## Que pasa durante la veda electoral?
CRECE tiene un Veda Electoral Middleware que desactiva automaticamente funciones de contenido y campañas durante periodos de veda INE. Todo contenido generado con IA lleva etiqueta obligatoria del modelo usado.

## Como se compara con herramientas como Brandwatch o Sprout Social?
CRECE esta diseñado especificamente para el contexto politico mexicano: cumplimiento INE, datos electorales por seccion, benchmarks contra politicos mexicanos, modelos NLP calibrados para español mexicano. Además, opera a costo cero vs licencias de $5,000-50,000 USD anuales de plataformas internacionales.

## Se puede usar para otros partidos?
La arquitectura es multi-tenant con Row Level Security. Se puede configurar para cualquier partido o candidato. Los scrapers y modelos NLP son agnosticos al partido.
`,
    },
  ],
  metadata: {
    version: "2.0.0",
    audience: "Equipo MC CDMX + stakeholders MD Consultoria",
    generatedAt: "2026-04-06",
  },
};

export default config;
