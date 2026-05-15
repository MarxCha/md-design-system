import { chromium } from "playwright";

const url = "http://localhost:3011/templates/pk-hero";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
const warnings = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
  if (msg.type() === "warning") warnings.push(msg.text());
});
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// Re-check after going to "revealed" via localStorage
await page.evaluate(() => localStorage.setItem("pkIntroPlayed", "true"));
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// Filter out unrelated noise (Agentation MCP server on 4747, dev refresh logs)
const isRelevant = (m) =>
  !m.includes("4747") &&
  !m.includes("agentation") &&
  !m.includes("Fast Refresh") &&
  !m.includes("/health") &&
  !m.includes("sourcesContent");

const relevantErrors = errors.filter(isRelevant);
const relevantWarnings = warnings.filter(isRelevant);

console.log(`relevant errors: ${relevantErrors.length}`);
relevantErrors.forEach((e) => console.log("  ERR:", e));
console.log(`relevant warnings: ${relevantWarnings.length}`);
relevantWarnings.forEach((w) => console.log("  WARN:", w));

const hydrationFound = errors.some((e) => /Hydration|hydration/.test(e));
console.log(`hydration error present: ${hydrationFound}`);

await browser.close();
process.exit(hydrationFound ? 1 : 0);
