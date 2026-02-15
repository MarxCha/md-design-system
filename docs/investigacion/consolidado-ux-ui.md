# Estrategia Integral de Ingeniería UX/UI para Desarrollo con IA
## MD Consultoría TI — Documento Consolidado de Investigación

**Versión:** 1.0  
**Fecha:** Febrero 2026  
**Fuentes:** Investigación Claude (análisis de herramientas, workflows, configuración) + Investigación complementaria (fundamentos de diseño, ecosistema de componentes, prompting avanzado)  
**Stack objetivo:** React + Tailwind CSS + TypeScript  
**Contexto:** Aplicaciones enterprise — sistemas médicos, plataformas gubernamentales, dashboards ejecutivos

---

## 1. El Problema: "AI Slop" y la Convergencia Estética

El paradigma actual del desarrollo con agentes de IA como Claude Code presenta una problemática persistente: la tendencia de los modelos a converger hacia una estética genérica, caracterizada por interfaces funcionales pero carentes de identidad visual, jerarquía clara o refinamiento en la experiencia de usuario. Los resultados típicos incluyen:

- Fuentes genéricas (Inter, Roboto, Arial) sin personalidad
- Gradientes púrpura sobre blanco repetitivos
- Layouts de 12 columnas predecibles
- Falta de jerarquía visual — botones de acción principal compiten con textos secundarios
- Dependencia excesiva de bordes para separar secciones
- Ausencia de micro-interacciones y movimiento

La solución NO es una única herramienta mágica, sino una **infraestructura de contexto** compuesta por: design tokens bien estructurados, instrucciones precisas (CLAUDE.md), componentes de alta calidad pre-instalados, y referencias visuales concretas.

---

## 2. Fundamentos de Diseño — Reglas Ejecutables

Estas reglas deben integrarse directamente en CLAUDE.md y archivos de reglas para que Claude Code las aplique automáticamente.

### 2.1 Jerarquía Visual y Patrones de Escaneo

La jerarquía visual es la disposición estratégica de elementos para comunicar orden de importancia, usando tamaño, contraste, color y espacio en blanco para guiar el ojo del usuario.

- **Patrón Z:** Para landing pages y páginas con pocos elementos — el ojo recorre de izquierda-derecha arriba, diagonal al centro, izquierda-derecha abajo
- **Patrón F:** Para interfaces densas en contenido (dashboards, listados) — escaneo horizontal superior, segundo horizontal más corto, vertical descendente por la izquierda

| Elemento | Estrategia | Impacto |
|----------|-----------|---------|
| Tamaño y escala | Encabezados primarios 3x más grandes que cuerpo; pesos 800-900 para énfasis | Punto de entrada visual inmediato |
| Color y contraste | Colores vibrantes exclusivamente para CTAs; desaturar elementos secundarios | Reduce fatiga visual, destaca acciones críticas |
| Sombras y profundidad | Sistema multi-nivel (sm, md, lg) para indicar elevación en eje Z | Sensación de realismo, prioriza capas de información |
| Espacio en blanco | Márgenes y paddings consistentes basados en tokens predefinidos | Mejora legibilidad, previene sobrecarga visual |

**Principio clave (Refactoring UI):** Comenzar siempre con EXCESO de espacio en blanco y reducir gradualmente, en lugar de añadir padding a una interfaz ya congestionada.

### 2.2 Sistema de Espaciado

Escala modular basada en múltiplos de 4px:

```
4px — micro (gap entre icono y texto)
8px — xs (padding interno compacto)
12px — sm (separación entre elementos inline)
16px — md (padding estándar de componentes)
24px — lg (separación entre grupos)
32px — xl (separación entre secciones menores)
48px — 2xl (separación entre secciones principales)
64px — 3xl (separación entre bloques de página)
```

### 2.3 Tipografía

- **Máximo 2 familias:** una sans-serif para cuerpo + una serif o geométrica distintiva para encabezados
- **NUNCA usar:** Arial, Inter, Roboto como fuente principal (genéricas de IA)
- **Line-height:** 1.5 para texto cuerpo, 1.2-1.3 para encabezados
- **Escala tipográfica:** saltos de 3x entre cuerpo y headings principales
- **Pesos extremos:** combinar 100-300 (light) con 700-900 (bold) para crear drama visual
- **Letter-spacing:** ajustar proporcionalmente al tamaño (más tight en headings grandes)

