"use client";

import type { TitleSlide as TitleSlideType } from "../../types";
import type { LayoutClasses } from "../layouts";

interface Props {
  slide: TitleSlideType;
  classes: LayoutClasses;
  logo?: string;
}

export function TitleSlideComponent({ slide, classes, logo }: Props) {
  return (
    <div className={`${classes.titleBg} flex h-full flex-col items-center justify-center px-16`}>
      {/* Accent bar */}
      <div className={`${classes.accentBar} mb-12 h-1 w-24 rounded-full`} />

      {logo && (
        <img
          src={logo}
          alt="Logo"
          className="mb-8 h-12 w-auto opacity-80"
        />
      )}

      <h1 className={`${classes.titleText} max-w-4xl text-center text-6xl leading-tight`}>
        {slide.title}
      </h1>

      {slide.subtitle && (
        <p className={`${classes.subtitleText} mt-6 max-w-2xl text-center text-xl`}>
          {slide.subtitle}
        </p>
      )}
    </div>
  );
}
