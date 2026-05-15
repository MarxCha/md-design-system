"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroContent } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(".co-hero-badge", { opacity: 0, y: 16 });
      gsap.set(".co-hero-title", { opacity: 0, y: 28 });
      gsap.set(".co-hero-subtitle", { opacity: 0, y: 20 });
      gsap.set(".co-hero-ctas", { opacity: 0, y: 16 });
      gsap.set(".co-hero-proof", { opacity: 0 });
      gsap.set(".co-hero-illustration", { opacity: 0, y: 40 });

      // Entrance sequence
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(".co-hero-badge", { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" })
        .to(".co-hero-title", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.3")
        .to(".co-hero-subtitle", { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.35")
        .to(".co-hero-ctas", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(".co-hero-proof", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .to(".co-hero-illustration", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3");
    },
    { scope: containerRef }
  );

  const titleLines = heroContent.title.split("\n");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#111827] pb-0 pt-24 sm:pt-32"
    >
      {/* Background radial glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="co-glow-orb co-glow-orb--indigo absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2" />
        <div className="co-glow-orb co-glow-orb--purple absolute right-0 top-0 h-[350px] w-[450px]" />
        <div className="co-glow-orb co-glow-orb--indigo absolute -left-20 top-1/2 h-[300px] w-[300px] opacity-40" />
      </div>

      {/* Grid dot background */}
      <div aria-hidden="true" className="co-grid-bg pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="co-hero-badge mb-6 flex justify-center">
          <span className="co-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
            <span className="co-pulse-dot" aria-hidden="true" />
            {heroContent.tagline}
          </span>
        </div>

        {/* Headline */}
        <h1 className="co-hero-title mx-auto max-w-3xl text-center text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {titleLines.map((line, i) =>
            i === 0 ? (
              <span key={i} className="block">
                {line}
              </span>
            ) : (
              <span key={i} className="co-gradient-text block">
                {line}
              </span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p className="co-hero-subtitle mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-slate-400 sm:text-xl">
          {heroContent.subtitle}
        </p>

        {/* CTAs */}
        <div className="co-hero-ctas mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="co-btn-primary w-full rounded-xl px-7 py-3.5 text-base font-semibold text-white sm:w-auto"
          >
            {heroContent.ctaPrimary}
          </button>
          <button
            type="button"
            className="co-btn-glass w-full rounded-xl px-7 py-3.5 text-base font-semibold sm:w-auto"
          >
            <span aria-hidden="true" className="mr-2">⭐</span>
            {heroContent.ctaSecondary}
          </button>
        </div>

        {/* Social proof */}
        <div className="co-hero-proof mt-5 flex justify-center">
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-amber-400">★</span>
              ))}
            </span>
            {heroContent.socialProof}
          </p>
        </div>

        {/* CSS App Illustration */}
        <div className="co-hero-illustration mx-auto mt-16 max-w-4xl">
          <div className="co-app-window overflow-hidden rounded-2xl">
            {/* Window chrome */}
            <div className="co-window-chrome flex items-center gap-2 px-4 py-3">
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-red-500/70" />
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-green-500/70" />
              <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white/5 px-3">
                <span className="text-xs text-slate-500">app.cruip.io/dashboard</span>
              </div>
            </div>

            {/* App body */}
            <div className="flex" style={{ minHeight: "320px" }}>
              {/* Sidebar */}
              <aside className="hidden w-48 flex-shrink-0 border-r border-white/5 bg-white/[0.03] p-4 sm:block">
                <div className="mb-6 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white"
                  >
                    C
                  </span>
                  <span className="text-sm font-semibold text-slate-300">Cruip</span>
                </div>
                <nav className="space-y-1" aria-label="App navigation">
                  {["Dashboard", "Workflows", "Integrations", "Analytics", "Settings"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                          i === 0
                            ? "bg-indigo-500/20 text-indigo-400"
                            : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                        }`}
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                        {item}
                      </div>
                    )
                  )}
                </nav>
              </aside>

              {/* Main content */}
              <div className="flex-1 overflow-hidden p-5">
                {/* KPI row */}
                <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    { label: "Active Users", value: "12.4K", trend: "+18%" },
                    { label: "Uptime", value: "99.98%", trend: "+0.2%" },
                    { label: "API Calls", value: "8.1M", trend: "+42%" },
                    { label: "Error Rate", value: "0.01%", trend: "-31%" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="co-kpi-card rounded-xl p-3"
                    >
                      <p className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">
                        {kpi.label}
                      </p>
                      <p className="text-sm font-bold text-white">{kpi.value}</p>
                      <p className="mt-0.5 text-xs font-medium text-emerald-400">{kpi.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="co-chart-card mb-4 rounded-xl p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-300">Request Volume</p>
                    <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400">
                      Last 7 days
                    </span>
                  </div>
                  <div className="flex h-20 items-end gap-1.5">
                    {[35, 58, 42, 72, 55, 88, 70].map((h, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full rounded-t-sm transition-all"
                          style={{
                            height: `${h}%`,
                            background:
                              i === 5
                                ? "linear-gradient(to top, #6366F1, #8B5CF6)"
                                : "rgba(99,102,241,0.2)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-1.5 flex justify-between">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span
                        key={i}
                        className="flex-1 text-center text-[10px] text-slate-600"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent activity */}
                <div className="co-chart-card rounded-xl p-4">
                  <p className="mb-3 text-xs font-semibold text-slate-300">Recent Workflows</p>
                  <div className="space-y-2">
                    {[
                      { name: "github → slack notify", status: "Running", time: "1m ago" },
                      { name: "stripe → crm sync", status: "Complete", time: "4m ago" },
                      { name: "daily digest email", status: "Complete", time: "8m ago" },
                    ].map((wf) => (
                      <div
                        key={wf.name}
                        className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-white/5"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full ${
                              wf.status === "Running" ? "bg-indigo-400" : "bg-emerald-400"
                            }`}
                          />
                          <span className="text-xs font-medium text-slate-300">{wf.name}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                              wf.status === "Running"
                                ? "bg-indigo-500/20 text-indigo-400"
                                : "bg-emerald-500/10 text-emerald-400"
                            }`}
                          >
                            {wf.status}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-600">{wf.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fade out to next section */}
          <div
            aria-hidden="true"
            className="h-20 w-full bg-gradient-to-b from-transparent to-[#111827]"
          />
        </div>
      </div>
    </section>
  );
}
