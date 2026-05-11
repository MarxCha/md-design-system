// Trace the stacking-cards section inside pieterkoopt-full route to catch
// any cross-section interference (Hero, CtaCards pins above us).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const url = "http://localhost:3500/templates/pieterkoopt-full";
const outDir = "stacking-trace-full";
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
// Wait extra for fonts + sibling triggers to mount
await page.waitForTimeout(3000);
// Click anywhere to dismiss any intro overlay if present
await page.evaluate(() => localStorage.setItem("pkHeroIntroPlayed", "true"));

const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".pks-section_stacking-cards");
  return sec ? Math.round(sec.getBoundingClientRect().top + window.scrollY) : 0;
});
console.log(`Stacking section starts at absolute scrollY ${sectionTop}`);

// Slowly scroll through stacking section in 80px steps
for (let off = -200; off <= 1800; off += 80) {
  await page.evaluate((y) => window.scrollTo({ top: Math.max(0, y), behavior: "instant" }), sectionTop + off);
  await page.waitForTimeout(150);
  await page.screenshot({
    path: path.join(outDir, `${String(off).padStart(5, "0")}.png`),
    fullPage: false,
  });
}
await browser.close();
console.log("Done. Screenshots in", outDir);
