"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, TrendingDown } from "lucide-react";
import { kpiData, type KPIData } from "./constants";

gsap.registerPlugin(ScrollTrigger);

// ─── Sparkline ────────────────────────────────────────────────────────────────

interface SparklineProps {
  values: number[];
  positive: boolean;
}

function Sparkline({ values, positive }: SparklineProps) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 56;
  const H = 24;
  const step = W / (values.length - 1);

  const points = values
    .map((v, i) => {
      const x = i * step;
      const y = H - ((v - min) / range) * H;
      return `${x},${y}`;
    })
    .join(" ");

  const color = positive ? "#10B981" : "#EF4444";
  const lastIdx = values.length - 1;
  const lastX = lastIdx * step;
  const lastY = H - ((values[lastIdx] - min) / range) * H;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="dp-kpi__sparkline"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
}

// ─── KPICard ──────────────────────────────────────────────────────────────────

interface KPICardProps {
  data: KPIData;
  index: number;
}

function KPICard({ data, index }: KPICardProps) {
  const positive = data.change >= 0;

  return (
    <article
      className="dp-kpi-card dp-kpi-anim"
      data-kpi-index={index}
      aria-label={`${data.label}: ${data.prefix ?? ""}${data.value}${data.suffix ?? ""}, ${positive ? "up" : "down"} ${Math.abs(data.change)}% ${data.changeLabel}`}
    >
      <div className="dp-kpi-card__header">
        <p className="dp-kpi-card__label">{data.label}</p>
        <Sparkline values={data.sparkline} positive={positive} />
      </div>

      <p className="dp-kpi-card__value">
        {data.prefix && (
          <span className="dp-kpi-card__value-prefix">{data.prefix}</span>
        )}
        {data.value}
        {data.suffix && (
          <span className="dp-kpi-card__value-suffix">{data.suffix}</span>
        )}
      </p>

      <div className="dp-kpi-card__footer">
        <span
          className={`dp-kpi-card__trend ${positive ? "dp-kpi-card__trend--up" : "dp-kpi-card__trend--down"}`}
        >
          {positive ? (
            <TrendingUp size={12} aria-hidden="true" />
          ) : (
            <TrendingDown size={12} aria-hidden="true" />
          )}
          {positive ? "+" : ""}
          {data.change}%
        </span>
        <span className="dp-kpi-card__trend-label">{data.changeLabel}</span>
      </div>
    </article>
  );
}

// ─── KPICards ─────────────────────────────────────────────────────────────────

export default function KPICards() {
  const containerRef = useRef<HTMLElement>(null);

  // Stagger entrance animation
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll<HTMLElement>(".dp-kpi-anim");
    if (!cards || cards.length === 0) return;

    // Set initial hidden state — use gsap.set to avoid flash
    gsap.set(cards, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        });
      },
      once: true,
    });
  }, []);

  // Refresh ScrollTrigger after layout settles
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="dp-kpi-grid"
      aria-label="Key performance indicators"
    >
      {kpiData.map((kpi, i) => (
        <KPICard key={kpi.id} data={kpi} index={i} />
      ))}
    </section>
  );
}
