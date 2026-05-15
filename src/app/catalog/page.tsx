"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  type LucideIcon,
  Layers,
  Sparkles,
  ScrollText,
  Layers2,
  Wand2,
  MousePointerClick,
  Navigation,
  Music2,
  BookOpen,
  Box,
  Package,
  LayoutDashboard,
  BarChart3,
  Rocket,
  MonitorSmartphone,
  Film,
  AppWindow,
  Search,
  ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  name: string;
  demoRoute: string;
  components: string[];
  icon: LucideIcon;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "ui",
    name: "UI (shadcn)",
    demoRoute: "/playground",
    icon: Layers,
    description: "Primitivos accesibles basados en Radix UI y shadcn/ui.",
    components: [
      "Avatar",
      "Badge",
      "Button",
      "Card",
      "Command",
      "Dialog",
      "DropdownMenu",
      "Input",
      "Label",
      "Popover",
      "ScrollArea",
      "Select",
      "Separator",
      "Sheet",
      "Skeleton",
      "Sonner",
      "Switch",
      "Tabs",
      "Textarea",
      "Tooltip",
    ],
  },
  {
    id: "animation",
    name: "Animation",
    demoRoute: "/animation-lab",
    icon: Sparkles,
    description: "Componentes de entrada y salida animados con Framer Motion.",
    components: ["RevealOnScroll", "AnimatedText", "StaggerChildren"],
  },
  {
    id: "scroll",
    name: "Scroll",
    demoRoute: "/scroll-stories",
    icon: ScrollText,
    description: "Narrativa dirigida por scroll con escenas y progreso.",
    components: ["ScrollStoryContainer", "ScrollScene", "ScrollProgress"],
  },
  {
    id: "parallax",
    name: "Parallax",
    demoRoute: "/product-showcase",
    icon: Layers2,
    description: "Efecto de profundidad multicapa al hacer scroll.",
    components: ["ParallaxContainer", "ParallaxLayer"],
  },
  {
    id: "effects",
    name: "Effects",
    demoRoute: "/demo-landing",
    icon: Wand2,
    description: "Efectos visuales de alto impacto para hero sections.",
    components: ["ParticleBackground", "GlassmorphismCard", "GradientText"],
  },
  {
    id: "interactive",
    name: "Interactive",
    demoRoute: "/demo-landing",
    icon: MousePointerClick,
    description: "Interacciones táctiles, de arrastre y hotspots.",
    components: ["Hotspot", "TouchReveal", "DragDrop"],
  },
  {
    id: "navigation",
    name: "Navigation",
    demoRoute: "/playground",
    icon: Navigation,
    description: "Navegación flotante, scroll suave y barra de progreso.",
    components: ["FloatingNav", "ProgressBar", "SmoothScrollNav"],
  },
  {
    id: "audio",
    name: "Audio",
    demoRoute: "/scroll-stories",
    icon: Music2,
    description: "Reproductor de audio, narración y paisajes sonoros.",
    components: ["AudioPlayer", "NarrationSync", "SoundscapeProvider"],
  },
  {
    id: "story",
    name: "Story",
    demoRoute: "/scroll-stories",
    icon: BookOpen,
    description: "Lector de historias con vistas de escena y vuelta de página.",
    components: ["StoryReader", "SceneView", "PageTurn"],
  },
  {
    id: "three",
    name: "Three.js",
    demoRoute: "/product-showcase",
    icon: Box,
    description: "Escenas 3D y objetos flotantes con React Three Fiber.",
    components: ["Scene3D", "FloatingObject"],
  },
  {
    id: "product",
    name: "Product",
    demoRoute: "/product-showcase",
    icon: Package,
    description: "Template estilo Apple con scroll cinematográfico y video.",
    components: [
      "ScrollPin",
      "VideoScrubPlayer",
      "SplitTextReveal",
      "ImageMaskReveal",
      "FeatureCallout",
      "ProductSpecGrid",
      "ProductHero",
      "ProductShowcaseTemplate",
    ],
  },
  {
    id: "layout",
    name: "Layout",
    demoRoute: "/demo-sidebar",
    icon: AppWindow,
    description: "Shells de aplicación y sidebars responsivos.",
    components: ["AppShell", "AppSidebar"],
  },
  {
    id: "dashboard",
    name: "Dashboard",
    demoRoute: "/demo-dashboard",
    icon: BarChart3,
    description: "Grillas bento, KPIs, gráficas y feeds de alertas.",
    components: [
      "BentoGrid",
      "StatCard",
      "ChartContainer",
      "IVAWaterfall",
      "StatusTimeline",
      "AlertFeed",
    ],
  },
  {
    id: "landing",
    name: "Landing",
    demoRoute: "/demo-landing",
    icon: Rocket,
    description: "Secciones de alto impacto para landing pages.",
    components: [
      "HoloCard",
      "MagneticButton",
      "ScrollSection",
      "LandingHero",
      "TextAnimations",
    ],
  },
  {
    id: "responsive",
    name: "Responsive",
    demoRoute: "/demo-responsive",
    icon: MonitorSmartphone,
    description: "Primitivos adaptativos para móvil, tablet y desktop.",
    components: [
      "ResponsiveDialog",
      "FormGrid",
      "MobileFilterSheet",
      "ResponsiveTable",
      "TouchActionBar",
    ],
  },
  {
    id: "video",
    name: "Video",
    demoRoute: "/demo-video",
    icon: Film,
    description: "Composiciones Remotion para video programático de marca.",
    components: [
      "BrandReveal",
      "CTAEnd",
      "DeviceMockup",
      "FeatureShowcase",
      "ProductDemo",
      "TextHook",
      "VideoPlayer",
    ],
  },
  {
    id: "templates",
    name: "Templates",
    demoRoute: "/templates",
    icon: LayoutDashboard,
    description: "Plantillas completas de landing pages de producción.",
    components: [
      "iPhone 15 Pro",
      "GSAP MacBook",
      "GSAP Cocktails",
      "Zentry",
      "SaaS Starter",
      "AI Sales",
      "Astrowind",
      "Cruip Open",
      "Page UI",
    ],
  },
];

