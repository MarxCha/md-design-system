"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(".ec-section-label", { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: ".ec-section-label",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".ec-section-label", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
        },
      });

      gsap.set(".ec-cat-card", { opacity: 0, y: 28, scale: 0.97 });
      ScrollTrigger.create({
        trigger: ".ec-categories-row",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".ec-cat-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="categories"
      ref={containerRef}
      className="bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="ec-section-label mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
            Browse
          </p>
          <h2 className="ec-serif text-3xl font-bold text-stone-900 sm:text-4xl">
            Shop by Category
          </h2>
        </div>

        {/* Category cards row */}
        <div className="ec-categories-row grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#products"
              className="ec-cat-card group relative flex flex-col overflow-hidden rounded-2xl no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              aria-label={`Shop ${cat.name}`}
            >
              {/* Gradient background */}
              <div
                className="relative overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${cat.gradientFrom}, ${cat.gradientTo})`,
                  height: "200px",
                }}
              >
                {/* Decorative shapes */}
                <div
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30"
                  style={{ backgroundColor: cat.gradientFrom }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full opacity-20"
                  style={{ backgroundColor: cat.gradientTo }}
                  aria-hidden="true"
                />

                {/* Category initial as art element */}
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <span
                    className="ec-serif text-7xl font-bold leading-none opacity-20"
                    style={{ color: cat.accentColor }}
                  >
                    {cat.name.charAt(0)}
                  </span>
                </div>

                {/* Arrow on hover */}
                <div
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span style={{ color: cat.accentColor }} className="text-sm font-bold">→</span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-white px-5 py-4">
                <p className="font-semibold text-stone-900">{cat.name}</p>
                <p className="mt-0.5 text-sm text-stone-400">{cat.itemCount} items</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
