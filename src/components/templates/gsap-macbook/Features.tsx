"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      // Section heading fade up
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
        },
      });

      // Pin the features section and animate cards in sequence
      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -80 : 80;

        gsap.set(card, { opacity: 0, x: fromX, scale: 0.92 });
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            });
          },
        });

        // Counter animation for the value badge
        const valueEl = valueRefs.current[i];
        if (!valueEl) return;

        const raw = features[i].value;
        const numeric = parseFloat(raw);

        if (!isNaN(numeric)) {
          const suffix = raw.replace(String(numeric), "");
          const obj = { val: 0 };

          ScrollTrigger.create({
            trigger: card,
            start: "top 75%",
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: numeric,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  valueEl.textContent =
                    Number.isInteger(numeric)
                      ? `${Math.round(obj.val)}${suffix}`
                      : `${obj.val.toFixed(1)}${suffix}`;
                },
              });
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative w-full overflow-hidden bg-black px-6 py-24 md:py-36"
    >
      {/* Section label + heading */}
      <div ref={headingRef} className="mx-auto mb-20 max-w-4xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
          Built for the extraordinary
        </p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight text-white">
          Take performance to{" "}
          <span className="gm-gradient-text">the extreme.</span>
        </h2>
        <p className="mt-4 text-[clamp(1rem,2vw,1.2rem)] font-light text-gray-400">
          MacBook Pro with M3 Pro or M3 Max chip shatters what&apos;s possible
          in a pro laptop.
        </p>
      </div>

      {/* Feature cards grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="gm-feature-card group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-gray-600"
          >
            {/* Top: icon + value */}
            <div className="flex items-start justify-between">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 text-2xl"
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <div className="text-right">
                <span
                  ref={(el) => { valueRefs.current[i] = el; }}
                  className="gm-metric-value block text-3xl font-bold text-white tabular-nums"
                >
                  {feature.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                  {feature.valueLabel}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
