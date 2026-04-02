# MD Design System — Plan de Mejora

## Auditoría Score: 9/10 (2026-04-01)

El sistema está maduro y bien estructurado. Las mejoras son de consolidación y pulido, no de rescate.

---

## Sprint 1: Quick Fixes (lint + exports) — 5 min

### 1.1 Fix lint errors (3 `any` types)
- `src/lint/rules/no-inline-styles.ts:77` — add proper type
- `src/lint/rules/require-aria-label.ts:22` — add proper type
- Run `npm run lint` to verify

### 1.2 Export missing dashboard components
- Add AlertFeed, IVAWaterfall, StatusTimeline to `src/components/dashboard/index.ts`
- Verify main `src/index.ts` re-exports them

### 1.3 Fix buttons missing type="button"
- Scan all components for `<button>` without `type=`
- Add `type="button"` where missing

---

## Sprint 2: Template Polish — 10 min

### 2.1 Capture missing screenshots (iPhone 15 + Zentry)
- Run Playwright captures for `/templates/iphone-15` and `/templates/zentry`
- Update their video-config.ts with real screenshot paths
- Remove TODO comments

### 2.2 Register iPhone 15 + Zentry in Remotion registry
- Verify compositions render correctly

---

## Sprint 3: Component Catalog Page — 15 min

### 3.1 Create `/catalog` route
- Grid of all 83 components organized by category
- Each card: component name, category badge, props count, usage example
- Search/filter by category
- Links to demo pages where applicable

---

## Sprint 4: Visual Regression Baseline — 10 min

### 4.1 Playwright screenshot script for all routes
- Capture baseline screenshots of all 13 demo routes + 9 templates
- Store in `tests/visual-baseline/`
- Script: `npm run test:visual`

---

## Sprint 5: Bundle & Lint Cleanup — 5 min

### 5.1 Fix remaining 23 lint warnings
- Replace `<img>` with `<Image />` in Zentry template
- Remove unused variables
- Add missing alt text

### 5.2 Verify bundle size
- Run `next build` and check output sizes
- Verify no unexpected large chunks

---

## Future (not this session)

- **npm publish pipeline**: `@md-consultoria/design-system` on npm
- **Storybook alternative**: Interactive props playground per component
- **Template variants**: Dashboard, form-heavy, e-commerce templates
- **CI/CD**: GitHub Actions for lint + build + visual regression on PR
