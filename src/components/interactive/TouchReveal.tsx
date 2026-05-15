"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type RevealAnimation = "fadeIn" | "blur" | "wipe";

interface TouchRevealProps {
  children: React.ReactNode;
  holdDuration?: number;
  revealAnimation?: RevealAnimation;
  className?: string;
}

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const revealVariants: Record<RevealAnimation, { initial: Record<string, string | number>; animate: Record<string, string | number> }> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(12px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
  wipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
  },
};

export function TouchReveal({
  children,
  holdDuration = 800,
  revealAnimation = "fadeIn",
  className,
}: TouchRevealProps) {
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReduced = useReducedMotion();

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startHold = useCallback(() => {
    if (revealed) return;
    const step = 16; // ~60fps
    const increment = (step / holdDuration) * 100;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearTimer();
          setRevealed(true);
          return 100;
        }
        return next;
      });
    }, step);
  }, [holdDuration, revealed, clearTimer]);

  const cancelHold = useCallback(() => {
    clearTimer();
    setProgress(0);
  }, [clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
  const variant = revealVariants[revealAnimation];

  if (revealed) {
    return (
      <AnimatePresence>
        <motion.div
          className={className}
          initial={prefersReduced ? {} : variant.initial}
          animate={variant.animate}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className ?? ""}`}
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      onTouchCancel={cancelHold}
      role="button"
      aria-label="Hold to reveal content"
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && startHold()}
      onKeyUp={cancelHold}
    >
      <svg
        width={56}
        height={56}
        viewBox="0 0 56 56"
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={28}
          cy={28}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth={3}
        />
        {/* Progress */}
        <circle
          cx={28}
          cy={28}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.8}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 16ms linear" }}
        />
      </svg>
      <span className="absolute text-xs font-medium select-none pointer-events-none">
        Hold
      </span>
    </div>
  );
}
