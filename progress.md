# Template & Video Factory — Progress

## Sprint Plan (4 sprints) — ALL COMPLETE

### Sprint 1: Foundation Scripts
- [x] `scripts/new-template.mjs` — Generator script
- [x] `scripts/capture-screenshots.mjs` — Playwright screenshot capture

### Sprint 2: Standardize Existing Templates
- [x] Migrate iPhone 15 CSS from @layer → scoped selectors
- [x] Update iPhone 15 barrel to dual exports

### Sprint 3: Video Pipeline Integration
- [x] `video-config.ts` for iPhone 15 + Zentry
- [x] `src/remotion/registry.ts`
- [x] Refactor Root.tsx to use registry

### Sprint 4: Verify & Ship
- [x] Add npm scripts to package.json
- [x] Build verification (`next build`) — compiled successfully
- [x] Visual regression — Chrome DevTools screenshots confirm:
  - iPhone 15: renders correctly post-CSS migration
  - Zentry: unchanged, working
  - Home page: no CSS contamination from templates
- [x] Generator test: scaffolded + verified + cleaned test-factory template
- [x] Tests: 88/88 passing

## Decisions
- Plan approved with Gemini cross-review (session 008)
- CSS Modules rejected — scoped selectors more pragmatic for porting
- Registry pattern for Root.tsx — avoids monolithic growth
- Font namespacing: `{slug}-{fontname}` prevents @font-face collisions

## Status: COMPLETE
