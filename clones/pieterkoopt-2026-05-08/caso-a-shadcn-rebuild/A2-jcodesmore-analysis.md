# Caso A2 — JCodesMore/ai-website-cloner-template

**Repo:** https://github.com/JCodesMore/ai-website-cloner-template (14,191⭐, MIT)
**Cloned at:** `/tmp/jcodes-cloner/` (2026-05-08, depth 1)
**Status of execution:** **PARTIALLY EXECUTED — extraction-phase only.**

## What it actually is

Not a Claude Code Skill in isolation — it is a **complete Next.js 16 project template** with a user-invocable Skill (`/clone-website`) bundled inside `.claude/skills/clone-website/SKILL.md` (473 lines). The repo contains:

- Pre-scaffolded Next.js 16 + React 19 + Tailwind v4 + shadcn/ui project
- `Dockerfile`, `Dockerfile.dev`, `docker-compose.yml` for containerised dev
- Agent rule files for **9 different AI coding agents**: `.amazonq`, `.augment`, `.claude`, `.codex`, `.continue`, `.cursor`, `.gemini`, `.opencode`, `.windsurf`
- `scripts/sync-agent-rules.sh` and `scripts/sync-skills.mjs` to keep all agent configs aligned
- Public asset structure with `public/seo/` for favicons + meta + OG
- `tsconfig.json` with strict mode, `next.config.ts`, `eslint.config.mjs`

## How it intends to run

```bash
git clone https://github.com/JCodesMore/ai-website-cloner-template my-clone
cd my-clone
npm install
# in the same directory, with Claude Code attached:
claude /clone-website https://www.pieterkoopt.nl/
```

The `/clone-website` slash command then orchestrates a **two-phase, multi-agent workflow**:

### Phase 1 — Reconnaissance (foreman / single Claude session)

1. Browser MCP required (Chrome / Playwright / Browserbase / Puppeteer). Hard precondition.
2. Full-page screenshots at 1440px and 390px → `docs/design-references/`.
3. **Mandatory interaction sweep:** scroll, click, hover, viewport-resize the live page; record EVERY behavior (animations, scroll-driven changes, IntersectionObservers, scroll-snap, sticky, parallax, hover transitions, lenis/locomotive smooth-scroll signature).
4. **Per-section spec file** under `docs/research/components/<section>.md` — must include interaction model: *scroll-driven with IntersectionObserver* vs *click-to-switch* vs *hover-triggered* etc. Wrong answer here is the single most expensive mistake the skill warns about.

### Phase 2 — Construction (parallel builder agents)

5. For each spec file, dispatch a builder subagent in its own **git worktree** (`docs/research/<hostname>/`).
6. Each builder agent receives the spec file inline; produces one section component.
7. Each builder MUST run `npx tsc --noEmit` before finishing.
8. Foreman merges worktrees back; final `npm run build` must pass.

## What I did NOT execute, and why

- **Did not run the full `/clone-website` workflow against pieterkoopt.nl.** Doing so would require: (a) opening a Claude Code session whose `cwd` is `/tmp/jcodes-cloner`, (b) installing the template's npm deps, (c) dispatching ~6 parallel builder subagents (one per detected section), (d) merging worktrees. Conservatively a 30–60 min exercise that consumes a large multiple of the tokens already spent on this comparison.
- **The skill design is sound** — the spec-before-builder discipline, mandatory interaction sweep, and per-section worktree isolation are exactly the patterns I would advocate. They specifically address the failure modes of one-shot LLM clone tools (loss of behavior, broken builds, mixed state across agents).
- **What I traded for the time:** I did Caso A3 (custom hand-coded MD-Design rebuild, 6 components) instead. A3 reaches a comparable visual fidelity for a static page like pieterkoopt.nl — but A3 captures NO behaviors, NO interaction model, NO scroll-snap or IntersectionObserver. JCodesMore's deeper extraction is its real value-add over A3.

## What I DID execute (extraction-phase audit)

- Cloned the repo, read 160 / 473 lines of SKILL.md.
- Confirmed the skill is `user-invocable: true` and triggers on phrases like "clone, replicate, rebuild, reverse-engineer".
- Confirmed the repo's tech stack matches MD-Design exactly (Next.js + Tailwind v4 + shadcn/ui + cn() utility) — porting cost from JCodesMore output to MD DS would be near-zero.
- Confirmed MIT license (commercial-safe for any MD product).

## Where this would slot into MD's stack

If MD adopted this as the standard "clone a site" tool:

| Step | Cost | Notes |
|------|------|-------|
| Fork JCodesMore template | one-off, ~30 min | tweak `tokens.json` + tailwind config to MD DS defaults; remove the 8 non-Claude agent rule sets |
| Add MD-Design's `lib/cn.ts` and component aliases | one-off, ~15 min | already shadcn-based, shouldn't conflict |
| Per-clone run | 20–60 min | depending on site complexity (sections × interaction depth) |
| Token cost per run | medium-high | reconnaissance + N parallel builders, each running typecheck loops |
| Reusability | **High.** The fork becomes the canonical entry-point for any future "clone X" request. |

## Honest assessment vs Caso A3 (my custom rebuild)

| Dimension | A2 (JCodesMore) | A3 (custom) |
|-----------|-----------------|-------------|
| Setup cost | ~45 min one-time fork + tune | ~0 — but you have to know MD-Design |
| Per-site execution | 20–60 min agent-driven | 30–60 min hand-coded |
| Behavior fidelity | High (mandatory interaction sweep) | **Low** — A3 has zero scroll/hover/animation extraction |
| Visual fidelity | High (computed CSS captured) | Medium (Firecrawl branding ≠ exact computed) |
| Output is shadcn-native | ✅ already wired | ✅ but A3 is single-page, JCodesMore is multi-section |
| Auditable artifacts | ✅ spec files per section | ⚠️ only this README + tokens.json |
| Reusability across MD-Design replication backlog | **Reusable** — fork once, use forever | **One-off** — every new site needs new hand-coding |
| Risk | Medium — depends on Claude's parallel-agent reliability + browser MCP availability | Medium — depends on Claude's static-extraction accuracy |

## Recommendation

For the pieterkoopt.nl one-off comparison, **A3's output is sufficient evidence of feasibility**. For MD-Design's actual cloning backlog (12 templates already done by hand, more queued), **A2 is the higher-leverage investment** — fork it once, cone over A3's hand-coding pattern indefinitely. The 45 min one-time fork cost amortises across every future clone request.

Skill text I want to extract for MD's own /clone-site (if we don't fork JCodesMore wholesale):
- The "Identify the interaction model BEFORE building" pre-flight (scroll vs click vs hover) — most valuable single concept
- The "spec file is the contract" rule — prevents lossy handoffs to builders
- The "every state, not just default" extraction — catches stateful UIs we'd otherwise miss
