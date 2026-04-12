"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type SmoothScrollContextType = {
  lenis: Lenis | null;
};

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
});

export function useLenis() {
  return useContext(SmoothScrollContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
  /** When true, syncs Lenis with GSAP ScrollTrigger. Requires gsap + ScrollTrigger. Default: false */
  gsapSync?: boolean;
}

export function SmoothScrollProvider({
  children,
  gsapSync = false,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let cleanupGsap: (() => void) | undefined;

    if (gsapSync) {
      // Dynamically import GSAP only when needed — keeps Lenis usable standalone
      import("@/lib/gsap-config").then(({ gsap, ScrollTrigger }) => {
        lenis.on("scroll", ScrollTrigger.update);

        const ticker = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        cleanupGsap = () => {
          gsap.ticker.remove(ticker);
          lenis.off("scroll", ScrollTrigger.update);
        };
      });
    } else {
      // Standalone RAF loop — no GSAP dependency
      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      cleanupGsap = () => cancelAnimationFrame(rafId);
    }

    return () => {
      cleanupGsap?.();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [gsapSync]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