### 2.4 Color

- **Regla 60-30-10:** 60% color primario neutro, 30% secundario, 10% acento
- **Usar HSL sobre HEX/RGB:** facilita crear variantes coherentes y ajustar luminosidad para accesibilidad WCAG 2.1
- **Diseñar en escala de grises primero:** resolver jerarquía con espaciado y peso tipográfico ANTES de añadir color
- **Curva de saturación:** aumentar saturación de grises en extremos de brillo para evitar aspecto "lavado"

**Paleta enterprise recomendada (CSS variables):**
- Azul primario — confianza, profesionalismo
- Slate secundario — neutral, corporativo
- Verde — métricas positivas, éxito
- Amber — alertas, advertencias
- Rojo — errores críticos, urgencia

### 2.5 Bordes, Sombras y Profundidad

La tendencia actual en diseño de alta fidelidad favorece:
- Sombras sutiles SOBRE bordes para separar secciones
- Variaciones de color de fondo para crear distinción sin ruido visual
- Sistema de sombras consistente: `shadow-sm` (elevación sutil), `shadow-md` (cards), `shadow-lg` (modales/dropdowns)
- Border radius consistente: 6px (sm), 8px (md), 12px (lg)

---

## 3. Ecosistema de Componentes Modernos

### 3.1 shadcn/ui — El Estándar de Facto (~90K estrellas GitHub)

A diferencia de librerías npm cerradas, shadcn/ui propone un modelo copy-paste: el código fuente se copia directamente al proyecto, otorgando control total sobre la implementación. Construido sobre Radix UI (accesibilidad WAI-ARIA) + Tailwind CSS.

**Instalación:**
```bash
npx shadcn@latest init
```

**Ventajas estratégicas:**
- Control total del código fuente (personalizaciones profundas imposibles con componentes encapsulados)
- Herramientas como v0.dev, Bolt.new, Lovable generan código shadcn por defecto
- Sistema de registries: terceros crean colecciones instalables con el mismo CLI
- Ecosistema masivo documentado en awesome-shadcn-ui (GitHub)

**Riesgo de ubicuidad:** La popularidad ha generado que muchas apps luzcan idénticas. Para mitigar: usar librerías de bloques extendidos y personalización profunda de tokens.

### 3.2 Tremor — Componentes para Analytics y Dashboards

Adquirido por Vercel en 2025. 35+ componentes específicos para dashboards: gráficas de área, barras, líneas, KPI cards, trackers, tablas. 250+ bloques pre-construidos.

**Instalación:**
```bash
npx shadcn add chart
```

**Ideal para:** Sistemas de gestión médica (signos vitales, KPIs), dashboards gubernamentales, reportes ejecutivos.

### 3.3 Librerías de Bloques Extendidos para shadcn/ui

| Librería | Componentes | Enfoque | Caso de uso |
|----------|------------|---------|-------------|
| **Aceternity UI** (ui.aceternity.com) | 200+ animados | Parallax, efectos 3D, hero sections, bordes animados | Landing pages de alto impacto, productos SaaS |
| **Magic UI** (magicui.design, ~19.4K★) | 150+ animados | Micro-interacciones, efectos scroll | Interfaces con "wow factor", transiciones fluidas |
| **Origin UI** (originui.com) | 500+ copy-paste | Componentes variados | Volumen y variedad rápida |
| **Shadcnblocks** | 800+ bloques | Marketing y dashboards listos para producción | Prototipado rápido de SaaS completas |
| **Preline UI** | 840+ componentes | Componentes gratuitos variados | Base amplia de opciones |
| **Flowbite** | 400+ componentes | Adaptadores React disponibles | Componentes con buena documentación |
| **Skiper UI** | Bloques SaaS | Landing pages, animaciones suaves | Dashboards administrativos pulidos |
| **Tailark** | Bloques productividad | Estética inspirada en Notion | Apps de gestión de contenido |
| **Motion Primitives** | Primitivos animación | Basados en Framer Motion | Animaciones base reutilizables |
| **21st.dev** | Componentes shadcn CLI | "Dribbble para ingenieros" | Inspiración + código real de vanguardia |

