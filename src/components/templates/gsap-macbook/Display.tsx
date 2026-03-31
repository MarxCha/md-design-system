"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Display = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading fade up
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      // Pin section + zoom into laptop screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: "+=200%",
        },
      });

      // Step 1: laptop scales up
      tl.to(laptopRef.current, {
        scale: 1.6,
        y: 40,
        ease: "power2.inOut",
        duration: 1,
      });

      // Step 2: screen gradient shifts as zoom completes
      tl.to(
        screenRef.current,
        {
          "--gm-screen-hue1": "260",
          "--gm-screen-hue2": "200",
          ease: "none",
          duration: 1,
        },
        "<"
      );

      // Parallax on heading during pin
      tl.to(
        headingRef.current,
        {
          opacity: 0,
          y: -60,
          ease: "power2.in",
          duration: 0.4,
        },
        0
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="display"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-24"
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="relative z-10 mb-16 text-center opacity-0"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
          Stunning visuals
        </p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white">
          Liquid Retina XDR display.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[clamp(1rem,2vw,1.2rem)] font-light text-gray-400">
          Over a billion colors. 1000 nits sustained brightness. ProMotion
          adaptive refresh up to 120Hz. This is what the future looks like.
        </p>
      </div>

      {/* CSS Laptop Mockup */}
      <div
        ref={laptopRef}
        className="gm-laptop-frame relative w-full max-w-3xl"
        aria-label="MacBook Pro display mockup"
      >
        {/* Screen lid */}
        <div className="relative mx-auto w-full max-w-2xl">
          {/* Outer bezel */}
          <div className="relative rounded-[14px] border-2 border-gray-700 bg-gray-950 p-[6px] shadow-[0_0_60px_rgba(0,120,255,0.15)]">
            {/* Camera notch */}
            <div className="absolute top-0 left-1/2 z-20 h-3.5 w-16 -translate-x-1/2 rounded-b-xl bg-gray-950" />

            {/* Screen area */}
            <div
              ref={screenRef}
              className="gm-laptop-screen relative overflow-hidden rounded-[8px]"
              style={{ aspectRatio: "16/10" }}
            >
              <div className="gm-screen-gradient absolute inset-0" />

              {/* Scanline overlay for depth */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
                }}
                aria-hidden="true"
              />

              {/* Fake UI on screen */}
              <div className="absolute inset-0 flex flex-col">
                {/* Menubar */}
                <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-1.5 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  <span className="h-2 w-2 rounded-full bg-green-400/70" />
                  <div className="ml-4 flex gap-4">
                    {["File", "Edit", "View"].map((m) => (
                      <span key={m} className="text-[9px] text-white/40">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Content area */}
                <div className="flex flex-1 gap-0">
                  {/* Sidebar */}
                  <div className="w-1/5 border-r border-white/10 bg-white/5 p-2">
                    {[70, 55, 80, 50, 65].map((w, i) => (
                      <div
                        key={i}
                        className="mb-2 h-1.5 rounded-sm bg-white/20"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                  {/* Main pane */}
                  <div className="flex-1 p-3">
                    <div className="mb-3 h-3 w-1/3 rounded bg-white/30" />
                    {[100, 85, 95, 70, 90, 80].map((w, i) => (
                      <div
                        key={i}
                        className="mb-2 h-1.5 rounded-sm bg-white/10"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Camera dot */}
          <div className="absolute top-2.5 left-1/2 z-30 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gray-700" />
        </div>

        {/* Hinge */}
        <div className="mx-auto h-1 w-[82%] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900" />

        {/* Base */}
        <div className="mx-auto w-full max-w-2xl rounded-b-xl rounded-t-sm bg-gradient-to-b from-gray-800 to-gray-900 px-8 pt-2 pb-4 shadow-xl">
          {/* Keyboard (simplified rows) */}
          <div className="flex flex-col items-center gap-1 opacity-30">
            {[88, 100, 96, 80].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded bg-gray-600"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          {/* Trackpad */}
          <div className="mx-auto mt-2 h-8 w-28 rounded-md border border-gray-700 bg-gray-800/50 sm:w-36" />
        </div>

        {/* Table reflection */}
        <div
          className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[80%] -translate-x-1/2 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Feature callouts below laptop */}
      <div className="relative z-10 mt-20 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
        {[
          { value: "1000", unit: "nits", label: "Peak brightness" },
          { value: "1M:1", unit: "", label: "Contrast ratio" },
          { value: "1B+", unit: "", label: "Colors displayed" },
          { value: "P3", unit: "", label: "Wide color gamut" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-white md:text-3xl">
              {stat.value}
              <span className="ml-1 text-base font-light text-gray-400">
                {stat.unit}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Display;
