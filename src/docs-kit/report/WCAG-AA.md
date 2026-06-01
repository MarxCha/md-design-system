# Auditoría WCAG 2.1 AA — docs-kit (report-modern.css)

**Fecha:** 2026-06-01 · **Alcance:** contraste de texto y elementos no-texto del kit moderno
(Doing-Business → MD). Método: ratio de contraste WCAG sobre cada par texto/fondo real del kit.

**Umbrales:** texto normal ≥ 4.5:1 · texto grande (≥18pt, o ≥14pt bold) y objetos gráficos ≥ 3:1.

## Resultado por par (sobre papel #ffffff salvo nota)

| Texto | Fondo | Ratio | Req | Estado |
|---|---|---:|---:|---|
| ink #15202b | papel | 16.5 | 4.5 | ✅ |
| ink-soft #3d4753 | papel | 9.4 | 4.5 | ✅ |
| muted (antes #7a8590) | papel | 3.8 | 4.5 | ❌ → corregido |
| **muted #677079** | papel | **5.0** | 4.5 | ✅ |
| green-dk #047857 | papel | 5.5 | 4.5 | ✅ |
| blue #1e3a5f | papel | 11.5 | 4.5 | ✅ |
| green-lime #4cc88f | negro #0a0a0b | 9.4 | 4.5 | ✅ |
| white #f3f5f7 | negro | 18.1 | 4.5 | ✅ |
| white | panel-green claro (antes #10b981) | 2.3 | 4.5 | ❌ → corregido |
| **white** | **panel-green #047857→#024d38** | **5.5–9.9** | 4.5 | ✅ |

## Falsos positivos (no requieren cambio)
- **KPI valor verde** (`.kpi .v.g`): ya usa `green-dk` (5.5:1) en papel y `green-lime` (9.4:1) en
  portadas negras. Correcto.
- **Amber #d4a853**: solo se usa como **fill** de barras/segmentos (no como texto), siempre con
  leyenda y posición que lo desambiguan. Es decorativo-con-respaldo; no es texto ni objeto gráfico
  esencial aislado. Se deja; si un cliente lo usara como texto, debe oscurecerlo.

## Correcciones aplicadas
1. `--muted` #7a8590 → **#677079** (5.0:1). Afecta captions, labels, subtítulos, ejes, leyendas.
2. `.panel-green` gradiente `var(--green),var(--green-dk)` → **`var(--green-dk),#024d38`**: texto
   blanco pasa AA en todo el degradado (antes el extremo claro daba 2.3:1).
3. `#7a8590` hardcodeado → `#677079` en `charts.js` (ejes) y en los ejemplos
   (sener-v2, sener-modern, showcase, showcase-demo).

## Nota para re-skin por marca
Al sobreescribir `--brand-*` para un cliente, **re-verificar contraste**: el kit garantiza AA con la
paleta MD, pero una marca con acento claro puede romper `white` sobre paneles o texto sobre acento.
Regla: texto pequeño ≥ 4.5:1, títulos/UI ≥ 3:1.
