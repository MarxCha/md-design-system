import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileFilterSheet } from "../MobileFilterSheet";

// Mock useBreakpoint — default to desktop
vi.mock("@/hooks/useBreakpoint", () => ({
  useBreakpoint: () => ({
    breakpoint: "lg" as const,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isAbove: () => true,
    isBelow: () => false,
  }),
}));

describe("MobileFilterSheet (desktop)", () => {
  it("renders children inline on desktop", () => {
    render(
      <MobileFilterSheet>
        <input placeholder="Search..." />
        <select><option>All</option></select>
      </MobileFilterSheet>
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders with data-slot filter-bar", () => {
    const { container } = render(
      <MobileFilterSheet>
        <span>Filter content</span>
      </MobileFilterSheet>
    );
    expect(container.querySelector("[data-slot='filter-bar']")).toBeTruthy();
  });

  it("applies inline flex layout on desktop", () => {
    const { container } = render(
      <MobileFilterSheet>
        <span>Filter</span>
      </MobileFilterSheet>
    );
    const bar = container.querySelector("[data-slot='filter-bar']");
    expect(bar?.className).toContain("flex-wrap");
  });
});
