import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
} from "../ResponsiveDialog";

// Mock useBreakpoint — default to desktop
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

describe("ResponsiveDialog (desktop)", () => {
  it("renders trigger button", () => {
    render(
      <ResponsiveDialog>
        <ResponsiveDialogTrigger>Open</ResponsiveDialogTrigger>
        <ResponsiveDialogContent>
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle>Title</ResponsiveDialogTitle>
            <ResponsiveDialogDescription>Description</ResponsiveDialogDescription>
          </ResponsiveDialogHeader>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("uses dialog on desktop (has data-slot)", () => {
    render(
      <ResponsiveDialog>
        <ResponsiveDialogTrigger>Open</ResponsiveDialogTrigger>
        <ResponsiveDialogContent>
          <ResponsiveDialogTitle>Title</ResponsiveDialogTitle>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    );
    const trigger = screen.getByText("Open");
    expect(trigger.closest("[data-slot='responsive-dialog-trigger']") ?? trigger.closest("[data-slot='dialog-trigger']")).toBeTruthy();
  });
});
