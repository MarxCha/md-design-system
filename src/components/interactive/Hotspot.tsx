"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";

type AnimationType = "fadeIn" | "scaleIn" | "popIn";

interface HotspotProps {
  children: React.ReactNode;
  position: { x: string; y: string };
  size?: number;
  soundSrc?: string;
  animation?: AnimationType;
  pulseIndicator?: boolean;
  className?: string;
}

const animationVariants: Record<AnimationType, { initial: Record<string, number>; animate: Record<string, number>; exit: Record<string, number> }> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  popIn: {
    initial: { opacity: 0, scale: 0.5, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.5, y: 8 },
  },
};

export function Hotspot({
  children,
  position,
  size = 48,
  soundSrc,
  animation = "popIn",
  pulseIndicator = true,
  className,
}: HotspotProps) {
  const [revealed, setRevealed] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  const handleInteract = () => {
    if (soundSrc && !soundRef.current) {
      soundRef.current = new Howl({ src: [soundSrc], volume: 0.6 });
    }
    soundRef.current?.play();
    setRevealed((prev) => !prev);
  };

  const variant = animationVariants[animation];

  return (
    <div
      className="absolute"
      style={{ left: position.x, top: position.y }}
    >
      {/* Tap target */}
      <button
        type="button"
        aria-expanded={revealed}
        aria-label="Toggle hotspot content"
        onClick={handleInteract}
        className="relative flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
        style={{ width: size, height: size }}
      >
        {/* Pulse indicator */}
        {pulseIndicator && !revealed && (
          <>
            <span
              className="absolute inset-0 rounded-full bg-white/30 animate-ping"
              aria-hidden="true"
            />
            <span
              className="absolute inset-1 rounded-full bg-white/20"
              aria-hidden="true"
            />
          </>
        )}
        <span className="relative z-10 w-3 h-3 rounded-full bg-white/80 shadow" />
      </button>

      {/* Revealed content */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className={className}
            initial={variant.initial}
            animate={variant.animate}
            exit={variant.exit}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
