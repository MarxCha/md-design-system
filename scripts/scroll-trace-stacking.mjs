// Dense scroll trace: capture every 80px to see jump/snap behavior.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const url = "http://localhost:3500/templates/pk-stacking-cards";
const outDir = "stacking-trace";
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".pks-section_stacking-cards");
  return sec ? Math.round(sec.getBoundingClientRect().top + window.scrollY) : 0;
});

const trace = [];
// Start ABOVE section so pin starts from natural state
for (let off = -200; off <= 1800; off += 60) {
  await page.evaluate((y) => window.scrollTo({ top: Math.max(0, y), behavior: "instant" }), sectionTop + off);
  await page.waitForTimeout(160);

  const data = await page.evaluate(() => {
    const slide = document.querySelector(".pks-slide:first-child");
    const wrapper = slide?.querySelector(".pks-content-wrapper");
    const content = slide?.querySelector(".pks-content");
    const card = slide?.querySelector(".pks-stacking-card");
    return {
      scrollY: window.scrollY,
      slideRect: slide?.getBoundingClientRect(),
      wrapperRect: wrapper?.getBoundingClientRect(),
      wrapperPosition: wrapper ? getComputedStyle(wrapper).position : null,
      contentRect: content?.getBoundingClientRect(),
      contentTransform: content ? getComputedStyle(content).transform : null,
      contentOpacity: content ? getComputedStyle(content).opacity : null,
      cardRect: card?.getBoundingClientRect(),
    };
  });
  trace.push({ off, ...data });
  await page.screenshot({
    path: path.join(outDir, `${String(off).padStart(4, "0")}.png`),
    fullPage: false,
  });
}

// Print summary table
console.log("offset | scrollY | slide.top | wrapper.top | wrapper.pos | content.top | card.top");
for (const t of trace) {
  console.log(
    `+${String(t.off).padStart(4)} | ${String(t.scrollY).padStart(5)} | ` +
      `${String(Math.round(t.slideRect?.top ?? 0)).padStart(5)} | ` +
      `${String(Math.round(t.wrapperRect?.top ?? 0)).padStart(5)} | ` +
      `${(t.wrapperPosition ?? "").padEnd(8)} | ` +
      `${String(Math.round(t.contentRect?.top ?? 0)).padStart(5)} | ` +
      `${String(Math.round(t.cardRect?.top ?? 0)).padStart(5)}`,
  );
}

fs.writeFileSync(path.join(outDir, "trace.json"), JSON.stringify(trace, null, 2));
await browser.close();
