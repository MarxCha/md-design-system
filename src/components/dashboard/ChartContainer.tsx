"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  className?: string;
  height?: number;
}

function ChartContainer({
  title,
  description,
  children,
  toolbar,
  className,
  height = 300,
}: ChartContainerProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {(title || description || toolbar) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {toolbar && <CardAction>{toolbar}</CardAction>}
        </CardHeader>
      )}

      <CardContent>
        <div
          className="w-full [&_.recharts-cartesian-axis-tick-value]:fill-muted-foreground [&_.recharts-cartesian-axis-tick-value]:text-xs [&_.recharts-cartesian-grid_line]:stroke-border [&_.recharts-tooltip-cursor]:fill-muted/20 [&_.recharts-legend-item-text]:!text-muted-foreground [&_.recharts-legend-item-text]:text-xs"
          style={{ height }}
        >
          <ResponsiveContainer width="100%" height="100%">
            {children as React.ReactElement}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export { ChartContainer };
export type { ChartContainerProps };
