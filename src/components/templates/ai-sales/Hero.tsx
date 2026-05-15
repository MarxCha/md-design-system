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
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      // Set initial states
      gsap.set(".as-hero-badge", { opacity: 0, y: 16 });
      gsap.set(".as-hero-title", { opacity: 0, y: 28 });
      gsap.set(".as-hero-subtitle", { opacity: 0, y: 20 });
      gsap.set(".as-hero-ctas", { opacity: 0, y: 16 });
      gsap.set(".as-hero-proof", { opacity: 0 });
      gsap.set(".as-hero-dashboard", { opacity: 0, y: 48, scale: 0.97 });

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".as-hero-badge", { opacity: 1, y: 0, duration: 0.55, delay: 0.2 })
        .to(".as-hero-title", { opacity: 1, y: 0, duration: 0.65 }, "-=0.3")
        .to(".as-hero-subtitle", { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
        .to(".as-hero-ctas", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(".as-hero-proof", { opacity: 1, duration: 0.4 }, "-=0.2")
        .to(
          ".as-hero-dashboard",
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  const titleLines = heroContent.title.split("\n");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white pb-0 pt-28 sm:pt-36"
    >
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-orange-50/60 blur-3xl" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-amber-50/50 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-[300px] w-[300px] rounded-full bg-orange-50/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="as-hero-badge mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-600 shadow-sm">
            <span
              className="as-pulse-dot h-2 w-2 rounded-full bg-orange-500"
              aria-hidden="true"
            />
            {heroContent.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="as-hero-title mx-auto max-w-3xl text-center font-['Outfit',sans-serif] text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          {titleLines.map((line, i) =>
            i === 0 ? (
              <span key={i} className="block">
                {line}
              </span>
            ) : (
              <span key={i} className="block text-orange-500">
                {line}
              </span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p className="as-hero-subtitle mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-slate-500 sm:text-xl">
          {heroContent.subtitle}
        </p>

        {/* CTAs */}
        <div className="as-hero-ctas mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="as-btn-primary w-full rounded-xl px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-orange-200/60 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 active:scale-95 sm:w-auto"
          >
            {heroContent.ctaPrimary}
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md active:scale-95 sm:w-auto"
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-500"
              aria-hidden="true"
            >
              ▶
            </span>
            {heroContent.ctaSecondary}
          </button>
        </div>

        {/* Social proof */}
        <div className="as-hero-proof mt-6 flex justify-center">
          <p className="text-sm text-slate-400">
            <span className="font-semibold text-slate-600">{heroContent.socialProof}</span>
          </p>
        </div>

        {/* AI Dashboard mock */}
        <div className="as-hero-dashboard mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-green-400" aria-hidden="true" />
              <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white px-3 border border-slate-200">
                <span className="text-xs text-slate-400">app.aisales.io/pipeline</span>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="flex" style={{ minHeight: "340px" }}>
              {/* Sidebar */}
              <aside className="hidden w-52 flex-shrink-0 border-r border-slate-100 bg-slate-50/80 p-4 sm:block">
                <div className="mb-6 flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white"
                    aria-hidden="true"
                  >
                    A
                  </span>
                  <span className="text-sm font-semibold text-slate-700">AISales</span>
                </div>
                <nav className="space-y-1" aria-label="Dashboard sidebar">
                  {["Pipeline", "Leads", "Outreach", "Analytics"].map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${
                        i === 0
                          ? "bg-orange-50 text-orange-600"
                          : "text-slate-500"
                      }`}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-current opacity-60"
                        aria-hidden="true"
                      />
                      {item}
                    </div>
                  ))}
                </nav>
                <div className="mt-6 space-y-2">
                  {["AI Coach", "Integrations", "Settings"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-400"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-current"
                        aria-hidden="true"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </aside>

              {/* Main content */}
              <main className="flex-1 overflow-hidden p-5">
                {/* KPI row */}
                <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    { label: "Hot Leads", value: "142", trend: "+18%" },
                    { label: "Emails Sent", value: "3,840", trend: "+34%" },
                    { label: "Meetings", value: "28", trend: "+12%" },
                    { label: "Revenue", value: "$94K", trend: "+47%" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                    >
                      <p className="mb-1 text-xs text-slate-400">{kpi.label}</p>
                      <p className="text-sm font-bold text-slate-800">{kpi.value}</p>
                      <p className="text-xs font-semibold text-emerald-500">{kpi.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Pipeline chart */}
                <div className="mb-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-700">
                      Deal Pipeline
                    </p>
                    <span className="rounded-md bg-orange-50 px-2 py-0.5 text-xs text-orange-600">
                      This Quarter
                    </span>
                  </div>
                  {/* Funnel bars */}
                  <div className="space-y-2">
                    {[
                      { stage: "Prospecting", value: 85, count: 142 },
                      { stage: "Qualified", value: 60, count: 96 },
                      { stage: "Proposal", value: 38, count: 54 },
                      { stage: "Closing", value: 20, count: 28 },
                    ].map((s) => (
                      <div key={s.stage} className="flex items-center gap-3">
                        <span className="w-20 shrink-0 text-[10px] text-slate-500">
                          {s.stage}
                        </span>
                        <div className="flex-1 rounded-full bg-slate-100" style={{ height: "8px" }}>
                          <div
                            className="h-full rounded-full bg-orange-400"
                            style={{ width: `${s.value}%` }}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="w-8 text-right text-[10px] font-semibold text-slate-700">
                          {s.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top leads */}
                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-700">
                      AI Lead Scores
                    </p>
                    <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                      AI
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Acme Corp", score: 94, status: "Hot" },
                      { name: "TechFlow Inc", score: 87, status: "Hot" },
                      { name: "DataPulse", score: 72, status: "Warm" },
                    ].map((lead) => (
                      <div
                        key={lead.name}
                        className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              lead.status === "Hot" ? "bg-orange-400" : "bg-amber-400"
                            }`}
                            aria-hidden="true"
                          />
                          <span className="text-xs font-medium text-slate-700">
                            {lead.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                              lead.status === "Hot"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {lead.status}
                          </span>
                          <span className="text-[10px] font-bold text-slate-700">
                            {lead.score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="h-24 w-full bg-gradient-to-b from-transparent to-white"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
