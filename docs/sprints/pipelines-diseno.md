# Dirección de Diseño UX/UI — Manual de Pipelines
## MD Consultoría TI | Framework de Decisión para Interfaces Profesionales

**Versión:** 1.0 — Sprint 2  
**Fecha:** Febrero 2026  
**Documento base:** consolidado-ux-ui.md (Sprint 1)  
**Objetivo:** Tú llegas con el activo (app, página, componente). Este manual define QUÉ pipeline usar, CON QUÉ herramientas, y EN QUÉ orden.

---

## La Dirección de Diseño — Cómo Funciona

Piensa en esto como tu equipo interno de diseño. El flujo siempre es:

```
RECEPCIÓN → DIAGNÓSTICO → PRESCRIPCIÓN → EJECUCIÓN → VALIDACIÓN
```

1. **Recepción** — Presentas el activo (screenshot, URL, código, descripción)
2. **Diagnóstico** — Claude analiza: qué tipo de activo es, estado actual, público objetivo, nivel de complejidad
3. **Prescripción** — Se selecciona el pipeline correcto del catálogo
4. **Ejecución** — Plan de trabajo pormenorizado con herramientas específicas
5. **Validación** — Revisión contra criterios de calidad profesional

---

## Matriz de Decisión Rápida

Antes de elegir un pipeline, responde estas 3 preguntas:

**Pregunta 1: ¿Qué tienes como punto de partida?**

| Si tienes... | Ve a Pipeline... |
|-------------|-----------------|
| App existente funcionando con UI genérica | P1 — Refactoring Visual |
| Diseño en Figma listo para implementar | P2 — Figma a Producción |
| Solo una idea o requerimientos en texto | P3 — Desde Cero con IA |
| Componente específico que necesita wow | P4 — Component Surgery |
| App completa que necesita rediseño total | P5 — Transformación Total |
| Landing page o sitio marketing | P6 — Impacto Visual Máximo |

**Pregunta 2: ¿Cuánto tiempo tienes?**

| Urgencia | Pipelines recomendados |
|----------|----------------------|
| Horas (demo, presentación) | P4 (componente) o P3 con v0.dev |
| 1-2 semanas | P1 (refactoring) o P2 (desde Figma) |
| 1-3 meses | P5 (transformación total) |

**Pregunta 3: ¿Qué nivel de fidelidad necesitas?**

| Nivel | Descripción | Pipeline |
|-------|------------|---------|
| MVP funcional | Se ve bien, funciona, no es genérico | P3 |
| Profesional | Competitivo con SaaS comerciales | P1, P2, P4 |
| Premium | Nivel Figma Community / Awwwards | P5, P6 |

---

## Los 6 Pipelines

Cada pipeline tiene: cuándo usarlo, qué herramientas necesita, pasos detallados, y criterios de éxito.

---

### P1 — Refactoring Visual (App existente → Profesional)

**Cuándo:** Tienes una app React funcionando pero con UI genérica, "AI slop", o inconsistente. La lógica de negocio está bien, el problema es puramente visual.

**Ejemplos reales:** MEDIAVISTA Pro mejorando dashboards de pacientes, CENTINELA modernizando vistas de incidentes, Sistema POA limpiando formularios financieros.

**Herramientas del pipeline:**
- shadcn/ui (reemplazo de componentes)
- Tremor (si hay gráficas/KPIs)
- CLAUDE.md con directivas estéticas (Sección 4.2 del consolidado)
- Skill frontend-design de Anthropic (Sección 4.1)
- shadcn MCP Server (Sección 5.2)
- Opcional: UI Expert MCP para auditoría automática (Sección 5.3)

**Pasos:**

