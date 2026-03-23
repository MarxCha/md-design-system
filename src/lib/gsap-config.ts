"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register plugins only on the client to avoid SSR errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Global GSAP defaults aligned with MD Consultoría animation tokens
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

// Prevent laggy ScrollTrigger updates
if (typeof window !== "undefined") {
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger, ScrollToPlugin };
