/**
 * MD Consultoría TI — Animation Presets
 *
 * GSAP: spread into gsap.from(), gsap.to(), or gsap.fromTo()
 *   gsap.from(el, animationPresets.gsap.fadeUp.from)
 *   gsap.to(el, animationPresets.gsap.fadeUp.to)
 *
 * Framer Motion: spread as variant values
 *   <motion.div variants={animationPresets.motion.fadeUp} initial="hidden" animate="visible" />
 */

import type { Variants } from "framer-motion";

/* ============================================================
   GSAP Presets
   ============================================================ */
export type GsapPreset = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

export const gsapPresets = {
  fadeUp: {
    from: { opacity: 0, y: 40, ease: "power3.out", duration: 0.8 },
    to:   { opacity: 1, y: 0,  ease: "power3.out", duration: 0.8 },
  },

  fadeDown: {
    from: { opacity: 0, y: -40, ease: "power3.out", duration: 0.8 },
    to:   { opacity: 1, y: 0,   ease: "power3.out", duration: 0.8 },
  },

  fadeLeft: {
    from: { opacity: 0, x: 40, ease: "power3.out", duration: 0.8 },
    to:   { opacity: 1, x: 0,  ease: "power3.out", duration: 0.8 },
  },

  fadeRight: {
    from: { opacity: 0, x: -40, ease: "power3.out", duration: 0.8 },
    to:   { opacity: 1, x: 0,   ease: "power3.out", duration: 0.8 },
  },

  scaleIn: {
    from: { opacity: 0, scale: 0.85, ease: "back.out(1.7)", duration: 0.6 },
    to:   { opacity: 1, scale: 1,    ease: "back.out(1.7)", duration: 0.6 },
  },

  scaleOut: {
    from: { opacity: 1, scale: 1,    ease: "power3.in", duration: 0.4 },
    to:   { opacity: 0, scale: 0.85, ease: "power3.in", duration: 0.4 },
  },

  rotateIn: {
    from: { opacity: 0, rotation: -15, y: 20, ease: "back.out(1.7)", duration: 0.7 },
    to:   { opacity: 1, rotation: 0,   y: 0,  ease: "back.out(1.7)", duration: 0.7 },
  },

  slideIn: {
    from: { x: "-100%", ease: "power3.out", duration: 0.6 },
    to:   { x: "0%",    ease: "power3.out", duration: 0.6 },
  },

  slideOut: {
    from: { x: "0%",    ease: "power3.in", duration: 0.5 },
    to:   { x: "100%",  ease: "power3.in", duration: 0.5 },
  },

  /** Use with gsap.from(elements, { ...staggerFadeUp.from }) */
  staggerFadeUp: {
    from: {
      opacity: 0,
      y: 32,
      ease: "power3.out",
      duration: 0.7,
      stagger: {
        amount: 0.5,
        from: "start" as const,
      },
    },
    to: {
      opacity: 1,
      y: 0,
      ease: "power3.out",
      duration: 0.7,
      stagger: {
        amount: 0.5,
        from: "start" as const,
      },
    },
  },
} satisfies Record<string, GsapPreset>;

/* ============================================================
   Framer Motion Presets
   ============================================================ */
export const motionFadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.35, ease: [0.45, 0, 0.55, 1] },
  },
};

export const motionFadeDown: Variants = {
  hidden:  { opacity: 0, y: -32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.35, ease: [0.45, 0, 0.55, 1] },
  },
};

export const motionScaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.3, ease: [0.45, 0, 0.55, 1] },
  },
};

export const motionSlideIn: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.35, ease: [0.45, 0, 0.55, 1] },
  },
};

export const motionSlideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.35, ease: [0.45, 0, 0.55, 1] },
  },
};

/** Stagger container — wrap around motionFadeUp children */
export const motionStaggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/** Barrel export */
export const animationPresets = {
  gsap: gsapPresets,
  motion: {
    fadeUp:           motionFadeUp,
    fadeDown:         motionFadeDown,
    scaleIn:          motionScaleIn,
    slideIn:          motionSlideIn,
    slideRight:       motionSlideRight,
    staggerContainer: motionStaggerContainer,
  },
} as const;