```
FASE 1 — INFRAESTRUCTURA (Día 1-2)
├── Instalar skill frontend-design
├── Crear/actualizar CLAUDE.md con bloque <frontend_aesthetics>
├── Configurar MCP server shadcn
├── npx shadcn@latest init (si no existe)
├── Definir paleta HSL en globals.css
└── Elegir tipografía distintiva (NO Inter/Roboto/Arial)

FASE 2 — AUDITORÍA (Día 3)
├── Claude analiza código actual componente por componente
├── Identificar: fuentes genéricas, spacing inconsistente, falta de jerarquía
├── Listar componentes por orden de impacto visual
└── Generar plan de migración priorizado

FASE 3 — MIGRACIÓN COMPONENTE POR COMPONENTE (Semana 1-4)
│   Orden recomendado (consolidado Sección 9):
├── 1. Buttons → shadcn Button con variantes custom
├── 2. Form inputs → shadcn Input, Select, Textarea
├── 3. Cards → shadcn Card con sombras y spacing mejorado
├── 4. Data Tables → TanStack Table + shadcn
├── 5. Navigation → shadcn Sidebar, Breadcrumb
├── 6. Modals → shadcn Dialog, Sheet
├── 7. Charts → Tremor (si aplica)
└── 8. Notifications → Sonner toast

FASE 4 — POLISH (Semana 5-6)
├── Agregar micro-interacciones con Framer Motion
├── Implementar dark mode (CSS variables + darkMode:'class')
├── Verificar accesibilidad WCAG 2.1 AA
├── Revisar responsive en mobile
└── Command Palette (Cmd+K) para power users (si aplica)
```

**Regla de oro:** "Código tocado" — cada vez que tocas un archivo por cualquier razón (bug fix, feature), migras ese componente al nuevo sistema.

**Criterio de éxito:** Ningún componente usa fuentes genéricas, spacing es consistente en escala 4px, hay jerarquía visual clara, los CTAs destacan sobre elementos secundarios.


---

### P2 — Figma a Producción (Diseño existente → Código)

**Cuándo:** Tienes un diseño en Figma (propio o de Figma Community) y quieres implementarlo con fidelidad profesional. Los diseños increíbles que estás viendo en Figma entran aquí.

**Ejemplos reales:** Tomar un template premium de Figma Community para dashboard médico y convertirlo en MEDIAVISTA Pro. Adaptar un diseño gubernamental para CENTINELA.

**Herramientas del pipeline:**
- Figma MCP Server (Sección 5.1 del consolidado)
- shadcn/ui + shadcn MCP
- CLAUDE.md con tokens extraídos de Figma
- Claude Code con input de imágenes (Sección 7.5)
- Opcional: Tokens Studio → Style Dictionary para sincronización automática

**Pasos:**

```
FASE 1 — PREPARACIÓN EN FIGMA (Día 1)
├── Organizar diseño con Auto Layout y variables
├── Nombrar variables con convención Tailwind (primary-500, spacing-md)
├── Identificar componentes atómicos del diseño
├── Exportar tokens de color, tipografía, spacing
└── Tomar screenshots de cada sección/página clave

FASE 2 — CONFIGURACIÓN PROYECTO (Día 2)
├── Configurar Figma MCP: claude mcp add --transport http figma https://mcp.figma.com/mcp
├── shadcn init + instalar componentes base
├── Traducir tokens de Figma a CSS variables HSL en globals.css
├── Crear CLAUDE.md con tokens exactos del diseño
└── Configurar tipografía del diseño via Google Fonts

FASE 3 — SCAFFOLD POR COMPONENTES ATÓMICOS (Día 3-7)
│   REGLA: Nunca pedir página completa. Siempre componente por componente.
├── Alimentar a Claude Code con frame de Figma via MCP
├── Generar componente → screenshot resultado → comparar con Figma
├── Iterar diferencias: "el padding es 24px no 16px, el radius es 12px no 8px"
├── Repetir para cada componente atómico
└── Ensamblar componentes en layouts de página

FASE 4 — INTEGRACIÓN Y LÓGICA (Semana 2)
├── Conectar componentes visuales con lógica de negocio
├── Agregar estados: loading, error, empty, success
├── Implementar responsive (mobile-first)
├── Agregar animaciones de transición con Framer Motion
└── Testing visual: screenshot final vs diseño Figma original

ALTERNATIVA — PIPELINE TOKENS AUTOMÁTICOS
├── Instalar Tokens Studio en Figma
├── Exportar tokens como JSON
├── Style Dictionary → tailwind.config.ts automático
├── Zero configuración manual de colores/spacing
└── Ideal para equipos con diseñador dedicado
```

