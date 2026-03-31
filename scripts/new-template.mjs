#!/usr/bin/env node
/**
 * new-template.mjs — MD Design System template scaffolder
 *
 * Usage:
 *   node scripts/new-template.mjs --slug=gsap-cocktails --name="GSAP Cocktails" \
 *     --fonts="playfair-display" --has-3d --has-audio --bg=black
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

// ─── Arg parsing ─────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {
    slug: null,
    name: null,
    prefix: null,
    fonts: [],
    has3d: false,
    hasAudio: false,
    bg: "black",
  };

  for (const arg of argv.slice(2)) {
    if (arg.startsWith("--slug="))   { args.slug   = arg.slice("--slug=".length); continue; }
    if (arg.startsWith("--name="))   { args.name   = arg.slice("--name=".length); continue; }
    if (arg.startsWith("--prefix=")) { args.prefix = arg.slice("--prefix=".length); continue; }
    if (arg.startsWith("--fonts="))  { args.fonts  = arg.slice("--fonts=".length).split(",").map(f => f.trim()).filter(Boolean); continue; }
    if (arg.startsWith("--bg="))     { args.bg     = arg.slice("--bg=".length); continue; }
    if (arg === "--has-3d")          { args.has3d  = true; continue; }
    if (arg === "--has-audio")       { args.hasAudio = true; continue; }
  }

  return args;
}

// ─── String helpers ───────────────────────────────────────────────────────────

/**
 * gsap-cocktails → GsapCocktails
 */
