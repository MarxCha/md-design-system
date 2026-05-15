import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("renders with the correct type", () => {
    render(<Input type="email" data-testid="email-input" />);
    expect(screen.getByTestId("email-input")).toHaveAttribute("type", "email");
  });

  it("can be disabled", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });
});
