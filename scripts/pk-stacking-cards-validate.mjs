// Capture pk-stacking-cards rebuilt at multiple scroll positions to validate
// pin/scrub mechanic: each slide should dominate a full viewport and rotate/scale
// out as the next slides in.

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = "http://localhost:3011/templates/pk-stacking-cards";
const evidenceDir =
  "/Users/marxchavez/Projects/md-design-system/clones/pieterkoopt-2026-05-08/_evidence/stacking-rebuilt-cycle";
mkdirSync(evidenceDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
await page.addStyleTag({
  content: `nextjs-portal, [class*='styles-module__toolbar'] { display: none !important; }`,
});

// Find the stacking-cards section start
const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".pks-mwg_effect031");
  return sec ? Math.round(sec.getBoundingClientRect().top + window.scrollY) : null;
});
console.log("mwg_effect031 top:", sectionTop);

// Capture 12 frames spaced at 250px through the stacking region
for (let i = 0; i < 12; i++) {
  const offset = i * 250;
  const y = (sectionTop ?? 0) + offset;
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(350);
  await page.screenshot({
    path: `${evidenceDir}/scroll-${String(i).padStart(2, "0")}-+${offset}px.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
}
console.log("captured 12 frames");

// Inspect ScrollTrigger states on rebuilt
const sts = await page.evaluate(() => {
  if (!window.ScrollTrigger) return null;
  return window.ScrollTrigger.getAll().map((st) => ({
    trigger: st.trigger?.className?.toString().slice(0, 60),
    start: Math.round(st.start),
    end: Math.round(st.end),
    pin: st.pin?.className?.toString().slice(0, 60) ?? null,
    scrub: st.scrub,
  }));
});
console.log(JSON.stringify(sts, null, 2));

await browser.close();
