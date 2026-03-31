"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroContent } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 16,
        duration: 0.6,
      })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
          },
          "-=0.3"
        )
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-ctas",
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
          },
          "-=0.35"
        )
        .from(
          ".hero-dashboard",
          {
            opacity: 0,
            y: 40,
            scale: 0.97,
            duration: 0.9,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  const titleLines = heroContent.title.split("\n");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#FAFAFA] pb-0 pt-20 sm:pt-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-cyan-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="hero-badge mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm">
            <span className="ss-pulse-dot h-2 w-2 rounded-full bg-indigo-500" />
            {heroContent.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-title mx-auto max-w-3xl text-center text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          {titleLines.map((line, i) =>
            i === 0 ? (
              <span key={i} className="block">
                {line}
              </span>
            ) : (
              <span key={i} className="ss-gradient-text block">
                {line}
              </span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-slate-500 sm:text-xl">
          {heroContent.subtitle}
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button className="ss-btn-primary w-full rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-indigo-200/60 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:scale-95 sm:w-auto">
            {heroContent.ctaPrimary}
          </button>
          <button className="w-full rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md active:scale-95 sm:w-auto">
            <span className="mr-2">▶</span>
            {heroContent.ctaSecondary}
          </button>
        </div>

        {/* Social proof pill */}
        <div className="mt-6 flex justify-center">
          <p className="text-sm text-slate-400">
            Trusted by{" "}
            <span className="font-semibold text-slate-600">10,000+</span>{" "}
            engineering teams worldwide
          </p>
        </div>

        {/* Mock Dashboard */}
        <div className="hero-dashboard ss-dashboard-mock mx-auto mt-16 max-w-5xl">
          <div className="ss-glass-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white px-3">
                <span className="text-xs text-slate-400">app.acme.io/dashboard</span>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="flex" style={{ minHeight: "340px" }}>
              {/* Sidebar */}
              <aside className="hidden w-52 flex-shrink-0 border-r border-slate-100 bg-slate-50/80 p-4 sm:block">
                <div className="mb-6 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-xs font-bold text-white">
                    A
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Acme</span>
                </div>
                <nav className="space-y-1">
                  {["Dashboard", "Projects", "Analytics", "Settings"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${i === 0 ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                        {item}
                      </div>
                    )
                  )}
                </nav>
                <div className="mt-6 space-y-2">
                  {["Team", "Integrations", "Billing"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
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
                    { label: "Deployments", value: "1,284", trend: "+12%" },
                    { label: "Uptime", value: "99.99%", trend: "+0.1%" },
                    { label: "Requests", value: "4.2M", trend: "+34%" },
                    { label: "Errors", value: "0.02%", trend: "-8%" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                    >
                      <p className="mb-1 text-xs text-slate-400">{kpi.label}</p>
                      <p className="text-sm font-bold text-slate-800">{kpi.value}</p>
                      <p className="text-xs font-medium text-emerald-500">{kpi.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="mb-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-700">
                      Request Volume
                    </p>
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">
                      Last 7 days
                    </span>
                  </div>
                  {/* Chart bars */}
                  <div className="flex h-20 items-end gap-1.5">
                    {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background:
                              i === 5
                                ? "linear-gradient(to top, #4F46E5, #06B6D4)"
                                : "#E0E7FF",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-1.5 flex justify-between">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i} className="flex-1 text-center text-[10px] text-slate-300">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent activity */}
                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="mb-3 text-xs font-semibold text-slate-700">
                    Recent Deployments
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        name: "api-service",
                        env: "Production",
                        status: "Live",
                        time: "2m ago",
                      },
                      {
                        name: "frontend-v2",
                        env: "Staging",
                        status: "Building",
                        time: "5m ago",
                      },
                      {
                        name: "worker-queue",
                        env: "Production",
                        status: "Live",
                        time: "12m ago",
                      },
                    ].map((dep) => (
                      <div
                        key={dep.name}
                        className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${dep.status === "Live" ? "bg-emerald-400" : "bg-amber-400"}`}
                          />
                          <span className="text-xs font-medium text-slate-700">
                            {dep.name}
                          </span>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-400">
                            {dep.env}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{dep.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="h-20 w-full bg-gradient-to-b from-transparent to-[#FAFAFA]" />
        </div>
      </div>
    </section>
  );
}
