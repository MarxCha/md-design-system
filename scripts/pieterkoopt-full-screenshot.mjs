import { chromium } from "playwright";

const url = "http://localhost:3011/templates/pieterkoopt-full";
const evidenceDir =
  "/Users/marxchavez/Projects/md-design-system/clones/pieterkoopt-2026-05-08/_evidence";

const browser = await chromium.launch({ headless: true });
for (const bp of [
  { name: 1440, w: 1440, h: 900 },
  { name: 768, w: 768, h: 1024 },
  { name: 390, w: 390, h: 844 },
]) {
  const ctx = await browser.newContext({
    viewport: { width: bp.w, height: bp.h },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => localStorage.setItem("pkIntroPlayed", "true"));
  await page.reload({ waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({
    path: `${evidenceDir}/full-${bp.name}.png`,
    fullPage: true,
  });
  console.log(`captured full ${bp.name}px (full page)`);
  await ctx.close();
}
await browser.close();
console.log("done");
