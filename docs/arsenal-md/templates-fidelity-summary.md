# MD Templates — Fidelity Summary (sesión 014 + 2026-05-08)

> **Purpose:** Operational rule for the SKILL `/clone-site`. Before proposing a clone of any new target, the SKILL must inspect this table — if a similar template already exists at Grade A, learn from its patterns; if a similar one shipped at Grade C, read its postmortem to avoid the same failure mode.

## Grade legend

- **A — Faithful clone.** Source repo localised, assets committed, animations transferred via observed mechanism (not inferred).
- **B — Partial.** Some sections faithful, others missing or simplified due to unported tech (R3F, video carousels, etc.).
- **C — Generic rewrite / invented.** Either no source repo found, OR animations/assets were inferred from screenshot and turn out NOT to match the original. Often LLM-prior contamination.

## Table — 12 templates

| # | Slug | Source | Grade | Files .tsx | Libs | Assets | What worked | What failed |
|---|------|--------|-------|------------|------|--------|-------------|-------------|
| 1 | `zentry` | github.com/.../zentry | **A** | 8 | gsap, lenis | 4 hero videos committed | Clip-path morph, ScrollTrigger pin, video state-machine, hydration fallback (`readyState >= 3`) | — (Grade A) |
| 2 | `iphone-15` | apple.com/iphone-15-pro | **B** | 6 | gsap, three, R3F | 0 (model is procedural) | Dynamic import `ssr: false` for Canvas, manual carousel controls | R3F model + VideoCarousel not implemented (placeholder) |
| 3 | `gsap-cocktails` | gsap.com/cocktails | **C** | 6 | gsap, lenis | 0 | Lenis wiring pattern | Hero video z-index broken, scroll sections inferred not extracted |
| 4 | `gsap-macbook` | apple.com/macbook | **C** | 5 | gsap, three | 0 | — | **51 `gsap.*` refs invented** on a static SVG. Original macbook hero has zero animation; LLM-prior contamination. ROOT CAUSE for AP-17. |
| 5 | `saas-starter` | (no canonical source) | **C** | 7 | gsap, framer | 0 | — | Original has zero GSAP — clone invented 51 GSAP refs. Same failure as #4. |
| 6 | `page-ui` | page-ui.dev | **C** | 4 | gsap | 0 | — | Original is a 196-component lib; clone has 7 with invented GSAP. Wrong abstraction. |
| 7 | `cruip-open` | cruip.com | **C** | 5 | gsap, lenis | 0 / 29 | — | Source had 29 assets; cloned 0. Wrong asset-discovery. |
| 8 | `astrowind` | astrowind.com | **C** | 6 | gsap | 0 | — | Original is **Astro**, not React. Stack-mismatch fundamental. Gemini recommends discard. |
| 9 | `ai-sales` | (no canonical source) | **C** | 3 | — | 0 | Static layout works | No source to compare against → can't measure fidelity |
| 10 | `dashboard-pro` | (MD original design) | **N/A** | 4 | framer | 0 | MD's own design — no clone reference | — |
| 11 | `ecommerce` | (MD original design) | **N/A** | 5 | — | 0 | MD's own design | — |
| 12 | `form-builder` | (MD original design) | **N/A** | 4 | — | 0 | MD's own design | — |

## Key takeaways for `/clone-site`

### What Grade A (Zentry) did right

1. **Source repo localised first.** Cloned from a real GitHub repo with original assets — no guessing.
2. **Assets committed.** 4 hero videos in `public/templates/zentry/videos/`. Without the actual videos, the rebuild looks dead (see AP-8).
3. **Animation mechanism preserved.** Used `gsap.from() + ScrollTrigger.create() + onEnter` pattern that works around Lenis's gsap-from-with-opacity-0 bug. NOT inferred from screenshot — extracted from the original code.
4. **Hydration fallback for video.** `readyState >= 3` setTimeout pattern. Reference for AP-21.
5. **CSS scoping.** No `@layer utilities` in template CSS. No `<h1>-<h6>` global overrides. Reference for AP-19, AP-20.

### What Grade C templates failed at (cross-cutting)

1. **No source repo, animations inferred from screenshot** → invented GSAP (AP-16, AP-17). Affects 4-5 templates.
2. **Asset count zero** → rebuild looks fake regardless of CSS (AP-8). Affects most C-grade.
3. **Stack mismatch** → cloning an Astro site to Next.js doesn't transfer; cloning a 196-component library to a 7-component scaffold doesn't transfer. Affects astrowind and page-ui.
4. **`ui-visual-validator` accepted 60× translation error in Zentry's first pass.** Visual QA via LLM is unreliable (AP-15). Reference: `.context/DECISIONS.md` 2026-04-12.

### Operational rule for the SKILL

When `/clone-site <url>` is invoked:

1. **Phase 0 — Localise the source.** Search GitHub for repo signatures (cdn URLs in HTML, generator meta tags). If repo found, clone-and-fork-assets is the path. If not found, the clone will be Grade B at best — declare this upfront in the spec.
2. **Phase 0 — Identify the framework.** Webflow / Framer / Astro / Next.js / Wix / Shopify. Each has its own DOM signature (`w-*` for Webflow, `framer-*` for Framer, `astro-*` for Astro). Wrong framework detection → wrong stack assumption (AP-18).
3. **Phase 1 — Reverse-engineer JS chunks BEFORE proposing animations.** Spec frontmatter `animations_declared` requires source citation (file:line in original JS). No animation enters spec without provenance.
4. **Phase 2 — Use `npm run template:new --slug=<slug>` (Template Factory).** Inherit Zentry-grade patterns: scoped CSS, `<p>` not `<h1-6>`, video hydration fallback. See [`13-template-factory.md`](./README.md#template-factory) (referenced by SKILL.md).
5. **Phase 5 — Deterministic 6-gate QA.** No LLM-as-judge. See `clone-anti-patterns.md` AP-15.

## What's missing from this audit

- **Per-template detailed pattern dives.** If a future clone target is structurally similar to (e.g.) Zentry, a developer should read `src/app/templates/zentry/Hero.tsx` directly. This summary is the ROUTING signal, not the deep dive.
- **Quantified rebuild times.** We don't know how many hours each template took. A future SKILL improvement: log dispatch+verify cycles per template for cost estimation.
