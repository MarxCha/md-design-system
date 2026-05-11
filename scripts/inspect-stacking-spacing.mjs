// Measure actual vertical spacing between heading and first slide on the live original.
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("https://www.pieterkoopt.nl/", { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => localStorage.setItem("introPlayed", "true"));
await page.reload({ waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

const data = await page.evaluate(() => {
  const sec = document.querySelector(".section_stacking-cards");
  const padGlobal = sec?.querySelector(".padding-global");
  const padding256 = sec?.querySelector(".section-padding-256px");
  const containerCol = sec?.querySelector(".container-col-11");
  const padBottom = sec?.querySelector(".padding-bottom");
  const hiwHeader = sec?.querySelector(".hiw-header");
  const heading = sec?.querySelector(".heading-l");
  const paragraph = sec?.querySelector(".paragraph-l");
  const stack = sec?.querySelector(".mwg_effect031");
  const firstSlide = sec?.querySelector(".slide:first-child");
  const firstContent = sec?.querySelector(".slide:first-child .content");
  const firstCard = sec?.querySelector(".slide:first-child .stacking-card");
  const get = (el, props) => el ? Object.fromEntries(props.map(p => [p, getComputedStyle(el)[p]])) : null;
  const rect = (el) => el ? el.getBoundingClientRect() : null;
  return {
    sectionRect: rect(sec),
    padGlobal: { rect: rect(padGlobal), styles: get(padGlobal, ["paddingTop","paddingBottom","paddingLeft","paddingRight"]) },
    padding256: { rect: rect(padding256), styles: get(padding256, ["paddingTop","paddingBottom","paddingLeft","paddingRight"]) },
    containerCol: { rect: rect(containerCol), styles: get(containerCol, ["paddingTop","paddingBottom","width","maxWidth"]) },
    padBottom: { rect: rect(padBottom), styles: get(padBottom, ["paddingTop","paddingBottom"]) },
    hiwHeader: { rect: rect(hiwHeader), styles: get(hiwHeader, ["paddingTop","paddingBottom","marginBottom","gap"]) },
    heading: { rect: rect(heading), text: heading?.textContent?.slice(0, 60) },
    paragraph: { rect: rect(paragraph), text: paragraph?.textContent?.slice(0, 60) },
    stack: { rect: rect(stack), styles: get(stack, ["paddingTop","marginTop"]) },
    firstSlide: { rect: rect(firstSlide), styles: get(firstSlide, ["height","minHeight","paddingTop","display","alignItems"]) },
    firstContent: { rect: rect(firstContent), styles: get(firstContent, ["transform","width"]) },
    firstCard: { rect: rect(firstCard) },
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
