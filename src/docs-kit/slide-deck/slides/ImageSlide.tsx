"use client";

import type { ImageSlide as ImageSlideType } from "../../types";
import type { LayoutClasses } from "../layouts";

interface Props {
  slide: ImageSlideType;
  classes: LayoutClasses;
}

export function ImageSlideComponent({ slide, classes }: Props) {
  return (
    <div className={`${classes.contentBg} flex h-full flex-col items-center justify-center p-8`}>
      <div className="relative max-h-[80%] w-full max-w-5xl overflow-hidden rounded-lg">
        <img
          src={slide.src}
          alt={slide.alt}
          className={`h-full w-full ${slide.fit === "contain" ? "object-contain" : "object-cover"}`}
        />
      </div>
      {slide.caption && (
        <p className={`${classes.bodyText} mt-4 text-center text-sm`}>
          {slide.caption}
        </p>
      )}
    </div>
  );
}
