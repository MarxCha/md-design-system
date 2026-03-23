"use client";

import { useMemo } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface AdaptiveQualityReturn {
  dpr: number;
  lowPower: boolean;
  reducedMotion: boolean;
}

export function useAdaptiveQuality(): AdaptiveQualityReturn {
  const reducedMotion = useReducedMotion();

  const { dpr, lowPower } = useMemo(() => {
    if (typeof window === "undefined") {
      return { dpr: 1, lowPower: false };
    }

    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (
      navigator as Navigator & { deviceMemory?: number }
    ).deviceMemory;

    type NetworkInfo = { effectiveType?: string };
    const connection = (
      navigator as Navigator & { connection?: NetworkInfo }
    ).connection;
    const slowNetwork =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    const isLowEnd =
      cores <= 2 || (memory !== undefined && memory <= 2) || slowNetwork;
    const isMidEnd =
      !isLowEnd && (cores <= 4 || (memory !== undefined && memory <= 4));

    let computedDpr: number;
    if (isLowEnd) {
      computedDpr = 1;
    } else if (isMidEnd) {
      computedDpr = Math.min(window.devicePixelRatio, 1.5);
    } else {
      computedDpr = Math.min(window.devicePixelRatio, 2);
    }

    return { dpr: computedDpr, lowPower: isLowEnd };
  }, []);

  return { dpr, lowPower, reducedMotion };
}
