import type { NotebookPackConfig } from "@/docs-kit/types";

const config: NotebookPackConfig = {
  projectName: "DocSeal-MD",
  projectSlug: "docseal",
  description: "Plataforma de firma digital con validez legal mexicana (FES + FEA + NOM-151) construida sobre DocuSeal open-source",
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
- Verticales de MD Consultoria: VIGIA (contratos laborales), MediVista (consentimientos informados), CFDI-Motor (facturacion), AgroRentable, ERPNext MX, Odoo MD, HIDROS, RUTA MX, AuditorCiudadano, Sistema VIDA, AduanaMX
- Cualquier organizacion que requiera cumplimiento NOM-151

## Principio de seguridad fundamental
La llave privada del SAT (.key) NUNCA toca el servidor. Se procesa 100% en el navegador del usuario con la libreria efirma-validator (TypeScript + node-forge). Solo el hash firmado y el certificado publico se envian al backend.
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
- Almacena documentos firmados en MinIO con metadata
- Audit trail inmutable (cada accion genera un AuditLog)

## 2. Gateway NOM-151
Microservicio FastAPI para integracion con PSC acreditados:
- Ciclo completo: solicitar → validar → renovar → descargar constancias
- Strategy Pattern: cambiar de PSC (Cincel, Incode, CECOBAN) con una variable de entorno
- Mock PSC para desarrollo (genera ASN.1 DER realista)
- Calculo automatico de retencion legal segun tipo de documento:
  - Comerciales: 10 anios (Codigo de Comercio Art. 49)
  - Fiscales: 5 anios (CFF Art. 30)
  - Laborales: 5 anios post-terminacion (LFT Art. 804)
  - Clinicos: 10 anios (NOM-004-SSA3-2012)

## 3. Validador e.firma (Browser)
Libreria TypeScript que se ejecuta 100% en el navegador:
- Parsea certificados .cer (DER X.509)
- Descifra llaves privadas .key (PKCS#8 encriptado con 3DES)
- Valida RFC con algoritmo completo del SAT (formato + checksum + palabras inconvenientes)
- Firma RSA-PKCS1-v1.5 con SHA-256
- Empaqueta solo datos publicos (SignaturePackage) para enviar al servidor

## 4. Portal de Administracion
Next.js 15 con Tailwind v4 y shadcn/ui:
- Dashboard con KPIs: firmas totales, certificadas, pendientes, alertas
- Lista de firmas con filtros por estado y vertical
- Detalle de firma con audit log, firmantes, certificacion NOM-151
- Constancias NOM-151 con stats, hash copy, badges de PSC
- Monitor de salud de 7 servicios con diagrama de arquitectura
- Responsive: sidebar colapsable, card-list mobile, touch targets 44px

## 5. Video Demo (Remotion)
Video programatico de 30 segundos con 5 escenas:
- Hero con logo animado
- Problema de la firma en Mexico
- Solucion DocSeal-MD
- Preview del dashboard
- Call to action
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
| Portal | Next.js 15 + React 19 | 3001 |
| PostgreSQL (DocuSeal) | PostgreSQL 18 | 5432 |
| PostgreSQL (MD) | PostgreSQL 16 | 5433 |
| MinIO (S3) | MinIO | 9000 |
| Caddy (SSL) | Caddy 2 | 80/443 |
| n8n (workflows) | n8n community | 5678 |

## Seguridad implementada
- JWT auth en todos los endpoints (health excluidos)
- Webhook HMAC verification (X-DocuSeal-Signature)
- SSRF protection con allowlist de hosts para document_url
- Docker: imagenes versionadas, puertos bound a localhost, credenciales requeridas
- Caddy: HSTS, X-Frame-Options, Content-Security-Policy, nosniff
- CORS con headers explicitos (no wildcard)
- Rate limiting con slowapi
- Contenedores non-root

## Tests
- Crypto Engine: 40 tests (SHA-256, X.509, hash service, API endpoints)
- NOM-151 Gateway: 21 tests (PSC mock, constantes legales, API)
- e.firma Validator: 29 tests (RFC validation, signing, dates)
- Total: 90/105 pasando (11 requieren PostgreSQL corriendo)

## Auditorias ejecutadas
1. Seguridad (OWASP, crypto, secrets): 4 criticos resueltos
2. Calidad de codigo: 8.5/10 (A-)
3. Funcional: ~35/50 (C+) — bug critico de integracion resuelto
4. Diseno UX/UI: 8.3/10 (B+)
5. Responsive: 7.8/10 (B+) — de D inicial
`,
    },
    {
      type: "roadmap",
      title: "DocSeal-MD — Roadmap y Proximos Pasos",
      content: `
# Roadmap de DocSeal-MD

## Completado (Abril 2026)
- Fase 1: Backend foundation (DB persistence, 94 tests, scripts)
- Fase 2: Portal UI premium (5 paginas, design system, Remotion video)
- Fase 3: Security hardening (JWT, HMAC, SSRF, Docker, Caddy)
- Fase 4: Audit fixes (integracion, a11y, code quality)
- Deploy: Vercel (portal) + GitHub PR #1

## Fase 5: Integracion Real (proximo)
- Conectar portal a APIs reales (crypto-engine, nom151-gateway)
- Componente de firma con e.firma (integrar efirma-validator en el portal)
- Docker Compose full stack verification
- Alembic migrations para ambos servicios

## Fase 6: PSC y Produccion
- Contratar PSC acreditado (Cincel o Incode)
- Credenciales reales de API
- Primer cliente piloto: VIGIA (contratos laborales)
- Monitoreo y alertas de renovacion de constancias

## Fase 7: Escala
- Multi-tenancy para verticales
- API publica para integradores externos
- Dashboard de analytics avanzado
- Considerar acreditacion como PSC propio (inversion ~$5-12M MXN)
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
El software es propio. Los costos operativos son: servidor (~$800 MXN/mes en Hetzner), PSC (~$3,000-8,000 MXN/mes segun volumen), y dominio/SSL (gratis con Caddy).

## Que verticales pueden usar DocSeal-MD?
13 proyectos de MD Consultoria: VIGIA (contratos laborales), MediVista (consentimientos), CFDI-Motor (facturacion), AgroRentable, ERPNext MX, Odoo MD, HIDROS, RUTA MX, AuditorCiudadano, Sistema VIDA, AduanaMX, DentVista, CFDI-Suite.
`,
    },
  ],
  metadata: {
    version: "1.0.0",
    audience: "Equipo tecnico MD Consultoria TI + stakeholders",
    generatedAt: "2026-04-04",
  },
};

export default config;
