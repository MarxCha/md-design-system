"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  BarChart2,
  Layers,
  MousePointer2,
  Sparkles,
  LayoutGrid,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { BentoGrid, BentoCard } from "@/components/dashboard/BentoGrid";
import { GradientText } from "@/components/effects/GradientText";
import { GlassmorphismCard } from "@/components/effects/GlassmorphismCard";
import { HoloCard } from "@/components/landing/HoloCard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TextControl {
  type: "text";
  label: string;
  default: string;
}
interface BoolControl {
  type: "boolean";
  label: string;
  default: boolean;
}
interface SelectControl {
  type: "select";
  label: string;
  options: string[];
  default: string;
}
interface RangeControl {
  type: "range";
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}
interface ColorControl {
  type: "color";
  label: string;
  default: string;
}

type Control =
  | TextControl
  | BoolControl
  | SelectControl
  | RangeControl
  | ColorControl;

interface ComponentDef {
  id: string;
  name: string;
  category: string;
  controls: Record<string, Control>;
}

// ─── Icon map for StatCard selector ──────────────────────────────────────────

const ICON_OPTIONS = {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  ShoppingCart,
  Zap,
  BarChart2,
  Star,
} as const;

type IconName = keyof typeof ICON_OPTIONS;

// ─── Component registry ───────────────────────────────────────────────────────

const COMPONENTS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    category: "UI",
    controls: {
      children: { type: "text", label: "Label", default: "Click me" },
      variant: {
        type: "select",
        label: "Variant",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
        default: "default",
      },
      size: {
        type: "select",
        label: "Size",
        options: ["default", "sm", "lg", "icon"],
        default: "default",
      },
      disabled: { type: "boolean", label: "Disabled", default: false },
    },
  },
  {
    id: "badge",
    name: "Badge",
    category: "UI",
    controls: {
      children: { type: "text", label: "Text", default: "Badge" },
      variant: {
        type: "select",
        label: "Variant",
        options: ["default", "secondary", "destructive", "outline"],
        default: "default",
      },
    },
  },
  {
    id: "card",
    name: "Card",
    category: "UI",
    controls: {
      title: { type: "text", label: "Title", default: "Card Title" },
      description: {
        type: "text",
        label: "Description",
        default: "This is a card description with some supporting text.",
      },
      footer: { type: "text", label: "Footer text", default: "Card footer" },
      showFooter: { type: "boolean", label: "Show footer", default: true },
    },
  },
  {
    id: "stat-card",
    name: "StatCard",
    category: "Dashboard",
    controls: {
      label: { type: "text", label: "Label", default: "Total Revenue" },
      value: { type: "text", label: "Value", default: "$48,295" },
      trendValue: { type: "range", label: "Trend %", min: -50, max: 50, step: 1, default: 12 },
      trendLabel: { type: "text", label: "Trend label", default: "vs last month" },
      showTrend: { type: "boolean", label: "Show trend", default: true },
      icon: {
        type: "select",
        label: "Icon",
        options: ["none", ...Object.keys(ICON_OPTIONS)],
        default: "DollarSign",
      },
    },
  },
  {
    id: "bento-grid",
    name: "BentoGrid",
    category: "Dashboard",
    controls: {
      lgColumns: {
        type: "select",
        label: "Large columns",
        options: ["1", "2", "3", "4"],
        default: "3",
      },
      mdColumns: {
        type: "select",
        label: "Medium columns",
        options: ["1", "2", "3"],
        default: "2",
      },
      cardCount: {
        type: "range",
        label: "Number of cards",
        min: 1,
        max: 6,
        step: 1,
        default: 3,
      },
      glassmorphism: {
        type: "boolean",
        label: "Glassmorphism cards",
        default: false,
      },
    },
  },
  {
    id: "gradient-text",
    name: "GradientText",
    category: "Effects",
    controls: {
      children: { type: "text", label: "Text", default: "Gradient Headline" },
      from: { type: "color", label: "From color", default: "#a78bfa" },
      via: { type: "color", label: "Via color (optional)", default: "#f472b6" },
      to: { type: "color", label: "To color", default: "#38bdf8" },
      direction: {
        type: "select",
        label: "Direction",
        options: ["right", "left", "top", "bottom"],
        default: "right",
      },
      animate: { type: "boolean", label: "Animate", default: false },
      as: {
        type: "select",
        label: "HTML tag",
        options: ["span", "h1", "h2", "h3", "p"],
        default: "h2",
      },
    },
  },
  {
    id: "glassmorphism-card",
    name: "GlassmorphismCard",
    category: "Effects",
    controls: {
      content: {
        type: "text",
        label: "Content",
        default: "Glass card content goes here.",
      },
      blur: {
        type: "range",
        label: "Blur (px)",
        min: 0,
        max: 40,
        step: 2,
        default: 16,
      },
      opacity: {
        type: "range",
        label: "BG opacity",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.15,
      },
      borderOpacity: {
        type: "range",
        label: "Border opacity",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.2,
      },
    },
  },
  {
    id: "holo-card",
    name: "HoloCard",
    category: "Effects",
    controls: {
      content: {
        type: "text",
        label: "Content",
        default: "Hover me to see the holographic tilt effect.",
      },
      tiltAmount: {
        type: "range",
        label: "Tilt intensity",
        min: 0,
        max: 25,
        step: 1,
        default: 8,
      },
      glowColor: {
        type: "color",
        label: "Glow color",
        default: "#3b82f6",
      },
    },
  },
];

