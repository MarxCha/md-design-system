"use client";

import { useEffect, useState, useCallback } from "react";
import { breakpoints } from "@/lib/theme";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const orderedBreakpoints: Breakpoint[] = ["sm", "md", "lg", "xl", "2xl"];

const breakpointValues: Record<Breakpoint, number> = {
  sm: parseInt(breakpoints.sm),
  md: parseInt(breakpoints.md),
  lg: parseInt(breakpoints.lg),
  xl: parseInt(breakpoints.xl),
  "2xl": parseInt(breakpoints["2xl"]),
};

function getBreakpoint(): Breakpoint {
  const width = window.innerWidth;
  for (let i = orderedBreakpoints.length - 1; i >= 0; i--) {
    if (width >= breakpointValues[orderedBreakpoints[i]]) {
      return orderedBreakpoints[i];
    }
  }
  return "sm";
}

function indexOf(bp: Breakpoint): number {
  return orderedBreakpoints.indexOf(bp);
}

interface UseBreakpointOptions {
  fallback?: Breakpoint;
}

interface UseBreakpointReturn {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isAbove: (bp: Breakpoint) => boolean;
  isBelow: (bp: Breakpoint) => boolean;
}

export function useBreakpoint(
  options: UseBreakpointOptions = {}
): UseBreakpointReturn {
  const { fallback = "lg" } = options;
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(fallback);

  useEffect(() => {
    setBreakpoint(getBreakpoint());

    const queries = orderedBreakpoints.map((bp) =>
      window.matchMedia(`(min-width: ${breakpointValues[bp]}px)`)
    );

    const onChange = () => setBreakpoint(getBreakpoint());

    queries.forEach((mq) => mq.addEventListener("change", onChange));
    return () =>
      queries.forEach((mq) => mq.removeEventListener("change", onChange));
  }, []);

  const isAbove = useCallback(
    (bp: Breakpoint) => indexOf(breakpoint) >= indexOf(bp),
    [breakpoint]
  );

  const isBelow = useCallback(
    (bp: Breakpoint) => indexOf(breakpoint) < indexOf(bp),
    [breakpoint]
  );

  return {
    breakpoint,
    isMobile: indexOf(breakpoint) < indexOf("md"),
    isTablet: breakpoint === "md" || breakpoint === "lg",
    isDesktop: indexOf(breakpoint) >= indexOf("lg"),
    isAbove,
    isBelow,
  };
}
