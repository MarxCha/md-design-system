"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/landing/TextAnimations";

/**
 * CRECE Hero v2 — Bloomberg Terminal + The Economist + live data effects
 * - Matrix rain background
 * - Typing animation in terminal
 * - Count-up stats
 * - Live ticker
 */
export function CreceHero() {
  return (
    <section
      id="crece-hero"
      className="crece-hero-root relative overflow-hidden bg-[#0B1220] text-slate-100"
    >
      {/* Subtle noise texture — institutional */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.8'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Deep gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0D1A2E] to-[#0B1220]"
      />

      {/* Grid lines — institutional gold */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C9A24C 1px, transparent 1px),
            linear-gradient(to bottom, #C9A24C 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial accent — depth */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-20"
        style={{
          background: "radial-gradient(closest-side, rgba(201, 162, 76, 0.35), transparent)",
        }}
      />

      {/* Top status bar */}
      <div className="relative z-10 border-b border-amber-500/20 bg-[#0B1220]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span className="text-amber-400">CRECE v2</span>
            <span className="hidden text-slate-500 md:inline">
              INTELIGENCIA POLÍTICA · MÉXICO
            </span>
          </div>
          <div className="hidden items-center gap-4 text-slate-500 md:flex">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SISTEMA OPERATIVO
            </span>
            <LiveClock />
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-28 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          {/* Left — Copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-3 border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-amber-300">
              <span className="h-1 w-1 rounded-full bg-amber-400" />
              Plataforma institucional
            </div>

            <h1 className="crece-display mb-8 text-balance text-4xl font-normal leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
              La ventaja táctica{" "}
              <br className="hidden lg:block" />
              de la{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-[#D4B367]">
                  realidad
                </span>
                <span
                  className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#C9A24C]/40"
                  aria-hidden="true"
                />
              </span>{" "}
              basada en datos.
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-200 md:text-xl">
              Plataforma institucional de monitoreo, diagnóstico y planeación
              electoral para México. Análisis contextualizado por ideología,
              posición y coyuntura —{" "}
              <span className="text-slate-100">no sentiment genérico</span>.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#demo"
                className="group relative inline-flex items-center gap-3 overflow-hidden border-2 border-amber-400 bg-amber-400 px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-widest text-[#0B1220] transition-all hover:bg-transparent hover:text-amber-400"
              >
                Solicitar demo
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M1 7h12m0 0L7 1m6 6l-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 border-b border-slate-400 pb-0.5 font-mono text-sm uppercase tracking-widest text-slate-200 transition-colors hover:border-amber-400 hover:text-amber-400"
              >
                Cómo funciona
              </a>
            </div>

            {/* Trust bar with count-up */}
            <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 border-t border-slate-800 pt-8 md:grid-cols-4">
              <Stat value={1291} label="Comments reales" suffix="" />
              <Stat value={7} label="Redes monitoreadas" suffix="" />
              <Stat value={53} label="Reglas análisis" suffix="" />
              <Stat value={6} label="Dirigentes piloto" suffix="" />
            </div>
          </div>

          {/* Right — Live terminal */}
          <div className="hidden lg:block">
            <LiveTerminal />
          </div>
        </div>
      </div>

      {/* Bottom ticker — scrolling */}
      <LiveTicker />
    </section>
  );
}

/* ───────────── Live clock ───────────── */
function LiveClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">CDMX {time}</span>;
}

/* ───────────── Stat with count-up ───────────── */
function Stat({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="crece-display text-3xl font-normal tabular-nums text-amber-400">
        <CountUp value={value} duration={2} />
        {suffix}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
        {label}
      </div>
    </div>
  );
}

/* ───────────── Live terminal with typing ───────────── */
function LiveTerminal() {
  return (
    <div className="relative">
      {/* Amber glow */}
      <div className="absolute -inset-6 rounded-lg bg-gradient-to-br from-amber-500/25 via-transparent to-amber-500/10 blur-3xl" />

      <div className="relative overflow-hidden border border-amber-500/40 bg-[#050810] font-mono text-xs shadow-[0_20px_80px_-20px_rgba(232,168,56,0.3)]">
        {/* Terminal header */}
        <div className="flex items-center justify-between border-b border-amber-500/30 bg-[#0A1020] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-slate-700" />
            <div className="h-2 w-2 rounded-full bg-slate-700" />
            <div className="h-2 w-2 rounded-full bg-slate-700" />
            <span className="ml-3 text-[10px] uppercase tracking-widest text-slate-400">
              crece-terminal.v2
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Terminal body */}
        <div className="min-h-[340px] space-y-2.5 p-5 text-[11.5px] leading-relaxed text-slate-200">
          <TerminalLines />
        </div>
      </div>
    </div>
  );
}

