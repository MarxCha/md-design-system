"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Eye, Info, type LucideIcon } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────

type AlertSeverity = "urgente" | "revisar" | "info";

interface AlertItem {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  responsible?: string;
  impact?: string;
}

interface AlertFeedProps {
  alerts: AlertItem[];
  className?: string;
}

// ─── Severity Config ────────────────────────────────────────

const severityConfig: Record<
  AlertSeverity,
  {
    label: string;
    borderClass: string;
    labelClass: string;
    bgClass: string;
    icon: LucideIcon;
  }
> = {
  urgente: {
    label: "URGENTE",
    borderClass: "border-l-red-500",
    labelClass: "text-red-400",
    bgClass: "bg-red-500/5 hover:bg-red-500/10",
    icon: AlertTriangle,
  },
  revisar: {
    label: "REVISAR",
    borderClass: "border-l-amber-500",
    labelClass: "text-amber-400",
    bgClass: "bg-amber-500/5 hover:bg-amber-500/10",
    icon: Eye,
  },
  info: {
    label: "INFO",
    borderClass: "border-l-blue-400",
    labelClass: "text-blue-400",
    bgClass: "bg-blue-500/5 hover:bg-blue-500/10",
    icon: Info,
  },
};

// ─── Alert Row ──────────────────────────────────────────────

function AlertRow({ alert }: { alert: AlertItem }) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-lg border-l-[3px] px-4 py-3 transition-colors",
        config.borderClass,
        config.bgClass
      )}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={cn("mt-0.5 h-4 w-4 shrink-0", config.labelClass)}
          strokeWidth={2}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={cn("text-[10px] font-bold tracking-wider", config.labelClass)}
            >
              {config.label}
            </span>
          </div>

          <p className="mt-0.5 text-sm font-semibold text-[hsl(var(--foreground))]">
            {alert.title}
          </p>

          <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">
            {alert.description}
          </p>

          <div className="mt-2 flex items-center gap-3">
            {alert.impact && (
              <span className="text-xs font-medium text-[hsl(var(--foreground))]/80">
                {alert.impact}
              </span>
            )}
            {alert.responsible && (
              <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                Resp: {alert.responsible}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────

function AlertFeed({ alerts, className }: AlertFeedProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <p className="text-xs font-semibold text-[hsl(var(--foreground))]">
            Alertas Activas
          </p>
        </div>
        <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">
          {alerts.length} activas
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {alerts.map((alert) => (
          <AlertRow key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}

export { AlertFeed };
export type { AlertFeedProps, AlertItem, AlertSeverity };
