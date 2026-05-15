"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────

interface TouchAction {
  id: string;
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "ghost" | "secondary";
  disabled?: boolean;
}

interface TouchActionBarProps {
  actions: TouchAction[];
  /** Override visibility — default: only on mobile */
  visible?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────

function TouchActionBar({ actions, visible, className }: TouchActionBarProps) {
  const { isMobile } = useBreakpoint();
  const isVisible = visible ?? isMobile;

  return (
    <AnimatePresence>
      {isVisible && actions.length > 0 && (
        <motion.div
          data-slot="touch-action-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "fixed bottom-0 inset-x-0 z-40",
            "bg-background/80 backdrop-blur-sm border-t",
            "px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
            className
          )}
        >
          <div className="flex items-center gap-2 max-w-lg mx-auto">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant={action.variant ?? "default"}
                  disabled={action.disabled}
                  onClick={action.onClick}
                  className="flex-1 min-h-[44px] gap-2"
                >
                  {Icon && <Icon className="size-4" />}
                  {action.label}
                </Button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { TouchActionBar };
export type { TouchAction, TouchActionBarProps };
