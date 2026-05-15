"use client";

import type { QuoteSlide as QuoteSlideType } from "../../types";
import type { LayoutClasses } from "../layouts";

interface Props {
  slide: QuoteSlideType;
  classes: LayoutClasses;
}

export function QuoteSlideComponent({ slide, classes }: Props) {
  return (
    <div className={`${classes.contentBg} flex h-full flex-col items-center justify-center px-16`}>
      <div className={`${classes.accentBar} mb-8 h-1 w-16 rounded-full`} />

      <blockquote className="max-w-3xl text-center">
        <p className={`${classes.quoteText} text-3xl leading-relaxed`}>
          &ldquo;{slide.quote}&rdquo;
        </p>
      </blockquote>

      <div className="mt-8 text-center">
        <p className={`${classes.headingText} text-lg font-semibold`}>
          {slide.author}
        </p>
        {slide.role && (
          <p className={`${classes.quoteAuthor} mt-1 text-sm`}>
            {slide.role}
          </p>
        )}
      </div>
    </div>
  );
}
