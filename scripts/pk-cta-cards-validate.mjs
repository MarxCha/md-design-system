import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = "http://localhost:3011/templates/pk-cta-cards";
const evidenceDir =
  "/Users/marxchavez/Projects/md-design-system/clones/pieterkoopt-2026-05-08/_evidence/cta-cards-rebuilt-cycle";
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

const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".pkc-section_cta-cards");
  return sec ? Math.round(sec.getBoundingClientRect().top + window.scrollY) : null;
});
console.log("section top:", sectionTop);

for (let i = 0; i < 16; i++) {
  const offset = i * 200;
  const y = (sectionTop ?? 0) + offset;
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(350);
  await page.screenshot({
    path: `${evidenceDir}/scroll-${String(i).padStart(2, "0")}-+${offset}px.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
}
console.log("captured 16 frames");
await browser.close();
