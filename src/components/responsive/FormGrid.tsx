"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Grid Column Helpers (same pattern as BentoGrid) ─────

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const spanMap: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

function gridCols(bp: "sm" | "md" | "lg", n: number): string {
  const cls = colsMap[n];
  if (!cls) return "";
  return bp === "sm" ? cls : `${bp}:${cls}`;
}

function colSpanCls(bp: "sm" | "md" | "lg", n: number): string {
  const cls = spanMap[n];
  if (!cls) return "";
  return bp === "sm" ? cls : `${bp}:${cls}`;
}

// ─── FormGrid ─────────────────────────────────────────────

interface FormGridProps {
  children: React.ReactNode;
  columns?: { sm?: number; md?: number; lg?: number };
  gap?: string;
  className?: string;
}

function FormGrid({
  children,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = "gap-4",
  className,
}: FormGridProps) {
  const gridClasses = [
    gridCols("sm", columns.sm ?? 1),
    gridCols("md", columns.md ?? 2),
    gridCols("lg", columns.lg ?? 3),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-slot="form-grid"
      className={cn("grid items-start", gridClasses, gap, className)}
    >
      {children}
    </div>
  );
}

// ─── FormField ────────────────────────────────────────────

interface FormFieldProps {
  children: React.ReactNode;
  span?: { sm?: number; md?: number; lg?: number };
  className?: string;
}

function FormField({ children, span, className }: FormFieldProps) {
  const spanClasses = span
    ? [
        span.sm ? colSpanCls("sm", span.sm) : "",
        span.md ? colSpanCls("md", span.md) : "",
        span.lg ? colSpanCls("lg", span.lg) : "",
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <div
      data-slot="form-field"
      className={cn("flex flex-col gap-2", spanClasses, className)}
    >
      {children}
    </div>
  );
}

export { FormGrid, FormField };
export type { FormGridProps, FormFieldProps };
