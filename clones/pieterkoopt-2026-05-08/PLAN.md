# Plan: Clone Tools Comparison — pieterkoopt.nl

**Owner:** Pau (md-design-system)
**Origen:** Encargo del CEO via peer Juan (md-research) — `2026-05-08T06:12 UTC`
**Deadline implícito:** 2026-05-09 (CEO revisa mañana)
**Target:** `https://www.pieterkoopt.nl/` (e-commerce/lead-gen para venta de pinturas, NL — stack Webflow detectado)

## Pregunta de negocio

Ejecutar 3 abordajes distintos de cloning sobre el mismo sitio. Comparar honestamente. Recomendar para producción MD.

## Casos y stacks — versión expandida (CEO: "luz verde + quality > speed")

CEO redirigió: profundidad sobre velocidad. Cada caso ejecuta TODAS las alternativas viables, no sólo defaults. Eso da al CEO un comparativo real con evidencia, no opinión.

### Caso A — Inspiration / UI extraction (3 sub-approaches)
| ID | Tool | Estado | Notas |
|----|------|--------|-------|
| A1 | browser-use + Ollama (gemma3:12b) | TODO | Install real (uvx). LLM-driven extraction, navegación headed |
| A2 | JCodesMore/ai-website-cloner-template | TODO | Fork+adapt como Skill Claude Code (~30-60 min) |
| A3 | MD-Design custom pipeline | TODO | Firecrawl branding format → tokens → mi rebuild con shadcn MCP |

### Caso B — Snapshot offline (4 sub-approaches)
| ID | Tool | Estado | Notas |
|----|------|--------|-------|
| B1 | wget --mirror | DONE | Battle-tested, GPL-3 (no IP risk para uso interno) |
| B2 | httrack | DONE | Battle-tested, GPL-3 |
| B3 | goclone (goclone-dev fork) | TODO | Fix install, MIT |
| B4 | ArchiveBox (Docker) | TODO | Full archival stack, MIT — incluso si "overkill", da data point |

### Caso C — Structured JSON (3 sub-approaches)
| ID | Tool | Estado | Notas |
|----|------|--------|-------|
| C1 | crawl4ai + Ollama LLMExtractionStrategy | TODO | Apache-2.0, $0, LLM-driven |
| C2 | crawl4ai heuristic only (CSS selectors) | TODO | Apache-2.0, $0, sin LLM (control) |
| C3 | Firecrawl Cloud API (firecrawl_extract) | TODO | Cloud SaaS, license-safe (Cloud no es AGPL), opción no-self-host |

## Criterios de éxito (medibles)

- [ ] 3 outputs reales en `clones/pieterkoopt-2026-05-08/{caso-a,caso-b,caso-c}/`
- [ ] Reporte comparativo `reports/REPORT.md` con tabla obligatoria del CEO
- [ ] Screenshot del sitio original (`_evidence/original.png`)
- [ ] Screenshot del rebuild Caso A (`_evidence/caso-a-rebuild.png`) si compila
- [ ] Crítica honesta + recomendación final
- [ ] Detección de anti-patterns en stacks recomendados

## Anti-supuestos (Karpathy: surface tradeoffs) — REVISADOS POST-CEO

1. ~~No voy a forzar instalar browser-use~~ → **SÍ instalar** (CEO mandó depth + quality)
2. ~~No voy a montar ArchiveBox via Docker~~ → **SÍ levantar** como data point
3. **Caso A es complejo:** rebuild fiel = entregable parcial (tokens.json + componentes mapeados a shadcn + 1-2 sections compilables). NO un sitio Next.js full salvo que sea simple Webflow.
4. **No voy a tocar archivos del DS principal** (src/, package.json del root, tests). Todo queda en `clones/` con su propio package.json/venv aislados.
5. **Riesgo de Ollama:** endpoint sin auth + rate-limit con CRECE peers. Plan: ejecutar Caso C cuando peers no estén corriendo batches (Linda + Juan). Si choca, logueo y muevo a heurística pura.

## Orden de ejecución

1. Smoke test target: HEAD + curl HTML para verificar acceso (5 min)
2. Caso B en paralelo: wget mirror + httrack (10 min)
3. Caso C en paralelo: crawl4ai install + firecrawl scrape (15 min)
4. Caso A: chrome-devtools / firecrawl extract de tokens + DOM, generar React/Tailwind (45-60 min)
5. Reporte comparativo (20 min)
6. Self-review + commit (10 min)

## Riesgos

- Sitio puede tener anti-bot que detecte tools (curl pasa según Juan, pero browser pools/JS pueden cambiar resultado)
- Crawl4ai en Python 3.14 puede tener incompatibilidades (recién salió)
- Tiempo total realista: 2.5-3h en sesión activa

## Lo que NO incluye este plan

- Migración del workflow a un comando `/clone-site` reutilizable (es follow-up post-decisión del CEO)
- Tests automatizados del rebuild
- Compilar el rebuild Caso A en una página Next.js del DS (queda como código fuente revisable, no integrado)