### 3.4 Templates y Boilerplates de Referencia

| Template | Stack | Fortaleza |
|----------|-------|-----------|
| **shadcn-admin** (~11K★ GitHub) | shadcn + Vite | Panel administración completo |
| **SaaS Boilerplate (ixartz)** | Next.js 15, Tailwind, shadcn, Drizzle | Lighthouse 100, micro-servicios |
| **Next.js shadcn Dashboard** | Next.js, Radix, Lucide, Recharts | Navegación Cmd+K, dark mode nativo |
| **Horizon UI** | React, Tailwind, shadcn | Estética IA, chat tipo ChatGPT |
| **Minimal UI Dashboard** | Material UI, React | Diseño premium, aire entre elementos |

### 3.5 Animación: Framer Motion vs GSAP

La animación es función de UX que comunica estados y relaciones entre componentes, no decoración.

| Criterio | Framer Motion | GSAP |
|----------|--------------|------|
| Integración React | Profunda, declarativa (props) | Imperativa, requiere refs manuales |
| Mejor para | Modals, tabs, gestos, reordenamiento listas, micro-interacciones | Parallax complejo, timelines, scroll narrativo, SVG morphing |
| Timeline | Secuencias básicas y variantes | Control total: tiempo, delays, sincronización precisa |
| SVG | Transformaciones básicas y opacidad | Morphing avanzado de paths, dibujo de trazos |
| Rendimiento | Excelente para UI estándar | 60fps garantizado en animaciones densas |
| Recomendación | **Default para MEDIAVISTA, CENTINELA, dashboards** | Landing pages premium, portafolios, marketing |

**Plugin clave de GSAP:** ScrollTrigger — sin rival en experiencias narrativas basadas en scroll.

---

## 4. Configuración de Claude Code — Máximo Impacto en Calidad UI

### 4.1 Skill frontend-design (Oficial Anthropic) — MÁXIMO IMPACTO

Instruye a Claude a: elegir dirección estética audaz antes de codificar, evitar fuentes genéricas, usar paletas con carácter, agregar animaciones con propósito.

**Instalación (30 segundos):**
```bash
mkdir -p .claude/skills/frontend-design && curl -o .claude/skills/frontend-design/SKILL.md \
  https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md
```

### 4.2 CLAUDE.md con Directivas Estéticas — MÁXIMO IMPACTO

Agregar bloque de estética destilada al CLAUDE.md del proyecto:

```xml
<frontend_aesthetics>
You tend to converge toward generic outputs. Avoid "AI slop" aesthetic.

Typography: Choose beautiful, unique fonts. Avoid Arial/Inter/Roboto.
Use extreme weight combinations (100-300 vs 700-900) and 3x size jumps.
Max 2 font families. Line-height: 1.5 body, 1.2-1.3 headings.

Color & Theme: Commit to cohesive aesthetic. Use CSS variables with HSL.
Apply 60-30-10 rule. Design in grayscale first, add color after.

Spacing: Use 4px modular scale (4,8,12,16,24,32,48,64).
Start with excess whitespace and reduce gradually.

Motion: Use Framer Motion for component state changes.
Prioritize CSS transitions for simple hover/focus states.

Layout: Break free from standard 12-column grids.
Use F-pattern for dashboards, Z-pattern for landing pages.

Backgrounds: Create atmosphere and depth with subtle gradients and shadows.
Prefer shadows over borders for section separation.

Avoid: Inter/Roboto/Arial, purple gradients on white, predictable layouts,
excessive borders, components competing for attention equally.
</frontend_aesthetics>
```

**Estructura CLAUDE.md recomendada como sistema de diseño ejecutable:**

