import { describe, it, expect } from "vitest";

describe("Remotion integrated components — barrel exports", () => {
  it("exports all text components", async () => {
    const mod = await import("../components/index");
    expect(mod.AnimatedTitle).toBeDefined();
  });

  it("exports all background components", async () => {
    const mod = await import("../components/index");
    expect(mod.GradientBackground).toBeDefined();
    expect(mod.ParticleField).toBeDefined();
  });

  it("exports all overlay components", async () => {
    const mod = await import("../components/index");
    expect(mod.ProgressBar).toBeDefined();
    expect(mod.CallToAction).toBeDefined();
    expect(mod.CountdownTimer).toBeDefined();
  });

  it("exports media components", async () => {
    const mod = await import("../components/index");
    expect(mod.FitImage).toBeDefined();
  });

  it("exports layout components", async () => {
    const mod = await import("../components/index");
    expect(mod.SafeArea).toBeDefined();
  });

  it("exports transition presets", async () => {
    const mod = await import("../components/index");
    expect(mod.TRANSITION_PRESETS).toBeDefined();
    expect(mod.TRANSITION_PRESETS.crossfade).toBeDefined();
    expect(mod.TRANSITION_PRESETS.slideLeft).toBeDefined();
    expect(mod.TRANSITION_PRESETS.wipeRight).toBeDefined();
    expect(mod.TRANSITION_PRESETS.cut).toBeDefined();
  });
});

describe("Remotion presets", () => {
  it("exports easings", async () => {
    const mod = await import("../presets/index");
    expect(mod.EASINGS).toBeDefined();
    expect(mod.EASINGS.linear).toBeDefined();
    expect(mod.EASINGS.bounceOut).toBeDefined();
    expect(mod.EASINGS.elastic).toBeDefined();
  });

  it("exports platform dimensions", async () => {
    const mod = await import("../presets/index");
    expect(mod.PLATFORMS).toBeDefined();
    expect(mod.PLATFORMS.tiktok.width).toBe(1080);
    expect(mod.PLATFORMS.tiktok.height).toBe(1920);
    expect(mod.PLATFORMS.youtube.width).toBe(1920);
    expect(mod.PLATFORMS.youtube.height).toBe(1080);
  });

  it("exports color palettes", async () => {
    const mod = await import("../presets/index");
    expect(mod.PALETTES).toBeDefined();
    expect(mod.PALETTES.brand.accent).toContain("hsl");
    expect(mod.GRADIENTS.brand).toBeDefined();
  });

  it("exports font families matching DS tokens", async () => {
    const mod = await import("../presets/index");
    expect(mod.FONT_FAMILIES.heading).toContain("Instrument Sans");
    expect(mod.FONT_FAMILIES.body).toContain("DM Sans");
    expect(mod.FONT_FAMILIES.mono).toContain("JetBrains Mono");
  });

  it("exports MD brand identity", async () => {
    const mod = await import("../presets/index");
    expect(mod.BRAND.name).toBe("MD Consultoría TI");
    expect(mod.BRAND.handle).toBe("@consultoriamd");
  });

  it("secondsToFrames converts correctly", async () => {
    const mod = await import("../presets/index");
    expect(mod.secondsToFrames(1, 30)).toBe(30);
    expect(mod.secondsToFrames(2.5, 30)).toBe(75);
  });
});

describe("Remotion hooks", () => {
  it("exports useAnimation", async () => {
    const mod = await import("../hooks/index");
    expect(mod.useAnimation).toBeDefined();
  });
});
