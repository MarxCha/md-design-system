import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = "https://www.pieterkoopt.nl/";
const evidenceDir =
  "/Users/marxchavez/Projects/md-design-system/clones/pieterkoopt-2026-05-08/_evidence/cta-cards-original-cycle";
mkdirSync(evidenceDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
// Dismiss cookie banner via Usercentrics global (Pieterkoopt uses Usercentrics CMP)
await page.evaluate(() => {
  if (typeof window.UC_UI !== "undefined" && typeof window.UC_UI.denyAllConsents === "function") {
    window.UC_UI.denyAllConsents();
  }
});
await page.evaluate(() => localStorage.setItem("introPlayed", "true"));
await page.reload({ waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);
// Force-hide any remaining cookie containers
await page.addStyleTag({
  content: `
    [id*="usercentrics"], [class*="uc-banner"], [class*="cookiebot"],
    .uc-banner-content, [class*="uc_banner"] { display: none !important; }
  `,
});

// Scroll INTO the section (its top in document)
const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".section_cta-cards, .usp-cards-section");
  return sec ? Math.round(sec.getBoundingClientRect().top + window.scrollY) : null;
});
console.log("section top:", sectionTop);

// Capture frames every 200px scroll into the pinned region
for (let i = 0; i < 18; i++) {
  const offset = i * 200;
  const targetY = (sectionTop ?? 0) + offset;
  await page.evaluate((y) => window.scrollTo(0, y), targetY);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${evidenceDir}/scroll-${String(i).padStart(2, "0")}-+${offset}px.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
}
console.log("captured 18 frames spanning the pinned scroll");

// Inspect the live ScrollTrigger state for the section
const stState = await page.evaluate(() => {
  if (!window.ScrollTrigger) return null;
  const all = window.ScrollTrigger.getAll();
  return all.map((st) => ({
    trigger: st.trigger?.className?.toString().slice(0, 80),
    start: st.start,
    end: st.end,
    pin: st.pin?.className?.toString().slice(0, 80),
  }));
});
console.log("ScrollTriggers:");
console.log(JSON.stringify(stState?.filter((s) => /usp|cta|panel|pin/i.test(s.trigger || s.pin || "")), null, 2));

await browser.close();