```markdown
# Proyecto: [Nombre]

## Stack
- React 18 + TypeScript
- Tailwind CSS v4 con tema personalizado
- shadcn/ui como base de componentes
- Framer Motion para animaciones
- Tremor para gráficas y dashboards

## Sistema de Diseño
- Tipografía principal: [fuente elegida] via Google Fonts
- Paleta: Ver CSS variables en globals.css
- Spacing: escala 4px (4, 8, 12, 16, 24, 32, 48, 64)
- Border radius: 6px (sm), 8px (md), 12px (lg)
- Sombras: shadow-sm (sutil), shadow-md (cards), shadow-lg (modals)

## Reglas de UI
- NUNCA usar Inter, Roboto, Arial como fuente principal
- SIEMPRE usar CSS variables para colores (HSL)
- SIEMPRE usar clases Tailwind; cero inline styles
- Preferir sombras sobre bordes para separar secciones
- Responsive mobile-first
- HTML semántico y atributos ARIA
- Preferir componentes shadcn/ui sobre custom
- Aplicar regla 60-30-10 de color
- Diseñar jerarquía en escala de grises antes de añadir color

## Rol
Actúa como Senior UI Designer experto en sistemas de diseño atómico y WCAG 2.1
```

**Reglas por subdirectorio:** Crear `.claude/rules/frontend/styling.md` para reglas localizadas que aplican solo cuando Claude trabaja en archivos de UI.

### 4.3 Plugin interface-design (Dammyjay93, ~1.1K★)

Memoria de diseño persistente entre sesiones de Claude Code.

```bash
/plugin marketplace add Dammyjay93/interface-design
```

**Comandos:**
- `/interface-design:init` — inicializar sistema de diseño
- `/interface-design:audit <path>` — auditar archivos existentes
- `/interface-design:extract` — extraer patrones del código actual

### 4.4 Uso de Etiquetas XML en Prompts

Los modelos Claude interpretan etiquetas XML con mayor fidelidad que otros formatos. Usar `<frontend_aesthetics>`, `<design_rules>`, `<component_spec>` para separar instrucciones, contexto y ejemplos en CLAUDE.md.


---

## 5. MCP Servers para UI/UX

### 5.1 Figma MCP Server (Oficial) — Conexión directa diseño → código

Lee datos estructurados de Figma: layout, estilos, componentes, tokens de diseño.

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

**Herramientas disponibles:** `get_design_context`, `create_design_system_rules`, extracción de tokens.

**Tip:** Nombrar variables en Figma con convenciones Tailwind (primary-500, spacing-md) para máxima fidelidad en traducción.

**Funciona con:** Selección directa en Figma Desktop o via URL de frame.

### 5.2 shadcn/ui MCP Server (Oficial) — MÁXIMO IMPACTO

Explorar, buscar e instalar componentes shadcn via lenguaje natural.

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

Soporta múltiples registries incluyendo privados.

### 5.3 UI Expert MCP (github.com/reallygood83)

Servidor MCP para análisis y mejora automática de UI.

**Herramientas:** `analyze_ui` para detectar inconsistencias de spacing, problemas de accesibilidad, y aplicar correcciones masivas.

**Valor:** Auditoría profesional automática del código generado por IA.

### 5.4 Design System Starter (MCP Market)

Implementa sistemas de tokens basados en estándares W3C y arquitectura atómica. Crea base sólida y escalable para aplicaciones enterprise.

### 5.5 Storybook MCP Server (Experimental)

Addon MCP que proporciona metadatos curados de componentes, patrones validados, suites de test.

**Impacto en tokens:** Sin MCP: 50K-100K tokens cargando codebase completa. Con MCP: contexto enfocado y eficiente.

---

## 6. Herramientas Complementarias de Generación

### 6.1 v0.dev (Vercel) — Scaffolding visual rápido

Genera componentes React + Tailwind + shadcn desde prompts de texto o imágenes/Figma. 3 variaciones por prompt. Código limpio, copy-paste sin vendor lock-in.

**Precio:** $20/mes (Premium) — ~160 generaciones.

**Workflow óptimo:** v0 para scaffold visual → copiar a proyecto → Claude Code para refinamiento y lógica de negocio.

### 6.2 Bolt.new (StackBlitz) — Prototipos full-stack

Prototipos frontend + backend + DB en browser. Útil para MVPs rápidos. Calidad degrada con complejidad.

### 6.3 Lovable.dev — Orquestación lógica

Desarrollo acelerado de flujos de datos y conexiones a base de datos. Sincronización bidireccional con GitHub.

### 6.4 Storybook + Chromatic — Documentación y regresión visual

- **Storybook:** Documenta componentes en aislamiento con todos sus estados. Con IA: generar stories completas en minutos (ahorro 30-45 min por componente).
- **Chromatic:** Testing de regresión visual pixel-por-pixel en cada commit. En CI/CD: captura regresiones visuales de cambios generados por IA.

