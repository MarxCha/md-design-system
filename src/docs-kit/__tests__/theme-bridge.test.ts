import { describe, it, expect } from "vitest";
import {
  defaultDocsTheme,
  layoutThemes,
  resolveTheme,
  themeToCssVars,
} from "@/docs-kit/theme-bridge";

describe("theme-bridge", () => {
  it("defaultDocsTheme has all required color keys", () => {
    expect(defaultDocsTheme.colors).toHaveProperty("primary");
    expect(defaultDocsTheme.colors).toHaveProperty("accent");
    expect(defaultDocsTheme.colors).toHaveProperty("background");
    expect(defaultDocsTheme.colors).toHaveProperty("foreground");
    expect(defaultDocsTheme.colors).toHaveProperty("muted");
    expect(defaultDocsTheme.colors).toHaveProperty("mutedForeground");
    expect(defaultDocsTheme.colors).toHaveProperty("border");
  });

  it("defaultDocsTheme has font families", () => {
    expect(defaultDocsTheme.fonts.display).toContain("Instrument Sans");
    expect(defaultDocsTheme.fonts.body).toContain("DM Sans");
    expect(defaultDocsTheme.fonts.mono).toContain("JetBrains Mono");
  });

  it("layoutThemes has all 3 layouts", () => {
    expect(layoutThemes).toHaveProperty("dark-tech");
    expect(layoutThemes).toHaveProperty("clean-corporate");
    expect(layoutThemes).toHaveProperty("bold-creative");
  });

  it("resolveTheme merges layout overrides", () => {
    const theme = resolveTheme("dark-tech");
    expect(theme.colors.background).toBe("hsl(213 40% 6%)");
    expect(theme.colors.foreground).toBe("hsl(0 0% 95%)");
    // Fonts should be inherited from default
    expect(theme.fonts.display).toBe(defaultDocsTheme.fonts.display);
  });

  it("resolveTheme applies custom overrides on top of layout", () => {
    const theme = resolveTheme("dark-tech", { primary: "red" });
    expect(theme.colors.primary).toBe("red");
    // Layout background should still be applied
    expect(theme.colors.background).toBe("hsl(213 40% 6%)");
  });

  it("themeToCssVars generates valid CSS variable strings", () => {
    const vars = themeToCssVars(defaultDocsTheme);
    expect(vars).toContain("--dk-primary:");
    expect(vars).toContain("--dk-accent:");
    expect(vars).toContain("--dk-bg:");
    expect(vars).toContain("--dk-fg:");
    expect(vars).toContain("--dk-font-display:");
    expect(vars).toContain("--dk-font-body:");
    expect(vars).toContain("--dk-font-mono:");
    expect(vars).toContain("--dk-radius-sm:");
    expect(vars).toContain("--dk-radius-md:");
    expect(vars).toContain("--dk-radius-lg:");
  });

  it("each layout theme has background and foreground", () => {
    for (const [name, overrides] of Object.entries(layoutThemes)) {
      expect(overrides).toHaveProperty("background");
      expect(overrides).toHaveProperty("foreground");
    }
  });
});
