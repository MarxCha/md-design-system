import { chromium } from "playwright";

const url = "http://localhost:3011/templates/pk-cta-cards";
const evidenceDir =
  "/Users/marxchavez/Projects/md-design-system/clones/pieterkoopt-2026-05-08/_evidence";

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
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500); // let GSAP register and ScrollTrigger init

  // Scroll a bit so the pin is engaged on ≥992 viewports for visual proof.
  if (bp.w > 991) {
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.6));
    await page.waitForTimeout(800);
  }

  await page.screenshot({
    path: `${evidenceDir}/cta-cards-${bp.name}.png`,
    fullPage: false,
  });
  console.log(`captured cta-cards-${bp.name}.png (${bp.w}x${bp.h})`);
  await ctx.close();
}

await browser.close();
console.log("done");
