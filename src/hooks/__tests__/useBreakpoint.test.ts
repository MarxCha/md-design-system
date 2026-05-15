import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

describe("useBreakpoint", () => {
  let listeners: Array<(e: unknown) => void>;
  let innerWidthMock: number;

  beforeEach(() => {
    listeners = [];
    innerWidthMock = 1024;

    Object.defineProperty(window, "innerWidth", {
      get: () => innerWidthMock,
      configurable: true,
    });

    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => {
        const minWidth = parseInt(query.match(/(\d+)/)?.[1] ?? "0");
        return {
          matches: innerWidthMock >= minWidth,
          media: query,
          addEventListener: vi.fn((_event: string, cb: (e: unknown) => void) => {
            listeners.push(cb);
          }),
          removeEventListener: vi.fn(),
        };
      })
    );
  });

  it("returns lg for 1024px viewport", () => {
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toBe("lg");
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobile).toBe(false);
  });

  it("returns sm for 500px viewport", () => {
    innerWidthMock = 500;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toBe("sm");
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it("returns md for 768px viewport", () => {
    innerWidthMock = 768;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toBe("md");
    expect(result.current.isTablet).toBe(true);
  });

  it("returns xl for 1280px viewport", () => {
    innerWidthMock = 1280;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toBe("xl");
    expect(result.current.isDesktop).toBe(true);
  });

  it("uses fallback for SSR", () => {
    const { result } = renderHook(() => useBreakpoint({ fallback: "sm" }));
    // After effect runs, it should detect actual width
    expect(result.current.breakpoint).toBe("lg");
  });

  it("isAbove and isBelow work correctly", () => {
    innerWidthMock = 1024;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isAbove("md")).toBe(true);
    expect(result.current.isAbove("xl")).toBe(false);
    expect(result.current.isBelow("xl")).toBe(true);
    expect(result.current.isBelow("sm")).toBe(false);
  });

  it("responds to matchMedia change events", () => {
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.breakpoint).toBe("lg");

    // Simulate resize to mobile
    innerWidthMock = 400;
    act(() => {
      listeners.forEach((cb) => cb({ matches: false }));
    });
    expect(result.current.breakpoint).toBe("sm");
    expect(result.current.isMobile).toBe(true);
  });
});
