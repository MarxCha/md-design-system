"use client";

import type { CTASlide as CTASlideType } from "../../types";
import type { LayoutClasses } from "../layouts";

interface Props {
  slide: CTASlideType;
  classes: LayoutClasses;
}

export function CTASlideComponent({ slide, classes }: Props) {
  return (
    <div className={`${classes.ctaBg} flex h-full flex-col items-center justify-center px-16`}>
      <div className={`${classes.accentBar} mb-12 h-1 w-24 rounded-full`} />

      <h2 className={`${classes.titleText} max-w-3xl text-center text-5xl leading-tight`}>
        {slide.title}
      </h2>

      {slide.subtitle && (
        <p className={`${classes.subtitleText} mt-6 max-w-xl text-center text-xl`}>
          {slide.subtitle}
        </p>
      )}

      {slide.buttonText && (
        <a
          href={slide.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`${classes.ctaButton} mt-10 inline-block rounded-lg px-8 py-4 text-lg transition-colors`}
        >
          {slide.buttonText}
        </a>
      )}
    </div>
  );
}
