import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    section: ({
      children,
      className,
      id,
      ..._rest
    }: {
      children?: React.ReactNode;
      className?: string;
      id?: string;
      [key: string]: unknown;
    }) => (
      <section className={className} id={id}>
        {children}
      </section>
    ),
  },
}));

// Mock useReducedMotion to return true for static render path
vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

import { ScrollSection } from "@/components/landing/ScrollSection";

describe("ScrollSection", () => {
  it("renders children", () => {
    render(
      <ScrollSection>
        <p>Section content</p>
      </ScrollSection>
    );

    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("applies fullHeight class when prop is true", () => {
    render(
      <ScrollSection fullHeight>
        <p>Full height content</p>
      </ScrollSection>
    );

    const section = screen.getByText("Full height content").closest("section");
    expect(section).toBeTruthy();
    expect(section!.className).toContain("min-h-dvh");
  });
});
