"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const casos = [
  {
    id: "crisis",
    label: "Crisis reputacional",
    subtitle: "Detección temprana",
    description:
      "Una mención adversa se vuelve tendencia en 4 horas. CRECE la detecta en los primeros 20 minutos, clasifica gravedad y sugiere respuestas basadas en casos previos.",
    metric: "< 20 min",
    metricLabel: "Detección",
    signals: [
      { label: "Volumen inusual", value: "+340% baseline" },
      { label: "Sentiment shift", value: "−0.62" },
      { label: "Aceleración", value: "Exponencial" },
      { label: "Gravedad", value: "Alta · nacional" },
    ],
  },
  {
    id: "brecha",
    label: "Cierre de brecha",
    subtitle: "Mapeo territorial",
    description:
      "Identifique dónde está perdiendo base y por qué. Cruza menciones geolocalizadas con padrón electoral para ubicar secciones en riesgo y diseñar intervenciones específicas.",
    metric: "1,234",
    metricLabel: "Secciones mapeadas",
    signals: [
      { label: "Secciones activas", value: "312" },
      { label: "En riesgo", value: "47" },
      { label: "Críticas", value: "8" },
      { label: "Estrategia sugerida", value: "Territorio focal" },
    ],
  },
  {
    id: "monitoreo",
    label: "Monitoreo territorial",
    subtitle: "Base viva, no padrón muerto",
    description:
      "Distinga entre su base activa y sus fantasmas. El Índice de Aceptación combina activación real, expansión territorial y detección de inflación en reportes de campo.",
    metric: "0–100",
    metricLabel: "Índice auditable",
    signals: [
      { label: "Activación", value: "68 pts" },
      { label: "Expansión", value: "54 pts" },
      { label: "Aceptación", value: "71 pts" },
      { label: "Fantasmas (detectados)", value: "12%" },
    ],
  },
];

export function CreceCasos() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".casos-header > *", { opacity: 0, y: 30 });
      gsap.to(".casos-header > *", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".casos-header", start: "top 80%", once: true },
      });

      gsap.set(".casos-tabs", { opacity: 0, y: 20 });
      gsap.to(".casos-tabs", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".casos-tabs", start: "top 85%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const current = casos[active];

  return (
    <section
      ref={ref}
      className="relative bg-[#F4F1EA] py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="casos-header mb-16 max-w-2xl">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-amber-800">
            — Casos de uso
          </div>
          <h2 className="crece-display mb-6 text-balance text-3xl font-normal leading-[1.1] tracking-tight text-[#0B1220] md:text-4xl lg:text-5xl">
            Tres problemas reales que{" "}
            <span className="italic text-amber-800">CRECE resuelve</span>{" "}
            desde el día uno.
          </h2>
        </div>

        {/* Tabs + content */}
        <div className="casos-tabs grid gap-10 lg:grid-cols-[1fr,1.4fr]">
          {/* Tabs */}
          <div className="space-y-1">
            {casos.map((caso, i) => (
              <button
                key={caso.id}
                onClick={() => setActive(i)}
                className={`group flex w-full items-start gap-4 border-l-2 py-4 pl-5 pr-4 text-left transition-all ${
                  active === i
                    ? "border-[#C9A24C] bg-white shadow-sm"
                    : "border-slate-300 hover:border-slate-500 hover:bg-white/60"
                }`}
              >
                <span className="crece-display mt-0.5 text-2xl font-light tabular-nums text-amber-800">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <div className="crece-display text-lg text-[#0B1220]">
                    {caso.label}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    {caso.subtitle}
                  </div>
                </div>
                <span
                  className={`mt-2 transition-transform ${
                    active === i ? "text-amber-800 translate-x-1" : "text-slate-400"
                  }`}
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            key={current.id}
            className="border border-slate-300 bg-white p-8 shadow-sm"
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber-800">
                  Caso {String(active + 1).padStart(2, "0")}
                </div>
                <h3 className="crece-display text-2xl font-normal leading-tight text-[#0B1220]">
                  {current.label}
                </h3>
              </div>
              <div className="text-right">
                <div className="crece-display text-3xl tabular-nums text-[#C9A24C]">
                  {current.metric}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  {current.metricLabel}
                </div>
              </div>
            </div>

            <p className="mb-8 text-[15px] leading-relaxed text-slate-700">
              {current.description}
            </p>

            {/* Signals grid */}
            <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              Señales operativas
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {current.signals.map((s, i) => (
                <div
                  key={i}
                  className="border-l-2 border-[#C9A24C] bg-[#F4F1EA]/60 px-4 py-3"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    {s.label}
                  </div>
                  <div className="crece-display text-base text-[#0B1220]">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
