# Destillation followup — what we kept, what we dropped, what we proved

**Date:** 2026-05-08
**Skill installed at:** `~/.claude/skills/clone-site/`
**Scope:** distilled JCodesMore/ai-website-cloner-template (473 lines, 14K⭐, MIT) into MD-owned `/clone-site` SKILL.md (340 lines) + 8 templates. Zero external LLM dependency — Claude IS the LLM in this skill.

## Patterns we kept (and why each earns its keep)

| # | Pattern | Why it survives the destillation |
|---|---------|----------------------------------|
| 1 | **Browser MCP as hard precondition** | The skill cannot operate without DOM access. Stating it as a precondition kills "let me just guess from a screenshot" — that's the failure mode that produced A3's "Theme Porting only" outcome. |
| 2 | **Mandatory interaction sweep before coding** | JCodesMore's #1 most-expensive mistake warning: building click-based when the original is scroll-driven costs a complete rewrite. Worth the 10–15 min of sweep on every clone. |
| 3 | **Page topology with explicit interaction-model column** | Each section is forced into one of `static / click / scroll / hover / time` BEFORE any code is written. Stops the "I'll figure it out as I build" failure mode. |
| 4 | **Per-component `getComputedStyle()` walker (282-line JS)** | Removes "approximated CSS" — every value in the spec file is from the live site, not estimated. Caught the 18px/24px vs 18px/28px line-height failure mode JCodesMore documents. |
| 5 | **Multi-state extraction (the diff IS the spec)** | Captures hover / scroll / tab transitions as a property-level diff. Without this, the rebuild has the resting state and animations are invented. A3 (Theme Porting only) skipped this and lost the alma del sitio. |
| 6 | **Spec file = contract; one per section, written before dispatch** | This is what flips clone work from "vibes-driven" to "auditable". When the rebuild is wrong, the spec file is the source of truth — fix the component, not the developer's memory. |
| 7 | **Per-section builder dispatch via Agent tool (sub-Claudes)** | Parallelism without the Python-agent overhead. Sub-Claudes are sub-Claudes — same engine, same tool access. No need for browser-use / Ollama / external orchestration. |
| 8 | **Pre-Dispatch Checklist (10 boxes)** | The cheapest way to catch missing extractions. If a box can't be ticked, you go back. Beats discovering it 30 min later in QA. |
| 9 | **Page assembly is sequential, foreman work, not delegated** | Touches too many files; delegating it produces merge conflicts. JCodesMore is right on this. |
| 10 | **Visual QA delegated to a sub-agent** | The judge-and-builder bias is real. The visual QA sub-agent reports divergences blind, the foreman fixes. From Gemini's audit. |
| 11 | **The 14 "what NOT to do" anti-patterns** | Every one is a lesson somebody paid for. Keeping them in the SKILL means the next clone doesn't re-pay for the same lesson. Added one MD-specific anti-pattern: "don't propose Ollama / API as a dependency for this skill". |
| 12 | **Completion criteria / final report shape** | Forces a structured handback at the end. Without this, "done" is fuzzy. |

## Patterns we DROPPED (and why)

| Pattern in JCodesMore | Why it does not survive |
|----------------------|------------------------|
| Update `layout.tsx` fonts via `next/font/google` | MD-Design has font vars (`--font-instrument-sans`, `--font-dm-sans`) loaded globally; the clone uses scoped `--<slug>-*` tokens that reference those vars. Touching layout.tsx pollutes global typography. |
| Auto-create `src/types/` interfaces during foundation | Premature for a clone where data shapes are mock; each builder agent creates inline types if needed. |
| `npx tsc --noEmit` enforcement at every commit | Replaced with MD's `./node_modules/.bin/tsc --noEmit -p tsconfig.json` (same intent, our binary path). |
| Agent rule files for 9 IDEs (`.amazonq`, `.augment`, `.codex`, `.continue`, `.cursor`, `.gemini`, `.opencode`, `.windsurf`, `.aider`) | MD uses Claude Code primary + Gemini CLI for cross-audit only. Single-tool maintenance. |
| Wholesale fork of the JCodesMore template repo | Per Gemini's audit: importing 14K-star external technical debt without running it end-to-end is unsafe. Distil patterns, not the package. |

## Patterns we ADDED that JCodesMore did not have

