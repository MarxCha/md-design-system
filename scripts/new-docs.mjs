#!/usr/bin/env node
/**
 * new-docs.mjs — MD Design System docs-kit scaffolder
 *
 * Usage:
 *   node scripts/new-docs.mjs slide-deck docseal --name="DocSeal-MD"
 *   node scripts/new-docs.mjs one-pager docseal --name="DocSeal-MD"
 *   node scripts/new-docs.mjs notebook-pack docseal --name="DocSeal-MD"
 *   node scripts/new-docs.mjs all docseal --name="DocSeal-MD"
 */

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ─── ANSI colours ────────────────────────────────────────────────────────────

const GREEN  = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED    = "\x1b[31m";
const CYAN   = "\x1b[36m";
const BOLD   = "\x1b[1m";
const RESET  = "\x1b[0m";

const green  = (s) => `${GREEN}${s}${RESET}`;
const yellow = (s) => `${YELLOW}${s}${RESET}`;
const red    = (s) => `${RED}${s}${RESET}`;
const cyan   = (s) => `${CYAN}${s}${RESET}`;
const bold   = (s) => `${BOLD}${s}${RESET}`;

// ─── Constants ───────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = join(__dirname, "..");

const VALID_FORMATS = ["slide-deck", "one-pager", "notebook-pack", "all"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const createdFiles = [];
const skippedFiles = [];

function ensureDir(absPath) {
  mkdirSync(absPath, { recursive: true });
}

function writeFile(absPath, content) {
  if (existsSync(absPath)) {
    skippedFiles.push(absPath);
    console.log(yellow(`  SKIP  ${absPath} (already exists)`));
    return;
  }
  writeFileSync(absPath, content, "utf8");
  createdFiles.push(absPath);
  console.log(green(`  CREATE ${absPath}`));
}

function slugToPascal(slug) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Template Generators ─────────────────────────────────────────────────────

function genSlideDeckConfig(slug, name) {
  return `import type { SlideDeckConfig } from "@/docs-kit/types";

const config: SlideDeckConfig = {
  title: "${name}",
  subtitle: "Presentacion profesional",
  author: "MD Consultoria TI",
  company: "MD Consultoria TI",
  date: "${today()}",
  layout: "dark-tech",
  logo: "/logo.svg",
  slides: [
    {
      id: "title",
      type: "title",
      title: "${name}",
      subtitle: "Sistema profesional de MD Consultoria",
    },
    {
      id: "problem",
      type: "content",
      title: "El Problema",
      bullets: [
        "Punto 1 — describe el problema principal",
        "Punto 2 — impacto en el negocio",
        "Punto 3 — por que importa ahora",
      ],
    },
    {
      id: "solution",
      type: "content",
      title: "La Solucion",
      bullets: [
        "Feature 1 — que hace y por que importa",
        "Feature 2 — diferenciador clave",
        "Feature 3 — resultado medible",
      ],
    },
    {
      id: "metrics",
      type: "stats",
      title: "Resultados",
      stats: [
        { value: "99.9%", label: "Uptime", delta: "+2.1%" },
        { value: "3x", label: "Velocidad", delta: "vs anterior" },
        { value: "0", label: "Errores criticos" },
      ],
    },
    {
      id: "cta",
      type: "cta",
      title: "Siguiente paso",
      subtitle: "Agenda una demo o revisa la documentacion",
      buttonText: "Contactar",
      url: "https://consultoriamd.com.mx",
    },
  ],
};

export default config;
`;
}

function genOnePagerConfig(slug, name) {
  return `import type { OnePagerConfig } from "@/docs-kit/types";

const config: OnePagerConfig = {
  title: "${name}",
  subtitle: "Resumen ejecutivo",
  company: "MD Consultoria TI",
  date: "${today()}",
  logo: "/logo.svg",
  tagline: "Una linea que resume el valor del proyecto",
  sections: [
    {
      title: "Que es",
      content: "Descripcion breve del proyecto, su proposito y audiencia.",
    },
    {
      title: "Problema",
      content: "Que problema resuelve y por que es relevante.",
    },
    {
      title: "Solucion",
      content: "Como lo resuelve, stack tecnologico, diferenciadores.",
    },
    {
      title: "Resultados",
      content: "Metricas clave, testimonios, o evidencia de impacto.",
    },
  ],
  stats: [
    { value: "99.9%", label: "Uptime" },
    { value: "3x", label: "Mas rapido" },
    { value: "24/7", label: "Soporte" },
  ],
  cta: {
    text: "Agenda una demo",
    url: "https://consultoriamd.com.mx",
  },
};

export default config;
`;
}

function genNotebookPackConfig(slug, name) {
  return `import type { NotebookPackConfig } from "@/docs-kit/types";

const config: NotebookPackConfig = {
  projectName: "${name}",
  projectSlug: "${slug}",
  description: "Descripcion del proyecto para generar Audio Overview en NotebookLM",
  docs: [
    {
      type: "overview",
      title: "${name} — Vision General",
      content: \`
# ${name}

## Que es
Descripcion general del proyecto.

## Para quien
Audiencia objetivo y casos de uso.

## Stack tecnologico
- Next.js 15 + TypeScript
- Tailwind CSS 4
- PostgreSQL + PostGIS
\`,
    },
    {
      type: "features",
      title: "${name} — Features Principales",
      content: \`
# Features de ${name}

## Feature 1
Descripcion detallada.

## Feature 2
Descripcion detallada.

## Feature 3
Descripcion detallada.
\`,
    },
    {
      type: "technical",
      title: "${name} — Arquitectura Tecnica",
      content: \`
# Arquitectura de ${name}

## Frontend
Detalles de la implementacion frontend.

## Backend
Detalles de la implementacion backend.

## Base de datos
Esquema y decisiones de modelado.
\`,
    },
  ],
  metadata: {
    version: "1.0.0",
    audience: "equipo tecnico + stakeholders",
    generatedAt: "${today()}",
  },
};

export default config;
`;
}

// ─── Scaffold functions ──────────────────────────────────────────────────────

function scaffoldSlideDeck(slug, name) {
  const dir = join(ROOT, "src", "docs-kit", "slide-deck", slug);
  ensureDir(dir);
  writeFile(join(dir, "config.ts"), genSlideDeckConfig(slug, name));
}

function scaffoldOnePager(slug, name) {
  const dir = join(ROOT, "src", "docs-kit", "one-pager", slug);
  ensureDir(dir);
  writeFile(join(dir, "config.ts"), genOnePagerConfig(slug, name));
}

function scaffoldNotebookPack(slug, name) {
  const dir = join(ROOT, "src", "docs-kit", "notebook-pack", slug);
  ensureDir(dir);
  writeFile(join(dir, "config.ts"), genNotebookPackConfig(slug, name));
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const format = args[0];
  const slug = args[1];

  // Parse --name flag
  let name = null;
  for (const arg of args) {
    if (arg.startsWith("--name=")) {
      name = arg.slice("--name=".length);
    }
  }

  if (!format || !slug) {
    console.error(red("\nError: missing arguments"));
    console.error(`\nUsage:`);
    console.error(`  node scripts/new-docs.mjs <format> <slug> --name="Project Name"\n`);
    console.error(`Formats: ${VALID_FORMATS.join(", ")}`);
    console.error(`\nExamples:`);
    console.error(`  node scripts/new-docs.mjs slide-deck docseal --name="DocSeal-MD"`);
    console.error(`  node scripts/new-docs.mjs all cfdi-motor --name="CFDI Motor"\n`);
    process.exit(1);
  }

  if (!VALID_FORMATS.includes(format)) {
    console.error(red(`\nError: invalid format "${format}"`));
    console.error(`Valid formats: ${VALID_FORMATS.join(", ")}\n`);
    process.exit(1);
  }

  name = name || slugToPascal(slug);

  console.log(`\n${bold(cyan("MD Design System — Docs Kit Scaffolder"))}`);
  console.log(`  format : ${cyan(format)}`);
  console.log(`  slug   : ${cyan(slug)}`);
  console.log(`  name   : ${cyan(name)}`);
  console.log("");

  const scaffolders = {
    "slide-deck": scaffoldSlideDeck,
    "one-pager": scaffoldOnePager,
    "notebook-pack": scaffoldNotebookPack,
  };

  if (format === "all") {
    for (const [fmt, fn] of Object.entries(scaffolders)) {
      console.log(bold(`\nScaffolding ${fmt}...`));
      fn(slug, name);
    }
  } else {
    scaffolders[format](slug, name);
  }

  console.log(`\n${bold("─────────────────────────────────────────────────────")}`);
  console.log(bold(green("Done.")));
  console.log(`  Files created : ${createdFiles.length}`);
  if (skippedFiles.length) {
    console.log(`  Files skipped : ${skippedFiles.length}`);
  }

  console.log(`\n${bold("Next steps:")}`);
  console.log(`  1. Edit the config file(s) with your project content`);
  console.log(`  2. Preview: ${cyan(`http://localhost:3000/docs-kit/slide-deck`)}`);
  console.log(`  3. Export:  ${cyan(`npm run docs:export ${slug}`)}`);
  console.log("");
}

main();
