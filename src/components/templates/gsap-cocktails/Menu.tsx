"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cocktails } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const Menu = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(headingRef.current, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
      });

      // Stagger cards
      const cards = cardsRef.current?.querySelectorAll(".gc-cocktail-card");
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative px-6 py-24 md:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2
          ref={headingRef}
          className="gc-section-heading mb-4 text-center text-4xl font-bold md:text-5xl"
        >
          Signature Cocktails
        </h2>
        <p className="gc-body-text mx-auto mb-16 max-w-md text-center text-lg">
          Cada trago es una experiencia sensorial única
        </p>

        {/* Cocktail cards grid */}
        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {cocktails.map((cocktail, i) => (
            <button
              key={cocktail.name}
              type="button"
              className={`gc-cocktail-card group relative overflow-hidden rounded-2xl p-8 text-left transition-all ${
                active === i ? "gc-cocktail-active" : ""
              }`}
              onClick={() => setActive(i)}
              style={{ "--cocktail-color": cocktail.color } as React.CSSProperties}
            >
              {/* Color accent bar */}
              <div
                className="absolute left-0 top-0 h-full w-1 transition-all group-hover:w-2"
                style={{ backgroundColor: cocktail.color }}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between">
                <div className="flex-1 pl-4">
                  <h3 className="gc-cocktail-name mb-1 text-xl font-bold md:text-2xl">
                    {cocktail.name}
                  </h3>
                  <p className="gc-cocktail-spirit mb-3 text-sm uppercase tracking-wider">
                    {cocktail.spirit}
                  </p>
                  <p className="gc-cocktail-desc text-sm leading-relaxed">
                    {cocktail.description}
                  </p>
                </div>
                <span className="gc-cocktail-price ml-4 text-2xl font-bold">
                  {cocktail.price}
                </span>
              </div>

              {/* Decorative circle */}
              <div
                className="gc-cocktail-circle pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 transition-transform group-hover:scale-150"
                style={{ backgroundColor: cocktail.color }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
