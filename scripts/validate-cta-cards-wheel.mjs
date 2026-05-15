// Capture pk-cta-cards at multiple scroll positions and dump computed transforms.
// Validates the new wheel-mechanic implementation against original.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const url = "http://localhost:3500/templates/pk-cta-cards";
const outDir = "cta-cards-wheel-validation";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(800);

const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".pkc-section_cta-cards");
  return sec ? Math.round(sec.getBoundingClientRect().top + window.scrollY) : 0;
});

// Scroll positions: scroll-0, mid seg-0, end seg-0, mid seg-1, mid seg-2, end seg-2
const positions = [0, 450, 900, 1350, 1800, 2400];

const obs = [];
for (const offset of positions) {
  await page.evaluate((y) => window.scrollTo(0, y), sectionTop + offset);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, `scroll-${String(offset).padStart(4, "0")}.png`),
    fullPage: false,
  });
  const data = await page.evaluate(() => {
    const circles = Array.from(document.querySelectorAll(".pkc-uc-circle"));
    return circles.map((c, i) => {
      const card = c.querySelector(".pkc-card");
      const cs = window.getComputedStyle(c);
      const cdcs = card ? window.getComputedStyle(card) : null;
      return {
        i,
        rect: c.getBoundingClientRect(),
        circleTransform: cs.transform,
        circleOrigin: cs.transformOrigin,
        cardTransform: cdcs?.transform,
        cardRect: card?.getBoundingClientRect(),
      };
    });
  });
  obs.push({ offset, data });
}

console.log(JSON.stringify(obs, null, 2));
fs.writeFileSync(path.join(outDir, "observations.json"), JSON.stringify(obs, null, 2));
await browser.close();
