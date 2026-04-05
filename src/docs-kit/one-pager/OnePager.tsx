"use client";

import type { OnePagerConfig } from "../types";
import { resolveTheme } from "../theme-bridge";
import type { SlideLayout } from "../types";

interface OnePagerProps {
  config: OnePagerConfig;
  layout?: SlideLayout;
}

export function OnePager({ config, layout = "clean-corporate" }: OnePagerProps) {
  const theme = resolveTheme(layout, config.brandColors);

  return (
    <>
      <style>{`
        @media print {
          body { margin: 0; }
          .onepager { break-inside: avoid; }
          .onepager__no-print { display: none !important; }
        }
      `}</style>

      <article
        className="onepager mx-auto max-w-[800px] bg-white p-12 font-sans text-[hsl(213_40%_10%)]"
        style={{
          fontFamily: theme.fonts.body,
        }}
      >
        {/* Header */}
        <header className="mb-8 flex items-start justify-between border-b border-[hsl(213_20%_90%)] pb-6">
          <div>
            <h1
              className="text-3xl font-bold leading-tight"
              style={{
                fontFamily: theme.fonts.display,
                color: theme.colors.primary,
              }}
            >
              {config.title}
            </h1>
            <p className="mt-1 text-lg text-[hsl(213_15%_48%)]">
              {config.subtitle}
            </p>
          </div>
          <div className="text-right text-sm text-[hsl(213_15%_60%)]">
            <p className="font-semibold">{config.company}</p>
            <p>{config.date}</p>
          </div>
        </header>

        {/* Tagline */}
        <div
          className="mb-8 rounded-lg p-4"
          style={{ backgroundColor: theme.colors.muted }}
        >
          <p
            className="text-center text-lg font-semibold"
            style={{ color: theme.colors.primary }}
          >
            {config.tagline}
          </p>
        </div>

        {/* Stats row */}
        {config.stats && config.stats.length > 0 && (
          <div className="mb-8 grid grid-cols-3 gap-4">
            {config.stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-lg border border-[hsl(213_20%_90%)] p-4"
              >
                <span
                  className="text-2xl font-black"
                  style={{ color: theme.colors.accent }}
                >
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-[hsl(213_15%_48%)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Sections — 2-column grid */}
        <div className="grid grid-cols-2 gap-6">
          {config.sections.map((section, i) => (
            <div key={i} className="rounded-lg border border-[hsl(213_20%_90%)] p-5">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="h-5 w-1 rounded-full"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <h2
                  className="text-base font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  {section.title}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-[hsl(213_20%_30%)]">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {config.cta && (
          <div className="mt-8 flex items-center justify-center">
            <a
              href={config.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: theme.colors.primary, color: "#ffffff" }}
            >
              {config.cta.text}
            </a>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 border-t border-[hsl(213_20%_90%)] pt-4 text-center text-xs text-[hsl(213_15%_60%)]">
          {config.company} &middot; {config.date} &middot; Confidencial
        </footer>
      </article>
    </>
  );
}
