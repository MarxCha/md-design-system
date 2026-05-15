"use client";

import type { StatsSlide as StatsSlideType } from "../../types";
import type { LayoutClasses } from "../layouts";

interface Props {
  slide: StatsSlideType;
  classes: LayoutClasses;
}

export function StatsSlideComponent({ slide, classes }: Props) {
  return (
    <div className={`${classes.contentBg} flex h-full flex-col items-center justify-center px-16`}>
      <div className="mb-10 flex items-center gap-4">
        <div className={`${classes.accentBar} h-8 w-1.5 rounded-full`} />
        <h2 className={`${classes.headingText} text-4xl`}>{slide.title}</h2>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-3 gap-8">
        {slide.stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-xl border border-current/10 p-8"
          >
            <span className={`${classes.statValue} text-5xl`}>
              {stat.value}
            </span>
            <span className={`${classes.statLabel} mt-3 text-lg`}>
              {stat.label}
            </span>
            {stat.delta && (
              <span className={`${classes.statDelta} mt-1 text-sm`}>
                {stat.delta}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