### 6.5 Pipeline de Design Tokens

**Tokens Studio** (plugin Figma, 264K+ usuarios) → **Style Dictionary** (Amazon) → Tailwind config

Tokens definidos visualmente en Figma se sincronizan automáticamente a código. Tailwind CSS v4: bloque `@theme` nativo en CSS simplifica el proceso.


---

## 7. Workflows Probados — De Genérico a Profesional

### 7.1 Workflow "Investigar Primero, Construir Después"

1. Pedir a Claude investigar cómo se implementa el componente en apps de referencia (Stripe, Linear, Notion, Vercel)
2. Revisar output de investigación
3. Pegar documento completo en nueva conversación
4. Pedir a Claude construir con ese contexto

**Resultado:** "Diseñar botón" vs "diseñar botón como dashboard de Stripe" produce resultados completamente diferentes.

### 7.2 Enfoque de Componentes Atómicos

- Página completa desde screenshot: ~40% del resultado esperado
- Componentes atómicos individuales con prompts detallados: ~90%
- **Regla:** Construir componentes individuales, NUNCA páginas enteras de un golpe.

### 7.3 Workflow Figma → Claude Code Directo

1. Diseñar happy path en Figma con variables y tokens correctos
2. Alimentar a Claude Code via Figma MCP
3. Obtener base sólida en minutos (50+ horas → 15 minutos scaffold)
4. Iterar 50+ horas refinando

**Clave:** El craft vive en la iteración post-scaffold, no en la generación inicial.

### 7.4 Workflow "Frankenstein" — Multi-herramienta Orquestado

Pipeline que combina fortalezas de múltiples herramientas IA:

| Etapa | Herramienta | Razón |
|-------|------------|-------|
| 1. Diseño inicial | Figma + Plugins IA (Magician, Magic Patterns) | Ideación rápida, guía de estilo visual |
| 2. Traducción a código | Cursor + Figma MCP | Captura precisa de specs sin errores de interpretación |
| 3. Orquestación lógica | Lovable.dev | Flujos de datos, conexiones BD aceleradas |
| 4. Refinamiento visual | v0.dev | Componentes con estética pulida para producción |
| 5. Deploy | Vercel | Despliegue final optimizado |

### 7.5 Workflow Iterativo con Imágenes

Claude Code soporta input de imágenes: drag-and-drop, Ctrl+V, path reference.

**Ciclo:**
1. Pegar mockup/screenshot de referencia
2. Claude genera código
3. Screenshot del resultado
4. Pegar de vuelta para comparar
5. Claude refina diferencias
6. Repetir hasta satisfacción

### 7.6 Prompting a la "Altitud Correcta"

**Evitar — demasiado bajo:**
```
Usa #3B82F6 con padding 16px y font-size 14px
```

**Evitar — demasiado alto:**
```
Hazlo bonito y profesional
```

**Nivel correcto:**
```
Crea dashboard que se vea como Awwwards.
Usa glassmorphism sutil, paleta profesional azul-slate, micro-interacciones smooth.
Componentes shadcn/ui con variantes custom.
Referencia: dashboards de Linear y Vercel.
Mobile-first responsive. Dark mode con CSS variables.
```

### 7.7 Técnicas Avanzadas de Prompting

**Analogía Creativa:** Conectar el diseño de una herramienta de gestión con mecánicas de otra disciplina. Ejemplo: "Diseña el flujo de completar tareas como las mecánicas de recompensa de un RPG — puntos de experiencia, animaciones de celebración al completar hitos."

**Visión Hiper-Específica:** Describir atmósfera con códigos de color específicos y layouts asimétricos. Fuerza a Claude a salir de patrones de rejilla estándar.

**Especificidad Técnica sobre Vagas Aspiraciones:**
- ❌ "Hazlo más bonito"
- ✅ "Cambia shadow-md por shadow-xl, p-4 por p-12, y aplica backdrop-blur-sm al header"


---

## 8. Repositorios y Recursos Clave

### 8.1 Repos de Componentes y Bloques

