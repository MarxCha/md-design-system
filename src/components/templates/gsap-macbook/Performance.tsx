"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { performanceMetrics } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      // Horizontal scroll: pin section, translate track
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - track.offsetWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
          invalidateOnRefresh: true,
        },
      });

      // Background gradient shift on horizontal progress
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const hue = Math.round(220 + p * 60); // 220 (blue) → 280 (purple)
          const el = sectionRef.current;
          if (el) {
            el.style.background = `radial-gradient(ellipse at 50% 50%, hsl(${hue},60%,8%) 0%, #000 70%)`;
          }
        },
      });

      // Count-up for each metric card
      performanceMetrics.forEach((metric, i) => {
        const el = valueRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: metric.value,
              duration: 1.6,
              delay: i * 0.15,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.round(obj.val)}`;
              },
            });
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="relative w-full overflow-hidden bg-black"
      style={{ minHeight: "100vh" }}
    >
      {/* Section label + heading (stays fixed while pinned) */}
      <div
        ref={headingRef}
        className="relative z-10 px-6 pt-20 pb-12 text-center opacity-0"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
          Unprecedented performance
        </p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white">
          Numbers that{" "}
          <span className="gm-gradient-text">speak for themselves.</span>
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div className="w-full overflow-hidden px-6">
        <div
          ref={trackRef}
          className="gm-horizontal-track flex gap-6 will-change-transform"
          style={{ width: "max-content" }}
        >
          {/* Spacer left */}
          <div className="w-[calc(50vw-200px)] shrink-0" aria-hidden="true" />

          {performanceMetrics.map((metric, i) => (
            <div
              key={metric.label}
              className="gm-metric-card relative flex w-[280px] shrink-0 flex-col justify-between rounded-2xl border border-gray-800 bg-gray-900/80 p-10 backdrop-blur-md md:w-[340px]"
            >
              {/* Large value */}
              <div>
                <div className="flex items-end gap-2 leading-none">
                  <span
                    ref={(el) => { valueRefs.current[i] = el; }}
                    className="gm-metric-big tabular-nums text-[clamp(4rem,8vw,6rem)] font-bold text-white"
                  >
                    0
                  </span>
                  <span className="mb-3 text-2xl font-light text-gray-400">
                    {metric.unit}
                  </span>
                </div>
                <p className="mt-4 text-base font-light tracking-wide text-gray-400">
                  {metric.label}
                </p>
              </div>

              {/* Bottom index marker */}
              <div className="mt-8 flex items-center gap-2">
                <div className="h-[2px] flex-1 rounded bg-gradient-to-r from-blue-500/60 to-transparent" />
                <span className="text-xs text-gray-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}

          {/* Spacer right */}
          <div className="w-[calc(50vw-200px)] shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Performance;
