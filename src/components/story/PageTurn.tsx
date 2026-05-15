"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface PageTurnProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}

export function PageTurn({
  children,
  direction = "right",
  duration = 0.6,
  className,
}: PageTurnProps) {
  const prefersReduced = useReducedMotion();

  const rotateY = direction === "right" ? -90 : 90;

  const variants = {
    enter: {
      rotateY: prefersReduced ? 0 : rotateY,
      opacity: prefersReduced ? 0 : 1,
    },
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: {
      rotateY: prefersReduced ? 0 : -rotateY,
      opacity: prefersReduced ? 0 : 1,
    },
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ""}`} style={{ perspective: 1200 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
