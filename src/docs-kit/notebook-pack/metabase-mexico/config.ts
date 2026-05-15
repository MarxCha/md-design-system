import type { NotebookPackConfig } from "@/docs-kit/types";

const config: NotebookPackConfig = {
  projectName: "MD Analytics",
  projectSlug: "metabase-mexico",
  description:
    "Business Intelligence verticalizado para industrias mexicanas, basado en Metabase open source",
  docs: [
    {
      type: "overview",
      title: "MD Analytics — Vision General",
      content: `
# MD Analytics — Business Intelligence para Mexico

## Que es
MD Analytics es una plataforma de analytics-as-a-service construida sobre Metabase open source, verticalizada para 4 industrias mexicanas: construccion, organismos de agua, fiscal/CFDI, y agro. No es un fork de Metabase — es una operacion gestionada con dashboards pre-construidos que entienden la logica de negocio de cada industria.

## Para quien
- **Constructoras** que necesitan reportar avance de obra a dependencias gubernamentales
- **Organismos operadores de agua** que deben cumplir NOM-127 y reportar a CONAGUA
- **Despachos contables** que determinan IVA y vigilan cumplimiento SAT
- **Productores agricolas** que necesitan tomar decisiones basadas en precios de mercado

## Por que existe
El 73% de las PyMEs mexicanas reportan con Excel. Power BI cuesta $10 USD/usuario/mes + licencia Microsoft. Tableau es $70+ USD/mes. Ninguna entiende partidas BIMSA, agua no contabilizada, determinacion de IVA, o precios SNIIM. MD Analytics llena ese hueco: BI profesional, en espanol, a precio mexicano.

## Modelo de negocio
Suscripcion mensual por vertical: $999 MXN (basico), $2,499 MXN (profesional), $4,999 MXN (enterprise). Incluye hosting, dashboards, soporte, y actualizaciones. El costo operativo por cliente es bajo porque Metabase es open source y la infraestructura es compartida.
`,
    },
    {
      type: "features",
      title: "MD Analytics — Verticales y Dashboards",
      content: `
# Verticales de MD Analytics

## Vertical Construccion
Conectado a la base de datos de OpenProject BIM Mexico. Dashboards:
- **Curva S:** Avance programado vs real, grafica de linea acumulada con filtro por proyecto. Identifica desviaciones en tiempo real.
- **Semaforo por Partida:** Tabla con cada partida clasificada en verde (en tiempo), amarillo (retraso 5-15%), rojo (retraso >15%). El director ve de un vistazo que partidas necesitan atencion.
- **Indice BFF (Balance Fisico-Financiero):** Scatter plot que muestra la relacion entre avance fisico y financiero. Si una partida esta debajo de la diagonal, se esta gastando mas de lo que se avanza. BFF < 0.9 es alerta critica.
- **Productividad por Contratista:** Costo por metro cuadrado, metro lineal, o metro cubico por contratista. Permite comparar eficiencia entre frentes de trabajo.

## Vertical Agua
Para organismos operadores de agua municipal. Dashboards:
- **Agua No Contabilizada:** Diferencia entre consumo medido y facturacion. Si supera 30%, el organismo esta perdiendo dinero.
- **Mapa de Fugas:** Visualizacion geoespacial con PostGIS que muestra zonas con mayor indice de fugas. Permite priorizar reparaciones.
- **Cumplimiento NOM-127:** Monitoreo de parametros de calidad de agua (cloro residual, coliformes, turbidez) contra limites normativos.
- **Eficiencia de Recaudacion:** Porcentaje de facturacion efectivamente cobrada por zona y tipo de usuario.

## Vertical Fiscal / CFDI
Conectado a CFDI-Motor (sistema de facturacion electronica de MD Consultoria). Dashboards:
- **Determinacion IVA Mensual:** Waterfall chart que muestra IVA cobrado, pagado, acreditable, y por pagar. Visualiza lo que el Motor IVA calcula.
- **Conciliacion Bancaria:** REP (Recibos Electronicos de Pago) cruzados con movimientos bancarios. Identifica discrepancias.
- **Proveedores Riesgo:** Cruza RFC de proveedores contra lista 69-B del SAT (EFOS). Alerta cuando un proveedor entra a la lista.
- **Semaforo SAT:** Estado de declaraciones mensuales, DIOT, contabilidad electronica. Rojo si hay vencimientos proximos.

## Vertical Agro
Conectado a datos publicos del gobierno mexicano. Dashboards:
- **Precios SNIIM:** Precios diarios por producto y central de abasto. Permite al productor decidir donde y cuando vender.
- **Aptitud por Cultivo:** Datos INIFAP georreferenciados que muestran que cultivos son viables en cada parcela.
- **Rentabilidad:** Costo de produccion (insumos + mano de obra + agua) vs precio de venta proyectado por hectarea.
`,
    },
    {
      type: "technical",
      title: "MD Analytics — Arquitectura Tecnica",
      content: `
# Arquitectura de MD Analytics

## Stack
- **Core BI:** Metabase open source (AGPL-3.0), desplegado en Docker
- **Base de datos app:** PostgreSQL 16 (almacena config de Metabase)
- **Data warehouse:** PostgreSQL 16 (datos de demo y datos consolidados)
- **Portal cliente:** Next.js 15 + shadcn/ui + md-design-system
- **Reverse proxy:** Caddy 2 (auto-TLS en produccion)
- **ETL:** n8n (flujos para ingestar datos de APIs publicas mexicanas)
- **Alertas:** n8n + WhatsApp Business API

## Decisiones arquitecturales clave

### No fork de Metabase
Metabase esta escrito en Clojure (~300K LoC). Forkearlo implicaria aprender un lenguaje nicho y mantener un codebase enorme. Decidimos operarlo como servicio gestionado y verticalizar con dashboards pre-construidos. La diferenciacion es conocimiento de dominio, no codigo.

### Embedding JWT
Los dashboards se embeben en portales de clientes usando JWT signed embedding. Cada cliente ve solo sus datos. Esto permite que MD Analytics sea un modulo invisible dentro de OpenProject BIM, CFDI-Motor, o cualquier otro producto MD.

### Conexion directa a BDs existentes
Metabase se conecta directamente a las bases de datos de produccion (en modo read-only). No replicamos datos a un data warehouse separado — seria overkill para la escala actual (<10 clientes). Cuando crezcamos, evaluaremos read replicas o DW dedicado.

### Alertas via n8n (no Metabase Pulses)
Metabase tiene "Pulses" nativos pero solo envian por email. Necesitamos WhatsApp, logica condicional, y combinacion de multiples fuentes. n8n consulta la API de Metabase para metricas, aplica umbrales, y envia alertas.

## Datos de demo
El seed incluye 3 proyectos de obra hidraulica:
- Presa El Zapotillo ($185M, en tiempo)
- Acueducto Independencia ($92.5M, retrasado, BFF < 0.9)
- PTAR Atotonilco ($67.8M, adelantado)
Cada uno con 15 partidas tipo BIMSA y 24 semanas de avances.
`,
    },
    {
      type: "roadmap",
      title: "MD Analytics — Roadmap",
      content: `
# Roadmap de MD Analytics

## Fase 0 — Fundamentos (Semanas 1-4) ← ESTAMOS AQUI
- Sprint 0.1: Docker Compose + seed data + 3 dashboards iniciales (COMPLETADO)
- Sprint 0.2: Portal Next.js + embedding + landing page (SIGUIENTE)

## Fase 1 — Verticales (Semanas 5-12)
- Sprint 1.1: Vertical Construccion completo (4 dashboards production-ready)
- Sprint 1.2: Vertical Agua (4 dashboards + ETL CONAGUA + mapas PostGIS)
- Sprint 1.3: Vertical Fiscal/CFDI (4 dashboards conectados a CFDI-Motor)
- Sprint 1.4: Vertical Agro (3 dashboards + ETL SNIIM/SIAP)

## Fase 2 — Automatizacion y Comercializacion (Semanas 13-18)
- Sprint 2.1: Alertas inteligentes (n8n + WhatsApp + umbrales configurables)
- Sprint 2.2: Multi-tenant + self-service (collections aisladas, permisos, billing)
- Sprint 2.3: Go-to-market (docs en espanol, video demo, 2 pilotos: constructora + organismo agua)

## Competencia y posicionamiento
| Competidor | Precio | Debilidad |
|-----------|--------|-----------|
| Power BI | $10 USD/usuario/mes | Requiere licencia MS |
| Tableau | $70+ USD/usuario/mes | Caro, sin self-host |
| Looker | Enterprise | Google Cloud lock-in |
| MD Analytics | $999-$4,999 MXN/mes | Open source, verticalizado MX |
`,
    },
    {
      type: "faq",
      title: "MD Analytics — Preguntas Frecuentes",
      content: `
# Preguntas Frecuentes

## Es seguro conectar Metabase a mi base de datos de produccion?
Si. Metabase se conecta en modo read-only. No puede modificar, borrar, ni insertar datos. Ademas, recomendamos usar read replicas para que las consultas de analytics no afecten el rendimiento de tu aplicacion.

## Necesito saber SQL para usar MD Analytics?
No. Los dashboards vienen pre-construidos. Metabase tambien permite hacer "preguntas" sin SQL usando su interfaz visual. Solo necesitas SQL si quieres crear consultas totalmente custom.

## Puedo personalizar los dashboards?
Si. Los dashboards pre-construidos son un punto de partida. Puedes agregar filtros, cambiar visualizaciones, crear nuevas preguntas, y organizarlos en colecciones. Metabase es muy flexible.

## Que pasa con mis datos? Donde se almacenan?
Tus datos no salen de tu servidor. Metabase se conecta a tu base de datos existente y las consultas se ejecutan ahi. Metabase solo almacena la definicion de dashboards y preguntas, no los datos en si.

## Cuanto tarda el setup?
48 horas desde que nos das acceso a tu base de datos. Conectamos, activamos el vertical, configuramos alertas, y te entregamos dashboards funcionando.

## Puedo cancelar en cualquier momento?
Si. Sin contratos de permanencia. Suscripcion mensual. Si cancelas, exportas tus dashboards y preguntas antes.
`,
    },
  ],
  metadata: {
    version: "0.1.0",
    audience: "directores de obra, gerentes de organismos de agua, contadores, productores agricolas",
    generatedAt: "2026-04-04",
  },
};

export default config;
