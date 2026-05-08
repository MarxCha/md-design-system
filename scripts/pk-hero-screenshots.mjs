import { chromium } from "playwright";

const url = "http://localhost:3011/templates/pk-hero";
const evidenceDir = "/Users/marxchavez/Projects/md-design-system/clones/pieterkoopt-2026-05-08/_evidence";

const breakpoints = [
  { name: "1440", w: 1440, h: 900 },
  { name: "768", w: 768, h: 1024 },
  { name: "390", w: 390, h: 844 },
];

const browser = await chromium.launch({ headless: true });

for (const bp of breakpoints) {
  const ctx = await browser.newContext({
    viewport: { width: bp.w, height: bp.h },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  // First-visit (intro overlay visible)
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // let intro timeline play
  await page.screenshot({
    path: `${evidenceDir}/pk-hero-clone-${bp.name}-intro.png`,
    fullPage: false,
  });
  // Dismiss intro -> hero revealed
  await page.evaluate(() => localStorage.setItem("pkIntroPlayed", "true"));
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // let hero entrance play
  await page.screenshot({
    path: `${evidenceDir}/pk-hero-clone-${bp.name}-revealed.png`,
    fullPage: false,
  });
  console.log(`captured ${bp.name}px (intro+revealed)`);
  await ctx.close();
}

await browser.close();
console.log("done");
