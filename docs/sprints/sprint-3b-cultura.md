# Sprint 3B — Configurar Proyecto Cultura
## Se ejecuta en: Antigravity (Claude Code) con el proyecto Cultura abierto
## Específico para este proyecto. Los otros proyectos tendrán su propio Sprint 3B.

---

## ¿Qué vamos a hacer?

Vamos a instalar la "oficina de diseño" dentro del proyecto Cultura.
El Sprint 3A instaló las herramientas globales (el edificio).
Ahora instalamos lo específico para Cultura (los muebles y la decoración).

BUENAS NOTICIAS del diagnóstico de Cultura:
✅ Tailwind CSS 4.0 — perfecto, es la versión más nueva
✅ Lucide React — shadcn usa Lucide por defecto, compatibilidad total
✅ clsx + tailwind-merge — ya tienes lo que shadcn necesita
✅ Storybook 10 — ya puedes documentar componentes
✅ Recharts — ya tienes gráficas

LO QUE FALTA:
❌ shadcn/ui — la base de componentes profesionales
❌ CLAUDE.md con directivas de diseño
❌ MCP de shadcn configurado
❌ Framer Motion para animaciones
❌ CSS variables con sistema de diseño

---

## IMPORTANTE: Todos los pasos se hacen DENTRO de Antigravity

Abre Antigravity con el proyecto Cultura.
Todos los comandos siguientes se los DICES a Claude Code
(en el chat de Claude Code, no en una terminal separada).

---

## PASO 1 — Instalar shadcn/ui

En el chat de Claude Code, escribe:

```
Inicializa shadcn/ui en este proyecto. El proyecto usa Next.js 16 con 
Tailwind CSS 4 y TypeScript. Usa el estilo "new-york" y el tema slate.
Configúralo para que use la utilidad cn() que ya tenemos con clsx y 
tailwind-merge.
```

Claude Code va a ejecutar los comandos necesarios. Te va a preguntar
algunas cosas durante la instalación. Responde:

- Style: New York
- Base color: Slate
- CSS variables: Yes

Espera a que termine completamente.

---

## PASO 2 — Instalar componentes base de shadcn

En el chat de Claude Code, escribe:

```
Instala los siguientes componentes de shadcn/ui:
button, card, input, label, select, textarea, dialog, sheet,
table, badge, avatar, separator, skeleton, tabs, tooltip,
dropdown-menu, sidebar, breadcrumb, command, sonner
```

Esto instala los 20 componentes más usados. Espera a que termine.

---

## PASO 3 — Instalar Framer Motion

En el chat de Claude Code, escribe:

```
Instala framer-motion como dependencia del proyecto
```

---

## PASO 4 — Crear el CLAUDE.md del proyecto Cultura

Este es el paso MÁS importante. Es el "brief de diseño" que Claude Code
lee cada vez que trabaja en Cultura.

En el chat de Claude Code, escribe:

```
Crea un archivo CLAUDE.md en la raíz del proyecto con el siguiente contenido.
NO modifiques nada, cópialo exactamente:

# Proyecto: Cultura México

## Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 con tema personalizado
- shadcn/ui (estilo New York) como base de componentes
- Framer Motion para animaciones
- Recharts para gráficas
- Leaflet + React-Leaflet para mapas
- Lucide React para iconografía
- Prisma + Turso como base de datos

## Sistema de Diseño — Cultura México

### Identidad Visual
Este es un proyecto cultural de México. La estética debe transmitir:
- Riqueza cultural y calidez
- Profesionalismo institucional
- Modernidad con raíces
- Accesibilidad para todo público

### Tipografía
- Fuente principal: "Plus Jakarta Sans" (moderna, cálida, profesional)
- Fuente display: "Playfair Display" (elegante, para títulos principales)
- Importar ambas desde Google Fonts
- Line-height: 1.5 cuerpo, 1.2 headings
- Pesos: 400 (cuerpo), 500 (emphasis), 700 (headings), 800 (hero)

### Paleta de Colores (CSS Variables HSL)
Inspirada en la riqueza cultural mexicana pero con sofisticación moderna:
- Primary: Terracota profundo (calidez, tierra mexicana)
- Secondary: Azul índigo (cielo, agua, profundidad)
- Accent: Dorado ámbar (sol, riqueza cultural)
- Success: Verde jade (naturaleza, vida)
- Warning: Naranja cempasúchil (alerta cálida)
- Destructive: Rojo carmín (urgencia)
- Background: Crema cálido (light) / Slate oscuro (dark)
- Foreground: Slate 900 (light) / Slate 50 (dark)

### Espaciado
Escala 4px: 4, 8, 12, 16, 24, 32, 48, 64

### Componentes
- Border radius: 8px (default), 12px (cards), 16px (modals)
- Sombras suaves para cards y elevación
- Preferir sombras sobre bordes para separar secciones

<frontend_aesthetics>
You tend to converge toward generic outputs. Avoid "AI slop" aesthetic.

This is a CULTURAL project about Mexico. The design must feel warm, 
sophisticated, and uniquely Mexican-modern — NOT generic corporate.

Typography: Use Plus Jakarta Sans for body and Playfair Display for 
hero headings. NEVER use Inter, Roboto, or Arial.

Color: Use the terracotta-indigo-gold palette defined above.
Apply 60-30-10 rule: 60% warm neutrals, 30% primary terracotta/indigo,
10% gold accent for CTAs.

Motion: Use Framer Motion for page transitions and component state changes.
Use CSS transitions for hover/focus states.

Layout: Use F-pattern for content-dense pages, Z-pattern for landing/hero.
Create visual breathing room with generous whitespace.

Maps: Leaflet maps should have custom styled tiles that match the warm palette.

Charts: Recharts visualizations should use the project palette, not defaults.

Backgrounds: Create atmosphere with subtle warm gradients and textures.
Consider subtle patterns inspired by Mexican geometric art for section backgrounds.

Avoid: Cold corporate blues, Inter/Roboto fonts, purple gradients on white,
generic stock photography aesthetic, clinical/sterile feeling.
</frontend_aesthetics>

## Reglas de UI
- SIEMPRE usar CSS variables para colores
- SIEMPRE usar clases Tailwind; cero inline styles
- Preferir componentes shadcn/ui sobre custom
- Responsive mobile-first
- HTML semántico y atributos ARIA
- Dark mode preparado con CSS variables
- Toda vista de datos: estados loading (skeleton), empty, error, success
- Iconos exclusivamente de Lucide React
```

