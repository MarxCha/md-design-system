import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock recharts ResponsiveContainer since it needs browser dimensions
vi.mock("recharts", () => ({
  ResponsiveContainer: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="responsive-container">{children}</div>,
}));

import { ChartContainer } from "@/components/dashboard/ChartContainer";

describe("ChartContainer", () => {
  it("renders title and description", () => {
    render(
      <ChartContainer title="Revenue Chart" description="Monthly revenue data">
        <div>Chart placeholder</div>
      </ChartContainer>
    );

    expect(screen.getByText("Revenue Chart")).toBeInTheDocument();
    expect(screen.getByText("Monthly revenue data")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <ChartContainer>
        <div data-testid="chart-child">Chart content</div>
      </ChartContainer>
    );

    expect(screen.getByTestId("chart-child")).toBeInTheDocument();
  });

  it("renders toolbar when provided", () => {
    render(
      <ChartContainer
        title="Sales"
        toolbar={<button data-testid="toolbar-btn">Filter</button>}
      >
        <div>Chart</div>
      </ChartContainer>
    );

    expect(screen.getByTestId("toolbar-btn")).toBeInTheDocument();
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });
});