function TerminalLines() {
  const lines = [
    { type: "cmd", text: 'query --dirigente="MXXXXX" --period=7d' },
    { type: "out", label: "menciones_totales", value: "1,847" },
    { type: "out", label: "sentiment_contextual", value: "+0.42", color: "text-emerald-400" },
    { type: "out", label: "indice_aceptacion", value: "62.4", color: "text-amber-400" },
    { type: "out", label: "crisis_score", value: "low", color: "text-slate-400" },
    { type: "cmd", text: "plan generate --evidence=foda" },
    { type: "plan", text: "Consolidación zona sur", ev: "F-03, O-07" },
    { type: "plan", text: "Contenido contra-narrativa", ev: "D-12, A-04" },
    { type: "plan", text: "Mapeo base volátil", ev: "F-01, D-07" },
  ];

  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= lines.length) {
      // Reset loop after pause
      const id = setTimeout(() => setVisible(0), 4500);
      return () => clearTimeout(id);
    }
    const delay = lines[visible]?.type === "cmd" ? 700 : 400;
    const id = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(id);
  }, [visible, lines.length]);

  return (
    <>
      {lines.slice(0, visible).map((line, i) => {
        if (line.type === "cmd") {
          return (
            <div key={i} className="flex gap-3">
              <span className="text-slate-500">&gt;</span>
              <span>
                <span className="text-amber-400">{line.text?.split(" ")[0]}</span>{" "}
                <span className="text-slate-300">
                  {line.text?.split(" ").slice(1).join(" ")}
                </span>
              </span>
            </div>
          );
        }
        if (line.type === "out") {
          return (
            <div
              key={i}
              className="ml-5 flex justify-between border-l border-slate-800 pl-4"
            >
              <span className="text-slate-500">{line.label}</span>
              <span className={`tabular-nums ${line.color ?? "text-white"}`}>
                {line.value}
              </span>
            </div>
          );
        }
        if (line.type === "plan") {
          return (
            <div key={i} className="ml-5 flex items-start gap-2">
              <span className="text-amber-400">◆</span>
              <span className="flex-1">
                <span className="text-slate-200">{line.text}</span>
                <span className="ml-2 text-[10px] text-slate-500">
                  / evidencia: {line.ev}
                </span>
              </span>
            </div>
          );
        }
        return null;
      })}
      {visible < lines.length && (
        <span className="inline-block h-3.5 w-2 animate-pulse bg-amber-400" />
      )}
    </>
  );
}

/* ───────────── Live ticker bottom ───────────── */
function LiveTicker() {
  const items = [
    { label: "IG", value: "+324", unit: "menciones", t: "15min" },
    { label: "TikTok", value: "+127", unit: "videos", t: "15min" },
    { label: "X", value: "+512", unit: "posts", t: "15min" },
    { label: "YouTube", value: "+48", unit: "comments", t: "15min" },
    { label: "Facebook", value: "+203", unit: "shares", t: "15min" },
    { label: "Aceptación", value: "62.4", unit: "índice", t: "↑ +0.8", highlight: true },
  ];

  return (
    <div className="relative z-10 overflow-hidden border-t border-amber-500/30 bg-[#050810]/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-3">
        <div className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-slate-300 animate-[ticker_40s_linear_infinite]">
          {[...items, ...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-amber-400">{item.label}</span>
              <span className={item.highlight ? "text-emerald-400 tabular-nums" : "tabular-nums text-white"}>
                {item.value}
              </span>
              <span className="text-slate-500">{item.unit}</span>
              <span className="text-slate-600">· {item.t}</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