| Repo/Recurso | URL | Contenido |
|--------------|-----|-----------|
| awesome-shadcn-ui | github.com/birobirobiro/awesome-shadcn-ui | 200+ recursos curados del ecosistema |
| Directorio registries shadcn | ui.shadcn.com/docs/directory | Docenas de colecciones instalables |
| 21st.dev | 21st.dev | "Dribbble para ingenieros" — componentes shadcn CLI |
| Aceternity UI | ui.aceternity.com | 200+ componentes animados |
| Magic UI | magicui.design | 150+ componentes animados, companion shadcn |
| Origin UI | originui.com | 500+ componentes copy-paste |

### 8.2 Repos para Claude Code

| Repo | URL | Valor |
|------|-----|-------|
| LibreUIUX-Claude-Code | github.com/HermeticOrmus/LibreUIUX-Claude-Code | Prompts, comandos y flujos de trabajo enfocados en UI/UX |
| awesome-claude-code-subagents | github.com/VoltAgent/awesome-claude-code-subagents | 100+ subagentes: frontend-developer, ui-designer especializados |
| awesome-claude-code | github.com/jqueryscript/awesome-claude-code | Herramientas, IDE integrations, frameworks |
| awesome-cursorrules | github.com/PatrickJS/awesome-cursorrules | Cientos de archivos de reglas por framework, adaptables a CLAUDE.md |
| ui-expert-mcp | github.com/reallygood83/ui-expert-mcp | MCP server para auditoría automática de UI |

### 8.3 Recursos de Aprendizaje

| Recurso | URL | Tema |
|---------|-----|------|
| Anthropic Cookbook Frontend Aesthetics | platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics | Prompting oficial para estética |
| Refactoring UI (libro) | refactoringui.com | Fundamentos de diseño para desarrolladores |
| Complete Collection Claude Code Prompts | Medium (@henriallevi) | Prompts anti "AI slop" |
| Anthropic Blog Frontend Skills | anthropic.com/blog | "Improving Frontend Design Through Skills" |

---

## 9. Estrategia de Migración para Apps Existentes

### Fase 1: Fundación (Semana 1-2)

1. Inicializar shadcn/ui: `npx shadcn@latest init`
2. Configurar CSS variables semánticas en `globals.css`
3. Crear CLAUDE.md con prompt estética, reglas diseño, tokens
4. Instalar skill frontend-design
5. Configurar MCP servers (shadcn, Figma)
6. Definir paleta de colores como CSS variables HSL

### Fase 2: Reemplazo Componente por Componente (Semana 3-8)

**Regla "código tocado":**
- Features nuevas DEBEN usar nuevo sistema
- Bug fixes migran componentes tocados
- Periodos tranquilos para migración proactiva

**Orden recomendado de migración:**
1. Buttons (más visibles, impacto inmediato)
2. Form inputs (interacción constante del usuario)
3. Cards (contenedores principales)
4. Data Tables (TanStack Table + shadcn)
5. Navigation (sidebar, breadcrumb)
6. Modals (Dialog, Sheet)
7. Charts (Tremor)
8. Notifications (Sonner)

### Fase 3: Polish Profesional (Semana 9-12)

- Implementar dark mode: CSS variables + `darkMode: 'class'`
- Agregar micro-interacciones con Framer Motion
- Optimizar accesibilidad WCAG 2.1 AA
- Implementar Command Palette (Cmd+K) para power users

---

## 10. Guías por Tipo de Aplicación

### 10.1 Sistemas Médicos (MEDIAVISTA Pro, Sistema VIDA)

- **Gráficas:** Tremor para signos vitales y KPIs clínicos
- **Tablas:** TanStack Table para listas de pacientes con sorting/filtering avanzado
- **Paleta:** Calmante azul/verde; rojo alto contraste SOLO para alertas críticas
- **Accesibilidad:** WCAG 2.1 AA mínimo, idealmente AAA para elementos críticos
- **Compliance:** Estándares HIPAA, NOM-024, COFEPRIS
- **Layout:** F-pattern para dashboards de consulta, información crítica arriba-izquierda

### 10.2 Plataformas Gubernamentales (CENTINELA, HIDROS)

- **Considerar:** react-uswds (Trussworks) o Comet (MetroStar) como referencia de patrones
- **Implementar:** Accesibilidad Section 508 equivalente
- **Paleta:** Institucional, seria, alta legibilidad
- **Tablas:** Volúmenes grandes de datos con filtrado avanzado
- **Mapas:** PostGIS + Leaflet/Mapbox para componentes geoespaciales

