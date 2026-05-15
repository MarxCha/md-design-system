import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "@/components/ui/skeleton";

describe("Skeleton", () => {
  it("renders a div element", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("has the animate-pulse class", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("animate-pulse");
  });

  it("applies custom className", () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-full" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveClass("h-4");
    expect(el).toHaveClass("w-full");
  });
});
