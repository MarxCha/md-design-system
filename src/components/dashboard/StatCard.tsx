"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

type StatCardVariant = "default" | "compact" | "hero";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: { value: number; label?: string };
  description?: string;
  variant?: StatCardVariant;
  className?: string;
}

const variantStyles: Record<StatCardVariant, { card: string; icon: string; value: string }> = {
  default: {
    card: "",
    icon: "h-10 w-10",
    value: "text-2xl",
  },
  compact: {
    card: "py-0",
    icon: "h-8 w-8",
    value: "text-xl",
  },
  hero: {
    card: "col-span-2",
    icon: "h-12 w-12",
    value: "text-3xl",
  },
};

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  description,
  variant = "default",
  className,
}: StatCardProps) {
  const isPositive = trend ? trend.value >= 0 : undefined;
  const styles = variantStyles[variant];

  return (
    <Card className={cn("overflow-hidden", styles.card, className)}>
      <CardContent className="flex items-start gap-4">
        {Icon && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-lg bg-primary/10",
              styles.icon
            )}
          >
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          <span
            className={cn(
              "font-display font-bold tracking-tight",
              styles.value
            )}
          >
            {value}
          </span>

          {description && (
            <span className="text-xs text-muted-foreground">
              {description}
            </span>
          )}

          {trend && (
            <div className="flex items-center gap-1 text-xs">
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={cn(
                  "font-medium",
                  isPositive ? "text-emerald-500" : "text-red-500"
                )}
              >
                {isPositive ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-muted-foreground">{trend.label}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { StatCard };
export type { StatCardProps, StatCardVariant };
