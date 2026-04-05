#!/usr/bin/env node
/**
 * export-docs.mjs — Export docs-kit materials for a project
 *
 * Usage:
 *   node scripts/export-docs.mjs <slug>
 *   node scripts/export-docs.mjs <slug> --format=slide-deck
 *   node scripts/export-docs.mjs <slug> --format=notebook-pack
 *
 * Outputs to: out/docs/<slug>/
 */

import { existsSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = join(__dirname, "..");

const FORMATS = ["slide-deck", "one-pager", "notebook-pack"];

async function main() {
  const args = process.argv.slice(2);
  const slug = args[0];

  let formatFilter = null;
  for (const arg of args) {
    if (arg.startsWith("--format=")) {
      formatFilter = arg.slice("--format=".length);
    }
  }

  if (!slug) {
    console.error(red("\nError: missing slug"));
    console.error(`\nUsage: node scripts/export-docs.mjs <slug> [--format=slide-deck|one-pager|notebook-pack]\n`);

    // List available projects
    const docsKitDir = join(ROOT, "src", "docs-kit");
    console.log(bold("Available projects:"));
    for (const format of FORMATS) {
      const formatDir = join(docsKitDir, format);
      if (existsSync(formatDir)) {
        const slugs = readdirSync(formatDir, { withFileTypes: true })
          .filter(d => d.isDirectory())
          .filter(d => d.name !== "slides") // exclude internal dirs
          .map(d => d.name);
        if (slugs.length > 0) {
          console.log(`  ${cyan(format)}: ${slugs.join(", ")}`);
        }
      }
    }
    console.log("");
    process.exit(1);
  }

  const outDir = join(ROOT, "out", "docs", slug);
  mkdirSync(outDir, { recursive: true });

  console.log(`\n${bold(cyan("MD Design System — Docs Export"))}`);
  console.log(`  slug   : ${cyan(slug)}`);
  console.log(`  format : ${cyan(formatFilter ?? "all")}`);
  console.log(`  output : ${cyan(outDir)}`);
  console.log("");

  const exported = [];

  // ── Notebook Pack ──────────────────────────────────────────────────────
  if (!formatFilter || formatFilter === "notebook-pack") {
    const configPath = join(ROOT, "src", "docs-kit", "notebook-pack", slug, "config.ts");
    if (existsSync(configPath)) {
      console.log(bold("Exporting notebook-pack..."));
      // We can't import .ts directly, so we read and extract content structure
      // For now, create a placeholder that instructs the user
      const outFile = join(outDir, `${slug}-notebook-pack.md`);
      writeFileSync(outFile, `# ${slug} — NotebookLM Pack\n\n> Run the dev server and visit /docs-kit to preview.\n> Edit src/docs-kit/notebook-pack/${slug}/config.ts to customize content.\n\nThis file will be auto-generated when you run the app export route.\n`, "utf8");
      console.log(green(`  CREATE ${outFile}`));
      exported.push("notebook-pack");
    } else if (!formatFilter) {
      console.log(yellow(`  SKIP notebook-pack (no config found for ${slug})`));
    }
  }

  // ── Slide Deck HTML ───────────���────────────────────────────────────────
  if (!formatFilter || formatFilter === "slide-deck") {
    const configPath = join(ROOT, "src", "docs-kit", "slide-deck", slug, "config.ts");
    if (existsSync(configPath)) {
      console.log(bold("Exporting slide-deck..."));
      const outFile = join(outDir, `${slug}-slides.html`);
      writeFileSync(outFile, `<!-- ${slug} Slide Deck -->\n<!-- Run: npm run dev, then visit /docs-kit/slide-deck to preview -->\n<!-- Edit: src/docs-kit/slide-deck/${slug}/config.ts -->\n<!-- Full HTML export available via the app export API route -->\n`, "utf8");
      console.log(green(`  CREATE ${outFile}`));
      exported.push("slide-deck");
    } else if (!formatFilter) {
      console.log(yellow(`  SKIP slide-deck (no config found for ${slug})`));
    }
  }

  // ── One-Pager ────────────��─────────────────────────────────────────────
  if (!formatFilter || formatFilter === "one-pager") {
    const configPath = join(ROOT, "src", "docs-kit", "one-pager", slug, "config.ts");
    if (existsSync(configPath)) {
      console.log(bold("Exporting one-pager..."));
      const outFile = join(outDir, `${slug}-onepager.html`);
      writeFileSync(outFile, `<!-- ${slug} One-Pager -->\n<!-- Run: npm run dev, then visit /docs-kit/one-pager to preview -->\n<!-- Print to PDF with Cmd+P -->\n<!-- Edit: src/docs-kit/one-pager/${slug}/config.ts -->\n`, "utf8");
      console.log(green(`  CREATE ${outFile}`));
      exported.push("one-pager");
    } else if (!formatFilter) {
      console.log(yellow(`  SKIP one-pager (no config found for ${slug})`));
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────
  console.log(`\n${bold("───────���─────────────────────────────────────────────")}`);
  if (exported.length > 0) {
    console.log(bold(green("Done.")));
    console.log(`  Exported: ${exported.join(", ")}`);
    console.log(`  Output:   ${cyan(outDir)}`);
  } else {
    console.log(yellow("No configs found for this slug."));
    console.log(`  Run ${cyan(`npm run docs:new all ${slug} --name="Your Project"`)} first.`);
  }
  console.log("");
}

main().catch(console.error);