**Criterio de éxito:** Pixel-close fidelity — al poner screenshot del código junto al diseño Figma, las diferencias son imperceptibles a primera vista.


---

### P3 — Desde Cero con IA (Idea → App funcional con buen diseño)

**Cuándo:** No tienes diseño ni código. Empiezas de una idea, requerimientos, o descripción. Necesitas algo funcional y con buen aspecto rápido.

**Ejemplos reales:** Nuevo módulo de DentVista Pro, prototipo de AgroRentable para demo con gobierno, MVP de funcionalidad nueva.

**Herramientas del pipeline:**
- v0.dev para scaffold visual inicial (Sección 6.1 del consolidado)
- shadcn/ui como base de componentes
- CLAUDE.md con directivas estéticas
- Claude Code para refinamiento y lógica
- Opcional: Bolt.new para prototipo full-stack ultra-rápido

**Pasos:**

```
FASE 1 — INVESTIGAR ANTES DE CONSTRUIR (Hora 1-2)
│   Workflow 7.1 del consolidado:
├── Pedir a Claude: "Investiga cómo [Stripe/Linear/Notion] implementa [tipo de interfaz]"
├── Revisar output: patrones de layout, componentes usados, interacciones
├── Definir: "quiero que se sienta como [referencia] pero para [mi caso de uso]"
└── Guardar contexto de investigación

FASE 2 — SCAFFOLD VISUAL CON v0.dev (Hora 3-4)
├── Prompt en v0: descripción detallada del componente/página
├── Elegir entre 3 variaciones generadas
├── Copiar código al proyecto
├── Repetir para 3-5 componentes principales
└── Resultado: esqueleto visual con estética profesional

FASE 3 — REFINAMIENTO CON CLAUDE CODE (Día 2-5)
├── CLAUDE.md ya configurado con directivas estéticas
├── Importar código de v0 al proyecto
├── Claude Code conecta lógica de negocio
├── Personalizar tokens: paleta, tipografía, spacing
├── Agregar estados interactivos y validaciones
└── Implementar responsive y accesibilidad

FASE 4 — ELEVACIÓN (Semana 2)
├── Micro-interacciones con Framer Motion
├── Dark mode
├── Loading skeletons para estados de carga
├── Empty states con ilustraciones o mensajes guiados
└── Transiciones de página suaves

VARIANTE ULTRA-RÁPIDA (para demos o presentaciones)
├── Bolt.new: prompt detallado → prototipo full-stack en minutos
├── Exportar código → refinar en Claude Code
└── Limitación: calidad degrada con complejidad, usar solo para MVPs
```

**Criterio de éxito:** App funcional que NO se ve como "hecha con IA". Tiene personalidad, jerarquía clara, y se siente como un producto comercial, no un prototipo.


---

### P4 — Component Surgery (Componente específico → Wow)

**Cuándo:** Tienes UN componente o sección específica que necesita mejora drástica. No es un rediseño completo, es cirugía de precisión. Ideal para: la tabla de datos que se ve fea, el formulario que confunde al usuario, el dashboard que no tiene jerarquía.

**Ejemplos reales:** Odontograma interactivo de DentVista, tabla de pacientes de MEDIAVISTA, mapa de incidentes de CENTINELA, formulario de captura POA.

**Herramientas del pipeline:**
- Claude Code con imágenes de referencia (drag-and-drop)
- Componentes específicos de shadcn/ui o registries extendidos
- Aceternity UI / Magic UI para efectos premium
- Framer Motion para animaciones del componente

**Pasos:**