const TEMPLATE_ROUTES: Record<string, string> = {
  "iPhone 15 Pro": "/templates/iphone-15",
  "GSAP MacBook": "/templates/gsap-macbook",
  "GSAP Cocktails": "/templates/gsap-cocktails",
  Zentry: "/templates/zentry",
  "SaaS Starter": "/templates/saas-starter",
  "AI Sales": "/templates/ai-sales",
  Astrowind: "/templates/astrowind",
  "Cruip Open": "/templates/cruip-open",
  "Page UI": "/templates/page-ui",
};

const HOOKS = [
  "useAdaptiveQuality",
  "useAudioEngine",
  "useBreakpoint",
  "useParallax",
  "useReducedMotion",
  "useRevealOnScroll",
  "useScrollProgress",
  "useScrollTimeline",
  "useScrubProgress",
  "useSmoothScroll",
  "useVideoScrub",
  "useWordHighlight",
];

const TOTAL_COMPONENTS = CATEGORIES.reduce(
  (acc, cat) => acc + cat.components.length,
  0
);

// ─── Stat Bar ─────────────────────────────────────────────────────────────────

function StatBar() {
  const stats = [
    { label: "Componentes", value: TOTAL_COMPONENTS },
    { label: "Categorías", value: CATEGORIES.length },
    { label: "Templates", value: 9 },
    { label: "Hooks", value: HOOKS.length },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center"
        >
          <p className="text-3xl font-black tracking-tight text-white">
            {stat.value}
          </p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-white/50">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;
  const isTemplates = category.id === "templates";

  return (
    <div className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
            <Icon
              className="h-4 w-4 text-white/70"
              aria-hidden="true"
            />
          </div>
          <h2 className="font-display text-base font-bold text-white">
            {category.name}
          </h2>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-white/60">
          {category.components.length}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-xs leading-relaxed text-white/50">
        {category.description}
      </p>

      {/* Component list */}
      <ul
        className="mb-5 flex flex-wrap gap-1.5"
        aria-label={`Componentes de ${category.name}`}
      >
        {category.components.map((name) => (
          <li key={name}>
            {isTemplates ? (
              <Link
                href={TEMPLATE_ROUTES[name] ?? "/templates"}
                className="inline-block rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60 transition-colors duration-150 hover:border-white/25 hover:text-white/90"
              >
                {name}
              </Link>
            ) : (
              <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
                {name}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Footer link */}
      <div className="mt-auto">
        <Link
          href={category.demoRoute}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 transition-colors duration-150 group-hover:text-white/90"
        >
          View Demo
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CatalogPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.components.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main className="min-h-dvh bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Page header */}
        <header className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            MD Consultoría TI
          </p>
          <h1 className="mb-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
            Component Catalog
          </h1>
          <p className="max-w-lg text-base text-white/50">
            Todos los componentes, hooks y templates del design system en un
            solo lugar.
          </p>
        </header>

        {/* Stats */}
        <section aria-label="Estadísticas del design system" className="mb-10">
          <StatBar />
        </section>

        {/* Search */}
        <div className="mb-8">
          <label htmlFor="catalog-search" className="sr-only">
            Buscar componentes o categorías
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
              aria-hidden="true"
            />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar componentes, categorías…"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/10 sm:max-w-sm"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          {query && (
            <p className="mt-2 text-xs text-white/40">
              {filtered.length === 0
                ? "Sin resultados"
                : `${filtered.length} categor${filtered.length === 1 ? "ía" : "ías"} encontrada${filtered.length === 1 ? "" : "s"}`}
            </p>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <section
            aria-label="Categorías de componentes"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search
              className="mb-4 h-10 w-10 text-white/20"
              aria-hidden="true"
            />
            <p className="text-base font-semibold text-white/40">
              Sin resultados para &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-sm text-white/25">
              Intenta con otro término de búsqueda.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/50 transition-colors duration-150 hover:border-white/20 hover:text-white/80"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Hooks section */}
        <section aria-label="Hooks disponibles" className="mt-16">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="font-display text-lg font-bold text-white">Hooks</h2>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/60">
              {HOOKS.length}
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <ul className="flex flex-wrap gap-2">
              {HOOKS.map((hook) => (
                <li key={hook}>
                  <code className="rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-mono text-white/60">
                    {hook}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          <p className="text-xs text-white/25">
            MD Design System &mdash; Next.js 16 · TypeScript · Tailwind 4
          </p>
          <Link
            href="/"
            className="text-xs font-medium text-white/40 transition-colors duration-150 hover:text-white/70"
          >
            Volver al inicio
          </Link>
        </footer>

      </div>
    </main>
  );
}
