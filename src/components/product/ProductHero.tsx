"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";

interface ProductHeroProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundVariant?: "dark" | "light" | "gradient";
  children?: ReactNode;
  className?: string;
}

const BG_CLASSES: Record<"dark" | "light" | "gradient", string> = {
  dark: "bg-[#0a0a0a] text-white",
  light: "bg-background text-foreground",
  gradient: "bg-background text-foreground",
};

export function ProductHero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  backgroundVariant = "dark",
  children,
  className,
}: ProductHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      [titleRef, subtitleRef, ctaRef, labelRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const [{ gsap }, { SplitText }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(SplitText, ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Label fade in
        if (labelRef.current) {
          gsap.set(labelRef.current, { opacity: 0, y: 16 });
          tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0);
        }

        // Title split by word
        if (titleRef.current) {
          let split: import("gsap/SplitText").SplitText | null = null;
          try {
            split = new SplitText(titleRef.current, { type: "words" });
            gsap.set(split.words, { opacity: 0, y: 40 });
            tl.to(
              split.words,
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.05,
              },
              0.2
            );
          } catch {
            // SplitText may not be available — fallback
            gsap.set(titleRef.current, { opacity: 0, y: 40 });
            tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.2);
          }
        }

        // Subtitle
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, { opacity: 0, y: 24 });
          tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.5);
        }

        // CTA
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { opacity: 0, y: 20 });
          tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.8);
        }
      });
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [prefersReduced]);

  const isGradient = backgroundVariant === "gradient";

  return (
    <section
      className={`relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24 ${BG_CLASSES[backgroundVariant]} ${className ?? ""}`}
      style={
        isGradient
          ? {
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(213 51% 24% / 0.1) 0%, transparent 70%)",
            }
          : undefined
      }
    >
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        {/* Label */}
        <p
          ref={labelRef}
          className="text-xs font-semibold uppercase tracking-widest opacity-60"
          style={{ opacity: prefersReduced ? undefined : 0 }}
        >
          MD Consultor&iacute;a TI
        </p>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-5xl font-black leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl"
          style={{ opacity: prefersReduced ? undefined : 0 }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            ref={subtitleRef}
            className="max-w-lg text-lg leading-relaxed text-current opacity-60"
            style={{ opacity: prefersReduced ? undefined : 0 }}
          >
            {subtitle}
          </p>
        )}

        {/* Children slot */}
        {children && <div className="w-full">{children}</div>}

        {/* CTA */}
        {ctaLabel && ctaHref && (
          <div
            ref={ctaRef}
            style={{ opacity: prefersReduced ? undefined : 0 }}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div
          className="flex flex-col items-center gap-1 opacity-40"
          style={
            prefersReduced
              ? undefined
              : { animation: "md-bounce 2s ease-in-out infinite" }
          }
        >
          <span className="text-[10px] font-medium uppercase tracking-widest">
            Scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 3L8 13M8 13L4 9M8 13L12 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes md-bounce {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(8px) translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