```
PASO 1 — REFERENCIA VISUAL (15 minutos)
├── Buscar 2-3 ejemplos del mismo tipo de componente en apps premium
│   (Stripe para tablas, Linear para kanban, Notion para formularios)
├── Screenshot de cada referencia
└── Pegar en Claude Code: "quiero que mi [componente] se vea así"

PASO 2 — DIAGNÓSTICO (15 minutos)
├── Claude analiza componente actual vs referencias
├── Lista diferencias: spacing, jerarquía, interacciones, estados
└── Propone plan de mejora con cambios específicos

PASO 3 — CIRUGÍA (1-4 horas)
├── Altitud correcta del prompting (Sección 7.6 del consolidado):
│   ✅ "Cambia shadow-md por shadow-xl, agrega backdrop-blur-sm,
│       usa font-semibold en headers, spacing de 24px entre rows"
│   ❌ "Hazlo más bonito"
├── Construir componente atómicamente (no toda la página)
├── Iterar: screenshot → comparar con referencia → ajustar → repetir
└── Agregar micro-interacciones: hover states, transiciones, feedback visual

PASO 4 — INTEGRACIÓN (30 minutos)
├── Reemplazar componente viejo por nuevo en la app
├── Verificar que no rompe nada
├── Probar responsive y estados edge (vacío, error, loading)
└── Validar accesibilidad
```

**Criterio de éxito:** El componente se ve indistinguible de la referencia premium. Cualquiera que lo vea piensa "esto lo hizo un diseñador profesional."


---

### P5 — Transformación Total (App completa → Rediseño de nivel premium)

**Cuándo:** La app necesita un rediseño completo. No es solo cambiar componentes — es repensar la arquitectura visual, la navegación, la experiencia completa. Es el pipeline más largo pero el de mayor impacto.

**Ejemplos reales:** MEDIAVISTA Pro pasando de "funcional" a "competidor de software médico comercial". CENTINELA evolucionando a plataforma de nivel federal.

**Herramientas del pipeline (todas):**
- Figma (diseño de referencia)
- Figma MCP + shadcn MCP + UI Expert MCP
- shadcn/ui + Tremor + Magic UI/Aceternity
- CLAUDE.md completo con sistema de diseño
- Skill frontend-design + plugin interface-design
- Storybook + Chromatic (documentación y regresión visual)
- Framer Motion para animaciones
- v0.dev para exploración visual rápida

**Pasos:**

```
FASE 1 — VISIÓN Y SISTEMA DE DISEÑO (Semana 1)
├── Definir identidad visual: personalidad, valores, público objetivo
├── Elegir 2-3 apps de referencia como "norte estético"
│   (Ej: "queremos la limpieza de Linear + la densidad de datos de Stripe")
├── Buscar/crear diseño de referencia en Figma
│   (Figma Community tiene templates médicos, dashboards, admin panels)
├── Extraer tokens: paleta HSL, tipografía, spacing, radius, sombras
├── Crear CLAUDE.md definitivo con TODO el sistema de diseño
├── Instalar TODA la infraestructura: skill, MCPs, shadcn, Tremor
└── Configurar Storybook para documentar componentes nuevos

FASE 2 — DESIGN SYSTEM COMO CÓDIGO (Semana 2)
├── globals.css con CSS variables completas (light + dark)
├── tailwind.config.ts con tema personalizado
├── Componentes base de shadcn personalizados con tokens propios
├── Crear: Button, Input, Card, Badge, Avatar con variantes propias
├── Documentar cada componente en Storybook
└── RESULTADO: librería de componentes propia, no genérica

FASE 3 — REBUILD POR MÓDULOS (Semana 3-8)
│   Aplicar enfoque de componentes atómicos (Sección 7.2):
├── Módulo 1: Layout principal (sidebar, header, navigation)
├── Módulo 2: Dashboard home (KPIs, gráficas, resumen)
├── Módulo 3: Listados y tablas (pacientes, incidentes, registros)
├── Módulo 4: Formularios (captura, edición, wizard)
├── Módulo 5: Detalle/ficha (perfil paciente, detalle incidente)
├── Módulo 6: Reportes y analytics (gráficas Tremor, exports)
│
│   Para cada módulo:
├── ── Screenshot de referencia Figma/app premium
├── ── Construir componentes atómicos individuales
├── ── Ensamblar en vista completa
├── ── Iterar con screenshots comparativos
├── ── Conectar lógica de negocio
└── ── Documentar en Storybook

FASE 4 — EXPERIENCIA PREMIUM (Semana 9-12)
├── Animaciones de página con Framer Motion (layoutId transitions)
├── Command Palette (Cmd+K) global
├── Dark mode completo
├── Loading skeletons personalizados
├── Empty states con diseño (no solo texto plano)
├── Onboarding/tour para usuarios nuevos
├── Feedback visual: toasts (Sonner), confirmaciones animadas
├── Regresión visual con Chromatic en CI/CD
└── Auditoría final: accesibilidad, responsive, performance
```

