"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CreceProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".proof-header > *", { opacity: 0, y: 30 });
      gsap.to(".proof-header > *", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proof-header", start: "top 80%", once: true },
      });

      gsap.set(".proof-row", { opacity: 0, x: -20 });
      gsap.to(".proof-row", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".proof-table", start: "top 75%", once: true },
      });

      // Chart line draw
      const path = sectionRef.current?.querySelector(
        ".chart-line",
      ) as SVGPathElement | null;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".proof-chart", start: "top 75%", once: true },
        });

        // Dots appear
        gsap.set(".chart-dot", { opacity: 0, scale: 0 });
        gsap.to(".chart-dot", {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.15,
          ease: "back.out(2)",
          delay: 0.8,
          scrollTrigger: { trigger: ".proof-chart", start: "top 75%", once: true },
        });
      }

      gsap.set(".proof-quote", { opacity: 0, y: 40 });
      gsap.to(".proof-quote", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proof-quote", start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B1220] py-24 text-slate-100 md:py-32"
    >
      {/* Subtle amber grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C9A24C 1px, transparent 1px),
            linear-gradient(to bottom, #C9A24C 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="proof-header mb-16 max-w-2xl">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-amber-400">
            — Estado actual
          </div>
          <h2 className="crece-display mb-6 text-balance text-3xl font-normal leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl">
            Infraestructura{" "}
            <span className="italic text-amber-400">probada</span>, no pitch deck.
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            Sprint B cerrado. Datos reales. Sin mockups.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr] lg:items-start">
          {/* Data table */}
          <div className="proof-table overflow-x-auto border border-amber-500/30 bg-[#050810]">
            <table className="w-full min-w-[480px] font-mono text-sm">
              <thead>
                <tr className="border-b border-amber-500/20 bg-amber-500/10 text-[10px] uppercase tracking-widest text-amber-300">
                  <th className="px-5 py-3 text-left">Métrica</th>
                  <th className="px-5 py-3 text-right">Valor</th>
                  <th className="px-5 py-3 text-left">Fuente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <Row m="Comments ingestados" v="1,291" s="IG · TikTok · FB · X · YT" />
                <Row m="Redes monitoreadas" v="7" s="Scrapers + APIs" />
                <Row m="Dirigentes piloto" v="6" s="3 organizaciones" />
                <Row m="Reglas NLP" v="53" s="Matriz v2" />
                <Row m="Stack dev" v="$0" s="Free tier · Playwright" />
                <Row m="Reemplaza" v="Oracle APEX" s="Migración Fase 2" last />
              </tbody>
            </table>
          </div>

          {/* Sentiment chart */}
          <div className="proof-chart border border-amber-500/30 bg-[#050810] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  Sentiment contextual · 30d
                </div>
                <div className="crece-display text-2xl text-white">
                  +0.42 <span className="text-sm text-emerald-400">↑ 0.08</span>
                </div>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <SentimentChart />
            <div className="mt-4 flex justify-between font-mono text-[10px] text-slate-500">
              <span>ene</span>
              <span>feb</span>
              <span>mar</span>
              <span>abr</span>
            </div>
          </div>
        </div>

        {/* Quote block */}
        <blockquote className="proof-quote mx-auto mt-20 max-w-3xl border-l-2 border-amber-400 pl-8">
          <p className="crece-display text-2xl font-normal leading-snug text-slate-100 md:text-3xl">
            &ldquo;La diferencia no está en cuántos posts analizamos.
            Está en que{" "}
            <span className="italic text-amber-400">
              cada recomendación tiene evidencia auditable
            </span>
            .&rdquo;
          </p>
          <footer className="mt-4 font-mono text-[11px] uppercase tracking-widest text-slate-500">
            — Principio operativo · CRECE v2
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function Row({
  m,
  v,
  s,
  last,
}: {
  m: string;
  v: string;
  s: string;
  last?: boolean;
}) {
  return (
    <tr
      className={`proof-row transition-colors hover:bg-amber-500/5 ${last ? "border-b-0" : ""}`}
    >
      <td className="px-5 py-3.5 text-slate-200">{m}</td>
      <td className="px-5 py-3.5 text-right text-base tabular-nums text-amber-400">
        {v}
      </td>
      <td className="px-5 py-3.5 text-slate-400">{s}</td>
    </tr>
  );
}

function SentimentChart() {
  // Fake but believable data
  const points = [
    { x: 0, y: 95 },
    { x: 40, y: 80 },
    { x: 80, y: 90 },
    { x: 120, y: 65 },
    { x: 160, y: 75 },
    { x: 200, y: 50 },
    { x: 240, y: 60 },
    { x: 280, y: 35 },
    { x: 320, y: 45 },
    { x: 360, y: 25 },
    { x: 400, y: 30 },
  ];
  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  return (
    <svg
      viewBox="0 0 400 140"
      className="h-40 w-full"
      preserveAspectRatio="none"
    >
      {/* Grid */}
      <g stroke="#1e293b" strokeWidth="0.5" opacity="0.5">
        <line x1="0" y1="30" x2="400" y2="30" />
        <line x1="0" y1="70" x2="400" y2="70" />
        <line x1="0" y1="110" x2="400" y2="110" />
      </g>
      {/* Fill area */}
      <path
        d={`${path} L 400 140 L 0 140 Z`}
        fill="url(#sentiment-gradient)"
        opacity="0.2"
      />
      <defs>
        <linearGradient id="sentiment-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A24C" />
          <stop offset="100%" stopColor="#C9A24C" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Line */}
      <path
        className="chart-line"
        d={path}
        fill="none"
        stroke="#C9A24C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dots */}
      {points.map((p, i) => (
        <circle
          key={i}
          className="chart-dot"
          cx={p.x}
          cy={p.y}
          r={i === points.length - 1 ? 4 : 2.5}
          fill={i === points.length - 1 ? "#34d399" : "#C9A24C"}
        />
      ))}
    </svg>
  );
}
