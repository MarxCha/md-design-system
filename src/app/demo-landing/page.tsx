"use client";

import { Sparkles, Layers, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { LandingHero } from "@/components/landing/LandingHero";
import { ScrollSection } from "@/components/landing/ScrollSection";
import { HoloCard } from "@/components/landing/HoloCard";
import { CountUp, ScrambleText } from "@/components/landing/TextAnimations";
import { MagneticButton } from "@/components/landing/MagneticButton";

const features = [
  {
    icon: Sparkles,
    title: "Pixel-Perfect Components",
    description:
      "Every component is crafted with attention to spacing, typography, and color to deliver interfaces that feel intentional and polished.",
  },
  {
    icon: Layers,
    title: "Composable Architecture",
    description:
      "Build complex layouts from simple primitives. BentoGrid, StatCard, and ChartContainer snap together like building blocks.",
  },
  {
    icon: Zap,
    title: "Motion That Matters",
    description:
      "Scroll-driven animations, magnetic interactions, and holographic effects that enhance UX without overwhelming the user.",
  },
];

const stats = [
  { value: 42, suffix: "+", label: "Components" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Accessibility Score" },
  { value: 12, suffix: "K", label: "Lines of Code" },
];

export default function DemoLandingPage() {
  return (
    <div className="bg-[hsl(var(--foreground))] text-[hsl(var(--background))]">
      {/* Hero */}
      <LandingHero
        title="Build Extraordinary Interfaces"
        subtitle="A design system that refuses to be ordinary"
        description="Ship production-grade UIs with animated components, responsive layouts, and accessibility baked in. Built on Next.js 15, Tailwind CSS, Framer Motion, and shadcn/ui."
        cta={{ label: "Get Started", href: "#features" }}
        secondaryCta={{ label: "View Components", href: "#stats" }}
        badge="MD Design System v1"
        textAnimation="char-split"
      />

      {/* Feature Cards with HoloCard */}
      <ScrollSection
        id="features"
        animation="fade-up"
        className="px-6 py-24 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Why This System
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <HoloCard
                  key={feature.title}
                  className="border border-[hsl(var(--background)/0.1)] bg-[hsl(var(--background)/0.05)] p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--background)/0.1)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-70">
                    {feature.description}
                  </p>
                </HoloCard>
              );
            })}
          </div>
        </div>
      </ScrollSection>

      {/* CountUp Stats */}
      <ScrollSection
        id="stats"
        animation="fade-up"
        delay={0.1}
        className="px-6 py-24 lg:px-12"
      >
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                    duration={2000}
                  />
                </div>
                <p className="mt-2 text-base opacity-60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* ScrambleText Heading */}
      <ScrollSection
        animation="fade-up"
        delay={0.1}
        className="px-6 py-24 lg:px-12"
      >
        <div className="mx-auto max-w-3xl text-center">
          <ScrambleText
            text="DESIGNED FOR DEVELOPERS"
            tag="h2"
            className="font-display text-4xl font-bold tracking-widest sm:text-5xl"
            duration={1400}
          />
          <p className="mt-6 text-lg leading-relaxed opacity-60">
            Every component follows strict accessibility standards, ships with
            full TypeScript definitions, and integrates seamlessly with your
            existing Tailwind configuration.
          </p>
        </div>
      </ScrollSection>

      {/* MagneticButton Example */}
      <ScrollSection
        animation="scale"
        className="flex flex-col items-center gap-6 px-6 py-24 lg:px-12"
      >
        <p className="text-sm font-medium uppercase tracking-widest opacity-50">
          Magnetic Interaction
        </p>
        <MagneticButton
          className={cn(
            "rounded-[var(--radius-lg,12px)] px-10 py-4",
            "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
            "text-lg font-semibold shadow-2xl",
            "transition-colors duration-200 hover:bg-[hsl(var(--background)/0.9)]"
          )}
        >
          Hover & Drag Me
        </MagneticButton>
        <p className="max-w-md text-center text-sm leading-relaxed opacity-50">
          Move your cursor over the button to see it follow your mouse with a
          magnetic pull effect. Built with vanilla refs for maximum performance.
        </p>
      </ScrollSection>
    </div>
  );
}
