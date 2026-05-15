"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type BoundingBox = { left: number; right: number; top: number; bottom: number };

interface DragDropProps {
  children: React.ReactNode;
  bounds?: "parent" | BoundingBox;
  onDragEnd?: (position: { x: number; y: number }) => void;
  snapBack?: boolean;
  className?: string;
}

export function DragDrop({
  children,
  bounds = "parent",
  onDragEnd,
  snapBack = false,
  className,
}: DragDropProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });

  const handleDragEnd = () => {
    const currentX = x.get();
    const currentY = y.get();
    onDragEnd?.({ x: currentX, y: currentY });
    if (snapBack) {
      x.set(0);
      y.set(0);
    }
  };

  const dragConstraints =
    bounds === "parent"
      ? constraintsRef
      : bounds;

  const motionProps = snapBack
    ? { style: { x: springX, y: springY } }
    : { style: { x, y } };

  return (
    <div ref={constraintsRef} className="relative w-full h-full">
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.04, cursor: "grabbing", zIndex: 50 }}
        whileHover={{ cursor: "grab" }}
        {...motionProps}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
