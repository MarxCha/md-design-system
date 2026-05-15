# Handoff — Cloning Tools Research & Encargo Pieterkoopt

**De:** Juan (md-research)
**Para:** Pau (md-design-system)
**Fecha:** 2026-05-08
**CEO:** autorizó ejecutar 3 casos comparativos sobre `https://www.pieterkoopt.nl/`
**Deadline tácito:** 2026-05-09 (CEO le dijo a Pau "haz todo lo necesario para que mañana pueda revisar los resultados")

---

## 1. Contexto del encargo

CEO está evaluando tools open-source para clonar sitios web. Origen: pregunta del CEO durante PoC ScrapeGraph-AI hoy ("¿qué hemos visto para clonar sitios? en md-design usaron varias con éxito").

### Lo que MD ya tiene establecido (no inventar)

| Capacidad | En uso | Donde |
|---|---|---|
| Replicar templates OSS GitHub | ✅ Pipeline maduro | md-design (iPhone15, Zentry, gsap-macbook, gsap-cocktails) — ver `feedback_template_porting.md` |
| Browser automation con Camoufox | ✅ | Scrapling skill instalada 2026-04-17 |
| Crawling LLM con limpieza markdown | ✅ | defuddle + DocumentScraperGraph (PoC actual md-research) |
| Firecrawl como MCP | ✅ | mcp__firecrawl__ activo (pero AGPL-3.0 ⚠️) |
| Apify MCP | ✅ | Marketplace de actors |
| Brightdata MCP | ✅ | Scraping con anti-bot residencial |

### Lo que NO había registrado para "clonar sitio en producción"

Distinto de:
- ❌ Replicar template OSS GitHub (ya cubierto)
- ❌ Generar UI desde prompt (v0/Bolt/Lovable — eso es generación, no clonado)
- ✅ **Lo que el CEO pide:** snapshot/scraping de un sitio en vivo para inspiration / competitive analysis / data extraction

---

## 2. Tools validadas (deep-search GitHub + cross-audit /gemini)

### Tier 1 — Inspiration / UI extraction

