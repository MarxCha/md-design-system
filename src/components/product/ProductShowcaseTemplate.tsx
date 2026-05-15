"use client";

import type { ProductData } from "@/types/product";
import { ProductHero } from "@/components/product/ProductHero";
import { VideoScrubPlayer } from "@/components/product/VideoScrubPlayer";
import { FeatureCallout } from "@/components/product/FeatureCallout";
import { ProductSpecGrid } from "@/components/product/ProductSpecGrid";
import { ScrollPin } from "@/components/product/ScrollPin";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { ScrollProgress } from "@/components/scroll/ScrollProgress";
import { GradientText } from "@/components/effects/GradientText";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import Link from "next/link";

interface ProductShowcaseTemplateProps {
  product: ProductData;
  className?: string;
}

// Placeholder image used when no real image is provided
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%230a0a0a'/%3E%3Crect x='200' y='100' width='400' height='400' rx='32' fill='%231a1a2e' opacity='0.8'/%3E%3Ccircle cx='400' cy='300' r='80' fill='%23213d6b' opacity='0.6'/%3E%3C/svg%3E";

export function ProductShowcaseTemplate({
  product,
  className,
}: ProductShowcaseTemplateProps) {
  const {
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    backgroundVariant = "dark",
    videoSrc,
    posterSrc,
    features = [],
    specs = [],
  } = product;

  const featuresA = features.slice(0, 2);
  const featuresB = features.slice(2, 4);

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      {/* Fixed scroll progress bar */}
      <ScrollProgress position="top" />

      {/* Floating nav with product title */}
      <FloatingNav showAfter={80}>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
            MD Consultor&iacute;a TI
          </span>
          <span className="h-3 w-px bg-current opacity-20" aria-hidden="true" />
          <span className="font-display text-sm font-bold">Design System</span>
        </div>
      </FloatingNav>

      {/* 1. Hero */}
      <ProductHero
        title={title}
        subtitle={subtitle}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        backgroundVariant={backgroundVariant}
      />

      {/* 2. Video scrub (optional) */}
      {videoSrc && (
        <ScrollPin height="300vh">
          <VideoScrubPlayer
            src={videoSrc}
            poster={posterSrc}
            className="h-full w-full"
          />
        </ScrollPin>
      )}

      {/* 3. Feature callout A */}
      {featuresA.length > 0 && (
        <FeatureCallout
          image={PLACEHOLDER_IMAGE}
          imageAlt="Feature illustration"
          features={featuresA}
          height="300vh"
        />
      )}

      {/* 4. Feature callout B (reversed) */}
      {featuresB.length > 0 && (
        <FeatureCallout
          image={PLACEHOLDER_IMAGE}
          imageAlt="Feature illustration"
          features={featuresB}
          reverse={true}
          height="300vh"
        />
      )}

      {/* 5. Spec grid */}
      {specs.length > 0 && (
        <section className="w-full px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <RevealOnScroll animation="fadeUp" className="mb-12 text-center">
              <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
                Por los n&uacute;meros
              </h2>
            </RevealOnScroll>
            <ProductSpecGrid
              specs={specs}
              columns={4}
              className="mx-auto max-w-5xl"
            />
          </div>
        </section>
      )}

      {/* 6. Closing CTA */}
      <section className="w-full bg-[#0a0a0a] px-6 py-32 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <RevealOnScroll animation="fadeUp">
            <h2 className="font-display text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              <GradientText
                from="hsl(213 51% 65%)"
                via="hsl(160 84% 55%)"
                to="hsl(38 62% 70%)"
                animate
                as="span"
              >
                {title}
              </GradientText>
            </h2>
          </RevealOnScroll>

          {subtitle && (
            <RevealOnScroll animation="fadeUp" delay={0.1}>
              <p className="max-w-lg text-lg leading-relaxed text-white/60">
                {subtitle}
              </p>
            </RevealOnScroll>
          )}

          {ctaLabel && ctaHref && (
            <RevealOnScroll animation="fadeUp" delay={0.2}>
              <Link
                href={ctaHref}
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                {ctaLabel}
              </Link>
            </RevealOnScroll>
          )}

          <RevealOnScroll animation="fadeUp" delay={0.3}>
            <p className="text-xs font-medium uppercase tracking-widest text-white/30">
              Dise&ntilde;ado por MD Consultor&iacute;a TI
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
