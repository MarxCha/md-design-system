"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  FileText,
  BarChart3,
  ExternalLink,
  CircleCheck,
  CircleDot,
} from "lucide-react";

import { BentoGrid, BentoCard } from "@/components/dashboard/BentoGrid";
import { IVAWaterfall } from "@/components/dashboard/IVAWaterfall";
import { StatusTimeline } from "@/components/dashboard/StatusTimeline";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import type { Period } from "@/components/dashboard/StatusTimeline";
import type { AlertItem } from "@/components/dashboard/AlertFeed";

gsap.registerPlugin(ScrollTrigger);

// ─── CountUp Hook ────────────────────────────────────────────
function useCountUp(target: number, duration = 1.5, decimals = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration,
            ease: "power2.out",
            onUpdate: () => setValue(obj.val),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const formatted =
    decimals > 0
      ? value.toLocaleString("es-MX", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(value).toLocaleString("es-MX");

  return { ref, formatted };
}

// ─── HoloCard (tilt on mouse move) ──────────────────────────
function HoloCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power3.out" });
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ perspective: "800px", transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// ─── Mock Data ──────────────────────────────────────────────

const PERIODS: Period[] = [
  {
    label: "Enero 2026",
    subtitle: "IVA Pagado + Cobrado",
    status: "certificado",
    tags: "tags v2.0.0 / v1.0.0",
  },
  {
    label: "Febrero 2026",
    subtitle: "Pendiente upload",
    status: "en_proceso",
    tags: "SAT + ERP requeridos",
  },
  {
    label: "Marzo 2026",
    subtitle: "Sin datos",
    status: "pendiente",
  },
];

const ALERTS: AlertItem[] = [
  {
    id: "1",
    severity: "urgente",
    title: "REQ841212FE2 -- TC incorrecto",
    description: "TC $19.83 vs DOF $20.72",
    impact: "Impacto: $710 recuperables",
    responsible: "Contabilidad",
  },
  {
    id: "2",
    severity: "revisar",
    title: "25004111 EUR -- Irregularidad contable",
    description: "CFDI EUR cobrado via cuenta MXN",
    impact: "Art. 20 CFF aplicable",
    responsible: "Tesoreria",
  },
  {
    id: "3",
    severity: "info",
    title: "577 facturas gastos empleados",
    description: "Politica interna no documentada",
    impact: "Sin impacto fiscal directo",
    responsible: "RRHH",
  },
];

const DECISIONS = [
  {
    title: "USD facturas cuenta MXN",
    detail: "12 CFDIs",
    amount: "$284,500",
    severity: "pendiente" as const,
  },
  {
    title: "TC Discrepante DOF",
    detail: "3 CFDIs",
    amount: "$710",
    severity: "urgente" as const,
  },
  {
    title: "Timbrado posterior",
    detail: "89 CFDIs",
    amount: ">24h",
    severity: "info" as const,
  },
];

const decisionColors = {
  pendiente: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  urgente: "bg-red-500/15 text-red-400 border-red-500/30",
  info: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const decisionLabels = {
  pendiente: "Pendiente",
  urgente: "Urgente",
  info: "Info",
};

// ─── Page ───────────────────────────────────────────────────

export default function MotorIVAPage() {
  const cobrado = 3_431_636.14;
  const pagado = 647_024.52;
  const neto = cobrado - pagado;

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const kpiRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLElement>(null);

  // CountUp hooks
  const cobradoCounter = useCountUp(3_431_636, 1.8);
  const pagadoCounter = useCountUp(647_025, 1.8);
  const netoCounter = useCountUp(neto, 2.0, 2);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  // Stagger reveal on scroll
  useGSAP(
    () => {
      // Header entrance
      gsap.set(headerRef.current, { opacity: 0, y: -30 });
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Timeline
      gsap.set(timelineRef.current, { opacity: 0, y: 30 });
      gsap.to(timelineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });

      // KPI cards stagger
      const kpiCards = kpiRef.current?.querySelectorAll(".bento-card, [class*=BentoCard]");
      if (kpiCards?.length) {
        gsap.set(kpiCards, { opacity: 0, y: 40, scale: 0.96 });
        gsap.to(kpiCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.4,
          ease: "power3.out",
        });
      }

      // Bottom bento section
      const bentoCards = bentoRef.current?.querySelectorAll(".bento-card, [class*=BentoCard]");
      if (bentoCards?.length) {
        gsap.set(bentoCards, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: bentoRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(bentoCards, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
        });
      }
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="dark min-h-dvh bg-[hsl(var(--background))] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* ─── Header ──────────────────────────────────── */}
        <header ref={headerRef} className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Veolia -- Enterprise
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                VME9307222H2
              </span>
            </div>
            <p className="font-display text-xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-2xl">
              Motor IVA Certificado
            </p>
            <p className="mt-1.5 text-sm text-[hsl(var(--muted-foreground))]">
              Estado fiscal del periodo -- IVA Pagado + Cobrado
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              Actualizado 12:16 p.m.
            </span>
            <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3.5 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--accent))]">
              <RefreshCw className="h-3.5 w-3.5" />
              Refrescar
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
              <Download className="h-3.5 w-3.5" />
              Papel de Trabajo
            </button>
          </div>
        </header>

        {/* ─── Timeline ────────────────────────────────── */}
        <section ref={timelineRef} className="mb-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Semaforo de Periodos
          </p>
          <StatusTimeline periods={PERIODS} />
        </section>

        {/* ─── Bento: Hero KPIs (Glassmorphism + CountUp) ─ */}
        <section ref={kpiRef} className="mb-5">
          <BentoGrid columns={{ sm: 1, md: 2, lg: 4 }} gap="gap-4">
            {/* IVA Cobrado — Glassmorphism */}
            <BentoCard className="border-t-2 border-t-emerald-500/60 backdrop-blur-sm bg-[hsl(var(--card))]/80">
              <div className="flex items-center gap-3 mb-1">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  IVA Cobrado -- ENE
                </p>
              </div>
              <p
                ref={cobradoCounter.ref as React.Ref<HTMLParagraphElement>}
                className="font-display text-2xl font-bold tabular-nums tracking-tight text-[hsl(var(--foreground))]"
              >
                ${cobradoCounter.formatted}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-400">+1.45%</span>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">vs declarado</span>
              </div>
              <p className="mt-1 text-[10px] text-[hsl(var(--muted-foreground))]">
                Motor v1.0.0 certificado
              </p>
            </BentoCard>

            {/* IVA Pagado — Glassmorphism */}
            <BentoCard className="border-t-2 border-t-blue-500/60 backdrop-blur-sm bg-[hsl(var(--card))]/80">
              <div className="flex items-center gap-3 mb-1">
                <TrendingDown className="h-4 w-4 text-blue-400" />
                <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  IVA Pagado -- ENE
                </p>
              </div>
              <p
                ref={pagadoCounter.ref as React.Ref<HTMLParagraphElement>}
                className="font-display text-2xl font-bold tabular-nums tracking-tight text-[hsl(var(--foreground))]"
              >
                ${pagadoCounter.formatted}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs font-medium text-blue-400">+0.49%</span>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">vs declarado</span>
              </div>
              <p className="mt-1 text-[10px] text-[hsl(var(--muted-foreground))]">
                Motor v2.0.0 certificado
              </p>
            </BentoCard>

            {/* ─── SALDO NETO — HOLO CARD (col span 2) ──── */}
            <HoloCard className="col-span-1 lg:col-span-2 rounded-xl border border-t-2 border-t-orange-500/60 bg-gradient-to-br from-[hsl(var(--card))]/90 to-orange-950/20 backdrop-blur-sm p-6 shadow-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      Saldo IVA Neto
                    </p>
                    <span className="shrink-0 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold text-orange-400">
                      A cargo
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      569 CFDIs
                    </span>
                    <span className="text-[10px]">513 REPs</span>
                  </div>
                </div>
                <p
                  ref={netoCounter.ref as React.Ref<HTMLParagraphElement>}
                  className="mt-1 font-display text-2xl font-bold tabular-nums tracking-tight text-orange-400 sm:text-3xl"
                >
                  ${netoCounter.formatted}
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Cobrado - Pagado
                </p>
              </div>
            </HoloCard>
          </BentoGrid>
        </section>

        {/* ─── Bento: Waterfall + Alerts + Decisions ──── */}
        <section ref={bentoRef}>
          <BentoGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="gap-4">
            {/* Waterfall Chart */}
            <BentoCard className="p-4">
              <IVAWaterfall cobrado={cobrado} pagado={pagado} height={220} />
            </BentoCard>

            {/* Alertas */}
            <BentoCard>
              <AlertFeed alerts={ALERTS} />
            </BentoCard>

            {/* Decisiones Pendientes */}
            <BentoCard>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircleCheck className="h-4 w-4 text-emerald-400" />
                    <p className="text-xs font-semibold text-[hsl(var(--foreground))]">
                      Decisiones Pendientes
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                    {DECISIONS.length} pendientes
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {DECISIONS.map((d) => (
                    <div
                      key={d.title}
                      className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]/50 px-4 py-3 transition-colors hover:bg-[hsl(var(--accent))]/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                          {d.title}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          {d.detail} -- {d.amount}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${decisionColors[d.severity]}`}
                      >
                        {decisionLabels[d.severity]}
                      </span>
                    </div>
                  ))}
                </div>

                <button type="button" className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]/50 px-4 py-2.5 text-xs font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))]/50 hover:text-[hsl(var(--foreground))]">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Ver Excel Decisiones Pendientes
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </BentoCard>

            {/* Modulos — quick nav */}
            <BentoCard colSpan={{ md: 2, lg: 3 }}>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                Modulos del Motor
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: BarChart3,
                    title: "Determinacion IVA",
                    desc: "Motor certificado v2.0.0",
                    status: "ok" as const,
                  },
                  {
                    icon: CircleDot,
                    title: "Panel Alertas",
                    desc: "3 activas -- 1 urgente",
                    status: "warn" as const,
                  },
                  {
                    icon: RefreshCw,
                    title: "Centro de Procesamiento",
                    desc: "REPs + CFDIs XML -- jobs",
                    status: "nav" as const,
                  },
                  {
                    icon: FileText,
                    title: "Reportes SAT",
                    desc: "Emitidas -- Recibidas -- DIOT",
                    status: "nav" as const,
                  },
                ].map((mod) => {
                  const ModIcon = mod.icon;
                  return (
                    <button
                      key={mod.title}
                      type="button"
                      className="flex items-center gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]/30 px-4 py-3 text-left transition-colors hover:bg-[hsl(var(--accent))]/50"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                        <ModIcon className="h-4 w-4 text-[hsl(var(--primary))]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                          {mod.title}
                        </p>
                        <p className="truncate text-[11px] text-[hsl(var(--muted-foreground))]">
                          {mod.desc}
                        </p>
                      </div>
                      {mod.status === "ok" && (
                        <CircleCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                      )}
                      {mod.status === "warn" && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                          3
                        </span>
                      )}
                      {mod.status === "nav" && (
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--muted-foreground))]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </BentoCard>
          </BentoGrid>
        </section>
      </div>
    </div>
  );
}