function slugToPascal(slug) {
  return slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

/**
 * Abbreviation for colour utility prefix.
 * gsap-cocktails → gc
 * gsap-macbook   → gm
 */
function slugToAbbr(slug) {
  return slug
    .split("-")
    .map(w => w.charAt(0))
    .join("");
}

// ─── File/dir helpers ─────────────────────────────────────────────────────────

const createdFiles = [];
const createdDirs  = [];
const skippedFiles = [];

function ensureDir(absPath) {
  mkdirSync(absPath, { recursive: true });
  createdDirs.push(absPath);
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

function gitkeep(dirPath) {
  writeFile(join(dirPath, ".gitkeep"), "");
}

// ─── Template generators ──────────────────────────────────────────────────────

function genLayout({ slug, name, prefix, bg }) {
  return `import "./${slug}.css";

export const metadata = {
  title: "${name} — MD Design System",
  description: "${name} template",
};

export default function ${prefix}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="${slug}-root"
      className="${slug}-template relative min-h-screen w-screen overflow-x-hidden bg-${bg}"
    >
      {children}
    </div>
  );
}
`;
}

function genCss({ slug, name, fonts, abbr }) {
  const fontFaces = fonts.length
    ? fonts
        .map(
          (font) => `@font-face {
  font-family: "${slug}-${font}";
  src: url("/templates/${slug}/fonts/${font}.woff2") format("woff2");
  font-display: swap;
}`
        )
        .join("\n\n")
    : "/* No custom fonts declared — add @font-face blocks here */";

  return `/* ─── ${name} Template — Custom Styles ─────────────────────────────────── */
/* ALL rules scoped under .${slug}-template to win over design system globals  */
/* NO @layer utilities — that loses specificity to unscoped globals           */

/* ─── Web Fonts ───────────────────────────────────────────────────────── */
${fontFaces}

/* ─── Color Utilities (${abbr} prefix, global scope) ──────────────────── */
/* .text-${abbr}-primary   { color: #000000 !important; } */
/* .bg-${abbr}-primary     { background-color: #000000 !important; } */

/* ─── Base Styles ─────────────────────────────────────────────────────── */
.${slug}-template {
  /* font-family, background-color, base setup */
}

/* ─── Reset: override design system heading color rules ───────────────── */
.${slug}-template h1,
.${slug}-template h2,
.${slug}-template h3,
.${slug}-template h4,
.${slug}-template h5,
.${slug}-template h6,
.${slug}-template p,
.${slug}-template span,
.${slug}-template div {
  color: inherit;
}

/* ─── Scoped Utilities ────────────────────────────────────────────────── */
/* .${slug}-template .your-class { ... } */

/* ─── Responsive ──────────────────────────────────────────────────────── */
/* @media (min-width: 640px) { } */
/* @media (min-width: 768px) { } */
/* @media (min-width: 1024px) { } */

/* ─── Keyframes ───────────────────────────────────────────────────────── */
`;
}

function genPage({ slug, name, prefix, has3d }) {
  const dynamicImport = has3d
    ? `import dynamic from "next/dynamic";\n`
    : "";

  return `"use client";

${dynamicImport}// TODO: Import components from "@/components/templates/${slug}"

export default function ${prefix}Page() {
  return (
    <main>
      {/* TODO: Add template sections */}
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">${name} Template</h1>
      </div>
    </main>
  );
}
`;
}

function genBarrel({ slug, name, prefix }) {
  return `// ─── ${name} Template — Barrel Export ─────────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ──────
// export { default as Hero } from "./Hero";

// ── Named components (${prefix}-prefixed — for use in other contexts) ────
// export { default as ${prefix}Hero } from "./Hero";
`;
}

function genConstants({ slug, name }) {
  return `// ─── ${name} Template — Constants & Content ───────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "${slug}";
export const TEMPLATE_NAME = "${name}";

/** Navigation items */
export const navItems: string[] = [];

/** Hero section content */
export const heroContent = {
  title: "${name}",
  subtitle: "",
};
`;
}

function genVideoConfig({ slug, name }) {
  return `import { type ProductDemoProps } from "@/components/video/ProductDemo";
import { TEMPLATE_NAME } from "./constants";

export const SLUG = "${slug}";

/** Brand colors for video compositions */
export const brandColors = {
  primary: "#000000",
  accent: "#ffffff",
  background: "#000000",
};

const brand = {
  tagline: TEMPLATE_NAME,
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const hook = {
  text: "TODO: compelling hook",
  subtitle: "TODO: subtitle",
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const features = {
  heading: "Features",
  features: [] as Array<{ icon: string; title: string; description: string }>,
  bgColor: brandColors.background,
  accentColor: brandColors.accent,
};

const cta = {
  ctaText: "Learn more",
  url: "consultoriamd.com.mx",
  buttonColor: brandColors.accent,
};

/** Vertical reel (1080x1920) */
export const verticalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 3.5,
  featureDuration: 4,
  ctaDuration: 3,
};

/** Horizontal demo (1920x1080) */
export const horizontalProps: ProductDemoProps = {
  brand,
  hook,
  screens: [],
  features,
  cta,
  brandDuration: 3,
  hookDuration: 2.5,
  screenDuration: 4,
  featureDuration: 4,
  ctaDuration: 3,
};
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = join(__dirname, "..");

function main() {
  const args = parseArgs(process.argv);

  // ── Validation ──────────────────────────────────────────────────────────
  const missing = [];
  if (!args.slug) missing.push("--slug");
  if (!args.name) missing.push("--name");

  if (missing.length) {
    console.error(red(`\nError: required flag(s) missing: ${missing.join(", ")}`));
    console.error(`\nUsage:`);
    console.error(`  node scripts/new-template.mjs --slug=my-template --name="My Template" [options]\n`);
    console.error(`Options:`);
    console.error(`  --slug=<kebab>        (required) kebab-case identifier`);
    console.error(`  --name=<string>       (required) human-readable display name`);
    console.error(`  --prefix=<PascalCase> (optional) export prefix — auto-generated from slug`);
    console.error(`  --fonts=<a,b,c>       (optional) comma-separated font family names`);
    console.error(`  --has-3d              (flag)     create models/ directory + dynamic import`);
    console.error(`  --has-audio           (flag)     create audio/ directory`);
    console.error(`  --bg=<class>          (optional) Tailwind bg class (default: black)\n`);
    process.exit(1);
  }

  const slug   = args.slug;
  const name   = args.name;
  const prefix = args.prefix ?? slugToPascal(slug);
  const abbr   = slugToAbbr(slug);
  const fonts  = args.fonts;
  const has3d  = args.has3d;
  const hasAudio = args.hasAudio;
  const bg     = args.bg;

  console.log(`\n${bold(cyan("MD Design System — Template Scaffolder"))}`);
  console.log(`  slug   : ${cyan(slug)}`);
  console.log(`  name   : ${cyan(name)}`);
  console.log(`  prefix : ${cyan(prefix)}`);
  console.log(`  abbr   : ${cyan(abbr)}`);
  console.log(`  fonts  : ${cyan(fonts.length ? fonts.join(", ") : "(none)")}`);
  console.log(`  has-3d : ${cyan(String(has3d))}`);
  console.log(`  audio  : ${cyan(String(hasAudio))}`);
  console.log(`  bg     : ${cyan(bg)}`);
  console.log("");

  // ── 1. Public asset directories ─────────────────────────────────────────
  console.log(bold("Creating asset directories..."));

  const publicBase = join(ROOT, "public", "templates", slug);
  const assetDirs  = ["images", "videos", "fonts", "screens"];
  if (has3d)    assetDirs.push("models");
  if (hasAudio) assetDirs.push("audio");

  for (const dir of assetDirs) {
    const absDir = join(publicBase, dir);
    ensureDir(absDir);
    console.log(yellow(`  DIR   ${absDir}`));
    gitkeep(absDir);
  }

  // ── 2. App route: layout.tsx ─────────────────────────────────────────────
  console.log(bold("\nCreating app route files..."));

  const appDir = join(ROOT, "src", "app", "templates", slug);
  ensureDir(appDir);

  writeFile(
    join(appDir, "layout.tsx"),
    genLayout({ slug, name, prefix, bg })
  );

  // ── 3. App route: {slug}.css ─────────────────────────────────────────────
  writeFile(
    join(appDir, `${slug}.css`),
    genCss({ slug, name, fonts, abbr })
  );

  // ── 4. App route: page.tsx ───────────────────────────────────────────────
  writeFile(
    join(appDir, "page.tsx"),
    genPage({ slug, name, prefix, has3d })
  );

  // ── 5–7. Component files ──────────────────────────────────────────────────
  console.log(bold("\nCreating component files..."));

  const compDir = join(ROOT, "src", "components", "templates", slug);
  ensureDir(compDir);

  writeFile(join(compDir, "index.ts"),        genBarrel({ slug, name, prefix }));
  writeFile(join(compDir, "constants.ts"),    genConstants({ slug, name }));
  writeFile(join(compDir, "video-config.ts"), genVideoConfig({ slug, name }));

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log(`\n${bold("─────────────────────────────────────────────────────")}`);
  console.log(bold(green("Done.")));
  console.log(`\n  ${bold("Files created")}  : ${createdFiles.length}`);
  console.log(`  ${bold("Dirs created")}   : ${createdDirs.length}`);
  if (skippedFiles.length) {
    console.log(`  ${bold("Files skipped")}  : ${skippedFiles.length} (already existed)`);
    for (const f of skippedFiles) console.log(yellow(`    SKIP  ${f}`));
  }

  console.log(`\n${bold("Next steps:")}`);
  console.log(`  1. Add screenshots to  ${cyan(`public/templates/${slug}/screens/`)}`);
  console.log(`     (used by the Remotion video pipeline)`);
  if (fonts.length) {
    console.log(`  2. Drop font files into ${cyan(`public/templates/${slug}/fonts/`)}`);
    console.log(`     Expected: ${fonts.map(f => `${f}.woff2`).join(", ")}`);
  }
  if (has3d) {
    console.log(`  ${fonts.length ? 3 : 2}. Add .glb/.gltf models to ${cyan(`public/templates/${slug}/models/`)}`);
    console.log(`     Uncomment the dynamic import stub in page.tsx`);
  }
  if (hasAudio) {
    const step = 2 + (fonts.length ? 1 : 0) + (has3d ? 1 : 0);
    console.log(`  ${step}. Add audio files to  ${cyan(`public/templates/${slug}/audio/`)}`);
  }
  console.log(`\n  Preview: ${cyan(`http://localhost:3000/templates/${slug}`)}`);
  console.log("");
}

main();
