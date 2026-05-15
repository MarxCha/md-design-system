"use client";

import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { BentoGrid, BentoCard } from "@/components/dashboard/BentoGrid";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { chartColors } from "@/components/dashboard/ChartPalette";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 18200 },
  { month: "Feb", revenue: 22400 },
  { month: "Mar", revenue: 29100 },
  { month: "Apr", revenue: 25800 },
  { month: "May", revenue: 38600 },
  { month: "Jun", revenue: 48200 },
];

const dauData = [
  { day: "Mon", users: 1820 },
  { day: "Tue", users: 2140 },
  { day: "Wed", users: 2380 },
  { day: "Thu", users: 2050 },
  { day: "Fri", users: 2670 },
  { day: "Sat", users: 1940 },
  { day: "Sun", users: 1580 },
];

export default function DemoDashboardPage() {
  return (
    <div className="min-h-dvh bg-[hsl(var(--background))] px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Dashboard Components
          </h1>
          <p className="mt-3 text-lg text-[hsl(var(--muted-foreground))]">
            StatCard, BentoGrid, BentoCard, and ChartContainer working together
            to build data-rich dashboard layouts.
          </p>
        </header>

        {/* Stat Cards Row */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">
            StatCards
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Revenue"
              value="$48.2K"
              icon={DollarSign}
              trend={{ value: 12.5, label: "vs last month" }}
            />
            <StatCard
              label="Users"
              value="2,847"
              icon={Users}
              trend={{ value: 8.1, label: "vs last month" }}
            />
            <StatCard
              label="Orders"
              value="1,234"
              icon={ShoppingCart}
              trend={{ value: -2.3, label: "vs last month" }}
            />
            <StatCard
              label="Conversion"
              value="3.2%"
              icon={TrendingUp}
              trend={{ value: 0.8, label: "vs last month" }}
            />
          </div>
        </section>

        {/* Bento Grid with Charts */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">
            BentoGrid with Charts
          </h2>
          <BentoGrid columns={{ sm: 1, md: 2, lg: 3 }}>
            <BentoCard>
              <ChartContainer
                title="Monthly Revenue"
                description="Revenue trend over the last 6 months"
                height={260}
              >
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="revenue"
                    fill={chartColors.chart1}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </BentoCard>

            <BentoCard>
              <ChartContainer
                title="Daily Active Users"
                description="User activity across the week"
                height={260}
              >
                <LineChart data={dauData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke={chartColors.chart3}
                    strokeWidth={2}
                    dot={{ fill: chartColors.chart3, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </BentoCard>

            <BentoCard glassmorphism>
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <h3 className="mb-2 font-display text-lg font-semibold tracking-tight">
                    System Status
                  </h3>
                  <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    All services are running normally. Uptime at 99.98% over the
                    past 30 days with zero critical incidents reported.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "API Server", status: "Operational" },
                    { label: "Database", status: "Operational" },
                    { label: "CDN", status: "Operational" },
                  ].map((service) => (
                    <div
                      key={service.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-[hsl(var(--muted-foreground))]">
                        {service.label}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </BentoGrid>
        </section>
      </div>
    </div>
  );
}
