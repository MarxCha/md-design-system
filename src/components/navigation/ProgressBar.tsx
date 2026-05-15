"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface ProgressBarProps {
  sections: Section[];
  className?: string;
}

export function ProgressBar({ sections, className }: ProgressBarProps) {
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIdx = sections.findIndex((s) => s.id === activeId);

  return (
    <nav aria-label="Page progress" className={`flex flex-col gap-2 ${className ?? ""}`}>
      {sections.map(({ id, label }, i) => {
        const isActive = id === activeId;
        const isPast = i < activeIdx;

        return (
          <button
            key={id}
            type="button"
            onClick={() => navigateTo(id)}
            aria-label={`Navigate to ${label}`}
            aria-current={isActive ? "step" : undefined}
            className="flex items-center gap-3 group text-left"
          >
            {/* Dot / segment */}
            <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
              {isActive && (
                <motion.span
                  layoutId="progress-active-ring"
                  className="absolute inset-0 rounded-full border-2 border-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: isActive
                    ? "white"
                    : isPast
                    ? "rgb(255 255 255 / 0.5)"
                    : "rgb(255 255 255 / 0.2)",
                }}
              />
            </div>

            {/* Label */}
            <span
              className="text-xs font-medium transition-colors duration-200"
              style={{
                color: isActive
                  ? "white"
                  : isPast
                  ? "rgb(255 255 255 / 0.5)"
                  : "rgb(255 255 255 / 0.25)",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}

      {/* Progress line connector */}
      <div className="absolute left-2.5 -translate-x-1/2 top-0 w-px bg-white/10" aria-hidden="true" />
    </nav>
  );
}
