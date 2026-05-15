// Deep inspection of original .uc-circle / .uc-card positioning + transforms.
// Capture computed styles at multiple scroll positions to understand the exact
// fan mechanic.
import { chromium } from "playwright";

const url = "https://www.pieterkoopt.nl/";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => localStorage.setItem("introPlayed", "true"));
await page.reload({ waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);
await page.addStyleTag({
  content: `[id*="usercentrics"], [class*="uc-banner"] { display: none !important; }`,
});

const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".section_cta-cards");
  return sec ? Math.round(sec.getBoundingClientRect().top + window.scrollY) : null;
});

// Inspect at scroll 0 (initial), scroll segment 1 mid, segment 2 end, segment 3 end
const positions = [0, 600, 1500, 2700];
const observations = [];

for (const offset of positions) {
  await page.evaluate((y) => window.scrollTo(0, y), (sectionTop ?? 0) + offset);
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const circles = Array.from(document.querySelectorAll(".uc-circle"));
    return circles.map((circle, idx) => {
      const card = circle.querySelector(".uc-card");
      const cs = window.getComputedStyle(circle);
      const cardCs = card ? window.getComputedStyle(card) : null;
      return {
        idx,
        circle: {
          position: cs.position,
          top: cs.top,
          left: cs.left,
          width: cs.width,
          height: cs.height,
          transform: cs.transform,
          rect: circle.getBoundingClientRect(),
        },
        card: card ? {
          position: cardCs.position,
          top: cardCs.top,
          left: cardCs.left,
          width: cardCs.width,
          height: cardCs.height,
          transform: cardCs.transform,
          rect: card.getBoundingClientRect(),
        } : null,
      };
    });
  });

  observations.push({ offset, data });
}

// Static CSS analysis
const cssAnalysis = await page.evaluate(() => {
  const circles = Array.from(document.querySelectorAll(".uc-circle"));
  const ucCircles = document.querySelector(".uc-circles");
  const ucContainer = document.querySelector(".uc-container");
  return {
    ucContainerRect: ucContainer?.getBoundingClientRect(),
    ucCirclesRect: ucCircles?.getBoundingClientRect(),
    ucCirclesStyle: ucCircles ? Object.fromEntries(["position","width","height","display","gridTemplateColumns","gridTemplateRows","transform"].map(k => [k, getComputedStyle(ucCircles)[k]])) : null,
    ucCircleStyle: circles[0] ? Object.fromEntries(["position","top","left","width","height","gridRow","gridColumn","transform","margin"].map(k => [k, getComputedStyle(circles[0])[k]])) : null,
    cardStyle: circles[0]?.querySelector(".uc-card") ? Object.fromEntries(["position","top","left","width","height","transform","margin","padding","borderRadius","backgroundColor"].map(k => [k, getComputedStyle(circles[0].querySelector(".uc-card"))[k]])) : null,
  };
});

console.log("=== CSS analysis ===");
console.log(JSON.stringify(cssAnalysis, null, 2));
console.log("\n=== Per-scroll observations ===");
for (const obs of observations) {
  console.log(`\nscroll +${obs.offset}px:`);
  for (const c of obs.data) {
    console.log(`  circle[${c.idx}] rect: x=${Math.round(c.circle.rect.left)},y=${Math.round(c.circle.rect.top)} w=${Math.round(c.circle.rect.width)} h=${Math.round(c.circle.rect.height)}`);
    console.log(`    circle.transform: ${c.circle.transform}`);
    if (c.card) console.log(`    card.transform:   ${c.card.transform}`);
  }
}

await browser.close();
