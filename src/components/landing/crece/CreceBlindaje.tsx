"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Blindaje estratégico — privacidad y discreción institucional
 * Clave en política MX: "Su estrategia es invisible para el adversario"
 */
export function CreceBlindaje() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".blindaje-reveal", { opacity: 0, y: 30 });
      gsap.to(".blindaje-reveal", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".blindaje-section", start: "top 80%", once: true },
      });

      gsap.set(".shield-icon", { rotation: -10, scale: 0.8, opacity: 0 });
      gsap.to(".shield-icon", {
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".blindaje-section", start: "top 75%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="blindaje-section relative overflow-hidden bg-[#0B1220] py-24 text-slate-100 md:py-28"
    >
      {/* Subtle gold lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C9A24C 1px, transparent 1px),
            linear-gradient(to bottom, #C9A24C 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr,1.2fr] lg:items-center">
          {/* Left — Shield visual */}
          <div className="blindaje-reveal relative flex items-center justify-center">
            <ShieldVisual />
          </div>

          {/* Right — Copy */}
          <div>
            <div className="blindaje-reveal mb-4 font-mono text-[11px] uppercase tracking-widest text-[#D4B367]">
              — Blindaje estratégico
            </div>
            <h2 className="blindaje-reveal crece-display mb-6 text-balance text-3xl font-normal leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl">
              Su estrategia es{" "}
              <span className="italic text-[#D4B367]">invisible</span>{" "}
              para el adversario.
            </h2>
            <p className="blindaje-reveal mb-10 max-w-xl text-lg leading-relaxed text-slate-300">
              En política, lo que el rival no sabe no lo puede contrarrestar.
              CRECE opera bajo protocolos institucionales de confidencialidad
              —datos cifrados, acceso auditable, cero filtración a plataformas
              externas.
            </p>

            <div className="space-y-4">
              <BlindajeItem
                label="Datos en reposo"
                value="AES-256 cifrado"
                description="Toda la información de su organización cifrada en origen y destino."
              />
              <BlindajeItem
                label="Acceso"
                value="Auditable por rol"
                description="Cada consulta queda registrada. Usted controla quién ve qué."
              />
              <BlindajeItem
                label="Infraestructura"
                value="Soberana"
                description="Despliegue on-premise o en nube privada a su nombre. Sin dependencia de terceros."
              />
              <BlindajeItem
                label="Análisis de fuentes"
                value="Sin huella digital"
                description="Monitoreo de redes sin revelar su identidad como operador."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlindajeItem({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="blindaje-reveal group border-l-2 border-[#C9A24C]/40 pl-5 transition-all hover:border-[#C9A24C] hover:pl-6">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <span className="crece-display text-lg text-[#D4B367]">{value}</span>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

function ShieldVisual() {
  return (
    <svg
      className="shield-icon h-auto w-full max-w-md"
      viewBox="0 0 400 400"
      fill="none"
    >
      {/* Outer ring */}
      <circle
        cx="200"
        cy="200"
        r="180"
        stroke="#C9A24C"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle
        cx="200"
        cy="200"
        r="140"
        stroke="#C9A24C"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Shield shape */}
      <path
        d="M200 80 L280 120 V200 C280 250 240 290 200 310 C160 290 120 250 120 200 V120 Z"
        stroke="#C9A24C"
        strokeWidth="1.5"
        fill="rgba(201, 162, 76, 0.05)"
      />
      {/* Inner crest */}
      <path
        d="M200 130 L245 150 V200 C245 235 220 265 200 275 C180 265 155 235 155 200 V150 Z"
        stroke="#D4B367"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      {/* Center lock */}
      <rect
        x="180"
        y="180"
        width="40"
        height="50"
        stroke="#C9A24C"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M187 180 V165 A13 13 0 0 1 213 165 V180"
        stroke="#C9A24C"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Radar sweep lines */}
      <g opacity="0.4">
        <line x1="200" y1="40" x2="200" y2="70" stroke="#C9A24C" strokeWidth="1" />
        <line x1="200" y1="330" x2="200" y2="360" stroke="#C9A24C" strokeWidth="1" />
        <line x1="40" y1="200" x2="70" y2="200" stroke="#C9A24C" strokeWidth="1" />
        <line x1="330" y1="200" x2="360" y2="200" stroke="#C9A24C" strokeWidth="1" />
      </g>
      {/* Corner marks */}
      <g stroke="#D4B367" strokeWidth="1.5" opacity="0.8">
        <path d="M40 40 L70 40 L70 45 M40 40 L40 70 L45 70" fill="none" />
        <path d="M360 40 L330 40 L330 45 M360 40 L360 70 L355 70" fill="none" />
        <path d="M40 360 L70 360 L70 355 M40 360 L40 330 L45 330" fill="none" />
        <path d="M360 360 L330 360 L330 355 M360 360 L360 330 L355 330" fill="none" />
      </g>
      {/* Label */}
      <text
        x="200"
        y="385"
        textAnchor="middle"
        fill="#C9A24C"
        fontSize="10"
        letterSpacing="3"
        fontFamily="JetBrains Mono, monospace"
        opacity="0.7"
      >
        CRECE · CONFIDENTIAL
      </text>
    </svg>
  );
}
