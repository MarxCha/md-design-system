# HANDOVER-AI — Decisiones extraídas por Sonnet
## Sesión: 26880 | Compactación: 2026-05-08_17:06:24

## Session Transcript Extraction — pk-cta-cards / pieterkoopt fidelity

---

### 1. ARCHITECTURAL DECISIONS

| Decision | Rationale |
|---|---|
| `pk-stacking-cards` made full-bleed by moving `.pks-mwg_effect031` outside the 1200px container | Original is pin-scrubbed full-viewport; container constraint was clipping the effect |
| Colors determined by pixel-sampling original frames (PIL) instead of visual estimation | Sprint 7 correction — previous approximations (`#90A088`, `#C5CFAF`) were wrong direction; sampling gave `#7A8B69` (bg), `#6E7D5F` (card face — darker than bg) |
| `gsap.set()` used to pre-position cards before GSAP animates them | `gsap.to(circle, { rotation })` was clobbering the CSS `translate` initial offsets at animation start |
| Reverted to Sprint 7 state (cards stacked with CSS offset fan) after wheel mechanic failed | Three iterations of wheel mechanic didn't converge; Sprint 7 was visually closer and stable |
| `pk-stories-cta` restructured to full-viewport video bg + text overlay | Original is not a card — it's a full-viewport pinned section with overlay text |

---

### 2. REJECTED ALTERNATIVES

- **Wheel mechanic (`.uc-circle` 3600×3600, card at 12 o'clock, rotates around distant pivot):** Discovered from DOM inspection of original. Attempted to replicate `transform-origin` far-pivot approach. Rejected — cards were clipped by overflow and layout broke in all three iterations.
- **`xPercent`/`yPercent` GSAP offset for initial fan:** Replaced by `gsap.set` + CSS-only fan, since mixing GSAP and CSS transforms on the same axis caused conflicts.
- **Static left-column USP stack in `CtaCards.tsx`:** Removed — original has no left column, only the cycling polaroids.

---

### 3. ASSUMPTIONS MADE (TO VERIFY)

- Cards in original start **below viewport** (`translateY +141%`) and GSAP cycles them up to `y:-50%` — inferred from DOM inspection but not pixel-confirmed for the initial pre-scroll frame.
- Current implementation shows cards **visible from scroll-0** (fan already visible), while original hides them below until scroll begins. This delta is known but unresolved.
- `pk-stories-cta` heading uses CSS `text-transform: uppercase` + `font-style: italic` for "STORY" — confirmed via curl of rendered HTML, but not visually screenshot-validated due to video thumbnail overlay.

---

### 4. BLOCKERS / OPEN QUESTIONS

- **Wheel mechanic unresolved:** Three attempts to replicate the original's `uc-circle` 3600×3600 pivot all failed (overflow clipping). The fan behavior at rest (cards hidden below viewport pre-scroll) does not match original.
- **Initial state delta:** Current rebuild shows fan from scroll-0; original shows cards entering from below. Documented as known gap in commit message.
- **Cookie banner on original site** blocked Playwright investigation mid-session (required dismiss step before scroll capture).

---

### 5. KEY PEER MESSAGES

None identified.

---

### 6. NEXT STEPS (PLANNED, NOT EXECUTED)

- Resolve the **initial state of `pk-cta-cards`**: cards should be hidden below viewport before scroll begins, entering via GSAP yPercent animation — the wheel mechanic or equivalent `gsap.set(yPercent: 141)` approach needs another iteration with overflow managed.
- **Side-by-side pixel diff** at identical scroll offsets across all three rebuilt sections vs. originals using `_evidence/` captures — planned but not systematically completed after Sprint 7 commit.
