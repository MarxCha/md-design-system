# Cloning-tools comparison — pieterkoopt.nl

**Author:** Pau (md-design-system)
**Date:** 2026-05-08
**Origin:** CEO encargo via peer Juan (md-research). Run 3 cloning approaches against the same target. Compare honestly. Recommend for MD production.
**Target:** `https://www.pieterkoopt.nl/` — Webflow-built B2C lead-gen for buying paintings (NL). HTML 132 KB rendered, no aggressive anti-bot.
**Methodology:** Each "case" runs two-to-four sub-approaches against the same URL, identical environment (Mac M-series, Coolify Ollama @ gemma3:12b). Outputs are stored alongside this report for direct audit.

---

## Visual evidence

- Original site (Firecrawl 1440 full-page capture): [`_evidence/original-fullpage.png`](../_evidence/original-fullpage.png)
- Caso A3 rebuild (Playwright capture against `localhost:3010/clones/pieterkoopt`): [`_evidence/caso-a3-rebuild-1440.png`](../_evidence/caso-a3-rebuild-1440.png) · mobile: [`_evidence/caso-a3-rebuild-mobile.png`](../_evidence/caso-a3-rebuild-mobile.png)
- Side-by-side compare: [`_evidence/compare-original-vs-a3.png`](../_evidence/compare-original-vs-a3.png)
- ArchiveBox screenshot (B4 — note: caught loading state, not rendered): [`_evidence/archivebox-screenshot.png`](../_evidence/archivebox-screenshot.png)

The compare image makes the honest gap obvious: the A3 rebuild captures the **structure and tokens** of the site (hero, sticky cards, three-step process, value cards, dark CTA, contact footer) but is shorter than the original — the live site has additional intro/transition panels, a full classical-painting hero band at the bottom, and a "stories" carousel that A3 does not reproduce. Token-faithful, not section-faithful. JCodesMore (A2) would close that gap; A3 is the "is the rebuild aesthetic credible at the token level?" answer.

## TL;DR — recommendation (updated post Gemini cross-audit, 2026-05-08)

