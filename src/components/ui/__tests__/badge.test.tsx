import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders with text content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant data attribute", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveAttribute("data-variant", "default");
  });

  it("applies specified variant", () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error")).toHaveAttribute("data-variant", "destructive");
  });

  it("merges custom className", () => {
    render(<Badge className="extra">Styled</Badge>);
    expect(screen.getByText("Styled")).toHaveClass("extra");
  });
});
