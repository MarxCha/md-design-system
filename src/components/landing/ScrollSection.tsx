"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ScrollAnimation = "fade-up" | "fade-left" | "fade-right" | "scale" | "none";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: ScrollAnimation;
  delay?: number;
  fullHeight?: boolean;
  id?: string;
}

const variants: Record<ScrollAnimation, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export function ScrollSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  fullHeight = false,
  id,
}: ScrollSectionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced || animation === "none") {
    return (
      <section
        id={id}
        className={cn(fullHeight && "min-h-dvh", className)}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn(fullHeight && "min-h-dvh", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants[animation]}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.section>
  );
}
