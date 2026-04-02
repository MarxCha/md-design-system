"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialProof } from "./constants";

gsap.registerPlugin(ScrollTrigger);

/** Animated counter that counts up to a target value */
function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const statItems = gsap.utils.toArray<HTMLElement>(".as-stat-item");

      gsap.set(".as-proof-heading", { opacity: 0, y: 20 });
      gsap.set(statItems, { opacity: 0, y: 24 });

      ScrollTrigger.create({
        trigger: ".as-proof-inner",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".as-proof-heading", {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          });
          gsap.to(statItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.15,
          });
        },
      });
    },
    { scope: containerRef }
  );

  // Parse stat values for CountUp — strip non-numeric suffixes
  const parseStatValue = (value: string) => {
    const match = value.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  const parseSuffix = (value: string) => value.replace(/^\d+/, "");

  return (
    <section ref={containerRef} className="as-proof-section py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="as-proof-inner overflow-hidden rounded-3xl as-proof-gradient px-8 py-16 sm:px-16">
          {/* Decorative blobs */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            {/* Heading */}
            <div className="as-proof-heading mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-200">
                Proven Results
              </p>
              <h2 className="mt-2 font-['Outfit',sans-serif] text-3xl font-extrabold text-white sm:text-4xl">
                Numbers that speak for themselves
              </h2>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {socialProof.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="as-stat-item text-center"
                >
                  <p className="font-['Outfit',sans-serif] text-4xl font-black text-white sm:text-5xl">
                    <CountUp
                      target={parseStatValue(stat.value)}
                      suffix={parseSuffix(stat.value)}
                    />
                  </p>
                  <p className="mt-2 text-sm font-medium text-orange-200">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
