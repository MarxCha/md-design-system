import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "@/components/ui/textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea placeholder="Write something" />);
    expect(screen.getByPlaceholderText("Write something")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type" />);
    const textarea = screen.getByPlaceholderText("Type");
    await user.type(textarea, "Hello world");
    expect(textarea).toHaveValue("Hello world");
  });

  it("can be disabled", () => {
    render(<Textarea disabled placeholder="No input" />);
    expect(screen.getByPlaceholderText("No input")).toBeDisabled();
  });
});
