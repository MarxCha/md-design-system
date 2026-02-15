# Sprint 3A — Infraestructura Global de Diseño
## Se ejecuta en: Terminal de la Mac Mini
## Se hace UNA sola vez. Beneficia a TODOS tus proyectos.

---

## ¿Qué vamos a hacer?

Vamos a instalar las herramientas que conforman tu "gerencia de diseño".
Piensa en esto como instalar el escritorio, las computadoras y el software
de tu equipo de diseño. Una vez instalado, está disponible para cualquier
proyecto que abras.

---

## PASO 1 — Verificar que Claude Code funciona globalmente

Abre Terminal en tu Mac Mini y escribe:

```
claude --version
```

Presiona Enter. Deberías ver un número de versión.

✅ Si ves versión → pasa al Paso 2
❌ Si dice "command not found" → escribe: npm install -g @anthropic-ai/claude-code
   y luego repite el paso.

---

## PASO 2 — Crear la carpeta de la "gerencia de diseño"

Esto crea una carpeta global donde guardaremos los archivos de diseño
que aplican a todos los proyectos.

Escribe en Terminal (copia y pega línea por línea):

```
mkdir -p ~/.claude/skills/frontend-design
```

Presiona Enter. No va a mostrar nada, eso es normal.

---

## PASO 3 — Instalar el Skill de Diseño Frontend (Oficial de Anthropic)

Este es el "cerebro" de diseño que le enseña a Claude Code a generar
interfaces profesionales en vez de genéricas.

Escribe en Terminal:

```
curl -o ~/.claude/skills/frontend-design/SKILL.md https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md
```

Presiona Enter. Debería mostrar una barra de descarga.

Para verificar que se descargó bien:

```
cat ~/.claude/skills/frontend-design/SKILL.md | head -5
```

✅ Si ves texto con contenido sobre diseño → funcionó
❌ Si está vacío o dice error → repite el curl

---

## PASO 4 — Crear las reglas globales de diseño

Esto crea un archivo de reglas que Claude Code leerá automáticamente
en CUALQUIER proyecto. Son las "políticas de la gerencia de diseño".

Escribe en Terminal:

```
mkdir -p ~/.claude/rules
```

Ahora vamos a crear el archivo de reglas. Escribe:

```
cat > ~/.claude/rules/design-standards.md << 'EOF'
# Estándares de Diseño — MD Consultoría TI

## Reglas Obligatorias para toda interfaz

### Tipografía
- NUNCA usar Inter, Roboto, o Arial como fuente principal
- Máximo 2 familias tipográficas por proyecto
- Line-height: 1.5 para texto cuerpo, 1.2-1.3 para encabezados
- Usar combinaciones de pesos extremos (300 vs 700-900) para crear jerarquía

### Color
- SIEMPRE definir colores como CSS variables con HSL
- Aplicar regla 60-30-10 (60% neutro, 30% secundario, 10% acento)
- Colores vibrantes SOLO para CTAs y acciones principales
- Desaturar elementos secundarios para no competir con acciones primarias

### Espaciado
- Usar escala de 4px: 4, 8, 12, 16, 24, 32, 48, 64
- Comenzar con EXCESO de espacio en blanco y reducir
- NUNCA dejar spacing inconsistente entre componentes del mismo tipo

### Componentes
- Preferir componentes shadcn/ui sobre implementaciones custom
- SIEMPRE usar clases Tailwind; cero inline styles
- Preferir sombras sobre bordes para separar secciones
- Border radius consistente: 6px (sm), 8px (md), 12px (lg)

### Layout
- Patrón F para dashboards y listados
- Patrón Z para landing pages
- KPIs críticos arriba-izquierda
- Máximo 5-6 cards en vista inicial de dashboard
- Mobile-first responsive SIEMPRE

### Estados
- TODO componente interactivo debe tener: default, hover, focus, disabled
- TODA vista de datos debe tener: loading (skeleton), empty, error, success
- Usar Framer Motion para transiciones entre estados

### Accesibilidad
- HTML semántico (nav, main, section, article, aside)
- Atributos ARIA donde sea necesario
- Contraste mínimo WCAG 2.1 AA
- Navegación por teclado funcional

### Lo que NUNCA hacer
- Gradientes púrpura sobre blanco (aspecto genérico de IA)
- Layouts predecibles de 12 columnas sin variación
- Componentes que compiten igualmente por atención
- Bordes excesivos donde sombras son más apropiadas
- Fuentes del sistema sin personalidad
EOF
```

Presiona Enter.

Para verificar:

```
cat ~/.claude/rules/design-standards.md | head -5
```

✅ Si ves "# Estándares de Diseño" → funcionó

---

## PASO 5 — Verificar todo

Escribe:

```
echo "=== Skills ===" && ls -la ~/.claude/skills/frontend-design/ && echo "=== Rules ===" && ls -la ~/.claude/rules/
```

Deberías ver:
- SKILL.md en la carpeta skills/frontend-design
- design-standards.md en la carpeta rules

---

## ¡LISTO! Sprint 3A Completado

A partir de ahora, cada vez que abras Claude Code en CUALQUIER proyecto,
automáticamente tendrá:

1. El skill de diseño frontend (sabe generar interfaces profesionales)
2. Las reglas de diseño de MD Consultoría (aplica tus estándares)

Estos archivos son "invisibles" pero poderosos — Claude Code los lee
automáticamente al iniciar cualquier sesión.

Ahora pasa al Sprint 3B que se ejecuta en Antigravity con Cultura.
