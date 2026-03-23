import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

describe("useReducedMotion", () => {
  let listeners: Record<string, (e: unknown) => void>;
  let matchesMock: boolean;

  beforeEach(() => {
    listeners = {};
    matchesMock = false;

    vi.stubGlobal("matchMedia", vi.fn().mockImplementation((query: string) => ({
      matches: matchesMock,
      media: query,
      addEventListener: vi.fn((event: string, cb: (e: unknown) => void) => {
        listeners[event] = cb;
      }),
      removeEventListener: vi.fn(),
    })));
  });

  it("returns false when motion is not reduced", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when prefers-reduced-motion matches", () => {
    matchesMock = true;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("updates when media query changes", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      listeners["change"]?.({ matches: true });
    });
    expect(result.current).toBe(true);
  });
});
