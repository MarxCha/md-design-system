import { chromium } from "playwright";
const b = await chromium.launch({ headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3500/templates/pk-stacking-cards", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);

// Scroll to mid-pin to inspect spacer
await p.evaluate(() => window.scrollTo(0, 600));
await p.waitForTimeout(400);

const data = await p.evaluate(() => {
  const slides = Array.from(document.querySelectorAll(".pks-slide"));
  return slides.slice(0, 3).map((s, i) => {
    const wrapper = s.querySelector(".pks-content-wrapper");
    const wrapperParent = wrapper?.parentElement;
    return {
      i,
      slideRect: s.getBoundingClientRect(),
      slideStyles: { height: getComputedStyle(s).height, position: getComputedStyle(s).position },
      wrapperRect: wrapper?.getBoundingClientRect(),
      wrapperStyles: wrapper ? { position: getComputedStyle(wrapper).position, height: getComputedStyle(wrapper).height } : null,
      wrapperParentTag: wrapperParent?.tagName,
      wrapperParentClass: wrapperParent?.className,
      wrapperParentHeight: wrapperParent ? getComputedStyle(wrapperParent).height : null,
      wrapperParentPaddingBottom: wrapperParent ? getComputedStyle(wrapperParent).paddingBottom : null,
    };
  });
});
console.log(JSON.stringify(data, null, 2));
await b.close();
