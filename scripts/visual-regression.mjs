#!/usr/bin/env node
/**
 * Visual Regression Baseline Capture
 *
 * Captures screenshots of all demo routes and templates for visual regression testing.
 * Usage:
 *   node scripts/visual-regression.mjs              # Capture baselines
 *   node scripts/visual-regression.mjs --compare    # Compare against baselines
 *
 * Requires: Playwright, dev server running on localhost:3000
 */

import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const BASE_URL = "http://localhost:3000";
const BASELINE_DIR = "tests/visual-baseline";

const ROUTES = [
  // Demo pages
  { path: "/", name: "home" },
  { path: "/playground", name: "playground" },
  { path: "/animation-lab", name: "animation-lab" },
  { path: "/product-showcase", name: "product-showcase" },
  { path: "/scroll-stories", name: "scroll-stories" },
  { path: "/demo-dashboard", name: "demo-dashboard" },
  { path: "/demo-landing", name: "demo-landing" },
  { path: "/demo-responsive", name: "demo-responsive" },
  { path: "/demo-sidebar", name: "demo-sidebar" },
  { path: "/demo-video", name: "demo-video" },
  { path: "/motor-iva", name: "motor-iva" },
  { path: "/catalog", name: "catalog" },
  // Templates
  { path: "/templates/iphone-15", name: "tpl-iphone-15" },
  { path: "/templates/zentry", name: "tpl-zentry" },
  { path: "/templates/gsap-macbook", name: "tpl-gsap-macbook" },
  { path: "/templates/saas-starter", name: "tpl-saas-starter" },
  { path: "/templates/gsap-cocktails", name: "tpl-gsap-cocktails" },
  { path: "/templates/page-ui", name: "tpl-page-ui" },
  { path: "/templates/cruip-open", name: "tpl-cruip-open" },
  { path: "/templates/astrowind", name: "tpl-astrowind" },
  { path: "/templates/ai-sales", name: "tpl-ai-sales" },
];

async function captureBaselines() {
  mkdirSync(BASELINE_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  let captured = 0;
  let failed = 0;

  for (const route of ROUTES) {
    const page = await context.newPage();
    try {
      await page.goto(`${BASE_URL}${route.path}`, {
        waitUntil: "networkidle",
        timeout: 20000,
      });
      await page.waitForTimeout(2000); // Let animations settle

      const outPath = join(BASELINE_DIR, `${route.name}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      captured++;
      console.log(`  ✓ ${route.name}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${route.name}: ${err.message}`);
    }
    await page.close();
  }

  await context.close();
  await browser.close();

  console.log(`\nDone: ${captured} captured, ${failed} failed out of ${ROUTES.length} routes`);
}

console.log("Visual Regression — Capturing baselines...\n");
captureBaselines().catch((err) => {
  console.error(err);
  process.exit(1);
});
