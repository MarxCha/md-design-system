import { describe, it, expect } from "vitest";
import type {
  SlideDeckConfig,
  OnePagerConfig,
  NotebookPackConfig,
  Slide,
  DocsKitFormat,
} from "@/docs-kit/types";

describe("docs-kit types", () => {
  it("SlideDeckConfig accepts all slide types", () => {
    const config: SlideDeckConfig = {
      title: "Test Deck",
      author: "Test",
      company: "Test Co",
      date: "2026-04-04",
      layout: "dark-tech",
      slides: [
        { id: "1", type: "title", title: "Title" },
        { id: "2", type: "content", title: "Content", bullets: ["a", "b"] },
        { id: "3", type: "image", src: "/img.png", alt: "Image" },
        { id: "4", type: "stats", title: "Stats", stats: [{ value: "99", label: "Score" }] },
        { id: "5", type: "quote", quote: "Test quote", author: "Author" },
        { id: "6", type: "cta", title: "CTA" },
      ],
    };
    expect(config.slides).toHaveLength(6);
  });

  it("OnePagerConfig has required fields", () => {
    const config: OnePagerConfig = {
      title: "Test",
      subtitle: "Sub",
      company: "Co",
      date: "2026-04-04",
      tagline: "Tag",
      sections: [{ title: "Section", content: "Content" }],
    };
    expect(config.sections).toHaveLength(1);
  });

  it("NotebookPackConfig supports all doc types", () => {
    const config: NotebookPackConfig = {
      projectName: "Test",
      projectSlug: "test",
      description: "Test project",
      docs: [
        { type: "overview", title: "Overview", content: "# Overview" },
        { type: "technical", title: "Tech", content: "# Tech" },
        { type: "features", title: "Features", content: "# Features" },
        { type: "roadmap", title: "Roadmap", content: "# Roadmap" },
        { type: "faq", title: "FAQ", content: "# FAQ" },
      ],
    };
    expect(config.docs).toHaveLength(5);
  });

  it("DocsKitFormat covers all 3 formats", () => {
    const formats: DocsKitFormat[] = ["slide-deck", "one-pager", "notebook-pack"];
    expect(formats).toHaveLength(3);
  });

  it("Slide union type is exhaustive", () => {
    const slideTypes: Slide["type"][] = ["title", "content", "image", "stats", "quote", "cta"];
    expect(slideTypes).toHaveLength(6);
  });
});
