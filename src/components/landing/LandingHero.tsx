"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CharSplit, BlurReveal } from "./TextAnimations";
import { MagneticButton } from "./MagneticButton";

type TextAnimation = "char-split" | "scramble" | "blur" | "none";

interface LandingHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badge?: string;
  className?: string;
  children?: React.ReactNode;
  textAnimation?: TextAnimation;
}

export function LandingHero({
  title,
  subtitle,
  description,
  cta,
  secondaryCta,
  badge,
  className,
  children,
  textAnimation = "char-split",
}: LandingHeroProps) {
  const prefersReduced = useReducedMotion();

  const renderTitle = () => {
    if (prefersReduced || textAnimation === "none") {
      return (
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {title}
        </h1>
      );
    }

    switch (textAnimation) {
      case "char-split":
        return (
          <CharSplit
            text={title}
            tag="h1"
            className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          />
        );
      case "scramble":
        return (
          <ScrambleTitle title={title} />
        );
      case "blur":
        return (
          <BlurReveal>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>
          </BlurReveal>
        );
      default:
        return (
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        );
    }
  };

  return (
    <section
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center px-6 text-center",
        className
      )}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
        {badge && (
          <BlurReveal delay={0.1}>
            <span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-1.5 text-sm font-medium text-[hsl(var(--muted-foreground))]">
              {badge}
            </span>
          </BlurReveal>
        )}

        {renderTitle()}

        {subtitle && (
          <BlurReveal delay={0.3}>
            <p className="text-xl font-medium text-[hsl(var(--muted-foreground))] sm:text-2xl">
              {subtitle}
            </p>
          </BlurReveal>
        )}

        {description && (
          <BlurReveal delay={0.5}>
            <p className="max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-lg">
              {description}
            </p>
          </BlurReveal>
        )}

        {(cta || secondaryCta) && (
          <BlurReveal delay={0.7}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {cta && (
                <MagneticButton
                  className="rounded-[var(--radius-lg,12px)] bg-[hsl(var(--primary))] px-8 py-3 text-base font-semibold text-[hsl(var(--primary-foreground))] shadow-lg transition-colors hover:bg-[hsl(var(--primary)/0.9)]"
                  onClick={() => {
                    window.location.href = cta.href;
                  }}
                >
                  {cta.label}
                </MagneticButton>
              )}
              {secondaryCta && (
                <MagneticButton
                  className="rounded-[var(--radius-lg,12px)] border border-[hsl(var(--border))] bg-transparent px-8 py-3 text-base font-semibold text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--muted))]"
                  onClick={() => {
                    window.location.href = secondaryCta.href;
                  }}
                >
                  {secondaryCta.label}
                </MagneticButton>
              )}
            </div>
          </BlurReveal>
        )}

        {children && (
          <BlurReveal delay={0.9}>
            {children}
          </BlurReveal>
        )}
      </div>
    </section>
  );
}

/* Lazy-loaded scramble variant to avoid importing ScrambleText in the main bundle when unused */
function ScrambleTitle({ title }: { title: string }) {
  // Import dynamically to keep tree-shakeable
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ScrambleText } = require("./TextAnimations");
  return (
    <ScrambleText
      text={title}
      tag="h1"
      className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
    />
  );
}
