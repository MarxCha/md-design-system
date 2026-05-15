"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Three Pillars — editorial with scroll-triggered reveals
 */
export function CrecePillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.set(".pillars-header > *", { opacity: 0, y: 30 });
      gsap.to(".pillars-header > *", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pillars-header",
          start: "top 80%",
          once: true,
        },
      });

      // Pillars stagger
      gsap.set(".pillar-card", { opacity: 0, y: 60 });
      gsap.to(".pillar-card", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pillars-grid",
          start: "top 75%",
          once: true,
        },
      });

      // Pillar numbers — draw line
      gsap.set(".pillar-line", { scaleX: 0, transformOrigin: "left" });
      gsap.to(".pillar-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".pillars-grid",
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="relative bg-[#F4F1EA] py-24 md:py-32"
    >
      {/* Editorial grid bg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0B1220 1px, transparent 1px),
            linear-gradient(to bottom, #0B1220 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="pillars-header mb-20 max-w-2xl">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-amber-700">
            — Metodología
          </div>
          <h2 className="crece-display mb-6 text-balance text-3xl font-normal leading-[1.1] tracking-tight text-[#0B1220] md:text-4xl lg:text-5xl">
            Tres sistemas que convierten ruido digital en{" "}
            <span className="italic text-amber-700">decisiones políticas</span>.
          </h2>
          <p className="text-lg leading-relaxed text-slate-700">
            No vendemos dashboards. Vendemos claridad operativa sobre qué
            hacer con tu base electoral, respaldada por evidencia verificable.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="pillars-grid grid gap-12 lg:grid-cols-3">
          <Pillar
            number="01"
            title="NLP político contextual"
            description="El mismo comentario pesa distinto si eres oposición u oficialismo. Nuestra matriz de 53 reglas v2 clasifica cada mención por ideología, posición partidista y coyuntura, no por sentiment genérico."
            metric="53 reglas"
            metricLabel="matriz v2"
            example="&ldquo;Se cayó el metro otra vez&rdquo;"
            exampleLabelA="Como oposición"
            exampleValueA="Crítica válida (+)"
            exampleLabelB="Como oficialismo"
            exampleValueB="Crisis reputacional (−)"
          />

          <Pillar
            number="02"
            title="Índice de Aceptación"
            description="Métrica única que combina activación de base, expansión territorial, aceptación pública y detección de fantasmas. Un solo número del 0 al 100, auditable a nivel de evento."
            metric="4 dimensiones"
            metricLabel="activación · expansión · aceptación · fantasmas"
            example="Dirigente MXXXXX"
            exampleLabelA="Índice actual"
            exampleValueA="62.4 ↑"
            exampleLabelB="vs semana anterior"
            exampleValueB="+3.1 pts"
          />

          <Pillar
            number="03"
            title="Planes IA con evidencia"
            description="Cada tarea generada tiene fundamento en datos reales. Linkeamos cada recomendación a ítems específicos del FODA: fortaleza F-03, oportunidad O-07, debilidad D-12, amenaza A-04."
            metric="FODA auditable"
            metricLabel="sin cajas negras"
            example="Tarea: consolidación zona sur"
            exampleLabelA="Evidencia"
            exampleValueA="F-03, O-07"
            exampleLabelB="ROI estimado"
            exampleValueB="+4.2 pts"
          />
        </div>
      </div>
    </section>
  );
}

function Pillar({
  number,
  title,
  description,
  metric,
  metricLabel,
  example,
  exampleLabelA,
  exampleValueA,
  exampleLabelB,
  exampleValueB,
}: {
  number: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  example: string;
  exampleLabelA: string;
  exampleValueA: string;
  exampleLabelB: string;
  exampleValueB: string;
}) {
  return (
    <article className="pillar-card group">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="crece-display text-6xl font-light tabular-nums text-amber-700">
          {number}
        </span>
        <div className="pillar-line h-px flex-1 bg-slate-400" />
      </div>

      <h3 className="crece-display mb-4 text-2xl font-normal leading-tight tracking-tight text-[#0B1220]">
        {title}
      </h3>

      <p className="mb-6 text-[15px] leading-relaxed text-slate-700">
        {description}
      </p>

      {/* Metric card */}
      <div className="mb-6 border-l-2 border-amber-700 bg-white px-4 py-3 shadow-sm transition-all group-hover:-translate-x-1 group-hover:shadow-md">
        <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
          {metricLabel}
        </div>
        <div className="crece-display text-xl font-normal text-[#0B1220]">
          {metric}
        </div>
      </div>

      {/* Example */}
      <div className="border border-slate-300 bg-white/60 p-4">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          Ejemplo
        </div>
        <div className="mb-3 border-l-2 border-slate-400 pl-3 text-sm italic text-slate-700">
          {example}
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">{exampleLabelA}</span>
            <span className="text-[#0B1220]">{exampleValueA}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{exampleLabelB}</span>
            <span className="text-[#0B1220]">{exampleValueB}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
