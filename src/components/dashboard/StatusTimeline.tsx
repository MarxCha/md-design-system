"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Clock, Minus, type LucideIcon } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────

type PeriodStatus = "certificado" | "en_proceso" | "pendiente";

interface Period {
  label: string;
  subtitle?: string;
  status: PeriodStatus;
  tags?: string;
  active?: boolean;
}

interface StatusTimelineProps {
  periods: Period[];
  className?: string;
}

// ─── Status Config ──────────────────────────────────────────

const statusConfig: Record<
  PeriodStatus,
  {
    label: string;
    dotClass: string;
    lineClass: string;
    badgeClass: string;
    icon: LucideIcon;
  }
> = {
  certificado: {
    label: "Certificado",
    dotClass: "bg-emerald-500 shadow-[0_0_8px_hsl(160_84%_39%/0.5)]",
    lineClass: "bg-emerald-500/60",
    badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: Check,
  },
  en_proceso: {
    label: "En proceso",
    dotClass: "bg-amber-500 shadow-[0_0_8px_hsl(38_92%_50%/0.5)]",
    lineClass: "bg-amber-500/40",
    badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    icon: Clock,
  },
  pendiente: {
    label: "Pendiente",
    dotClass: "bg-[hsl(var(--muted-foreground))] opacity-50",
    lineClass: "bg-[hsl(var(--border))]",
    badgeClass:
      "bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]",
    icon: Minus,
  },
};

// ─── Component ──────────────────────────────────────────────

function StatusTimeline({ periods, className }: StatusTimelineProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex items-center justify-between">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-[hsl(var(--border))]" />

        {periods.map((period, i) => {
          const config = statusConfig[period.status];
          const Icon = config.icon;

          return (
            <div
              key={period.label}
              className="relative z-10 flex items-center gap-2"
              style={{ flex: 1, justifyContent: i === 0 ? "flex-start" : i === periods.length - 1 ? "flex-end" : "center" }}
            >
              {/* Dot */}
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  config.dotClass
                )}
              >
                <Icon className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              </div>

              {/* Label + badge inline */}
              <span className="font-display text-xs font-semibold text-[hsl(var(--foreground))]">
                {period.label}
              </span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider",
                  config.badgeClass
                )}
              >
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { StatusTimeline };
export type { StatusTimelineProps, Period, PeriodStatus };
