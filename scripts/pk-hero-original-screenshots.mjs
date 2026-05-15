import { chromium } from "playwright";

const url = "https://www.pieterkoopt.nl/";
const evidenceDir = "/Users/marxchavez/Projects/md-design-system/clones/pieterkoopt-2026-05-08/_evidence";
const breakpoints = [
  { name: 1440, w: 1440, h: 900 },
  { name: 768, w: 768, h: 1024 },
  { name: 390, w: 390, h: 844 },
];

const browser = await chromium.launch({ headless: true });
for (const bp of breakpoints) {
  const ctx = await browser.newContext({
    viewport: { width: bp.w, height: bp.h },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  // Skip the intro overlay so we capture the actual hero
  await page.evaluate(() => localStorage.setItem("introPlayed", "true"));
  await page.reload({ waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3000);
  const path = `${evidenceDir}/original-${bp.name}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log(`captured original ${bp.name}px`);
  await ctx.close();
}
await browser.close();
console.log("done");
