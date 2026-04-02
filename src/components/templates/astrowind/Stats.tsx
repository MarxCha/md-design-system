"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "./constants";

gsap.registerPlugin(ScrollTrigger);

/** Split a stat value into its numeric part and suffix (e.g. "132K+" -> ["132", "K+"]) */
function parseStatValue(value: string): { numeric: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { numeric: 0, suffix: value };
  return { numeric: parseFloat(match[1]), suffix: match[2] };
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const statEls = gsap.utils.toArray<HTMLElement>(".aw-stat-item");
      const countEls = gsap.utils.toArray<HTMLElement>(".aw-stat-count");

      gsap.set(".aw-stats-label", { opacity: 0, y: 16 });
      gsap.set(statEls, { opacity: 0, y: 24 });

      ScrollTrigger.create({
        trigger: ".aw-stats-label",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".aw-stats-label", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".aw-stats-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(statEls, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });

          // CountUp animation for each stat
          countEls.forEach((el) => {
            const raw = el.dataset.value ?? "";
            const { numeric, suffix } = parseStatValue(raw);
            gsap.to(
              { val: 0 },
              {
                val: numeric,
                duration: 1.8,
                ease: "power2.out",
                delay: 0.2,
                onUpdate: function () {
                  const current = this.targets()[0] as { val: number };
                  const display =
                    numeric % 1 === 0
                      ? Math.round(current.val).toString()
                      : current.val.toFixed(1);
                  el.textContent = display + suffix;
                },
              }
            );
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="aw-stats-section py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="aw-stats-label mx-auto mb-12 max-w-xl text-center">
          <span className="mb-3 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            By the numbers
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Trusted by developers worldwide
          </h2>
          <p className="mt-4 text-base text-blue-100 sm:text-lg">
            AstroWind is one of the most downloaded open-source templates in the ecosystem.
          </p>
        </div>

        <div className="aw-stats-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const { numeric, suffix } = parseStatValue(stat.value);
            return (
              <div
                key={stat.label}
                className="aw-stat-item flex flex-col items-center rounded-2xl bg-white/15 p-8 text-center backdrop-blur-sm"
              >
                <span
                  className="aw-stat-count text-5xl font-bold tracking-tight text-white sm:text-6xl"
                  data-value={stat.value}
                >
                  {/* Initial value — GSAP will overwrite on enter */}
                  {`${numeric}${suffix}`}
                </span>
                <span className="mt-2 text-sm font-medium uppercase tracking-widest text-blue-200">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
