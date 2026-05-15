"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingNavProps {
  children: React.ReactNode;
  showAfter?: number;
  position?: "top" | "bottom";
  className?: string;
}

export function FloatingNav({
  children,
  showAfter = 100,
  position = "top",
  className,
}: FloatingNavProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > showAfter);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const variants = {
    top: {
      hidden: { y: "-120%", opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    bottom: {
      hidden: { y: "120%", opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
  };

  const positionClass =
    position === "top"
      ? "top-4 left-1/2 -translate-x-1/2"
      : "bottom-4 left-1/2 -translate-x-1/2";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="navigation"
          aria-label="Floating navigation"
          initial={variants[position].hidden}
          animate={variants[position].visible}
          exit={variants[position].hidden}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className={`fixed z-50 ${positionClass} ${className ?? ""}`}
        >
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 shadow-xl backdrop-blur-md">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
