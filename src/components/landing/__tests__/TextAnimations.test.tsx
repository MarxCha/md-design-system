import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock GSAP dynamic import
vi.mock("gsap", () => ({
  default: {
    fromTo: vi.fn(),
  },
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: {
      children?: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock useReducedMotion to return true so we get the static render path
vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

// Mock IntersectionObserver as a proper class
beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor() {}
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

import {
  CharSplit,
  ScrambleText,
  CountUp,
  BlurReveal,
} from "@/components/landing/TextAnimations";

describe("CharSplit", () => {
  it("renders text content", () => {
    render(<CharSplit text="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});

describe("ScrambleText", () => {
  it("renders text content", () => {
    render(<ScrambleText text="Scrambled Text" />);
    expect(screen.getByText("Scrambled Text")).toBeInTheDocument();
  });
});

describe("CountUp", () => {
  it("renders with value", () => {
    render(<CountUp value={100} prefix="$" suffix="+" />);
    // With reduced motion, it renders the final value immediately
    expect(screen.getByText("$100+")).toBeInTheDocument();
  });
});

describe("BlurReveal", () => {
  it("renders children", () => {
    render(
      <BlurReveal>
        <p>Revealed content</p>
      </BlurReveal>
    );
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
  });
});
