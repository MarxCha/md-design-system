import { describe, it, expect } from "vitest";
import { generateStandaloneHtml } from "@/docs-kit/slide-deck/export-html";
import type { SlideDeckConfig } from "@/docs-kit/types";

const testConfig: SlideDeckConfig = {
  title: "Test Deck",
  author: "Test Author",
  company: "Test Co",
  date: "2026-04-04",
  layout: "dark-tech",
  slides: [
    { id: "1", type: "title", title: "Hello World", subtitle: "A test" },
    { id: "2", type: "content", title: "Points", bullets: ["One", "Two"] },
    { id: "3", type: "stats", title: "Numbers", stats: [{ value: "42", label: "Answer" }] },
    { id: "4", type: "cta", title: "End", buttonText: "Click", url: "https://example.com" },
  ],
};

describe("export-html", () => {
  it("generates valid HTML document", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
  });

  it("includes title in <title> tag", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain("<title>Test Deck");
  });

  it("includes CSS variables", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain("--dk-primary:");
    expect(html).toContain("--dk-bg:");
    expect(html).toContain("--dk-font-display:");
  });

  it("renders all slides", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain("Hello World");
    expect(html).toContain("Points");
    expect(html).toContain("Numbers");
    expect(html).toContain("End");
  });

  it("includes navigation JavaScript", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain("ArrowRight");
    expect(html).toContain("ArrowLeft");
    expect(html).toContain("function goTo");
  });

  it("includes slide counter", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain(`1 / ${testConfig.slides.length}`);
  });

  it("hides non-first slides initially", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain('data-index="0"');
    expect(html).toContain('data-index="1" style="display:none"');
  });

  it("includes author and date in footer", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain("Test Author");
    expect(html).toContain("2026-04-04");
  });

  it("escapes HTML in slide content", () => {
    const config: SlideDeckConfig = {
      ...testConfig,
      slides: [
        { id: "1", type: "title", title: '<script>alert("xss")</script>' },
      ],
    };
    const html = generateStandaloneHtml(config);
    expect(html).not.toContain('<script>alert("xss")</script>');
    expect(html).toContain("&lt;script&gt;");
  });

  it("includes print styles", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain("@media print");
  });

  it("includes accessibility attributes", () => {
    const html = generateStandaloneHtml(testConfig);
    expect(html).toContain('aria-label="Presentation');
    expect(html).toContain('aria-roledescription="slide deck"');
  });
});
