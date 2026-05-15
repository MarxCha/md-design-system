"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * PageTransition — Agency-style page transitions for Next.js App Router
 *
 * Replaces Barba.js page transitions with framer-motion AnimatePresence.
 * Wrap your layout's {children} with this component.
 *
 * Usage in layout.tsx:
 * ```tsx
 * import { PageTransition } from "@/components/navigation";
 *
 * export default function Layout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <PageTransition preset="crossfade">
 *           {children}
 *         </PageTransition>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

type TransitionPreset =
  | "crossfade"
  | "slideUp"
  | "slideLeft"
  | "reveal"
  | "blur"
  | "none";

interface PageTransitionProps {
  children: ReactNode;
  /** Transition animation preset. Default "crossfade" */
  preset?: TransitionPreset;
  /** Duration in seconds. Default 0.4 */
  duration?: number;
  /** Additional className on the motion wrapper */
  className?: string;
}

const VARIANTS: Record<TransitionPreset, Variants> = {
  crossfade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  reveal: {
    initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
    exit: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
};

export function PageTransition({
  children,
  preset = "crossfade",
  duration = 0.4,
  className,
}: PageTransitionProps) {
  const pathname = usePathname();
  const variants = VARIANTS[preset];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={className}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
