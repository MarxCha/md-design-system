"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── BentoGrid ───────────────────────────────────────────────

interface BentoGridProps {
  children: React.ReactNode;
  columns?: { sm?: number; md?: number; lg?: number };
  gap?: string;
  className?: string;
}

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

function gridCols(bp: "sm" | "md" | "lg", n: number): string {
  const cls = colsMap[n];
  if (!cls) return "";
  return bp === "sm" ? cls : `${bp}:${cls}`;
}

function BentoGrid({
  children,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = "gap-6",
  className,
}: BentoGridProps) {
  const gridClasses = [
    gridCols("sm", columns.sm ?? 1),
    gridCols("md", columns.md ?? 2),
    gridCols("lg", columns.lg ?? 3),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("grid auto-rows-min", gridClasses, gap, className)}>
      {children}
    </div>
  );
}

// ─── BentoCard ───────────────────────────────────────────────

interface BentoCardProps {
  children: React.ReactNode;
  colSpan?: { sm?: number; md?: number; lg?: number };
  rowSpan?: number;
  className?: string;
  glassmorphism?: boolean;
}

const spanMap: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
};

const rowSpanMap: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
};

function colSpanCls(bp: "sm" | "md" | "lg", n: number): string {
  const cls = spanMap[n];
  if (!cls) return "";
  return bp === "sm" ? cls : `${bp}:${cls}`;
}

function BentoCard({
  children,
  colSpan,
  rowSpan,
  className,
  glassmorphism = false,
}: BentoCardProps) {
  const spanClasses = colSpan
    ? [
        colSpan.sm ? colSpanCls("sm", colSpan.sm) : "",
        colSpan.md ? colSpanCls("md", colSpan.md) : "",
        colSpan.lg ? colSpanCls("lg", colSpan.lg) : "",
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  const rowCls = rowSpan ? rowSpanMap[rowSpan] ?? "" : "";

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        glassmorphism &&
          "backdrop-blur-xl bg-[hsl(var(--card))/0.8] border-[hsl(var(--border))/0.5]",
        spanClasses,
        rowCls,
        className
      )}
    >
      {children}
    </div>
  );
}

export { BentoGrid, BentoCard };
export type { BentoGridProps, BentoCardProps };
