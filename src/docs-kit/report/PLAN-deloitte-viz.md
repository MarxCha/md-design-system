# PLAN — Replicar TODA la data-viz Deloitte/Doing Business en estilo MD

> Objetivo: extraer **todas** las gráficas, cuadros y diagramas del *Doing Business México 2025*
> (+ los dos Deloitte: Capital Humano, Global Impact) y replicarlas como **componentes reutilizables
> MD** (en `report-modern.css`), homologar la propuesta **v2 SENER** (11 pp) y afinar las páginas
> que el CEO marcó. Marca MD: Deep Blue / Amber / Emerald · Instrument Sans + DM Sans.

## Estado / base
- Base a afinar: `Propuesta SENER.html` v2 (11 pp, styles propio "Doing Business aplicado a MD"),
  del zip `Propuesta Editorial SENER.zip`. Se trae a `md-design-system` para versionar.
- Kit actual ya tiene: panel verde KPI, tabla regla/banda verde, waffle, KPI strip, tarjetas KPI,
  openers full-bleed, titulares ligeros, texto 3-col.

## Inventario de viz del gold (catalogado del contact-sheet 33pp)
| # | Componente | ¿Existe? | Acción |
|---|---|---|---|
| A | **Barra rankeada con íconos circulares** (Gráfica 1 PIB por actividad) | no | construir |
| B | **Mini-tablas KPI con íconos/banderas** (IED por país) | no | construir |
| C | **Barras apiladas + línea overlay** (PIB por componente de demanda) | no | construir |
| D | **Line chart doble eje** (diferencial de tasas / FX) | no | construir |
| E | **Panel verde sólido de KPIs** (Principales variables) | sí | reusar |
| F | **Tabla macro de indicadores** (regla verde + filas con dato/unidad) | parcial | refinar |
| G | **Tarjetas de ranking** (número grande "/total" + ícono circular) | parcial (kpi-rank) | + ícono |
| H | **Tablas con banda lime + íconos de fila** (comercio exterior) | parcial (tbl.band) | + íconos/sub-banda |
| I | Tabla de regla verde | sí | reusar |
| J | **Mapa coroplético** (México por dato/región) | no | construir (SVG) |
| K | Waffle de impacto (nuestro) | sí | reusar |
| L | Openers full-bleed + título grande ligero | sí | reusar |
| M | KPI strip números grandes | sí | reusar |

## Feedback del CEO sobre la v2 (a corregir)
- **p2:** la foto se ve mal, **demasiado recortada** → reencuadrar / cambiar fit.
- **p9:** los recuadros NO tienen el **mismo ancho horizontal** → igualar (grid de columnas iguales).
- **p10:** **amontonada** (muchos elementos) → respirar/quitar; el **cuadro de clientes deja mucho que desear** → rehacer con tabla banda + íconos.
- **p3, p4, p6:** estilos que gustan → conservar, solo homologar tokens.

## Sprints

### Sprint 0 — Setup (≤30 min)
- Traer `Propuesta SENER.html` v2 + su `styles.css` a `examples/sener-v2/` en md-design-system.
- Mapear su CSS contra `report-modern.css`; unificar tokens (no duplicar paleta).
- Criterio: v2 renderiza idéntica desde md-design-system con Chrome headless.

### Sprint 1 — Biblioteca de componentes viz (núcleo)
Construir cada componente faltante en `report-modern.css` como clase reutilizable + **showcase**
(`examples/showcase/index.html`) que renderice cada uno con datos genéricos/MD (no datos macro de
México; cifras reales de MD o placeholders neutros):
- A barra-rankeada-íconos · B mini-tablas-KPI · C apiladas+línea · D line doble-eje ·
  F tabla-macro · G ranking+ícono · H banda-lime+íconos · J mapa coroplético SVG.
- Charts = **SVG inline** (sin runtime). Íconos = SVG line minimal (set propio, ~10 glifos).
- Criterio: showcase imprime los 8 componentes nítidos, paleta MD, sin overflow.

### Sprint 2 — Afinar páginas marcadas de la v2
- p2 foto: reencuadre (`object-position`, menos crop) o banner de altura correcta.
- p9: recuadros a **grid de columnas iguales** (mismo ancho).
- p10: declutter (menos por página o split) + **cuadro de clientes** rehecho (tabla banda + íconos de sector).
- Criterio: cada página sin overflow, recuadros iguales, foto bien encuadrada (visual check).

### Sprint 3 — Homologación end-to-end
- Sustituir en la v2 las viz ad-hoc por los componentes del kit (consistencia total).
- Pasar todo a tokens MD (un solo origen de color/tipografía).
- Criterio: doc completo coherente; cada gráfica/cuadro/diagrama usa una clase del kit.

### Verificación (cada sprint)
- Render Chrome headless → PNG por página → revisión visual.
- Anti-overflow, anchos iguales, paleta MD, texto real (sin inventar cifras).
- Sin material de cliente a git (assets/ + ejemplos con cliente gitignored).

## Riesgos / decisiones
- **Datos:** los charts del gold traen macro de México; aquí van con **datos MD reales** o neutros, nunca inventados ni los de México. (Confirmar qué cifras MD usar.)
- **Mapa coroplético (J):** es el más caro; si no aporta a SENER, se difiere. (Decisión CEO.)
- **Alcance "TODAS":** 8 componentes nuevos + 5 reusados = cobertura completa del gold.