| Tool | ⭐ | License | Notas |
|---|---|---|---|
| **[browser-use/browser-use](https://github.com/browser-use/browser-use)** | **92,807** | **MIT** ✅ | LLMs operan navegador como humano. Bypass Cloudflare biométrico. **Puede usarse como capa de extracción de design tokens reales del CSS computado.** |
| **[JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)** | 14,191 | MIT ✅ | NO es CLI standalone — es **Skill template para Claude Code** con Git worktrees + MCP browser para extraer tokens reales. **Compatible directo con flujo MD pero requiere fork+adapt del prompt interno (~30-60 min).** |
| **[abi/screenshot-to-code](https://github.com/abi/screenshot-to-code)** | 72,466 | MIT ✅ | Visión-driven. /gemini advierte: genera "Tailwind spaghetti", NO semántico, no shadcn → solo prototipado aislado. **NO usar para UI core.** |

### Tier 2 — Snapshot offline / archive

| Tool | ⭐ | License | Notas |
|---|---|---|---|
| **[ArchiveBox/ArchiveBox](https://github.com/ArchiveBox/ArchiveBox)** | 27,437 | **MIT** ✅ | Estándar de oro snapshot completo (HTML+JS+PDFs+media). **Overkill para 1-shot — Pau opina (válido) que es para archivado continuo.** |
| **[goclone-dev/goclone](https://github.com/goclone-dev/goclone)** | 2,095 | MIT ✅ | Go fast clone, determinístico. **Default para 1-shot según ajuste de Pau.** |
| gildas-lormeau/SingleFile + cli | 21K + 1.3K | **AGPL-3.0** ⚠️ | Solo uso interno MD-research. **NO usar en CRECE-Negocio o cualquier producto vendible** (contamina IP). |

### Tier 3 — Data estructurada (license-safe MIT/Apache)

| Tool | ⭐ | License | Notas |
|---|---|---|---|
| **[unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)** | **65,186** | **Apache-2.0** ✅ | LLM-friendly, markdown limpio, browser pools. **Default Caso C.** |
| **[browser-use/browser-use](https://github.com/browser-use/browser-use)** | 92,807 | MIT ✅ | (mismo Tier 1, sirve también para Caso C cuando hay anti-bot agresivo) |
| **[lwthiker/curl-impersonate](https://github.com/lwthiker/curl-impersonate)** | 5,990 | MIT ✅ | TLS spoofing low-level cuando no necesitas headless browser |

### Validados pero descartados

| Tool | Razón |
|---|---|
| `comet-ml/open-lovable` | **404 Not Found** — /gemini alucinó este nombre. Ojo con sus picks. |
| `ghosttrozan/codetheft` | 1⭐, sin license declarada — DESCARTAR |
| `ultrafunkamsterdam/nodriver` | 4,175⭐ pero **AGPL-3.0** — útil interno, NO en producto vendible |
| `ericshang98/Perfect-Web-Clone` | 210⭐, sin license clara — interesante (multi-agent Claude Agent SDK) pero baja tracción + license pendiente. **Worth tracking** si MIT/Apache aparece. |

---

## 3. License traps críticos

### 🚫 NO usar en CRECE-Negocio o producto vendible

- **Firecrawl AGPL-3.0** — self-host contamina IP propietaria. Cloud API es legal.
- **SingleFile / single-file-cli AGPL-3.0** — mismo riesgo
- **nodriver AGPL-3.0** — mismo riesgo

### ✅ Safe para producto comercial

- MIT, Apache-2.0, BSD, MPL-2.0

---

## 4. Anti-recomendaciones de /gemini

- 🚫 **Depender de screenshot-to-code para UI core** → genera código no-semántico, viola composición shadcn
- 🚫 **BeautifulSoup tradicional para sitios modernos con WAF** → fallarán silenciosamente
- 🚫 **Mezclar AGPL en CRECE-Negocio** → trampa IP

---

## 5. Stack propuesto por /gemini para MD-Design (caso A)

**Pipeline híbrido agéntico, no monolítico de 1-clic:**

```
1. RECONOCIMIENTO (MCP):
   browser-use → navega URL, ejecuta JS en DOM, extrae:
     - design-tokens.json (colores, tipografías, spacing reales del CSS computado)
     - Árbol DOM semántico

2. RECONSTRUCCIÓN (Skill Claude Code):
   JCodesMore/ai-website-cloner-template adaptado con prompt:
     "Mapea elementos UI a componentes shadcn/ui y usa
      variables CSS compatibles con Tailwind v4"

3. WORKFLOW resultante:
   claude /clone-site <URL> --design-system=shadcn
```

**Crítica de Pau (válida) sobre este stack:**
- ⚠️ JCodesMore como Skill requiere fork+adapt del prompt interno = 30-60 min de overhead solo para la comparación. Considerar `/clone-site` custom construido con browser-use directo + prompt MD-Design-aware.

---

## 6. Target del encargo: pieterkoopt.nl

- **URL:** `https://www.pieterkoopt.nl/`
- **Stack detectado:** Webflow (consistente con que ~90% sitios bien diseñados son Webflow)
- **Tipo:** e-commerce / lead-gen para venta de pinturas (NL)
- **HTML:** ~132 KB
- **Title:** "Sell Your Painting Quickly & Safely | PieterKoopt®"
- **Anti-bot:** sin restricción aparente (curl pasa con HTTP 200 + UA standard)

---

## 7. LLM provider para los 3 casos

CEO ha mantenido política **"todo en Ollama Coolify, $0 cost"** para PoCs en el ecosistema MD (validado con Linda + Joy hoy mismo).

### Endpoint Ollama disponible (NO commitear en git)

```bash
# .env.local (gitignored)
OLLAMA_BASE_URL=http://163.245.208.96:11434
OLLAMA_MODEL=gemma3:12b
```

**⚠️ Vulnerabilidad documentada:** endpoint sin auth (H-07 en CRECE), no exponer URL en repos públicos. Tratar como secreto operacional.

### Compatibilidad con tools de los 3 casos

| Tool | Soporta Ollama | Notas |
|---|---|---|
| `browser-use` | ✅ | Vía LiteLLM, configurar `provider="ollama"` + base_url |
| `crawl4ai` LLMExtractionStrategy | ✅ | Admite cualquier provider LiteLLM-compatible |
| `JCodesMore` template | ❌ Usa Claude Code internamente | API key de Claude Code (ya configurada por usuario) |
| `goclone` / `ArchiveBox` | N/A | Determinísticos, sin LLM |

### Si necesitás vision LLM (no es el caso aquí)

`gemma3:12b` es text-only. NO hay vision LLM en Coolify. Si algún caso requiere visión real, escalar al CEO antes (Linda y yo lo hicimos hoy con Mitofsky PNG charts y resultó innecesario tras research empírico).

### Rate-limit / coordinación con peers

Mi batch SG-AI Tributo Huasteco corre hasta ~23:45. Linda planea PoC SG-AI Mitofsky bridge desde 00:00. **Tu Caso C con crawl4ai sobre 1 URL** = ~5 min, no es crítico para rate-limit. **Tu Caso A con browser-use** podría tomar más, conviene coordinar timing si chocan ventanas.

---

## 8. Output esperado del CEO

Reporte comparativo con tabla:

| Métrica | Caso A | Caso B | Caso C |
|---|---|---|---|
| Tools usadas | | | |
| Tiempo de ejecución | | | |
| Calidad del output | | | |
| % fidelidad visual / data | | | |
| License risk | | | |
| Reusabilidad | | | |
| Recomendación para MD | | | |

Más:
- Screenshots / muestras del output de cada caso
- Cuál escogerías para producción de MD-Design
- Trade-offs honestos
- Anti-patterns que detectes en los stacks recomendados
- **Crítica honesta de mi research** (vos sos turf de MD-Design, tu opinión es la que manda)

---

## 9. Mapa de identidades peers actualizado

| Peer | ID | Repo | Rol |
|---|---|---|---|
| Juan | n/a (yo) | md-research | research / triaging reels / coordinador |
| Pau | `h9og36qn` | md-design-system | design system + replicación de UIs |
| Linda | `uji6x64w` | crece-v2 | CRECE-electoral (encuestas, NLP) |
| Joy | `3t5flofn` | crece-v2 | CRECE-Negocios B2B PyME |
| Hugo | `1tgk8xmg` | cfdi-platform | facturación electrónica |

Linda y Joy comparten cwd pero son sesiones distintas con turfs separados.

---

## 10. Referencias

- **Sesión md-research origen:** 2026-05-07 noche / 2026-05-08 madrugada
- **Mi research consolidado:** este documento
- **Cross-audit /gemini:** completo, integrado en secciones 2-5
- **Memoria mía actualizada:** `~/.claude/projects/-Users-marxchavez-Projects-md-research/memory/`
- **Carpeta `~/Projects/lenis-replica/`:** mencionada en `AGENCIA-DISENO.md` md-design como pendiente integración. No relacionada directamente al encargo, solo contexto.

— Juan
