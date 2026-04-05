"use client";

import type { ContentSlide as ContentSlideType } from "../../types";
import type { LayoutClasses } from "../layouts";

interface Props {
  slide: ContentSlideType;
  classes: LayoutClasses;
}

export function ContentSlideComponent({ slide, classes }: Props) {
  return (
    <div className={`${classes.contentBg} flex h-full flex-col justify-center px-16 py-12`}>
      {/* Accent bar + Title */}
      <div className="mb-10 flex items-center gap-4">
        <div className={`${classes.accentBar} h-8 w-1.5 rounded-full`} />
        <h2 className={`${classes.headingText} text-4xl`}>{slide.title}</h2>
      </div>

      {/* Bullets */}
      <ul className="max-w-3xl space-y-5 pl-6">
        {slide.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className={`${classes.bulletMarker} mt-1.5 text-lg font-bold leading-none`}>
              &#x25CF;
            </span>
            <span className={`${classes.bodyText} text-xl leading-relaxed`}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* Optional image */}
      {slide.image && (
        <div className="mt-10 overflow-hidden rounded-lg">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-auto max-h-64 w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
