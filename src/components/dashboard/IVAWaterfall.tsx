"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────

interface IVAWaterfallProps {
  cobrado: number;
  pagado: number;
  className?: string;
  height?: number;
}

interface WaterfallDatum {
  name: string;
  value: number;
  displayValue: number;
  invisible: number;
  color: string;
}

// ─── Colors ─────────────────────────────────────────────────

const COLORS = {
  cobrado: "hsl(160 84% 39%)", // emerald — income
  pagado: "hsl(0 72% 51%)", // red — expense
  neto_positive: "hsl(160 84% 39%)", // emerald — a favor
  neto_negative: "hsl(25 80% 55%)", // orange — a cargo
} as const;

// ─── Formatter ──────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(value));
}

// ─── Custom Tooltip ─────────────────────────────────────────

function WaterfallTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: WaterfallDatum }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;

  return (
    <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
        {data.name}
      </p>
      <p
        className="font-display text-lg font-bold tabular-nums"
        style={{ color: data.color }}
      >
        {data.name === "IVA Pagado" ? "−" : ""}
        {formatCurrency(data.displayValue)}
      </p>
    </div>
  );
}

// ─── Custom Bar Label ───────────────────────────────────────

function BarLabel(props: {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  index?: number;
  data: WaterfallDatum[];
}) {
  const { x = 0, y = 0, width = 0, index = 0, data } = props;
  const datum = data[index];
  if (!datum) return null;

  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill={datum.color}
      textAnchor="middle"
      fontSize={13}
      fontWeight={700}
      fontFamily="var(--font-instrument-sans), sans-serif"
    >
      {datum.name === "IVA Pagado" ? "−" : ""}
      {formatCurrency(datum.displayValue)}
    </text>
  );
}

// ─── Component ──────────────────────────────────────────────

function IVAWaterfall({
  cobrado,
  pagado,
  className,
  height = 280,
}: IVAWaterfallProps) {
  const neto = cobrado - pagado;
  const isACargo = neto > 0;

  const data: WaterfallDatum[] = [
    {
      name: "IVA Cobrado",
      value: cobrado,
      displayValue: cobrado,
      invisible: 0,
      color: COLORS.cobrado,
    },
    {
      name: "IVA Pagado",
      value: -pagado,
      displayValue: pagado,
      invisible: Math.min(cobrado, cobrado - pagado),
      color: COLORS.pagado,
    },
    {
      name: "Saldo Neto",
      value: neto,
      displayValue: Math.abs(neto),
      invisible: 0,
      color: isACargo ? COLORS.neto_negative : COLORS.neto_positive,
    },
  ];

  // For the pagado bar, invisible = the base it sits on
  // Cobrado: full bar from 0
  // Pagado: drops from cobrado down by pagado amount
  // Neto: sits at 0 (result)
  data[1].invisible = neto > 0 ? neto : 0; // base of pagado bar

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Flujo IVA del Periodo
        </p>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
            isACargo
              ? "bg-orange-500/15 text-orange-400"
              : "bg-emerald-500/15 text-emerald-400"
          )}
        >
          {isACargo ? "A cargo" : "A favor"}
        </span>
      </div>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 28, right: 20, left: 20, bottom: 5 }}
            barCategoryGap="25%"
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
                fontWeight: 500,
              }}
            />
            <YAxis hide domain={[0, "auto"]} />
            <Tooltip
              content={<WaterfallTooltip />}
              cursor={false}
            />
            <ReferenceLine y={0} stroke="hsl(var(--border))" />

            {/* Invisible base */}
            <Bar
              dataKey="invisible"
              stackId="waterfall"
              fill="transparent"
              radius={0}
            />

            {/* Visible bar */}
            <Bar
              dataKey="displayValue"
              stackId="waterfall"
              radius={[6, 6, 0, 0]}
              label={<BarLabel data={data} />}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export { IVAWaterfall };
export type { IVAWaterfallProps };
