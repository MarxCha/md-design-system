"use client";

import {
  LayoutDashboard,
  BarChart3,
  Settings,
  FileText,
  Image,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/layout/AppShell";
import type { NavGroup } from "@/components/layout/AppSidebar";

const sidebarGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/demo-sidebar", icon: LayoutDashboard },
      { label: "Analytics", href: "/demo-sidebar/analytics", icon: BarChart3 },
      { label: "Settings", href: "/demo-sidebar/settings", icon: Settings },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Pages", href: "/demo-sidebar/pages", icon: FileText },
      { label: "Media", href: "/demo-sidebar/media", icon: Image },
      { label: "Users", href: "/demo-sidebar/users", icon: Users },
    ],
  },
];

const features = [
  {
    title: "Collapsible Rail",
    description:
      "The sidebar starts as a narrow 64px rail on desktop and expands to 256px on hover, preserving screen real estate while keeping navigation accessible.",
  },
  {
    title: "Animated Active Indicator",
    description:
      "A spring-animated highlight follows the active route using Framer Motion layoutId, providing smooth visual feedback as users navigate between sections.",
  },
  {
    title: "Grouped Navigation",
    description:
      "Navigation items are organized into labeled groups with uppercase section headers. Groups collapse to icon-only when the rail is narrow.",
  },
  {
    title: "Mobile Sheet Overlay",
    description:
      "On screens below 768px, the sidebar transforms into a slide-out Sheet component with a hamburger trigger, following responsive design best practices.",
  },
  {
    title: "Tooltip Fallback",
    description:
      "When the sidebar is collapsed, each nav item displays a tooltip on hover so users can still identify destinations without expanding the rail.",
  },
  {
    title: "Customizable Header & Footer",
    description:
      "The sidebar accepts optional logo, title, subtitle, and footer slots, making it adaptable to any brand or layout requirement.",
  },
];

export default function DemoSidebarPage() {
  return (
    <AppShell
      sidebar={{
        groups: sidebarGroups,
        logo: (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
            <Zap className="h-4 w-4 text-[hsl(var(--primary-foreground))]" />
          </div>
        ),
        title: "MD Design",
        subtitle: "Design System v1",
      }}
    >
      <div className="px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <header className="mb-12">
            <h1 className="font-display text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              AppSidebar + AppShell
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              A collapsible sidebar navigation system with hover-to-expand
              behavior, mobile sheet overlay, and animated active indicators.
              Hover the left rail to see it expand.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className={cn(
                    "rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6",
                    "shadow-sm transition-shadow duration-200 hover:shadow-md"
                  )}
                >
                  <h3 className="mb-2 text-base font-semibold text-[hsl(var(--foreground))]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Usage
            </h2>
            <div
              className={cn(
                "rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-6"
              )}
            >
              <pre className="overflow-x-auto text-sm leading-relaxed text-[hsl(var(--foreground))]">
                <code>{`<AppShell
  sidebar={{
    groups: [
      {
        label: "Overview",
        items: [
          { label: "Dashboard", href: "/", icon: LayoutDashboard },
          { label: "Analytics", href: "/analytics", icon: BarChart3 },
        ],
      },
    ],
    logo: <YourLogo />,
    title: "App Name",
    subtitle: "v1.0",
  }}
>
  <main>{/* your content */}</main>
</AppShell>`}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
