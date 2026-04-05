"use client";

import { useState, useCallback, useEffect } from "react";
import type { Slide, SlideDeckConfig } from "../types";
import { getLayout, type LayoutClasses } from "./layouts";
import {
  TitleSlideComponent,
  ContentSlideComponent,
  ImageSlideComponent,
  StatsSlideComponent,
  QuoteSlideComponent,
  CTASlideComponent,
} from "./slides";

// ─── Slide Renderer ────────────────────────────────────────────────────────

function renderSlide(slide: Slide, classes: LayoutClasses, logo?: string) {
  switch (slide.type) {
    case "title":
      return <TitleSlideComponent slide={slide} classes={classes} logo={logo} />;
    case "content":
      return <ContentSlideComponent slide={slide} classes={classes} />;
    case "image":
      return <ImageSlideComponent slide={slide} classes={classes} />;
    case "stats":
      return <StatsSlideComponent slide={slide} classes={classes} />;
    case "quote":
      return <QuoteSlideComponent slide={slide} classes={classes} />;
    case "cta":
      return <CTASlideComponent slide={slide} classes={classes} />;
    default:
      return null;
  }
}

// ─── Main Component ────────────────────────────────────────────────────────

interface SlideDeckProps {
  config: SlideDeckConfig;
}

export function SlideDeck({ config }: SlideDeckProps) {
  const [current, setCurrent] = useState(0);
  const classes = getLayout(config.layout);
  const total = config.slides.length;

  const goNext = useCallback(() => {
    setCurrent((prev) => Math.min(prev + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "Home") {
        e.preventDefault();
        setCurrent(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        setCurrent(total - 1);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, total]);

  return (
    <div
      className={`${classes.root} relative h-screen w-screen overflow-hidden select-none`}
      role="region"
      aria-label={`Presentation: ${config.title}`}
      aria-roledescription="slide deck"
    >
      {/* Slide content */}
      <div
        className="h-full w-full transition-opacity duration-300"
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${current + 1} of ${total}`}
      >
        {renderSlide(config.slides[current], classes, config.logo)}
      </div>

      {/* Bottom bar: nav dots + slide number + meta */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-4">
        {/* Author + date */}
        <div className={`${classes.slideNumber} text-xs`}>
          {config.author} &middot; {config.date}
        </div>

        {/* Navigation dots */}
        <div className="flex items-center gap-2">
          {config.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? `${classes.navDotActive} w-6`
                  : `${classes.navDot} w-2`
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide number */}
        <div className={`${classes.slideNumber} text-xs tabular-nums`}>
          {current + 1} / {total}
        </div>
      </div>

      {/* Click zones for navigation */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-0 h-full w-1/4 cursor-w-resize opacity-0"
        aria-label="Previous slide"
        disabled={current === 0}
      />
      <button
        onClick={goNext}
        className="absolute right-0 top-0 h-full w-1/4 cursor-e-resize opacity-0"
        aria-label="Next slide"
        disabled={current === total - 1}
      />
    </div>
  );
}
