import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TouchActionBar, type TouchAction } from "../TouchActionBar";

// Mock useBreakpoint — default to desktop (hidden)
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

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const actions: TouchAction[] = [
  { id: "new", label: "Nuevo", onClick: vi.fn() },
  { id: "filter", label: "Filtrar", onClick: vi.fn(), variant: "outline" },
];

describe("TouchActionBar", () => {
  it("is hidden on desktop by default", () => {
    const { container } = render(<TouchActionBar actions={actions} />);
    expect(container.querySelector("[data-slot='touch-action-bar']")).toBeFalsy();
  });

  it("is visible when visible prop is true", () => {
    render(<TouchActionBar actions={actions} visible />);
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
    expect(screen.getByText("Filtrar")).toBeInTheDocument();
  });

  it("renders action buttons with correct labels", () => {
    render(<TouchActionBar actions={actions} visible />);
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
    expect(screen.getByText("Filtrar")).toBeInTheDocument();
  });

  it("is hidden when actions array is empty", () => {
    const { container } = render(<TouchActionBar actions={[]} visible />);
    expect(container.querySelector("[data-slot='touch-action-bar']")).toBeFalsy();
  });
});