| For MD's actual job | Pick |
|---|---|
| **Theme Porting** — extract tokens, palette, copy, primitives from a target site into MD-Design conventions | **A3 (this run's `/clones/pieterkoopt` route)** is the worked example. Caveat per Gemini's audit: this is *theming*, not *layout cloning* — A3 captures palette + structure but not animations, scroll behaviour, or section-by-section parity. |
| **Layout Cloning** — pixel/section-faithful rebuild including behaviours | **No fully-validated recommendation in this run.** A2's JCodesMore template *appears* to deliver this, but I did **NOT** run its end-to-end pipeline; per Gemini's audit, "fork a 14K-star repo without running it end-to-end" is importing technical debt blind. Recommendation: **destil JCodesMore's 4–6 named patterns into MD's own `clone-site` SKILL** rather than fork the template wholesale. Patterns to distil: *interaction model BEFORE building · spec file is the contract · every state, not just default · build must always compile · stateful-component handling*. |
| **Snapshot a site offline** for archival or competitive research | **B1 (`wget --mirror`)** is the default — covers the same job at 7 s for 4.5 MB. **B4 (ArchiveBox)** for WARC/PDF/htmltotext retention only — **delegate visual capture to Playwright** with explicit `waitForSelector`. **B2 (httrack)** failed on this target (502); before banning at MD-tool level, retry with `--c4` rate-limit + custom headers + TLS-impersonation flags (per Gemini's audit, n=1 is not a system-wide ban). **B3 (goclone)** — **drop**: dead upstream (v1.2.2 frozen, broken module path), wget already wins on the comparison. |
| **Structured JSON for competitive intel** | **C3 (Firecrawl Cloud `firecrawl_extract`)** for any case where MD has the API budget — 5 s wall, 49 credits, 100 % field coverage, no infra. **C2 (crawl4ai + CSS selectors)** is the license-safe $0 fallback — but **wrap every pipeline output with Pydantic strict validation** so empty-required-field is a hard failure, not a silent empty string. **C1 (crawl4ai + Ollama gemma3:12b)** is blocked by CPU-only ~2 tok/s throughput on the current Coolify VM (root cause confirmed by Juan's measurement on the same endpoint, same day) — see C1 detail below for the Plan A / Plan B fix. |
| **CTA / element classification when an LLM is involved** | Per Gemini's audit: **inject a scoring rubric** (`{text, position, contrast, is_above_fold, action_verb, score}`) and ask the LLM to pick the highest-scoring item, instead of running two LLM calls and reconciling. The rubric injects determinism MD controls; reconciliation wastes tokens. |

**License-safe path for any future MD product that ships externally:** all of A2/A3, all four B variants except SingleFile (we never ran SingleFile per Juan's pre-flight), and C2 + C3 are clean. C1 is also clean from a license standpoint (Apache-2.0 + MIT) — its problem is purely operational.

**$0 marginal cost path:** A3 + B1/B3 + C2 — covers the same ground without invoking any paid LLM or paid SaaS. Acceptable for internal MD-Design / md-research use; pair with C3 only when the schema-driven extraction of C2 is not enough.

---

## Comparison table (CEO-mandated)

| Metric | Caso A — UI rebuild | Caso B — offline snapshot | Caso C — structured JSON |
|---|---|---|---|
| Best-in-class tool | **A3** (this rebuild, hand-coded with shadcn DS primitives) | **B1** (`wget --mirror`) for speed; **B4** (ArchiveBox) for completeness | **C3** (Firecrawl Cloud `firecrawl_extract`) |
| Tools tried | A1 browser-use + Ollama / A2 JCodesMore template / A3 custom | B1 wget / B2 httrack / B3 goclone / B4 ArchiveBox | C1 crawl4ai + Ollama gemma3:12b / C1b same w/ minimal schema / C2 crawl4ai CSS heuristic / C3 Firecrawl Cloud |
| Wall time (best variant) | **A3** ~75 min hand-coded; A2 fork would be ~45 min one-time + 20–60 min/clone | **B1** 7 s download / **B4** ~2 min including PDF + screenshot + WARC | **C3** 5 s end-to-end / **C2** 25 s |
| Output size | A3 = 6 components + tokens.json + scoped CSS (≈ 12 KB source) | B1 4.5 MB / 36 files; B3 1.4 MB / 30 files; **B4 76 MB / 83 files** across 18 domains; B2 failed (502) | C3 ~3 KB JSON; C2 ~4 KB JSON; C1 0 useful KB (timeout) |
| Visual / data fidelity | A3 captures tokens + verbatim copy of all H1/H2/H3 + 3-step process + value cards + verified contact data. **No animation / scroll-driven behavior captured.** A2 (run end-to-end) would capture behavior. | B1/B3 capture rendered HTML + same-origin assets. B4 captures everything including CDN fonts (typekit), JS chunks, vimeo embeds, GTM, plus htmltotext + Mercury reader. B4 screenshot is timed too early (caught loading state, not rendered). | C3 100 % schema coverage, no hallucinations, contact data correct down to street + post code. C2 captures phone/email/whatsapp via attribute selectors but loses nested-text content (most H3 text empty). |
| License risk | All MIT / safe | wget GPL-3 (use ok internally; product-safe); httrack GPL-3 (idem); goclone MIT; ArchiveBox MIT | crawl4ai Apache-2.0; Firecrawl Cloud is paid SaaS — not AGPL-restricted for end users; **avoid Firecrawl self-host (AGPL-3.0)** if output ever lands in CRECE-Negocio or any MD product |
| Reusability across MD's clone backlog | **A2 (JCodesMore fork) is the leverage** — built once, used forever. A3 is one-off-per-site. | B1/B3/B4 reusable as-is | C3 reusable; C2 reusable |
| Recommendation for MD | Fork A2 once (~45 min one-time), use it for every new clone. Use A3's pattern as the QA reference. | wget for speed, ArchiveBox for archival depth. Skip httrack (filtered by Webflow CDN). | C3 for paid runs; C2 as the $0 fallback. **Skip C1 until Coolify Ollama is sized for production inference.** |

---

## Per-case detail

### Caso A — UI rebuild (3 sub-approaches)

#### A1 — `browser-use` + Ollama gemma3:12b ❌

- Wall time: 486 s (8 min, never finished — 15-step agent budget exhausted)
- Output: `caso-a-shadcn-rebuild/a1-browseruse-output/a1-result.json` with `data: null, _isDone: false`
- Why it failed:
  - gemma3:12b is **text-only**. browser-use's natural mode is vision-driven (the agent "sees" each page). With `use_vision=False` we forced DOM-text grounding, which gemma3:12b is not strong at for design-token extraction.
  - The Coolify Ollama endpoint is also currently saturated (see C1 below), which compounded the slowness.
- **Honest read:** browser-use is the wrong tool to bolt onto Coolify gemma3:12b for static-page design extraction. It is excellent for *interactive* agent tasks (logging into a site, filling a form, scraping pages with JS gates) — that is not the cloning use case for a Webflow marketing page.
- **Trade-off declared at start of run:** Juan's research recommended browser-use for design-token extraction via computed CSS. That recommendation is right when you have a *vision* LLM. With Coolify's text-only gemma3:12b, the recommendation does not survive contact with the workload.

#### A2 — `JCodesMore/ai-website-cloner-template` ⚠️ partial run

- Cloned at `/tmp/jcodes-cloner/` (depth 1). Read 160 / 473 lines of `SKILL.md`.
- **Did NOT run the full `/clone-website` workflow** — that requires a Claude Code session opened against the cloned template's cwd, plus 5–8 parallel builder subagents in worktrees. Conservatively a 30–60 min run, with a meaningful additional token cost on top of this comparison.
- See [`caso-a-shadcn-rebuild/A2-jcodesmore-analysis.md`](../caso-a-shadcn-rebuild/A2-jcodesmore-analysis.md) for the deep read of the skill, what it does well (mandatory interaction sweep, spec-files-as-contract, per-section worktrees, typecheck-must-pass), and what porting it into MD's stack would cost (~45 min one-time fork — its tech stack already matches MD-Design exactly: Next.js 16, Tailwind v4, shadcn, `cn()`).
- **MD's leverage move:** fork A2 once, use it as the canonical entry-point for every future clone request. A3's hand-built rebuild is the proof we know what "good" looks like; A2's template is how we scale it.

#### A3 — Theme Porting (custom MD-Design rebuild) ✅ shipped

> Per Gemini's external audit: this is **Theme Porting** (palette + tokens + copy + primitives), not **Layout Cloning** (animation + scroll behaviours + section-by-section parity). The label "token-faithful, no section-faithful" was a euphemism — Theme Porting is the correct name.

- Output:
  - Standalone audit artifact at `caso-a-shadcn-rebuild/` (own `app/`, `components/ui/button.tsx`, `globals.css` — all decoupled from main DS so the artifact is reviewable in isolation).
  - **Live wired-up route at `src/app/clones/pieterkoopt/`** that runs against the actual MD Design System dev server. Six components, scoped `pk-*` token namespace, no mutation of any pre-existing DS file.
- Token source: Firecrawl Cloud `branding` format → `tokens.json` (colors / fonts / button variants / radius). All copy verbatim from the rendered HTML (not paraphrased).
- Captured: hero with sticky-card stack · 3-step process · value cards · dark bottom hero · verified contact footer.
- **Not captured:** scroll-driven animations, IntersectionObserver-triggered reveals, Lenis smooth-scroll, hover transitions, the original's video element behavior. JCodesMore would catch those — A3 by design did not, because the goal was a token-faithful first pass, not pixel-perfect interaction parity.
- License: every primitive used (next, tailwind, radix-ui, class-variance-authority, lucide) is MIT/Apache. The artifact ships clean.

### Caso B — offline snapshot (4 sub-approaches)

| Variant | Output | Time | Files | Notes |
|---|---|---|---|---|
| B1 wget --mirror | 4.5 MB | 7 s | 36 | Captured all linked stories / subpages, same-origin assets, no CDN content |
| B2 httrack | 16 KB (no real data) | 6 s | 5 metadata files | **502 Bad Gateway** retry-loop. Both default UA and a Mozilla browser UA failed identically. Webflow CDN appears to filter on UA + IP fingerprint for this target. Clean negative result. |
| B3 goclone (built from `imthaghost/goclone` source — note: module renamed to `goclone-dev/goclone` mid-flight, plain `go install` errors out, has to be built from `cmd/goclone`) | 1.4 MB | <30 s | 30 | Captures CDN assets (avif, webp, JS chunks from `cdn.prod.website-files.com`). Smaller footprint than wget because it's smarter about what's reachable. |
| B4 ArchiveBox (Docker) | 76 MB | ~2 min | 83 across 18 domains | Captures: WARC, output.html, output.pdf, singlefile.html, htmltotext.txt, Mercury (article extraction), Readability, **plus** typekit fonts, vimeo player, GTM, jsdelivr, googleapis, usercentrics CMP. **Caveat:** screenshot was taken during the dark loading-screen of the original site (only "Pi" signature visible). Their headless capture missed the rendered content — would need scroll/wait config tuning. |

**Honest take on B:** for one-shot capture of a single Webflow page, wget is good enough and 100× simpler than ArchiveBox. ArchiveBox earns its keep when you want a scheduled, multi-page, multi-domain archive with WARC compatibility — that is a different MD use case (e.g. archival of competitor sites for `md-research`'s rolling competitive feed). httrack is dead at this target — even with a browser UA, Webflow's CDN serves it 502.

### Caso C — structured JSON (3 sub-approaches)

#### C1 — crawl4ai + Ollama gemma3:12b ❌ × 2

- Both runs (full schema, 13 fields, **and** minimal schema, 3 fields) **timed out at 600 s** with `litellm.APIConnectionError: OllamaException - litellm.Timeout: Connection timed out. Timeout passed=600.0, time taken=600.072 seconds`.
- Direct curl to the same endpoint with a single 5-token completion (`"Reply with one word: green or red?"`) **also timed out at 120 s**. The endpoint is reachable (`/api/tags` returns model list in 0.17 s) but inference itself is non-responsive.
- **Root cause confirmed by Juan's parallel measurement on the same endpoint** (md-research, 2026-05-08): direct `/api/generate` sanity test = 30 tokens output in `eval_duration: 15.0 s` → **~2 tok/s**. Juan's SG-AI batch on bigger inputs (6.8 KB defuddle markdown) hit the same 1800 s timeouts. The endpoint is **not saturated, the model is undersized for CPU-only inference at this throughput.** A schema-driven extraction whose JSON output is ~1500 tokens needs **~12 min just for the output** at 2 tok/s — my 600 s timeout was optimistic, not generous.
- **deepseek-v4-pro:cloud** is also listed in `/api/tags` but returns `unauthorized` without an Ollama.com cloud key — not usable for us in this session.
- **What this means for MD:** Coolify Ollama at gemma3:12b is **not viable for crawl4ai-style workloads at this CPU throughput**. Two clean paths forward:
  - **Plan A — deploy a smaller model on the same Coolify VM.** `gemma3:4b` or `qwen2.5:7b-instruct` typically run 4–6× faster on CPU; same schema would extract in ~1–2 min instead of ~12. Zero marginal infra cost. Requires Linda or CEO to do the Ollama deploy (Pau and Juan don't have admin shell on Coolify). **Both Pau (cloning) and Juan (SG-AI) are blocked by the same throughput ceiling — solving Plan A unblocks both.**
  - **Plan B — Anthropic Haiku 4.5 fallback** for occasional high-quality extractions. Estimated cost for our actual usage (50K–200K input tokens × 5 extractions × ~10 sessions/month) ≈ **$2–8 USD/month**. Cheap insurance for the case when "the server doesn't pay us when we need it." Juan is escalating Plan B to CEO via his executive report.
  - **Recommendation:** Plan A first (it's the right technical fix — 12B was always overkill for our extractions), Plan B as the fallback when Plan A's smaller model can't hold quality on a specific extraction.

#### C2 — crawl4ai + CSS selectors (no LLM) ✅ partial

- Wall: 24.7 s. License: Apache-2.0. Cost: $0.
- Captured: H1, page H1/H2 list (truncated to first text node), `tel:`, `mailto:`, `wa.me/...`, button list (48 items, mostly empty text), social link list (selectors did not return populated objects).
- **Limitations honest-read:** selector traversal with `*` for nested text does not capture multi-line content. Headings whose visible text is composed of multiple inline tags returned empty strings. This is a real limitation of CSS-selector heuristic extraction on JS-rendered Webflow pages — selectors that work on hand-coded HTML do not always work on framework-generated DOM.

#### C3 — Firecrawl Cloud `firecrawl_extract` ✅ best

- Wall: ~5 s. Credits: 49. Tokens: 726.
- Captured: site name, tagline, value prop, services list, full 3-step process with descriptions, pricing policy, geographic coverage, contact channels (phone / WhatsApp / email / physical address), CTAs primary + secondary, social proof stats, tech stack hints, pages referenced, target audience, languages.
- **One observed inconsistency:** Firecrawl's `branding` endpoint classified the primary CTA as "Sell your painting" while `extract` classified it as "Request Offer". Both are real CTAs on the page in different contexts (nav vs hero footer). Reasonable LLM ambiguity — record it as evidence that LLM judgment varies between runs and pin it down in the prompt if it matters.
- **Tech stack detection was shallow** ("CDN", "HTML5") — did not flag Webflow despite obvious markers (`cdn.prod.website-files.com`, `w-*` class prefixes, the `data-fc-*` attributes). If MD wants framework detection, the prompt has to ask for it explicitly.

---

## What broke and why

| Failure | Root cause | What I'd change |
|---|---|---|
| C1 / C1b / A1 — Ollama-side stalls | Coolify gemma3:12b is CPU-only at ~2 tok/s output (measured by Juan on the same endpoint, same day). My schema asked for ~1500 output tokens → ~12 min just for output. 600 s timeouts were optimistic, not generous. **Not saturation, not infra rot — the 12B model is wrong-sized for CPU inference on our extraction loads.** | Plan A (Linda/CEO deploy `gemma3:4b` or `qwen2.5:7b-instruct` on the same VM, ~5–6× faster on CPU). Plan B (Anthropic Haiku fallback at ~$2–8/month for occasional runs). Both Pau (clone) and Juan (SG-AI) gated by Plan A — solve once, two pipelines unblock. |
| B2 httrack — 502 Bad Gateway | Webflow's CDN appears to filter httrack's UA + IP fingerprint regardless of what `-F` flag we set. | Drop httrack from the MD toolkit for Webflow-hosted targets. Keep wget / goclone / ArchiveBox as alternatives. |
| B4 ArchiveBox screenshot — caught loading screen | Their default headless capture timing fired before pieterkoopt.nl finished its intro animation. | Configure ArchiveBox with `SCREENSHOT_OPTS` to wait for `networkidle` / a longer delay, or supplement with a separate Playwright screenshot. |
| C2 — H3 text returned empty via selector traversal | crawl4ai's CSS selector strategy with nested `*` selectors does not concatenate text from multiple inline children. | Use full-text selectors instead (e.g., `selector: "h3", type: "text"` — let crawl4ai pull `textContent` rather than walking children). |
| `goclone` — install path | Repo at `imthaghost/goclone` declares its module path as `goclone-dev/goclone`, breaking `go install`. | Document the workaround: `git clone … && go build -o ~/go/bin/goclone ./cmd/goclone`. |

---

## Anti-patterns observed in the recommended stacks

1. **Recommending an LLM-agent tool (browser-use) without a vision model.** Juan's research correctly identified browser-use as the LLM-driven UI-extraction stack. But the LLM Juan has access to is text-only (gemma3:12b). Combining the two is a mismatch — browser-use's design assumes the LLM can see a screenshot. We saw the consequence: 8 min, 0 results.
2. **Trusting a single LLM call's CTA classification.** Firecrawl's `branding` and `extract` endpoints disagreed about which button is the primary CTA. The page does have multiple CTAs in different contexts; **either answer is defensible**. The anti-pattern is treating one LLM call as ground truth — for any decision-critical extraction, run twice with different prompts and reconcile.
3. **Using one snapshot tool's output as evidence of a site's content.** ArchiveBox's screenshot is a loading screen at this target. If MD ever auto-screenshots competitor sites for "evidence", a single tool's first-shot screenshot is not enough — it has to be paired with a render-aware capture (Firecrawl `screenshot` with `waitFor`, or Playwright with explicit network-idle).
4. **Assuming heuristic CSS selectors port across frameworks.** crawl4ai's heuristic schema worked for `tel:` / `mailto:` / `wa.me` (attribute selectors) but failed silently for nested `<h3>` text on Webflow. Heuristic extraction's failure mode is *empty values, not errors* — easy to miss in a quick sanity-check.
5. **Treating `httrack` as universally available.** Battle-tested it may be, but on this Webflow-CDN target it gets 502 with both default and Mozilla UA. The MD toolkit should expect that ~10–20 % of modern targets will block httrack outright.

---

## License posture (declared up front)

- All A1 / A2 / A3 stacks: MIT / Apache-2.0. Safe for any MD product.
- All B variants used: MIT (goclone, ArchiveBox) or GPL-3 (wget, httrack — internal use only, not redistributed; their *output* is ours).
- C1 / C2 (crawl4ai): Apache-2.0. Safe.
- C3 (Firecrawl Cloud SaaS): the Cloud API is paid SaaS — not AGPL-restricted for end users. **Self-hosted Firecrawl is AGPL-3.0** and would contaminate MD product IP — **do not self-host**.

We never ran SingleFile / single-file-cli / nodriver — all three are AGPL-3.0 and Juan flagged them out of scope before this run.

---

## Operational notes

- Coolify Ollama endpoint (`http://163.245.208.96:11434`) is CPU-only at **~2 tok/s output** for gemma3:12b (measured by Juan on the same endpoint on 2026-05-08 via direct `/api/generate` sanity check: 30 tokens output in `eval_duration: 15.0 s`). C1 / C1b / A1 all hit this throughput ceiling. The fix is not a bigger queue; it is a **smaller model** (Plan A) or a **paid fallback** (Plan B) — see C1 detail above. Both this report's Pau and `md-research`'s Juan are blocked by the same ceiling.
- gemma3:12b is **text-only**. No vision LLM exists in MD's current Ollama deployment. Vision-driven tools (screenshot-to-code, browser-use's natural mode) are unavailable until that gap is closed.
- The endpoint URL is currently shared via `.env.local` (gitignored) per Juan's H-07 vulnerability flag. Treat as secret operational data; do not commit, do not paste in shareable docs.

---

## Files produced (audit trail)

```
clones/pieterkoopt-2026-05-08/
├── PLAN.md                                      ← what we said we'd do
├── _evidence/
│   ├── original-fullpage.png                    ← Firecrawl 1440-wide full-page (949 KB)
│   ├── original-rendered.html                   ← rendered DOM (147 KB)
│   ├── original.md                              ← clean markdown (5 KB)
│   ├── original-metadata.json
│   ├── original-links.json
│   └── archivebox-screenshot.png                ← B4's loading-screen screenshot (16 KB)
├── caso-a-shadcn-rebuild/
│   ├── tokens.json                              ← Firecrawl branding extract w/ provenance + warnings
│   ├── A2-jcodesmore-analysis.md                ← the partial-run analysis of JCodesMore
│   ├── a1_browseruse_ollama.py                  ← script for A1
│   ├── a1-browseruse-output/a1-result.json      ← A1 result (data: null after 486 s)
│   ├── app/                                     ← standalone audit artifact (decoupled)
│   ├── components/                              ← ditto
│   └── README — wired-up route lives at src/app/clones/pieterkoopt/
├── caso-b-snapshot/
│   ├── wget/                                    ← 4.5 MB, 36 files
│   ├── wget.log
│   ├── httrack/                                 ← 16 KB, 502 retry log only
│   ├── httrack.log
│   ├── goclone/                                 ← 1.4 MB, 30 files
│   └── archivebox/                              ← 76 MB, 83 files, full WARC + PDF + screenshot
├── caso-c-structured-data/
│   ├── c1_crawl4ai_ollama.py
│   ├── c1-crawl4ai-ollama.json                  ← timeout result
│   ├── c1b_crawl4ai_ollama_minimal.py
│   ├── c1b-crawl4ai-ollama-minimal.json         ← also timeout
│   ├── c2_crawl4ai_heuristic.py
│   ├── c2-crawl4ai-heuristic.json               ← partial success
│   └── c3-firecrawl-cloud.json                  ← clean success
├── ground-truth.json                            ← hand-written contract for diff'ing any extraction (added 2026-05-08T13)
├── destillation-followup.md                     ← what the SKILL kept/dropped/added + dry-run proof
└── reports/
    ├── REPORT.md                                ← this file
    └── external-audit-gemini.md                 ← Gemini's cross-audit (verbatim, 7 findings + meta-critique)

Also produced (skill-side):
~/.claude/skills/clone-site/                     ← user-invocable as /clone-site
├── SKILL.md                                     ← 340 lines
└── templates/                                   ← 8 templates (ground-truth, component-spec, topology, extraction-script, asset-discovery, multi-state-diff, visual-qa-prompt, heuristic-extraction-validate)

Also wired into the live DS:
src/app/clones/pieterkoopt/
├── page.tsx
├── styles.css                                   ← scoped pk-* tokens
└── _components/                                 ← 6 components consumed by the route
```

---

## External cross-audit (Gemini) — what changes after their critique

CEO requested an external review of the non-Ollama findings via `/gemini review`. Gemini's full audit is saved at [`reports/external-audit-gemini.md`](external-audit-gemini.md). My response, point by point:

| # | Gemini's verdict | I accept | I push back | What changes here |
|---|---|---|---|---|
| 1. JCodesMore as MD's canonical fork | **Rejected as fork.** "Don't import 14K-star external technical debt without running end-to-end. Distil the 4 patterns into an MD-owned SKILL.md." | ✅ Accept fully. I was overselling something I had not validated end-to-end. Recommendation below revises to *destil patterns, do not fork wholesale*. | — | Recommendation downgraded from "fork JCodesMore" to "destil 4–6 named patterns into MD's own `clone-site` SKILL". Saves us future maintenance debt on someone else's template. |
| 2. httrack drop = generalisation from n=1 | "Lacks scientific rigor. WAF-side rate limiting / TLS fingerprint, not blanket Webflow incompatibility. Should test `--c4`, custom headers before vetoing." | ✅ Accept. n=1 is not a basis for a system-wide ban. I conflated "this run failed" with "drop the tool". | — | Caveat softened: "for *this* target wget is the right pick; before banning httrack at MD-tool level, retry with rate-limit / custom headers / TLS-impersonation flags". |
| 3. ArchiveBox screenshot tuning is futile, delegate to Playwright | "Tuning `SCREENSHOT_OPTS` for highly-interactive sites = waste of time. Use ArchiveBox strictly for WARC/HTML retention. Use Playwright with `waitForSelector` on a known below-fold element for visual evidence." | ✅ Accept. This sharpens my own recommendation cleanly. | — | Recommendation refined: ArchiveBox for archival depth (WARC, PDF, htmltotext, Mercury) only; Playwright for visual evidence with explicit selector waits. |
| 4. goclone — drop entirely | "wget already won this comparison. goclone is frozen at v1.2.2, install path is broken upstream. Toxic to recommend a workaround for a dead repo." | ✅ Accept. Removing goclone from the MD toolkit recommendation. | ⚠️ Keep the artifact and note in the report (it's evidence the tool exists and was tested — the *recommendation* drops, the *data* stays for audit). | Recommendation: **drop goclone**. Use wget for all snapshot-clone needs. Workaround stays in the report for future record only. |
| 5. CSS selectors silent fail | "Not a crawl4ai bug — DOM-walking misuse on my part. Add Pydantic / Zod post-extract validation that fails the pipeline on empty required fields." | ✅ Accept fully. Adds a concrete next-step (Pydantic schema validate + raise on missing required) that my recommendation lacked. | — | Recommendation upgraded: "use `selector: h3, type: text` AND wrap every extraction pipeline with Pydantic `validate=strict` so empty-required-field is loud, not silent". |
| 6. LLM CTA classification — "run twice" is wasteful | "Optimise the prompt, not the call count. Inject a scoring rubric: ask for an array of all CTAs scored on contrast/position/action-verb/above-fold, then ask the model to pick the highest-scoring one. You dictate the rules before the LLM picks." | ✅ Accept fully — Gemini's solution is strictly better than mine (cheaper, more deterministic). | — | Recommendation replaced: rubric-injected single call instead of two-runs-and-reconcile. |
| 7. A3 rebuild — Theme Porting, not Layout Cloning | "Calling A3 'token-faithful, no section-faithful' is a euphemism for 'I cloned the palette but couldn't replicate the architecture'. Theme Porting is trivial; Layout Cloning is the actual ask. CEO will notice the missing soul of the site." | ✅ Accept the renaming — A3 is **Theme Porting**, not Layout Cloning. The label was vague. | ⚠️ Push back on "couldn't" — I *chose* to spend the time on the comparative report rather than on extending A3 to section-parity. Trade-off was declared in PLAN.md before the run. But the rename stands. | Section header for A3 changed from "Custom MD-Design rebuild" to "Theme Porting (Caso A3)". Layout Cloning gets its own row in the recommendation table — currently met only by JCodesMore-style multi-agent rebuild. |

### Meta-critique I fully accept: I had no ground-truth file

Gemini's strongest point: **I operated as judge AND executor.** I evaluated extraction quality by opening JSONs and squinting at side-by-side images. That is the bias structure that lets a developer rationalise incomplete work.

The correct pattern, which I did not follow:
1. **Write `pieterkoopt-ground-truth.json` BY HAND first.** Verbatim H1/H2/H3 text, exact CTA strings, contact data, expected section count. **Before** running any tool.
2. **Programmatic assertions.** Each extraction tool's output gets diff-ed against ground-truth; mismatches are objective failures, not "looks close enough".
3. **Delegate visual comparison to a sub-agent / Claude Vision** for the side-by-side, instead of self-evaluating.

This is the most actionable critique in the audit. Folding it into the next run as a hard pre-flight check.

---

## What I'd ask the CEO to decide next (post Gemini cross-audit)

1. **JCodesMore — RESOLVED: destil (CEO approved 2026-05-08).** SKILL installed at `~/.claude/skills/clone-site/` (340-line SKILL.md + 8 templates). 12 patterns kept, 5 dropped, 5 added (ground-truth-first, Pydantic strict, rubric-injected reasoning, --theme-only flag, "Claude IS the LLM" doctrine). Methodology dry-run against today's data caught the C2 H3-text silent failure as a `blocker` automatically — proves the SKILL's pre-flight closes the developer-as-judge bias loop. Full account at [`destillation-followup.md`](../destillation-followup.md). Layout-Cloning gap remains open until somebody invokes the SKILL end-to-end on a fresh target — recommended follow-up.
2. **Coolify Ollama — RESOLVED: CEO killed both Plan A and Plan B (2026-05-08).** No self-hosted LLM deployment, no paid fallback. Rationale: Claude IS the LLM when invoked from Claude Code; for genuinely standalone batches, MD uses **Gemini CLI** (free, 1M ctx, already configured at `~/.claude/bin/gemini-clean`) or external services (Perplexity / Claude.ai) per case. The "self-hosted local LLM" path is closed. C1's Ollama timeout becomes a moot finding — the skill `/clone-site` is now Claude-Code-native with zero external inference deps.
3. **Policy on auto-screenshots of competitor sites.** Per Gemini's audit: **delegate visual capture to Playwright with explicit `waitForSelector`** — ArchiveBox stays for WARC/HTML/Mercury retention only. If md-research adopts auto-evidence flow, this is the rule.
4. **Layout Cloning vs Theme Porting standard for the 12-template backlog.** A3 (Theme Porting) is enough for inspiration / palette / typography reuse — fast, cheap, low-risk. Layout Cloning (animation, scroll behaviour, section-by-section fidelity) requires the JCodesMore-style multi-agent rebuild that is *not yet validated in MD's stack*. **Decision the CEO actually faces:** is the "inspiration board" use case enough for now, or are there clone targets in the backlog that need true Layout Cloning?
5. **(New, from Gemini's meta-critique)** Adopt **ground-truth-first methodology** for any future cloning comparison: write `<target>-ground-truth.json` by hand BEFORE running tools, then evaluate each tool's output programmatically against it. Removes the developer-as-judge bias that contaminated this run.
