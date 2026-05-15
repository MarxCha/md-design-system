"use client";

import Link from "next/link";

const formats = [
  {
    title: "Slide Deck",
    description: "Presentacion interactiva navegable con flechas. 3 layouts: dark-tech, clean-corporate, bold-creative.",
    href: "/docs-kit/slide-deck",
    icon: "M",
    color: "hsl(160 84% 39%)",
  },
  {
    title: "One-Pager",
    description: "Resumen ejecutivo de una pagina. Print-ready — Cmd+P para exportar a PDF.",
    href: "/docs-kit/one-pager",
    icon: "1",
    color: "hsl(213 51% 24%)",
  },
  {
    title: "NotebookLM Pack",
    description: "Markdown optimizado para subir a Google NotebookLM y generar Audio Overviews.",
    href: "#",
    icon: "N",
    color: "hsl(38 62% 58%)",
    disabled: true,
  },
];

const commands = [
  {
    cmd: "npm run docs:new slide-deck myproject --name=\"My Project\"",
    desc: "Scaffold un slide deck para tu proyecto",
  },
  {
    cmd: "npm run docs:new all myproject --name=\"My Project\"",
    desc: "Scaffold los 3 formatos de una vez",
  },
  {
    cmd: "npm run docs:export myproject",
    desc: "Exportar todos los materiales a out/docs/",
  },
];

export default function DocsKitHubPage() {
  return (
    <div className="min-h-screen bg-[hsl(213_40%_6%)] px-8 py-16 text-[hsl(0_0%_95%)]">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 h-1 w-16 rounded-full bg-[hsl(160_84%_39%)]" />
          <h1 className="text-4xl font-black tracking-tight" style={{ fontFamily: "var(--font-instrument-sans), Georgia, serif" }}>
            docs-kit
          </h1>
          <p className="mt-3 text-lg text-[hsl(213_15%_60%)]">
            Document &amp; Presentation Toolkit — genera materiales profesionales para cada proyecto.
          </p>
        </div>

        {/* Format cards */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {formats.map((format) => (
            <Link
              key={format.title}
              href={format.href}
              className={`group rounded-xl border border-[hsl(213_20%_20%)] p-6 transition-all ${
                format.disabled
                  ? "pointer-events-none opacity-50"
                  : "hover:border-[hsl(213_20%_30%)] hover:bg-[hsl(213_40%_8%)]"
              }`}
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-lg font-black"
                style={{
                  backgroundColor: format.color,
                  color: "hsl(213 40% 6%)",
                }}
              >
                {format.icon}
              </div>
              <h2 className="mb-2 text-lg font-bold">{format.title}</h2>
              <p className="text-sm leading-relaxed text-[hsl(213_15%_60%)]">
                {format.description}
              </p>
              {format.disabled && (
                <span className="mt-3 inline-block text-xs text-[hsl(38_62%_58%)]">
                  Export only — no preview
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* CLI commands */}
        <div>
          <h2 className="mb-6 text-xl font-bold">Comandos CLI</h2>
          <div className="space-y-4">
            {commands.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[hsl(213_20%_20%)] bg-[hsl(213_40%_8%)] p-4"
              >
                <code className="block text-sm text-[hsl(160_84%_50%)]">
                  $ {item.cmd}
                </code>
                <p className="mt-2 text-xs text-[hsl(213_15%_60%)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-sm text-[hsl(213_15%_60%)] hover:text-white transition-colors"
          >
            ← Volver al Design System
          </Link>
        </div>
      </div>
    </div>
  );
}
