import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "@/components/ui/switch";

describe("Switch", () => {
  it("renders a switch", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Toggle" />);
    const sw = screen.getByRole("switch");
    await user.click(sw);
    expect(sw).toBeChecked();
  });

  it("can be disabled", () => {
    render(<Switch aria-label="Toggle" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