**Criterio de éxito:** Un usuario nuevo no puede distinguir tu app de un SaaS comercial premium. Tiene identidad visual propia, es consistente en cada pantalla, y las interacciones se sienten pulidas.


---

### P6 — Impacto Visual Máximo (Landing pages, marketing, presentaciones)

**Cuándo:** Necesitas una página que impresione visualmente. Landing pages de producto, sitios marketing, presentaciones a clientes o gobierno, demos. Aquí es donde GSAP brilla sobre Framer Motion.

**Ejemplos reales:** Landing page de CENTINELA para presentación a gobierno estatal, sitio de DentVista Pro para atraer dentistas, demo de AgroRentable para SADER.

**Herramientas del pipeline:**
- Aceternity UI + Magic UI para efectos wow
- GSAP + ScrollTrigger para animaciones narrativas de scroll
- v0.dev para scaffold visual rápido
- Claude Code para refinamiento
- Framer Motion para micro-interacciones de componentes

**Pasos:**

```
FASE 1 — INSPIRACIÓN Y ESTRUCTURA (Día 1)
├── Revisar 5-10 sitios en Awwwards, Dribbble, o Figma Community
├── Definir estructura narrativa: héroe → problema → solución → features → CTA
├── Elegir efectos específicos de Aceternity/Magic UI
│   (parallax scroll, text reveal, bento grid, spotlight cards)
├── Seleccionar paleta dramática (no conservadora)
└── Definir tipografía display de alto impacto

FASE 2 — SCAFFOLD (Día 2)
├── v0.dev: generar hero section + 2-3 secciones clave
├── Copiar código base al proyecto
├── Instalar componentes Aceternity/Magic UI necesarios:
│   npx shadcn add @magicui/[componente]
└── Instalar GSAP si se necesitan animaciones de scroll complejas

FASE 3 — ANIMACIÓN Y EFECTOS (Día 3-5)
├── Hero: animación de entrada dramática (text reveal, particles, gradient animation)
├── Scroll sections: GSAP ScrollTrigger para parallax y reveal progresivo
├── Features: bento grid con hover effects de Aceternity
├── Testimonials: carrusel animado
├── CTA: glassmorphism o spotlight effect
├── Patrón Z para guiar el ojo: Logo → Headline → Visual → CTA
└── REGLA: cada animación debe tener PROPÓSITO, no decoración random

FASE 4 — OPTIMIZACIÓN (Día 6-7)
├── Performance: lazy load imágenes, code splitting animaciones
├── Mobile: simplificar animaciones en viewport pequeño
├── SEO: meta tags, Open Graph, structured data
├── Velocidad de carga: target < 3 segundos
└── Cross-browser testing
```

**Criterio de éxito:** El cliente dice "wow" en los primeros 3 segundos. La página se siente como un producto de agencia de diseño, no como un template.


---

## Protocolo de Diagnóstico — Cómo Claude Evalúa tu Activo

Cuando traigas cualquier activo (app, página, componente, idea), Claude ejecuta este diagnóstico:

```
PASO 1 — CLASIFICAR EL ACTIVO
├── ¿Es código existente, diseño Figma, idea nueva, o componente específico?
├── ¿Es enterprise (médico, gobierno, finanzas) o consumer/marketing?
└── Resultado: Pre-selección de 1-2 pipelines candidatos

PASO 2 — EVALUAR ESTADO ACTUAL (si hay código)
├── ¿Qué stack usa? (React, Vue, vanilla)
├── ¿Tiene sistema de diseño o es ad-hoc?
├── ¿Usa componentes genéricos o librería establecida?
├── ¿Tiene CSS custom, Tailwind, o styled-components?
└── Resultado: Nivel de esfuerzo estimado

PASO 3 — IDENTIFICAR SÍNTOMAS
├── Fuentes genéricas (Inter/Roboto/Arial)
├── Spacing inconsistente
├── Falta de jerarquía visual
├── Bordes excesivos vs sombras
├── Ausencia de estados (loading, empty, error)
├── Sin dark mode
├── Sin micro-interacciones
├── Layout predecible de 12 columnas
└── Resultado: Lista priorizada de problemas

PASO 4 — PRESCRIBIR PIPELINE
├── Cruzar: tipo de activo × urgencia × nivel deseado
├── Seleccionar pipeline del catálogo
├── Personalizar pasos según contexto específico
└── Resultado: Plan de trabajo pormenorizado

PASO 5 — PRESENTAR PLAN
├── Pipeline seleccionado y justificación
├── Herramientas específicas a usar
├── Fases con estimación de tiempo
├── Entregables por fase
└── Criterios de éxito medibles
```

