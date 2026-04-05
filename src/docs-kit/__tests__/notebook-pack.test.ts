import { describe, it, expect } from "vitest";
import {
  generateNotebookPack,
  generateNotebookDocs,
  generateAudioSummary,
} from "@/docs-kit/notebook-pack/generate";
import type { NotebookPackConfig } from "@/docs-kit/types";

const testConfig: NotebookPackConfig = {
  projectName: "Test Project",
  projectSlug: "test-project",
  description: "A test project for docs-kit",
  docs: [
    { type: "overview", title: "Overview", content: "# Test Overview\n\nContent here." },
    { type: "features", title: "Features", content: "# Features\n\n- Feature A" },
  ],
  metadata: {
    version: "1.0.0",
    audience: "developers",
    generatedAt: "2026-04-04",
  },
};

describe("notebook-pack generator", () => {
  describe("generateNotebookPack", () => {
    it("includes project name in header", () => {
      const result = generateNotebookPack(testConfig);
      expect(result).toContain("# Test Project");
    });

    it("includes description", () => {
      const result = generateNotebookPack(testConfig);
      expect(result).toContain("A test project for docs-kit");
    });

    it("includes metadata", () => {
      const result = generateNotebookPack(testConfig);
      expect(result).toContain("**Version:** 1.0.0");
      expect(result).toContain("**Audience:** developers");
    });

    it("includes all docs", () => {
      const result = generateNotebookPack(testConfig);
      expect(result).toContain("# Test Overview");
      expect(result).toContain("# Features");
    });

    it("separates docs with horizontal rules", () => {
      const result = generateNotebookPack(testConfig);
      expect(result).toContain("---");
    });
  });

  describe("generateNotebookDocs", () => {
    it("returns one file per doc", () => {
      const files = generateNotebookDocs(testConfig);
      expect(files).toHaveLength(2);
    });

    it("filenames follow slug-type.md pattern", () => {
      const files = generateNotebookDocs(testConfig);
      expect(files[0].filename).toBe("test-project-overview.md");
      expect(files[1].filename).toBe("test-project-features.md");
    });

    it("each file has frontmatter", () => {
      const files = generateNotebookDocs(testConfig);
      expect(files[0].content).toContain("title: Overview");
      expect(files[0].content).toContain("type: overview");
    });
  });

  describe("generateAudioSummary", () => {
    it("includes project name", () => {
      const result = generateAudioSummary(testConfig);
      expect(result).toContain("Test Project");
    });

    it("includes document listing", () => {
      const result = generateAudioSummary(testConfig);
      expect(result).toContain("**Overview** (overview)");
      expect(result).toContain("**Features** (features)");
    });

    it("includes audience when available", () => {
      const result = generateAudioSummary(testConfig);
      expect(result).toContain("developers");
    });
  });
});
