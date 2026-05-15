import { describe, it, expect } from "vitest";
import { calculateInfographicDuration } from "../InfographicZoom";
import { calculatePitchDeckDuration } from "../PitchDeck";

describe("InfographicZoom", () => {
  it("calculates duration correctly with defaults", () => {
    const frames = calculateInfographicDuration({
      imageSrc: "/test.png",
      zones: [
        { x: 0, y: 0, w: 50, h: 50 },
        { x: 50, y: 0, w: 50, h: 50 },
      ],
    });
    // overview(3s) + 2 zones(4s each) + outro(2s) = 13s * 30fps = 390
    expect(frames).toBe(390);
  });

  it("respects custom durations", () => {
    const frames = calculateInfographicDuration({
      imageSrc: "/test.png",
      zones: [
        { x: 0, y: 0, w: 50, h: 50, duration: 6 },
      ],
      overviewDuration: 2,
      outroDuration: 1,
    });
    // 2 + 6 + 1 = 9s * 30fps = 270
    expect(frames).toBe(270);
  });

  it("handles empty zones", () => {
    const frames = calculateInfographicDuration({
      imageSrc: "/test.png",
      zones: [],
    });
    // overview(3) + outro(2) = 5s * 30 = 150
    expect(frames).toBe(150);
  });
});

describe("PitchDeck", () => {
  it("calculates duration from slides", () => {
    const frames = calculatePitchDeckDuration({
      title: "Test",
      slides: [
        { id: "1", type: "title", title: "A" },
        { id: "2", type: "cta", title: "B" },
      ],
    });
    // intro(4s) + 2 slides(5s each) = 14s * 30 = 420
    expect(frames).toBe(420);
  });

  it("respects custom slide duration", () => {
    const frames = calculatePitchDeckDuration({
      title: "Test",
      slides: [
        { id: "1", type: "title", title: "A" },
      ],
      slideDuration: 3,
      introDuration: 2,
    });
    // 2 + 3 = 5s * 30 = 150
    expect(frames).toBe(150);
  });

  it("handles empty slides array", () => {
    const frames = calculatePitchDeckDuration({
      title: "Test",
      slides: [],
    });
    // just intro: 4s * 30 = 120
    expect(frames).toBe(120);
  });
});

describe("SocialClip", () => {
  it("type exports are correct", async () => {
    const mod = await import("../SocialClip");
    expect(mod.SocialClip).toBeDefined();
  });
});

describe("AudiogramVideo", () => {
  it("type exports are correct", async () => {
    const mod = await import("../AudiogramVideo");
    expect(mod.AudiogramVideo).toBeDefined();
  });
});