// ─── Category metadata ────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { icon: React.ReactNode; color: string }> = {
  UI: { icon: <MousePointer2 className="h-3.5 w-3.5" />, color: "text-blue-400" },
  Dashboard: { icon: <BarChart2 className="h-3.5 w-3.5" />, color: "text-emerald-400" },
  Effects: { icon: <Sparkles className="h-3.5 w-3.5" />, color: "text-violet-400" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDefaultProps(controls: ComponentDef["controls"]): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(controls).map(([key, ctrl]) => [key, ctrl.default])
  );
}

// ─── Live Renderer ───────────────────────────────────────────────────────────

function ComponentPreview({
  componentId,
  props,
}: {
  componentId: string;
  props: Record<string, unknown>;
}) {
  switch (componentId) {
    case "button":
      return (
        <Button
          type="button"
          variant={props.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"}
          size={props.size as "default" | "sm" | "lg" | "icon"}
          disabled={props.disabled as boolean}
        >
          {props.size === "icon" ? <Star className="h-4 w-4" /> : (props.children as string)}
        </Button>
      );

    case "badge":
      return (
        <Badge
          variant={props.variant as "default" | "secondary" | "destructive" | "outline"}
        >
          {props.children as string}
        </Badge>
      );

    case "card":
      return (
        <Card className="w-80">
          <CardHeader>
            <CardTitle>{props.title as string}</CardTitle>
            <CardDescription>{props.description as string}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card body content area. Add any components here.
            </p>
          </CardContent>
          {(props.showFooter as boolean) && (
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-muted-foreground">{props.footer as string}</p>
            </CardFooter>
          )}
        </Card>
      );

    case "stat-card": {
      const iconName = props.icon as string;
      const IconComponent = iconName !== "none" ? ICON_OPTIONS[iconName as IconName] : undefined;
      return (
        <StatCard
          label={props.label as string}
          value={props.value as string}
          icon={IconComponent}
          trend={
            props.showTrend
              ? {
                  value: props.trendValue as number,
                  label: props.trendLabel as string,
                }
              : undefined
          }
          className="w-72"
        />
      );
    }

    case "bento-grid": {
      const lgCols = parseInt(props.lgColumns as string);
      const mdCols = parseInt(props.mdColumns as string);
      const count = props.cardCount as number;
      const glass = props.glassmorphism as boolean;

      const DEMO_CONTENT = [
        { title: "Revenue", value: "$48k", color: "text-emerald-400" },
        { title: "Users", value: "1,204", color: "text-blue-400" },
        { title: "Uptime", value: "99.9%", color: "text-violet-400" },
        { title: "Requests", value: "3.2M", color: "text-amber-400" },
        { title: "Errors", value: "12", color: "text-red-400" },
        { title: "Latency", value: "42ms", color: "text-cyan-400" },
      ];

      return (
        <div className="w-full max-w-2xl">
          <BentoGrid columns={{ sm: 1, md: mdCols, lg: lgCols }} gap="gap-4">
            {DEMO_CONTENT.slice(0, count).map((item) => (
              <BentoCard key={item.title} glassmorphism={glass} className="min-h-[80px]">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">{item.title}</span>
                  <span className={`text-2xl font-bold font-display ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      );
    }

    case "gradient-text":
      return (
        <GradientText
          from={props.from as string}
          via={props.via as string}
          to={props.to as string}
          direction={props.direction as "left" | "right" | "top" | "bottom"}
          animate={props.animate as boolean}
          as={props.as as "h1" | "h2" | "h3" | "p" | "span"}
          className="text-4xl font-bold font-display"
        >
          {props.children as string}
        </GradientText>
      );

    case "glassmorphism-card":
      return (
        <div className="relative flex h-48 w-80 items-center justify-center rounded-xl overflow-hidden">
          {/* Colourful background so glass is visible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #1e3a5f 0%, #10b981 50%, #d4a853 100%)",
            }}
          />
          <div className="relative w-56">
            <GlassmorphismCard
              blur={props.blur as number}
              opacity={props.opacity as number}
              borderOpacity={props.borderOpacity as number}
              className="p-6"
            >
              <p className="text-sm font-medium text-white">{props.content as string}</p>
            </GlassmorphismCard>
          </div>
        </div>
      );

    case "holo-card":
      return (
        <HoloCard
          tiltAmount={props.tiltAmount as number}
          glowColor={props.glowColor as string}
          className="w-72 bg-card border border-border shadow-lg"
        >
          <div className="p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {props.content as string}
            </p>
          </div>
        </HoloCard>
      );

    default:
      return (
        <div className="text-sm text-muted-foreground">
          No renderer for component &quot;{componentId}&quot;
        </div>
      );
  }
}

// ─── Props Panel Controls ─────────────────────────────────────────────────────

interface ControlProps {
  id: string;
  control: Control;
  value: unknown;
  onChange: (val: unknown) => void;
}

function ControlRow({ id, control, value, onChange }: ControlProps) {
  const inputId = `ctrl-${id}`;

  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
      <label
        htmlFor={inputId}
        className="text-xs font-medium text-zinc-400 shrink-0 w-32"
      >
        {control.label}
      </label>

      <div className="flex-1 flex justify-end">
        {control.type === "text" && (
          <input
            id={inputId}
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="h-7 w-full max-w-[220px] rounded-md border border-white/10 bg-white/5 px-2.5 text-xs text-zinc-100 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-colors"
          />
        )}

        {control.type === "boolean" && (
          <button
            id={inputId}
            type="button"
            role="switch"
            aria-checked={value as boolean}
            onClick={() => onChange(!(value as boolean))}
            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
              value ? "bg-blue-500" : "bg-white/15"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                value ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
        )}

        {control.type === "select" && (
          <div className="relative">
            <select
              id={inputId}
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              className="h-7 appearance-none rounded-md border border-white/10 bg-white/5 pl-2.5 pr-7 text-xs text-zinc-100 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-colors cursor-pointer"
            >
              {(control as SelectControl).options.map((opt) => (
                <option key={opt} value={opt} className="bg-zinc-900">
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500" />
          </div>
        )}

        {control.type === "range" && (
          <div className="flex items-center gap-2.5 w-full max-w-[220px]">
            <input
              id={inputId}
              type="range"
              min={(control as RangeControl).min}
              max={(control as RangeControl).max}
              step={(control as RangeControl).step}
              value={value as number}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              className="flex-1 h-1.5 accent-blue-500 cursor-pointer"
            />
            <span className="w-10 text-right text-xs tabular-nums text-zinc-400">
              {(value as number).toFixed(
                (control as RangeControl).step < 1 ? 2 : 0
              )}
            </span>
          </div>
        )}

        {control.type === "color" && (
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-5 rounded-full border border-white/20 shadow-sm shrink-0"
              style={{ backgroundColor: value as string }}
            />
            <input
              id={inputId}
              type="color"
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              className="h-7 w-14 cursor-pointer rounded border border-white/10 bg-transparent p-0.5"
            />
            <span className="text-xs font-mono text-zinc-500 w-16">
              {value as string}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar Component Item ───────────────────────────────────────────────────

function SidebarItem({
  component,
  isActive,
  onClick,
}: {
  component: ComponentDef;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-md px-3 py-2 text-sm transition-colors ${
        isActive
          ? "bg-blue-500/15 text-blue-300 font-medium"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
      }`}
    >
      {component.name}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PropsPlaygroundPage() {
  const [selectedId, setSelectedId] = useState<string>("button");
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Per-component prop state — keyed by component id
  const [allProps, setAllProps] = useState<Record<string, Record<string, unknown>>>(
    () =>
      Object.fromEntries(
        COMPONENTS.map((c) => [c.id, getDefaultProps(c.controls)])
      )
  );

  const selectedComponent = COMPONENTS.find((c) => c.id === selectedId)!;
  const currentProps = allProps[selectedId];

  function setProp(key: string, value: unknown) {
    setAllProps((prev) => ({
      ...prev,
      [selectedId]: { ...prev[selectedId], [key]: value },
    }));
  }

  function resetProps() {
    setAllProps((prev) => ({
      ...prev,
      [selectedId]: getDefaultProps(selectedComponent.controls),
    }));
  }

  const filteredComponents = useMemo(() => {
    if (!search.trim()) return COMPONENTS;
    const q = search.toLowerCase();
    return COMPONENTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [search]);

  const groupedComponents = useMemo(() => {
    const groups: Record<string, ComponentDef[]> = {};
    for (const comp of filteredComponents) {
      if (!groups[comp.category]) groups[comp.category] = [];
      groups[comp.category].push(comp);
    }
    return groups;
  }, [filteredComponents]);

  return (
    <div className="dark min-h-dvh bg-zinc-950 text-zinc-100 flex flex-col">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 flex h-12 items-center gap-3 border-b border-white/8 bg-zinc-950/90 px-4 backdrop-blur-sm">
        <Link
          href="/playground"
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Playground
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="text-sm font-medium text-zinc-200">Props Playground</span>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-xs text-zinc-500">
            <LayoutGrid className="h-3 w-3" />
            {COMPONENTS.length} components
          </span>

          {/* Mobile: component selector */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="sm:hidden flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300"
          >
            {selectedComponent.name}
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden sm:flex w-60 shrink-0 flex-col border-r border-white/8 bg-zinc-950/60 overflow-y-auto">
          {/* Search */}
          <div className="p-3 border-b border-white/8">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
              <input
                type="search"
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full rounded-md border border-white/8 bg-white/4 pl-8 pr-3 text-xs text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors"
              />
            </div>
          </div>

          {/* Component groups */}
          <nav className="flex-1 p-2 space-y-4">
            {Object.entries(groupedComponents).map(([category, comps]) => {
              const meta = CATEGORY_META[category];
              return (
                <div key={category}>
                  <div
                    className={`flex items-center gap-1.5 px-3 pb-1 text-xs font-semibold uppercase tracking-widest ${meta?.color ?? "text-zinc-500"}`}
                  >
                    {meta?.icon}
                    {category}
                  </div>
                  {comps.map((comp) => (
                    <SidebarItem
                      key={comp.id}
                      component={comp}
                      isActive={comp.id === selectedId}
                      onClick={() => setSelectedId(comp.id)}
                    />
                  ))}
                </div>
              );
            })}
            {filteredComponents.length === 0 && (
              <p className="px-3 text-xs text-zinc-600 pt-2">No components match.</p>
            )}
          </nav>
        </aside>

        {/* ── Mobile dropdown ── */}
        {mobileMenuOpen && (
          <div className="sm:hidden absolute top-12 left-0 right-0 z-30 bg-zinc-900 border-b border-white/8 p-3 shadow-xl">
            <div className="grid grid-cols-2 gap-1">
              {COMPONENTS.map((comp) => (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(comp.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    comp.id === selectedId
                      ? "bg-blue-500/15 text-blue-300 font-medium"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  {comp.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <main className="flex flex-1 flex-col overflow-y-auto">
          {/* Component header */}
          <div className="border-b border-white/8 px-6 py-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-zinc-100 font-display">
                  {selectedComponent.name}
                </h1>
                <span
                  className={`text-xs font-medium ${CATEGORY_META[selectedComponent.category]?.color ?? "text-zinc-500"}`}
                >
                  {selectedComponent.category}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                {Object.keys(selectedComponent.controls).length} props available
              </p>
            </div>
            <button
              type="button"
              onClick={resetProps}
              className="rounded-md border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/8 hover:text-zinc-200 transition-colors"
            >
              Reset props
            </button>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 divide-y lg:divide-y-0 lg:divide-x divide-white/8">
            {/* Preview area */}
            <div className="flex flex-1 items-center justify-center p-10 min-h-[280px]">
              <div className="flex items-center justify-center">
                <ComponentPreview componentId={selectedId} props={currentProps} />
              </div>
            </div>

            {/* Props panel */}
            <aside className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col">
              <div className="border-b border-white/8 px-4 py-3 flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Props
                </span>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-2">
                {Object.entries(selectedComponent.controls).map(([key, control]) => (
                  <ControlRow
                    key={key}
                    id={`${selectedId}-${key}`}
                    control={control}
                    value={currentProps[key]}
                    onChange={(val) => setProp(key, val)}
                  />
                ))}
              </div>

              {/* Code snippet */}
              <div className="border-t border-white/8 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                    Current props
                  </span>
                </div>
                <pre className="overflow-x-auto rounded-md bg-black/40 p-3 text-xs text-zinc-400 font-mono leading-relaxed border border-white/5">
                  {JSON.stringify(currentProps, null, 2)}
                </pre>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
