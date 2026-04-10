import type { NotebookPackConfig } from "@/docs-kit/types";

const config: NotebookPackConfig = {
  projectName: "DocSeal-MD",
  projectSlug: "docseal",
  description: "Plataforma de firma digital production-ready con validez legal mexicana (FES + FEA + NOM-151) construida sobre DocuSeal open-source",
  docs: [
    {
      type: "overview",
      title: "DocSeal-MD — Vision General",
      content: `
# DocSeal-MD — Firma Digital para Mexico

## Que es
DocSeal-MD es una plataforma de firma electronica construida como capa propietaria sobre DocuSeal (open-source). Implementa los tres niveles de firma electronica reconocidos en Mexico:

- **FES (Firma Electronica Simple):** Firma basica por correo/clic, valida para la mayoria de documentos comerciales.
- **FEA (Firma Electronica Avanzada):** Usa la e.firma del SAT (certificado .cer + llave privada .key), con validez legal plena.
- **NOM-151-SCFI-2016:** Genera constancias de conservacion emitidas por Prestadores de Servicios de Certificacion (PSC) acreditados por la Secretaria de Economia.

## Arquitectura Clean Room
DocuSeal corre como contenedor Docker vanilla sin modificaciones. Toda interaccion es via API REST + webhooks. Esto preserva el aislamiento de la licencia AGPL-3.0 y permite que el codigo propietario de MD Consultoria sea 100% propio.

## Para quien
- Empresas mexicanas que necesitan firmas con validez legal
- Verticales de MD Consultoria: VIGIA (contratos laborales), MediVista (consentimientos informados), CFDI-Motor (facturacion), AgroRentable, ERPNext MX, Odoo MD, HIDROS, RUTA MX, AuditorCiudadano, Sistema VIDA, AduanaMX, DentVista, CFDI-Suite
- Cualquier organizacion que requiera cumplimiento NOM-151

## Principio de seguridad fundamental
La llave privada del SAT (.key) NUNCA toca el servidor. Se procesa 100% en el navegador del usuario con la libreria efirma-validator (TypeScript + node-forge). Solo el hash firmado y el certificado publico se envian al backend.

## Modelo de negocio
Compliance-as-a-Service embebido en sistemas de gestion verticales. No vendemos firma electronica (commodity). Vendemos certeza legal automatica integrada en los sistemas que las empresas ya usan. Planes desde $499 MXN/mes.
`,
    },
    {
      type: "features",
      title: "DocSeal-MD — Features y Capacidades",
      content: `
# Features de DocSeal-MD

## 1. Motor Criptografico (Crypto Engine)
Microservicio FastAPI que actua como middleware entre las verticales MD y DocuSeal:
- Calcula hash SHA-256 de documentos firmados
- Valida certificados X.509 del SAT (DER y PEM)
- Extrae RFC, CURP, vigencia y tipo de persona del certificado
- SSRF protection con IP blocklist + host allowlist
- Rate limiting con slowapi en todos los endpoints
- 72 tests unitarios pasando

## 2. Gateway NOM-151
Microservicio FastAPI para integracion con PSC acreditados:
- Ciclo completo: solicitar, validar, renovar, descargar constancias
- Strategy Pattern: cambiar de PSC (Cincel, Incode, CECOBAN) con una variable de entorno
- Mock PSC para desarrollo (genera ASN.1 DER realista)
- Calculo automatico de retencion legal segun tipo de documento:
  - Comerciales: 10 anios (Codigo de Comercio Art. 49)
  - Fiscales: 5 anios (CFF Art. 30)
  - Laborales: 5 anios post-terminacion (LFT Art. 804)
  - Clinicos: 10 anios (NOM-004-SSA3-2012)
- 36 tests unitarios pasando

## 3. Validador e.firma (Browser)
Libreria TypeScript que se ejecuta 100% en el navegador:
- Parsea certificados .cer (DER X.509)
- Descifra llaves privadas .key (PKCS#8 encriptado con 3DES)
- Valida RFC con algoritmo completo del SAT (formato + checksum + palabras inconvenientes)
- Firma RSA-PKCS1-v1.5 con SHA-256
- 29 tests unitarios pasando

## 4. Portal de Administracion
Next.js 16 con Tailwind v4 y shadcn/ui:
- Landing premium con componentes del MD Design System (HoloCard, ScrollSection, MagneticButton, BlurReveal, CountUp)
- Dashboard con KPIs: firmas totales, certificadas, pendientes, alertas
- Lista de firmas con filtros por estado y vertical
- Detalle de firma con audit log, firmantes, certificacion NOM-151
- Constancias NOM-151 con stats, hash copy, acciones (validar/renovar/descargar)
- Monitor de salud de servicios con diagrama de arquitectura
- Componente e.firma: wizard 5 pasos (llave privada nunca sale del browser)
- Auth JWT con refresh tokens (15min access + 7d refresh)
- API proxy server-side (URLs internas ocultas del client bundle)
- 28 tests E2E con Playwright (landing, login, auth flow, firmas, seguridad)
- Responsive mobile-first con sidebar colapsable, touch targets 44px

## 5. Seguridad (6 capas)
- JWT auth con refresh tokens y rotacion automatica
- Content-Security-Policy restrictivo (script-src 'self', frame-ancestors 'none')
- API proxy server-side (oculta URLs internas, forward de session como Bearer)
- SSRF protection con IP blocklist + host allowlist
- Rate limiting en todos los endpoints (login: 5 req/min/IP)
- HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy strict
`,
    },
    {
      type: "technical",
      title: "DocSeal-MD — Arquitectura Tecnica",
      content: `
# Arquitectura Tecnica de DocSeal-MD

## Stack

| Componente | Tecnologia | Puerto |
|-----------|-----------|--------|
| DocuSeal (vanilla) | Rails 7 + Vue 3 | 3000 |
| Crypto Engine | FastAPI + Python 3.12 | 8010 |
| NOM-151 Gateway | FastAPI + Python 3.12 | 8011 |
| Portal | Next.js 16 + React 19 | 3001 |
| PostgreSQL (DocuSeal) | PostgreSQL 18 | 5432 |
| MinIO (S3) | MinIO | 9000 |
| Caddy (SSL) | Caddy 2 | 80/443 |
| n8n (workflows) | n8n community | 5678 |

## Seguridad implementada
- JWT auth con refresh tokens (15min access + 7d refresh, rotacion automatica en middleware)
- API proxy server-side: /api/proxy/crypto y /api/proxy/nom151 ocultan URLs internas
- Content-Security-Policy: script-src 'self' 'unsafe-inline', frame-ancestors 'none', connect-src 'self'
- SSRF protection con IP blocklist (private/loopback) + host allowlist
- Rate limiting con slowapi en todos los endpoints
- Webhook HMAC verification (X-DocuSeal-Signature)
- Docker: imagenes versionadas, puertos bound a localhost, credenciales requeridas
- Caddy: HSTS, X-Frame-Options, nosniff, Referrer-Policy strict-origin-when-cross-origin
- OG image dinamica via next/og edge runtime (1200x630)

## Tests (165+ total)
- Crypto Engine: 72 tests (SHA-256, X.509, hash service, API, SSRF)
- NOM-151 Gateway: 36 tests (PSC mock, constantes legales, API, retention)
- e.firma Validator: 29 tests (RFC validation, signing, dates)
- Portal E2E: 28 tests Playwright (landing, login, auth, firmas, seguridad, rate limit)

## Auditorias ejecutadas
1. Seguridad (OWASP, crypto, secrets): todos los criticos resueltos
2. Responsive: mobile-first, touch targets 44px, card-list mobile
3. Accesibilidad: skip-to-content, ARIA, contraste WCAG AA, keyboard nav
4. Performance: skeletons, lazy loading, abort signals
5. SEO: robots.txt, sitemap.xml, JSON-LD, OG image, meta tags
`,
    },
    {
      type: "roadmap",
      title: "DocSeal-MD — Roadmap y Proximos Pasos",
      content: `
# Roadmap de DocSeal-MD

## Completado (Abril 2026)
- Fase 1: Backend foundation (DB persistence, 137 tests, scripts)
- Fase 2: Portal UI premium (landing con MD Design System, 7 paginas)
- Fase 3: Integracion portal-backend (auth JWT, API client, e.firma browser)
- Fase 4: Security hardening + auditorias (5 auditorias, SSRF, rate limiting)
- Fase 5: Visual polish (scroll animations, skeletons, hover effects)
- Fase 6: Hardening final (API proxy, refresh tokens, CSP, OG image, 28 E2E tests)
- Deploy: Vercel (portal) — portal-lake-seven-86.vercel.app
- Status: PRODUCTION-READY

## Siguiente: PSC y Produccion
- Contratar PSC acreditado (Cincel o Incode) — requiere contrato + pago
- Credenciales reales de API para constancias NOM-151
- Primer cliente piloto: VIGIA (contratos laborales)
- Docker Compose full stack verification
- Monitoreo y alertas de renovacion de constancias

## Futuro: Escala
- Multi-tenancy para verticales
- API publica para integradores externos
- Dashboard de analytics avanzado
- Migrar rate limiting a @upstash/ratelimit para multi-instancia
- Considerar acreditacion como PSC propio cuando volumen > 15,000 docs/mes (inversion ~$5-12M MXN)

## Modelo de negocio

| Plan | Precio MXN/mes | Docs incluidos | Target |
|------|---------------|----------------|--------|
| Cumple | $499 | 25 | PyMEs, freelancers |
| Protege | $1,990 | 200 | Empresas medianas |
| Integra | $4,990 | 1,000 | Verticales con API |
| Enterprise | Desde $9,990 | Custom | Grandes empresas |

Break-even: 18-25 clientes plan Protege.
Mercado Mexico 2030: USD $1B+ (CAGR 40.1%).
Proyeccion conservadora: $200K MRR al mes 12 con 100 clientes.
`,
    },
    {
      type: "faq",
      title: "DocSeal-MD — Preguntas Frecuentes",
      content: `
# Preguntas Frecuentes

## Que es un PSC?
Un Prestador de Servicios de Certificacion (PSC) es una entidad acreditada por la Secretaria de Economia de Mexico para emitir constancias de conservacion segun NOM-151. DocSeal-MD consume APIs de PSC acreditados (Cincel, Incode) — no somos PSC.

## La llave privada del SAT es segura?
Si. La llave privada (.key) se procesa 100% en el navegador del usuario con JavaScript (node-forge). Solo el hash firmado y el certificado publico viajan al servidor. Incluso si el servidor es comprometido, la llave privada no puede ser extraida.

## Que diferencia hay entre FES y FEA?
FES (Firma Electronica Simple) es la firma basica por correo/clic. FEA (Firma Electronica Avanzada) usa la e.firma del SAT y tiene plena validez legal ante tribunales. DocSeal-MD soporta ambas.

## Por que DocuSeal y no DocuSign?
DocuSeal es open-source (AGPL-3.0), permite auto-hosting, y con nuestra capa propietaria cumple normatividad mexicana. DocuSign es SaaS cerrado, caro, y no cumple NOM-151.

## Cuanto cuesta operar DocSeal-MD?
El software es propio. Los costos operativos son: servidor (~$800 MXN/mes en Hetzner), PSC (~$3,000-8,000 MXN/mes segun volumen), y dominio/SSL (gratis con Caddy). El margen bruto por documento es 33-66%.

## Que verticales pueden usar DocSeal-MD?
13 proyectos de MD Consultoria: VIGIA (contratos laborales), MediVista (consentimientos), CFDI-Motor (facturacion), AgroRentable, ERPNext MX, Odoo MD, HIDROS, RUTA MX, AuditorCiudadano, Sistema VIDA, AduanaMX, DentVista, CFDI-Suite.

## Cuanto se tarda en llegar a break-even?
Con 18-25 clientes en plan Protege ($1,990/mes). Proyeccion conservadora: 10 clientes al mes 3, 25 al mes 6, 100 al mes 12.

## Es necesario certificarse como PSC?
No al inicio. Se recomienda consumir PSC tercero (Cincel/Incode) y evaluar certificacion propia cuando el volumen supere 15,000 docs/mes (costo PSC > $2M MXN/anio). La certificacion propia requiere inversion de $5-12M MXN y 12-24 meses.
`,
    },
  ],
  metadata: {
    version: "2.0.0",
    audience: "Equipo tecnico MD Consultoria TI + stakeholders + inversionistas potenciales",
    generatedAt: "2026-04-05",
  },
};

export default config;
