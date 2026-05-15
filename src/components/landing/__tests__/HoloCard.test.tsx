import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock useReducedMotion
vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

import { HoloCard } from "@/components/landing/HoloCard";

describe("HoloCard", () => {
  it("renders children", () => {
    render(
      <HoloCard>
        <p>Card content</p>
      </HoloCard>
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as link when href provided", () => {
    render(
      <HoloCard href="https://example.com">
        <p>Link card</p>
      </HoloCard>
    );

    const link = screen.getByText("Link card").closest("a");
    expect(link).toBeTruthy();
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
