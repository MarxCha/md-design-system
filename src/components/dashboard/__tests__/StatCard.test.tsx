import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/dashboard/StatCard";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Total Revenue" value="$12,345" />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$12,345")).toBeInTheDocument();
  });

  it("shows positive trend in green", () => {
    render(
      <StatCard
        label="Users"
        value={1500}
        trend={{ value: 12.5, label: "vs last month" }}
      />
    );

    const trendValue = screen.getByText("+12.5%");
    expect(trendValue).toBeInTheDocument();
    expect(trendValue.className).toContain("text-emerald-500");
  });

  it("shows negative trend in red", () => {
    render(
      <StatCard
        label="Bounce Rate"
        value="45%"
        trend={{ value: -3.2, label: "vs last month" }}
      />
    );

    const trendValue = screen.getByText("-3.2%");
    expect(trendValue).toBeInTheDocument();
    expect(trendValue.className).toContain("text-red-500");
  });
});