---

## Referencia Rápida — Cheat Sheet

| Situación | Pipeline | Tiempo | Herramienta clave |
|-----------|---------|--------|-------------------|
| "Mi app se ve genérica" | P1 Refactoring | 2-6 semanas | shadcn/ui + CLAUDE.md |
| "Tengo este diseño Figma increíble" | P2 Figma→Prod | 1-2 semanas | Figma MCP + shadcn |
| "Necesito construir esto desde cero" | P3 Desde Cero | 1-2 semanas | v0.dev + Claude Code |
| "Esta tabla/form/card se ve terrible" | P4 Surgery | 2-8 horas | Claude Code + imágenes ref |
| "Quiero rediseñar TODO" | P5 Transformación | 2-3 meses | Todo el arsenal |
| "Necesito una landing que impresione" | P6 Impacto Max | 1 semana | Aceternity + GSAP |

---

## Prerrequisitos Comunes a Todos los Pipelines

Independiente del pipeline elegido, estos elementos deben estar configurados:

**Configuración base (una sola vez por proyecto):**
```bash
# 1. Skill frontend-design
mkdir -p .claude/skills/frontend-design && curl -o .claude/skills/frontend-design/SKILL.md \
  https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md

# 2. shadcn/ui
npx shadcn@latest init

# 3. MCP server shadcn (en .mcp.json del proyecto)
# { "mcpServers": { "shadcn": { "command": "npx", "args": ["shadcn@latest", "mcp"] } } }

# 4. CLAUDE.md con directivas estéticas
# (usar template de Sección 4.2 del consolidado)
```

**Configuración avanzada (según necesidad):**
```bash
# Figma MCP (si usas Figma)
claude mcp add --transport http figma https://mcp.figma.com/mcp

# Plugin interface-design (memoria persistente)
/plugin marketplace add Dammyjay93/interface-design

# Tremor para gráficas
npx shadcn add chart
```

---

## Combinando Pipelines

Los pipelines no son mutuamente excluyentes. Combinaciones comunes:

- **P5 + P4:** Transformación total donde cada módulo se trata como cirugía de componente
- **P2 + P1:** Empiezas desde Figma para nuevas pantallas, refactorizas las existentes
- **P3 + P6:** Construyes la app funcional desde cero, luego aplicas impacto visual para la landing
- **P1 + P4:** Refactoring general pero con cirugía específica en los componentes más visibles

---

## Cómo Iniciar una Sesión de Diseño

Cuando quieras mejorar algo, simplemente dime:

> "Tengo [descripción del activo]. Quiero que se vea [nivel/referencia]. Tengo [tiempo disponible]."

Ejemplos:
- "Tengo el dashboard de MEDIAVISTA Pro. Quiero que se vea como los dashboards médicos de Figma Community. Tengo 3 semanas."
- "Tengo este formulario de captura de CENTINELA. Se ve terrible. Tengo 4 horas."
- "Necesito una landing page para DentVista Pro que impresione a los dentistas. Tengo 1 semana."
- "Voy a construir el módulo de reportes de Sistema POA desde cero. Necesito nivel profesional."

Yo ejecuto el protocolo de diagnóstico, te prescribo el pipeline, y arrancamos con plan pormenorizado.

---

*Sprint 2 completado — Febrero 2026*  
*Base: consolidado-ux-ui.md (Sprint 1)*  
*Siguiente: Sprint 3 — Piloto real sobre app seleccionada*

