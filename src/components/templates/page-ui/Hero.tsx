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
      // Set initial states — NEVER use gsap.from with opacity
      gsap.set(".pu-hero-badge", { opacity: 0, y: 16 });
      gsap.set(".pu-hero-title", { opacity: 0, y: 28 });
      gsap.set(".pu-hero-subtitle", { opacity: 0, y: 20 });
      gsap.set(".pu-hero-ctas", { opacity: 0, y: 16 });
      gsap.set(".pu-hero-social", { opacity: 0 });
      gsap.set(".pu-hero-dashboard", { opacity: 0, y: 48, scale: 0.97 });

      // Stagger entrance — all above the fold so no ScrollTrigger needed
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });
      tl.to(".pu-hero-badge", { opacity: 1, y: 0, duration: 0.6 })
        .to(".pu-hero-title", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .to(".pu-hero-subtitle", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(".pu-hero-ctas", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(".pu-hero-social", { opacity: 1, duration: 0.5 }, "-=0.2")
        .to(
          ".pu-hero-dashboard",
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
      className="relative overflow-hidden pb-0 pt-24 sm:pt-32"
      style={{ background: "#0c0a1a" }}
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
        />
        <div
          className="absolute -right-20 top-10 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #4F46E5 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Shimmer badge */}
        <div className="pu-hero-badge mb-6 flex justify-center">
          <span className="pu-shimmer-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
            <span
              className="h-1.5 w-1.5 rounded-full bg-violet-400"
              aria-hidden="true"
            />
            {heroContent.tagline}
          </span>
        </div>

        {/* Headline */}
        <h1 className="pu-hero-title mx-auto max-w-3xl text-center font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          {titleLines.map((line, i) =>
            i === 0 ? (
              <span key={i} className="block text-white">
                {line}
              </span>
            ) : (
              <span key={i} className="pu-gradient-text block">
                {line}
              </span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p className="pu-hero-subtitle mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-slate-400 sm:text-xl">
          {heroContent.subtitle}
        </p>

        {/* CTAs */}
        <div className="pu-hero-ctas mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="pu-btn-primary w-full sm:w-auto"
          >
            {heroContent.ctaPrimary}
          </button>
          <button
            type="button"
            className="pu-btn-ghost w-full sm:w-auto"
          >
            <span aria-hidden="true" className="mr-2 text-violet-400">▶</span>
            {heroContent.ctaSecondary}
          </button>
        </div>

        {/* Social proof */}
        <div className="pu-hero-social mt-6 flex justify-center">
          <p className="text-sm text-slate-500">
            {heroContent.socialProof}
          </p>
        </div>

        {/* Mock dashboard with gradient border glow */}
        <div className="pu-hero-dashboard mx-auto mt-16 max-w-5xl">
          <div className="pu-dashboard-glow relative rounded-2xl p-px">
            <div className="overflow-hidden rounded-2xl" style={{ background: "#13111f" }}>
              {/* Browser chrome */}
              <div
                className="flex items-center gap-2 border-b px-4 py-3"
                style={{ borderColor: "#1e1b30", background: "#0f0d1c" }}
              >
                <span className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
                <div
                  className="ml-3 flex h-6 flex-1 items-center rounded-md px-3"
                  style={{ background: "#1e1b30" }}
                >
                  <span className="text-xs" style={{ color: "#6b7280" }}>
                    app.pageui.dev/dashboard
                  </span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="flex" style={{ minHeight: "340px" }}>
                {/* Sidebar */}
                <aside
                  className="hidden w-52 flex-shrink-0 border-r p-4 sm:block"
                  style={{ borderColor: "#1e1b30", background: "#0f0d1c" }}
                >
                  <div className="mb-6 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-white" style={{ background: "#7C3AED" }}>
                      P
                    </span>
                    <span className="text-sm font-semibold text-slate-300">PageUI</span>
                  </div>
                  <nav className="space-y-1" aria-label="Dashboard navigation">
                    {["Dashboard", "Pages", "Analytics", "Settings"].map(
                      (item, i) => (
                        <div
                          key={item}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium"
                          style={{
                            background: i === 0 ? "#1e1a35" : "transparent",
                            color: i === 0 ? "#a78bfa" : "#6b7280",
                          }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          {item}
                        </div>
                      )
                    )}
                  </nav>
                  <div className="mt-6 space-y-2">
                    {["Integrations", "Billing", "Team"].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium"
                        style={{ color: "#4b5563" }}
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
                      { label: "Pages Live", value: "24", trend: "+4" },
                      { label: "Visitors", value: "82.4K", trend: "+18%" },
                      { label: "Conversions", value: "3.7%", trend: "+0.5%" },
                      { label: "Revenue", value: "$4,290", trend: "+22%" },
                    ].map((kpi) => (
                      <div
                        key={kpi.label}
                        className="rounded-xl border p-3"
                        style={{ borderColor: "#1e1b30", background: "#0f0d1c" }}
                      >
                        <p className="mb-1 text-xs" style={{ color: "#6b7280" }}>
                          {kpi.label}
                        </p>
                        <p className="text-sm font-bold text-slate-200">{kpi.value}</p>
                        <p className="text-xs font-medium" style={{ color: "#34d399" }}>
                          {kpi.trend}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chart area */}
                  <div
                    className="mb-4 rounded-xl border p-4"
                    style={{ borderColor: "#1e1b30", background: "#0f0d1c" }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-300">
                        Visitor Trend
                      </p>
                      <span
                        className="rounded-md px-2 py-0.5 text-xs"
                        style={{ background: "#1e1a35", color: "#a78bfa" }}
                      >
                        Last 7 days
                      </span>
                    </div>
                    <div className="flex h-20 items-end gap-1.5">
                      {[30, 55, 42, 70, 58, 85, 72].map((h, i) => (
                        <div key={i} className="flex flex-1 flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t-sm"
                            style={{
                              height: `${h}%`,
                              background:
                                i === 5
                                  ? "linear-gradient(to top, #7C3AED, #4F46E5)"
                                  : "#1e1b30",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-1.5 flex justify-between">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <span
                          key={i}
                          className="flex-1 text-center text-[10px]"
                          style={{ color: "#374151" }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recent pages */}
                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: "#1e1b30", background: "#0f0d1c" }}
                  >
                    <p className="mb-3 text-xs font-semibold text-slate-300">
                      Recent Pages
                    </p>
                    <div className="space-y-2">
                      {[
                        { name: "Product Hunt Launch", status: "Live", cvr: "5.2%" },
                        { name: "Summer Campaign", status: "Draft", cvr: "—" },
                        { name: "SaaS Waitlist", status: "Live", cvr: "8.9%" },
                      ].map((page) => (
                        <div
                          key={page.name}
                          className="flex items-center justify-between rounded-lg px-2 py-1.5"
                          style={{ background: "#13111f" }}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                background:
                                  page.status === "Live" ? "#34d399" : "#f59e0b",
                              }}
                            />
                            <span className="text-xs font-medium text-slate-300">
                              {page.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs" style={{ color: "#34d399" }}>
                              {page.cvr}
                            </span>
                            <span
                              className="rounded px-1.5 py-0.5 text-[10px]"
                              style={{
                                background:
                                  page.status === "Live" ? "#052e16" : "#1c1a12",
                                color:
                                  page.status === "Live" ? "#34d399" : "#f59e0b",
                              }}
                            >
                              {page.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="h-24 w-full"
            style={{
              background: "linear-gradient(to bottom, transparent, #0c0a1a)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
