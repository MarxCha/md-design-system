// Capture pk-stacking-cards at multiple scroll positions for visual validation.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const url = "http://localhost:3500/templates/pk-stacking-cards";
const outDir = "stacking-cards-validation";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);

const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".pks-section_stacking-cards");
  return sec ? Math.round(sec.getBoundingClientRect().top + window.scrollY) : 0;
});

// Scroll positions to capture each step + transitions
const positions = [
  { offset: 0, label: "00-section-top" },
  { offset: 600, label: "01-card-01-stable" },
  { offset: 1200, label: "02-card-01-fading" },
  { offset: 1800, label: "03-card-02-emerging" },
  { offset: 2400, label: "04-card-02-stable" },
  { offset: 3000, label: "05-card-03-stable" },
];

const obs = [];
for (const { offset, label } of positions) {
  await page.evaluate((y) => window.scrollTo(0, y), sectionTop + offset);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, `${label}.png`),
    fullPage: false,
  });
  const data = await page.evaluate(() => {
    const slides = Array.from(document.querySelectorAll(".pks-slide"));
    return slides.map((s, i) => {
      const content = s.querySelector(".pks-content");
      const card = s.querySelector(".pks-stacking-card");
      const cs = content ? getComputedStyle(content) : null;
      return {
        i,
        rect: s.getBoundingClientRect(),
        contentRect: content?.getBoundingClientRect(),
        cardRect: card?.getBoundingClientRect(),
        contentTransform: cs?.transform,
        contentOpacity: cs?.opacity,
      };
    });
  });
  obs.push({ offset, label, data });
}

console.log(JSON.stringify(obs, null, 2));
fs.writeFileSync(path.join(outDir, "observations.json"), JSON.stringify(obs, null, 2));
await browser.close();
