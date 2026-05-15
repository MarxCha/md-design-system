import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BentoGrid, BentoCard } from "@/components/dashboard/BentoGrid";

describe("BentoGrid", () => {
  it("renders children", () => {
    render(
      <BentoGrid>
        <div data-testid="child-1">Card 1</div>
        <div data-testid="child-2">Card 2</div>
      </BentoGrid>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });
});

describe("BentoCard", () => {
  it("renders with glassmorphism class when prop is true", () => {
    render(
      <BentoCard glassmorphism data-testid="glass-card">
        Glass content
      </BentoCard>
    );

    const card = screen.getByText("Glass content").closest("div");
    expect(card).toBeTruthy();
    expect(card!.className).toContain("backdrop-blur-xl");
  });

  it("applies custom className", () => {
    render(
      <BentoCard className="custom-class">
        Custom content
      </BentoCard>
    );

    const card = screen.getByText("Custom content").closest("div");
    expect(card).toBeTruthy();
    expect(card!.className).toContain("custom-class");
  });
});
