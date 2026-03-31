"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { specs } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const Specs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      // Heading
      gsap.set(headingRef.current, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 85%",
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

      // Divider line draw
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
      ScrollTrigger.create({
        trigger: dividerRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(dividerRef.current, {
            scaleX: 1,
            duration: 1,
            ease: "power2.inOut",
          });
        },
      });

      // Stagger reveal each spec item
      if (!gridRef.current) return;
      const items = gridRef.current.querySelectorAll(".gm-spec-item");

      gsap.set(items, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: {
              amount: 0.8,
              from: "start",
            },
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="relative w-full overflow-hidden bg-black px-6 py-24 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            Technical specifications
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white">
            Every detail{" "}
            <span className="gm-gradient-text">engineered to perfection.</span>
          </h2>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mb-16 h-[1px] w-full rounded bg-gradient-to-r from-gray-700 via-gray-500 to-transparent"
          aria-hidden="true"
        />

        {/* Specs grid */}
        <div ref={gridRef} className="gm-spec-grid">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="gm-spec-item group flex flex-col gap-2 rounded-xl border border-gray-800/60 bg-gray-900/40 p-6 transition-colors duration-300 hover:border-gray-700 hover:bg-gray-900/80"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                {spec.label}
              </span>
              <span className="text-lg font-semibold leading-snug text-white md:text-xl">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="mt-12 text-center text-xs leading-relaxed text-gray-600">
          All specifications subject to change. Battery life varies by use and
          configuration. Testing conducted by Apple in October 2023.
        </p>
      </div>
    </section>
  );
};

export default Specs;