Espera a que Claude Code cree el archivo.

---

## PASO 5 — Configurar las CSS Variables de Cultura

En el chat de Claude Code, escribe:

```
Actualiza el archivo globals.css (o el archivo principal de estilos CSS 
del proyecto) para agregar las CSS variables del sistema de diseño de 
Cultura México. Usa los colores definidos en CLAUDE.md:

- Primary: Terracota profundo 
- Secondary: Azul índigo
- Accent: Dorado ámbar  
- Success: Verde jade
- Warning: Naranja cempasúchil
- Destructive: Rojo carmín
- Background: Crema cálido (light) / Slate oscuro (dark)

Define las variables en formato HSL para compatibilidad con shadcn/ui.
Incluye las variables para modo claro (:root) y modo oscuro (.dark).
Mantén el formato que shadcn espera para sus componentes.
```

---

## PASO 6 — Configurar las tipografías

En el chat de Claude Code, escribe:

```
Configura las fuentes Plus Jakarta Sans y Playfair Display en el proyecto:
1. Agrégalas usando next/font/google (la forma nativa de Next.js)
2. Aplica Plus Jakarta Sans como fuente base del body
3. Crea una clase CSS .font-display para Playfair Display
4. Asegúrate de que se apliquen correctamente en el layout principal
```

---

## PASO 7 — Configurar MCP de shadcn (en el proyecto)

En el chat de Claude Code, escribe:

```
Crea o actualiza el archivo .mcp.json en la raíz del proyecto con 
esta configuración:

{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

---

## PASO 8 — Verificar que todo funciona

En el chat de Claude Code, escribe:

```
Verifica la instalación del sistema de diseño:
1. ¿Existe CLAUDE.md en la raíz?
2. ¿Están instalados los componentes de shadcn/ui?
3. ¿Las CSS variables están definidas en globals.css?
4. ¿Las fuentes Plus Jakarta Sans y Playfair Display están configuradas?
5. ¿framer-motion está en package.json?
6. ¿Existe .mcp.json con la configuración de shadcn?
Dame un reporte de estado.
```

---

## ¡LISTO! Sprint 3B Completado

Cultura ahora tiene:
✅ shadcn/ui con 20 componentes profesionales
✅ Framer Motion para animaciones
✅ CLAUDE.md con identidad visual mexicana-moderna
✅ Paleta de colores cálida y cultural (no genérica)
✅ Tipografías con personalidad
✅ CSS variables para light/dark mode
✅ MCP de shadcn configurado

---

## ¿Qué sigue?

Ahora viene lo emocionante: elegir una página de Cultura y transformarla.

Cuando estés listo, dime algo como:

"Ya terminé Sprint 3A y 3B. Estoy en Antigravity con Cultura. 
Quiero mejorar [la página principal / el dashboard / la sección de mapas / etc.]"

Y yo ejecuto el Protocolo de Diagnóstico (del Sprint 2) para darte 
el pipeline y el plan pormenorizado para esa página específica.

---

## NOTAS IMPORTANTES

### Si algo falla:
- No te preocupes, dime qué error salió y lo resolvemos
- Los errores más comunes son de versión de Node o permisos
- Cada paso es independiente, si uno falla los demás no se afectan

### Para tus otros proyectos:
- Sprint 3A ya NO se repite (es global, ya está)
- Solo necesitas repetir Sprint 3B adaptado al proyecto
- Ejemplo: Sprint 3B-MEDIAVISTA tendría paleta médica azul/verde
- Ejemplo: Sprint 3B-CENTINELA tendría paleta institucional/gobierno
