/**
 * capture-screenshots.mjs
 * Playwright script for the Remotion video pipeline.
 * Captures mobile + desktop screenshots of templates at retina quality.
 *
 * Usage:
 *   node scripts/capture-screenshots.mjs --slug=gsap-cocktails --port=3000
 *   node scripts/capture-screenshots.mjs --slug=zentry
 *   node scripts/capture-screenshots.mjs --all
 */

import { chromium } from 'playwright';
import { mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

// ---------------------------------------------------------------------------
// ANSI color helpers
// ---------------------------------------------------------------------------
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

const log = {
  info: (msg) => console.log(`${c.cyan}${c.bold}[capture]${c.reset} ${msg}`),
  success: (msg) => console.log(`${c.green}${c.bold}[capture]${c.reset} ${msg}`),
  warn: (msg) => console.log(`${c.yellow}${c.bold}[capture]${c.reset} ${msg}`),
  error: (msg) => console.error(`${c.red}${c.bold}[capture]${c.reset} ${msg}`),
  dim: (msg) => console.log(`${c.dim}${msg}${c.reset}`),
};

// ---------------------------------------------------------------------------
// Arg parsing
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    slug: null,
    all: false,
    port: 3000,
    baseUrl: null,
  };

  for (const arg of args) {
    if (arg === '--all') {
      result.all = true;
    } else if (arg.startsWith('--slug=')) {
      result.slug = arg.slice('--slug='.length);
    } else if (arg.startsWith('--port=')) {
      result.port = parseInt(arg.slice('--port='.length), 10);
    } else if (arg.startsWith('--base-url=')) {
      result.baseUrl = arg.slice('--base-url='.length);
    }
  }

  if (!result.baseUrl) {
    result.baseUrl = `http://localhost:${result.port}`;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Server health check
// ---------------------------------------------------------------------------
async function checkServer(baseUrl) {
  try {
    const res = await fetch(baseUrl, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      log.warn(`Server responded with status ${res.status}, continuing anyway.`);
    }
    return true;
  } catch {
    log.error(`Dev server is not reachable at ${baseUrl}`);
    log.error('Start it with:  npm run dev');
    log.dim('  If you are using a different port, pass --port=<n> or --base-url=<url>');
    return false;
  }
}

// ---------------------------------------------------------------------------
// Discover template slugs from filesystem
// ---------------------------------------------------------------------------
function discoverSlugs(projectRoot) {
  const templatesDir = join(projectRoot, 'src', 'app', 'templates');
  let entries;
  try {
    entries = readdirSync(templatesDir);
  } catch {
    log.error(`Cannot read templates directory: ${templatesDir}`);
    log.dim('  Make sure src/app/templates/ exists and contains template subdirectories.');
    return [];
  }

  const slugs = entries.filter((entry) => {
    try {
      return statSync(join(templatesDir, entry)).isDirectory();
    } catch {
      return false;
    }
  });

  if (slugs.length === 0) {
    log.warn('No template directories found in src/app/templates/');
  }

  return slugs;
}

// ---------------------------------------------------------------------------
// Screenshot capture for a single template
// ---------------------------------------------------------------------------
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

async function captureTemplate(browser, baseUrl, slug, projectRoot) {
  const url = `${baseUrl}/templates/${slug}`;
  const results = [];

  log.info(`Capturing: ${c.bold}${slug}${c.reset} → ${c.dim}${url}${c.reset}`);

  for (const viewport of VIEWPORTS) {
    const outputDir = join(projectRoot, 'public', 'templates', slug, 'screens');
    const filename = `${slug}-${viewport.name}.png`;
    const outputPath = join(outputDir, filename);

    mkdirSync(outputDir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
    });

    const page = await context.newPage();

    try {
      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30_000,
      });

      if (response && response.status() === 404) {
        log.warn(`  Template "${slug}" returned 404 — skipping ${viewport.name}.`);
        await context.close();
        continue;
      }

      // Extra wait for animations / fonts / videos to settle
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: outputPath,
        fullPage: false,
      });

      const relPath = outputPath.replace(projectRoot + '/', '');
      log.success(`  ${viewport.name.padEnd(8)} → ${c.green}${relPath}${c.reset}`);
      results.push({ viewport: viewport.name, path: outputPath });
    } catch (err) {
      log.warn(`  Failed to capture ${viewport.name} for "${slug}": ${err.message}`);
    } finally {
      await context.close();
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = parseArgs();
  const projectRoot = resolve(new URL('.', import.meta.url).pathname, '..');

  if (!args.slug && !args.all) {
    log.error('No target specified. Use --slug=<name> or --all.');
    log.dim('  Examples:');
    log.dim('    node scripts/capture-screenshots.mjs --slug=zentry');
    log.dim('    node scripts/capture-screenshots.mjs --all --port=3001');
    process.exit(1);
  }

  // Health check
  const serverOk = await checkServer(args.baseUrl);
  if (!serverOk) process.exit(1);

  // Resolve slugs
  let slugs = [];
  if (args.all) {
    slugs = discoverSlugs(projectRoot);
    if (slugs.length === 0) process.exit(1);
    log.info(`Found ${slugs.length} template(s): ${slugs.join(', ')}`);
  } else {
    slugs = [args.slug];
  }

  // Launch browser
  const browser = await chromium.launch({ headless: true });

  const summary = [];
  let totalCaptured = 0;
  let totalSkipped = 0;

  for (const slug of slugs) {
    const captured = await captureTemplate(browser, args.baseUrl, slug, projectRoot);
    if (captured.length === 0) {
      totalSkipped++;
    } else {
      totalCaptured += captured.length;
      summary.push({ slug, captured });
    }
  }

  await browser.close();

  // Summary
  console.log('');
  log.info('─'.repeat(50));
  log.success(
    `Done. ${c.bold}${totalCaptured}${c.reset}${c.green} screenshot(s) saved${c.reset}` +
      (totalSkipped > 0 ? `, ${c.yellow}${totalSkipped} skipped${c.reset}` : '') +
      '.'
  );

  if (summary.length > 0) {
    for (const { slug, captured } of summary) {
      log.dim(`  ${slug}:`);
      for (const { viewport, path } of captured) {
        log.dim(`    [${viewport}] ${path}`);
      }
    }
  }
}

main().catch((err) => {
  log.error(`Unexpected error: ${err.message}`);
  console.error(err);
  process.exit(1);
});