### 10.3 Dashboards Ejecutivos

- **Layout:** F-pattern — KPIs críticos arriba-izquierda
- **Límite:** 5-6 cards máximo en vista inicial
- **Drill-down:** Click en KPI → vista detallada en drawer lateral
- **Command Palette:** Cmd+K para navegación rápida de power users
- **Charts:** Tremor + Recharts para visualizaciones interactivas


---

## 11. Checklist de Acción — Ordenado por Impacto

### Impacto Inmediato (Día 1)
- [ ] Instalar skill frontend-design (un comando curl, 30 segundos)
- [ ] Crear CLAUDE.md con prompt estética + reglas diseño + stack + tokens
- [ ] Configurar MCP server shadcn/ui en `.mcp.json`

### Impacto Alto (Semana 1)
- [ ] Instalar shadcn/ui base: button, card, input, table, dialog, sidebar
- [ ] Agregar Tremor para gráficas: `npx shadcn add chart`
- [ ] Definir paleta de colores como CSS variables HSL en globals.css
- [ ] Configurar Figma MCP si se usa Figma

### Impacto Medio (Semana 2-3)
- [ ] Instalar plugin interface-design para memoria persistente
- [ ] Usar v0.dev como complemento para scaffolding visual
- [ ] Configurar Storybook para documentar/validar componentes
- [ ] Explorar registries Magic UI y Aceternity UI para animaciones

### Impacto Continuo
- [ ] Aplicar regla "código tocado" para migración gradual
- [ ] Documentar decisiones de diseño en CLAUDE.md
- [ ] Revisar awesome-shadcn-ui mensualmente para nuevos componentes
- [ ] Iterar prompts estéticos basados en resultados obtenidos

---

## 12. Fuentes Consolidadas

### Fuentes Primarias — Documentación Oficial
1. Anthropic Cookbook: Prompting for Frontend Aesthetics — platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
2. Claude Code MCP Documentation — code.claude.com/docs/en/mcp
3. shadcn/ui Documentation — ui.shadcn.com
4. Figma MCP Server — mcp.figma.com
5. Tremor Documentation — tremor.so

### Fuentes Secundarias — Repositorios GitHub
6. birobirobiro/awesome-shadcn-ui — github.com
7. HermeticOrmus/LibreUIUX-Claude-Code — github.com
8. reallygood83/ui-expert-mcp — github.com
9. VoltAgent/awesome-claude-code-subagents — github.com
10. jqueryscript/awesome-claude-code — github.com
11. Dammyjay93/interface-design — github.com
12. ixartz/SaaS-Boilerplate — github.com
13. PatrickJS/awesome-cursorrules — github.com

### Fuentes Terciarias — Artículos y Análisis
14. Complete Collection of Claude Code Prompts to Avoid Generic UX/UI Design — Medium (@henriallevi)
15. UX Design Principles 2026 — uxdesigninstitute.com
16. Visual Hierarchy: Key UX Principles — sessions.edu
17. Typography Hierarchy in UI/UX Design — Medium (@adesemoyeileri)
18. Refactoring UI — Adam Wathan & Steve Schoger
19. 5 UI Fundamentals a Developer Must Know — codeminer42.com
20. 14 Best React UI Component Libraries 2026 — untitledui.com
21. 12 Best Shadcn Block Libraries 2025 — dev.to
22. Interactive UI Animations with GSAP & Framer Motion — Medium
23. Framer vs GSAP comparison — pentaclay.com, warpvision.in
24. Claude For Code: Streamline Product Design — UX Planet
25. Choosing your AI prototyping stack — Medium (@annaarteeva)
26. Figma MCP x Claude: Delivering UI in mins — ProAndroidDev
27. Best MCP Servers That Change How You Code — Reddit r/ClaudeAI
28. Design System Starter — MCP Market (mcpmarket.com)
29. Best Shadcn Templates 2025 — ThemeSelection
30. React Admin Dashboard Templates 2026 — AdminLTE.IO

---

*Documento consolidado generado como producto del Sprint 1 — Febrero 2026*
*Siguiente: Sprint 2 — Definición de Pipelines de trabajo con lógica de decisión*

