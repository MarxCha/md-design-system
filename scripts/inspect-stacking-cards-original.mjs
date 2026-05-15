// Extract computed styles for stacking cards from live original.
import { chromium } from "playwright";

const url = "https://www.pieterkoopt.nl/";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => localStorage.setItem("introPlayed", "true"));
await page.reload({ waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

// Scroll to stacking-cards section so it's mounted
const sectionTop = await page.evaluate(() => {
  const sec = document.querySelector(".section_stacking-cards");
  return sec ? sec.getBoundingClientRect().top + window.scrollY : 0;
});
await page.evaluate((y) => window.scrollTo(0, y - 200), sectionTop);
await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  const pick = (sel, props) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      ...Object.fromEntries(props.map((p) => [p, cs[p]])),
      rect: el.getBoundingClientRect(),
      tag: el.tagName,
    };
  };
  return {
    stackingCard: pick(".mwg_effect031 .slide:first-child .stacking-card", [
      "background", "backgroundColor", "border", "borderRadius", "padding",
      "display", "gridTemplateColumns", "gap", "width",
    ]),
    cardNumber: pick(".mwg_effect031 .slide:first-child .card-number", [
      "fontSize", "fontFamily", "fontWeight", "fontStyle",
      "color", "textTransform", "letterSpacing", "lineHeight",
      "padding", "border", "borderRadius", "background",
    ]),
    cardNumberDiv: pick(".mwg_effect031 .slide:first-child .card-number > div", [
      "fontSize", "fontFamily", "fontWeight", "fontStyle", "color",
      "padding", "border", "borderRadius", "background", "display",
    ]),
    headingS: pick(".mwg_effect031 .slide:first-child .heading-s", [
      "fontSize", "fontFamily", "fontWeight", "fontStyle",
      "color", "textTransform", "letterSpacing", "lineHeight",
    ]),
    altHeading: pick(".mwg_effect031 .slide:first-child .heading-s .alt-heading", [
      "fontSize", "fontFamily", "fontWeight", "fontStyle",
      "color", "textTransform",
    ]),
    paragraphM: pick(".mwg_effect031 .slide:first-child .paragraph-m", [
      "fontSize", "fontFamily", "color", "lineHeight",
    ]),
    cardVideo: pick(".mwg_effect031 .slide:first-child .stacking-card_video", [
      "width", "aspectRatio", "borderRadius", "background", "overflow",
    ]),
    section: pick(".section_stacking-cards", [
      "backgroundColor", "color",
    ]),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
