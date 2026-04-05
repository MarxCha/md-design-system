import { describe, it, expect } from "vitest";
import { layouts, getLayout, type LayoutClasses } from "@/docs-kit/slide-deck/layouts";

describe("slide-deck layouts", () => {
  const layoutNames = ["dark-tech", "clean-corporate", "bold-creative"] as const;

  it("exports all 3 layouts", () => {
    expect(Object.keys(layouts)).toHaveLength(3);
    for (const name of layoutNames) {
      expect(layouts).toHaveProperty(name);
    }
  });

  it("getLayout returns the correct layout", () => {
    const dark = getLayout("dark-tech");
    expect(dark.root).toContain("bg-");
    expect(dark).toBe(layouts["dark-tech"]);
  });

  it.each(layoutNames)("layout '%s' has all required class keys", (name) => {
    const layout = layouts[name];
    const requiredKeys: (keyof LayoutClasses)[] = [
      "root", "titleBg", "titleText", "subtitleText",
      "contentBg", "headingText", "bodyText", "bulletMarker",
      "statValue", "statLabel", "statDelta",
      "quoteText", "quoteAuthor",
      "ctaBg", "ctaButton",
      "navDot", "navDotActive",
      "accentBar", "slideNumber",
    ];

    for (const key of requiredKeys) {
      expect(layout).toHaveProperty(key);
      expect(typeof layout[key]).toBe("string");
      expect(layout[key].length).toBeGreaterThan(0);
    }
  });

  it("dark-tech has dark background", () => {
    expect(layouts["dark-tech"].root).toContain("bg-[hsl(213");
  });

  it("clean-corporate has white background", () => {
    expect(layouts["clean-corporate"].root).toContain("bg-white");
  });

  it("bold-creative has amber background", () => {
    expect(layouts["bold-creative"].root).toContain("bg-[hsl(38");
  });
});