| New pattern | Source | Why it earns its keep |
|-------------|--------|------------------------|
| **Ground-truth-first** | Gemini cross-audit, 2026-05-08 | Without a ground-truth.json written by hand BEFORE any tool runs, the developer becomes both judge and executor — bias that lets incomplete work be rationalised as "looks close". The `dry-run-methodology-validation.json` in this folder proves the pattern catches blockers automatically. |
| **Pydantic strict validation on heuristic outputs** | Gemini cross-audit | C2's H3 list returned 6 empty strings silently. Pydantic strict (`StrictStr` + `str_min_length: 1`) on required fields would have raised at validation time, not at "Pau notices it 2h later". Template at `~/.claude/skills/clone-site/templates/heuristic-extraction-validate.py`. |
| **Rubric-injected single-call for LLM classification** | Gemini cross-audit | Replaces "run twice and reconcile" (wasteful). Inject a scoring rubric into the prompt; the LLM picks the highest-scoring item. Determinism comes from the prompt structure, not from sampling. |
| **`--theme-only` flag** | This run | Theme Porting (A3 mode) is a legitimate subset for inspiration boards. Layout Cloning is the default. The flag makes the scope choice explicit at invocation. |
| **Claude IS the LLM (no external inference dep)** | CEO redirect, 2026-05-08 | The skill runs inside Claude Code. Claude (Opus 4.7 with vision) is the inference engine. No Ollama / Haiku / Gemini-CLI in the loop. Only browser MCP for navigation. |

## What the dry-run validation proved

I wrote `ground-truth.json` BY HAND today (after the C1/C2/C3 runs were already on disk) and ran `_evidence/dry_run_diff.py` against the actual outputs:

```
Total checks: 13
  info:    8 (matches)
  minor:   2 (CTA disagreement, framework-detection shallowness)
  major:   2 (h2_count, social_links empty)
  blocker: 1 (h3_text silent fail)

Verdict: BLOCKER COUNT > 0
```

**The blocker is exactly the H3-text silent failure in C2 (crawl4ai heuristic).** I discovered it manually 2 hours after the run by squinting at JSON. With the SKILL's pre-flight in place, ground-truth + Pydantic strict would have raised at the validation step *before* the spec file was written — saving the 2 hours and producing a loud failure instead of a silent empty string.

This is the proof the destillation closes the loop. Methodology > tools.

## What the SKILL does NOT yet validate

The smoke test was a **methodology dry-run on existing data**, not a fresh end-to-end Layout Cloning. Specifically:

- I have **NOT** invoked `/clone-site https://www.pieterkoopt.nl/` in default Layout Cloning mode end-to-end. That would dispatch ~6 parallel sub-Claude builder agents in worktrees against fresh extractions. Conservatively 30–60 min of session work.
- I have **NOT** validated that the visual-QA sub-agent prompt produces a useful divergence list when actually invoked.
- I have **NOT** stress-tested the SKILL against a non-Webflow target (Framer, hand-coded site, Astro) — every assumption about DOM walkers and CDN signatures was tuned against pieterkoopt.nl.

These are honest known gaps, not silent ones.

## Recommended follow-up (when CEO has bandwidth)

1. **End-to-end test #1:** invoke `/clone-site https://...` against a different target — e.g. a Framer-built landing page — to validate the SKILL is not Webflow-coupled. ~45 min.
2. **End-to-end test #2:** re-run pieterkoopt.nl with the full Layout Cloning pipeline. Compare output against today's hand-built A3 (Theme Porting). Validate that the pipeline catches the 2 missing sections (intro panels, classical-painting hero band, stories carousel) that A3 dropped. ~60 min.
3. **Onboard Juan & Linda:** they've already asked for the SKILL for inspiration boards (Juan's reels) and competitor analysis (Linda's opposition candidate sites). The SKILL is invocable from any Claude Code session in any repo of theirs.

## Files produced by this destillation

```
~/.claude/skills/clone-site/
├── SKILL.md                                      ← 340 lines, user-invocable as /clone-site
└── templates/
    ├── ground-truth.template.json                ← ~1.7 KB
    ├── component-spec.template.md                ← ~4.4 KB
    ├── topology.template.md                      ← ~3.9 KB
    ├── extraction-script.js                      ← ~4.8 KB (the 282-line walker)
    ├── asset-discovery.js                        ← ~4.5 KB
    ├── multi-state-diff.js                       ← ~3.3 KB
    ├── visual-qa-prompt.md                       ← ~3.6 KB
    └── heuristic-extraction-validate.py          ← ~3.6 KB

clones/pieterkoopt-2026-05-08/
├── ground-truth.json                             ← hand-written, contract for any future run
├── _evidence/dry_run_diff.py                     ← the methodology validator
├── _evidence/dry-run-methodology-validation.json ← its output, proves the loop closes
└── destillation-followup.md                      ← this file
```
