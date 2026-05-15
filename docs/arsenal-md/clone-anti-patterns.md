# Clone Anti-patterns — MD-Design Operational Rules

> **Status:** Operational rule (not opinion). Every clone-site invocation MUST read this before any extraction.
> **Source:** Distilled from JCodesMore SKILL.md (14 baseline anti-patterns) + 6 modes of failure observed in MD on 2026-05-08 + sesión 014 fidelity audit (Zentry/MacBook/SaaS Starter postmortems).
> **Purpose:** Convert *lessons learned that get forgotten* → *operational rules that get enforced* (Hugo's Patrón D, ADD).

Each anti-pattern below has: **the rule** + **what bug looks like in the wild** + **what to validate to prevent it**.

---

## A. Interaction-model anti-patterns (extraction phase)

### AP-1 — Don't build click-based when the original is scroll-driven (or vice versa)

**Bug in the wild:** A clone reproduces a tabbed interface where users click to swap content, but the original auto-cycles content as the user scrolls past `IntersectionObserver` thresholds. Cost: complete rewrite, not a CSS tweak.

**Validate by:** during the interaction sweep (Phase 1.B), scroll through the section slowly BEFORE clicking. If content changes on its own as you scroll, it's scroll-driven. Clicks should be tested ONLY after scroll-driven was ruled out.

### AP-2 — Don't extract only the default state

**Bug in the wild:** Tabs showing "Featured" on load are extracted as if that were the only state. The original swaps to "Productivity" / "Creative" / "Lifestyle" tabs — those states are missing from the spec, and the rebuild is structurally incomplete.

**Validate by:** for every interactive element, click each tab/pill/button and re-extract content per state. Spec frontmatter requires `per_state_content: {tab1: {...}, tab2: {...}, ...}` non-empty if `interaction_model != "static"`.

### AP-3 — Don't miss overlay/layered images

**Bug in the wild:** A hero with a watercolour background + foreground UI mockup is rendered as a single `<img>` in the rebuild. Original has 2 stacked `<img>` (or `<img>` + `background-image`). Compositing missing.

**Validate by:** asset-discovery script enumerates every image, counts siblings per parent, captures `position: absolute/relative` + z-index. Spec frontmatter requires `layered_compositions: [...]` listing every multi-image container.

### AP-4 — Don't build mockup HTML for content that's actually video/Lottie/canvas

**Bug in the wild:** A hero with a Vimeo embed is reproduced with elaborate HTML/CSS that mocks what the video shows. The mock looks dead because the original's life comes from motion in the actual video.

**Validate by:** asset-discovery's `videos` and `linkResources` arrays must be empty or accounted for. If `<video>`, `<canvas>`, Lottie player, or HLS source is present in the original, spec MUST reference it.

### AP-5 — Don't approximate CSS classes

**Bug in the wild:** "It looks like `text-lg`" → spec says 18px. Computed value was 18px/24px line-height. Tailwind's `text-lg` is 18px/28px line-height. Result: the rebuild looks correct in a screenshot but the spacing rhythm is subtly wrong.

**Validate by:** spec frontmatter values come from `getComputedStyle()` exact values, not nearest-Tailwind-class-name. Run extraction-script.js (the 282-line walker) and copy values verbatim. If a builder writes `text-lg`, foreman compares `lineHeight` of `text-lg` against spec — mismatch → fix.

---

## B. Build-phase anti-patterns

### AP-6 — Don't build everything in one monolithic commit

**Bug in the wild:** A 1500-line PR that touches 30 files lands together. Build breaks; bisection is impossible; review is impossible.

**Validate by:** per-section commits. After each section's builder completes + verifies, commit with section-name in the message. The pipeline is incremental with `tsc + eslint + next build` clean at every step.

### AP-7 — Don't reference docs from builder prompts

**Bug in the wild:** Builder prompt says "see `docs/DESIGN_TOKENS.md` for colors". Builder runs out of inline context, never reads the doc, picks colours from training data prior. Half the rebuild has wrong palette.

**Validate by:** spec inline in builder prompt — paste the relevant content, don't link to it. Builder should have zero need to read external docs to complete its task.

### AP-8 — Don't skip asset extraction

**Bug in the wild:** The clone has no images; placeholder grey boxes everywhere. The "look" is determined by photography in the original — without it, the rebuild always looks fake regardless of CSS perfection. (See: every Grade-C MD template, sesión 014.)

**Validate by:** Phase 2 foundation downloads every asset enumerated by asset-discovery.js to `public/templates/<slug>/`. If asset count is 0 after download, BLOCK — go fix the discovery script.

### AP-9 — Don't give a builder agent too much scope

**Bug in the wild:** The hero has 8 sub-components (header bar + video + h1 + lede + cta + sticky cards stack + intro overlay + Lottie signature). One builder gets the entire hero; output is 800 lines in one .tsx; refactor cost is high; bugs are hard to localise.

**Validate by:** if the spec file is over ~150 lines, split into sub-component specs. One builder per sub-component. Wrapper builder dispatched LAST.

### AP-10 — Don't bundle unrelated sections into one builder

**Bug in the wild:** "Build the CTA + footer in one go." They have different designs, different interaction models, different responsive behaviours. Builder picks one design language and applies it to both — both end up wrong.

**Validate by:** one spec file per section in `clone-spec/{NN-section}.md`. Sprint 3 dispatch protocol enforces 1:1 spec:builder.

### AP-11 — Don't skip responsive extraction

**Bug in the wild:** Site looks pixel-perfect at desktop (1440). On mobile (390), columns don't stack, text overflows, sticky-header collapses to nothing. Rebuild was extracted only at desktop; responsive was filled in by builder guess.

**Validate by:** extraction at THREE viewports: 1440 + 768 + 390. Spec frontmatter has `responsive_at: {1440: {...}, 768: {...}, 390: {...}}` populated.

### AP-12 — Don't forget smooth-scroll libraries

**Bug in the wild:** Original uses Lenis (smooth scroll). Default browser scrolling feels noticeably different — the user spots it immediately. Rebuild ships without smooth-scroll wiring.

**Validate by:** asset-discovery script searches for `.lenis`, `.locomotive-scroll`, custom scroll containers, AND `<script>` tags loading those libs. Spec field `smooth_scroll_library` is always populated (or explicitly `null`).

### AP-13 — Don't dispatch builders without a spec file

**Bug in the wild:** Foreman tells the builder verbally what to do via prompt. Builder fills gaps with prior. Output is "what the foreman remembers", not "what the live site shows".

**Validate by:** Sprint 3 protocol: spec file exists at `clone-spec/<slug>.md` BEFORE Agent tool dispatch. If file missing, BLOCK.

---

## C. LLM-architecture anti-patterns

### AP-14 — Don't propose Ollama / external API as a dependency for the SKILL

**Bug in the wild (mine, 2026-05-08):** Initial SKILL design assumed agent-driven extraction needed an LLM provider (Ollama / Anthropic API). Reality: when invoked from Claude Code, Claude IS the LLM. External LLM dependency = redundant infra + cost + lock-in.

**Validate by:** any Phase that says "configure LLM provider" or "set OLLAMA_BASE_URL" — delete it. The skill consumes browser MCP for navigation; the rest is Claude's native reasoning + sub-Claudes via Agent tool.

### AP-15 — Don't self-evaluate visual diff

**Bug in the wild (sesión 014, Zentry):** `ui-visual-validator` sub-agent accepted a 60× translation scale error. A component moved 10px when it should have moved 624px. Cross-LLM consensus has correlated errors (shared training).

**Validate by:** Phase 5 uses **deterministic gates** (DOM diff structural / counts ± tolerance / pixel-diff Playwright at 3 breakpoints / AST animation match / animation timing snapshots / layout stability). NO LLM-as-judge. See Hugo's Patrón B (ADD cfdi-platform).

---

## D. NEW modes of failure observed in MD on 2026-05-08

These are not in JCodesMore — discovered during the pieterkoopt run.

### AP-16 — Don't invent animations from a screenshot

**Bug in the wild (mine, 2026-05-08):** A3 hand-rebuild of pieterkoopt invented sticky cards with rotations -3°/+2°/-1° and `translateY(-4px)` hover. The original hero has NO sticky cards — the cards were in a different section (`section_stacking-cards`, y≈141874). I conflated full-page screenshot with hero structure and shipped a cosplay.

**Validate by:** if the JS chunks weren't read, you don't know what's happening. Extraction-script + reverse-engineering of `<script>` tags is REQUIRED before Sprint 3 can start. Spec frontmatter `animations_declared` must trace each animation to a JS source (file:line) — no animation in spec without source citation.

### AP-17 — Don't invent GSAP refs on static SVGs

**Bug in the wild (sesión 014, GSAP MacBook):** Original SVG had ZERO animations. Builder produced 51 `gsap.*` references because the prompt mentioned "macbook hero" and the LLM's prior associates macbook+hero+GSAP. Rebuild ships an animated MacBook where the original is static.

**Validate by:** Hugo's Patrón A (spec strict pre-dispatch) — if `animations_declared: []` in spec frontmatter and the builder's output contains `gsap.*` calls, post-dispatch verify BLOCKS. Counts is one signal; structural match of declared animations is the rich signal.

### AP-18 — Don't trust shallow framework detection

**Bug in the wild (mine, 2026-05-08):** Firecrawl's `extract` reported `tech_stack_detected: ["CDN", "HTML5"]`. The site is Webflow (`cdn.prod.website-files.com`, `w-*` class prefix, `data-fc-*` attrs). Wrong framework → wrong rebuild approach.

**Validate by:** Phase 0 license/proprietary audit explicitly looks for Webflow, Framer, Wix, Squarespace, Shopify signatures BEFORE relying on any AI's framework detection. Spec frontmatter `framework` is human-verified, not LLM-inferred.

### AP-19 — Don't override `<h1>-<h6>` globally without scoping

**Bug in the wild (MD pre-014):** `globals.css` declared `h1-h6 { font-family: var(--font-instrument-sans) }`. Templates that imported their own font got overridden silently — no error, no warning, just wrong typography in the build.

**Validate by:** in template route folders, use `<p>` tags with explicit font-class. NEVER use `<h1>-<h6>` directly in a template — it inherits the global override. Spec frontmatter has `typography_uses_h_tags: false` as default rule for clone-site-generated templates.

### AP-20 — Don't use `@layer utilities` in template-scoped CSS

**Bug in the wild (MD pre-014):** Template CSS in `<route>/styles.css` used `@layer utilities`. Tailwind v4 PostCSS hoisted these into the global utilities layer, breaking specificity at the template boundary.

**Validate by:** template `styles.css` uses scoped class selectors `.<slug>-template { … }`, NOT `@layer utilities`. Anti-pattern is detectable mechanically: grep for `@layer utilities` in template-route CSS files.

### AP-21 — Don't ship video without hydration fallback

**Bug in the wild (MD pre-Zentry):** `<video autoplay>` fired `onLoadedData` before React hydration completed. Safari blocked autoplay because the play() call wasn't from a trusted user interaction. Result: black box where video should be.

**Validate by:** template video components use `muted + playsInline + readyState >= 3` fallback pattern. Wrap autoplay attempts in `setTimeout(() => video.play().catch(() => {}), 0)` after hydration. Reference: `src/app/templates/zentry/Hero.tsx` — Grade-A pattern.

---

## E. Process anti-patterns

### AP-22 — Don't commit before validation

**Bug in the wild (mine, 2026-05-08):** Commit `b2585ab` shipped the SKILL prematurely without end-to-end validation. CEO had to call it out. `git reset --soft HEAD~1` was the recovery.

**Validate by:** before `git commit`, the Phase 5 validation must produce ≥APPROVE_WITH_WARNINGS verdict. If the verdict is BLOCK or MANUAL_REVIEW, do NOT commit. Document in `.context/HANDOFF.md` what's pending.

### AP-23 — Don't audit the arsenal in your context window only

**Bug in the wild (mine, 2026-05-08):** I had the arsenal audit in my context (subagent Explore output) but it never landed as a file on disk. The SKILL re-invokes me tomorrow without it; I'd repeat the same blind spot. **Memory > context window.**

**Validate by:** SKILL pre-flight requires reading `docs/arsenal-md/` files. Audits are artifacts, not transient session state.

---

## How this file is consumed

The SKILL `/clone-site` reads this file in Phase 0 (pre-flight). For each anti-pattern, the skill identifies which validation gate covers it:

| Anti-pattern | Validation gate (Phase 5) |
|--------------|---------------------------|
| AP-1, AP-2, AP-3, AP-4 | Spec frontmatter required-fields |
| AP-5, AP-11 | Computed-CSS extraction script + multi-breakpoint capture |
| AP-6, AP-9, AP-10, AP-13 | Sprint 3 dispatch protocol |
| AP-7 | Builder prompt template (inline only) |
| AP-8, AP-12 | Asset-discovery script + foundation phase |
| AP-14 | SKILL.md design (no LLM provider config) |
| AP-15 | 6-gate deterministic QA (Phase 5) |
| AP-16, AP-17, AP-18 | Spec frontmatter `animations_declared` with source citations + JS-chunks RE before Sprint 3 |
| AP-19, AP-20, AP-21 | Template CSS rules + post-dispatch lint |
| AP-22, AP-23 | Process gate (don't commit on BLOCK; arsenal-md as input) |

If a new anti-pattern is observed during a clone run, ADD it here as `AP-N`. Do not rely on memory.
