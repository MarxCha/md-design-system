/**
 * record-template.mjs
 * Records a template's real browser experience as video.
 * Uses Playwright's built-in video recording — captures scroll, GSAP animations, hover, everything.
 *
 * Usage:
 *   node scripts/record-template.mjs --slug=form-builder --port=3099
 *   node scripts/record-template.mjs --slug=gsap-macbook
 *   node scripts/record-template.mjs --all --port=3099
 *
 * Output: out/recordings/<slug>-desktop.webm, out/recordings/<slug>-mobile.webm
 */

import { chromium } from 'playwright';
import { mkdirSync, readdirSync, statSync, renameSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';

// ─── ANSI helpers ───
const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', green: '\x1b[32m',
  yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m', dim: '\x1b[2m',
};
const log = {
  info: (m) => console.log(`${c.cyan}${c.bold}[record]${c.reset} ${m}`),
  success: (m) => console.log(`${c.green}${c.bold}[record]${c.reset} ${m}`),
  warn: (m) => console.log(`${c.yellow}${c.bold}[record]${c.reset} ${m}`),
  error: (m) => console.error(`${c.red}${c.bold}[record]${c.reset} ${m}`),
  dim: (m) => console.log(`${c.dim}${m}${c.reset}`),
};

// ─── Config ───
const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080, scrollSpeed: 600 },
  { name: 'mobile',  width: 390,  height: 844,  scrollSpeed: 400 },
];

const SCROLL_PAUSE_MS = 800;   // pause between scroll steps
const SETTLE_MS = 2000;        // wait for page to settle after load
const END_PAUSE_MS = 1500;     // pause at bottom before stopping

// ─── Args ───
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { slug: null, all: false, port: 3099, baseUrl: null, desktopOnly: false };
  for (const arg of args) {
    if (arg === '--all') result.all = true;
    else if (arg === '--desktop-only') result.desktopOnly = true;
    else if (arg.startsWith('--slug=')) result.slug = arg.slice(7);
    else if (arg.startsWith('--port=')) result.port = parseInt(arg.slice(7), 10);
    else if (arg.startsWith('--base-url=')) result.baseUrl = arg.slice(11);
  }
  if (!result.baseUrl) result.baseUrl = `http://localhost:${result.port}`;
  return result;
}

// ─── Discover slugs ───
function discoverSlugs(root) {
  const dir = join(root, 'src', 'app', 'templates');
  try {
    return readdirSync(dir).filter(e => statSync(join(dir, e)).isDirectory());
  } catch {
    log.error(`Cannot read ${dir}`);
    return [];
  }
}

// ─── Smooth scroll recording ───
async function recordTemplate(browser, baseUrl, slug, outputDir, viewport) {
  const url = `${baseUrl}/templates/${slug}`;
  log.info(`Recording ${c.bold}${slug}${c.reset} [${viewport.name}] → ${c.dim}${url}${c.reset}`);

  const videoDir = join(outputDir, '_tmp');
  mkdirSync(videoDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    recordVideo: { dir: videoDir, size: { width: viewport.width, height: viewport.height } },
  });

  const page = await context.newPage();

  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    if (response && response.status() === 404) {
      log.warn(`  ${slug} returned 404 — skipping ${viewport.name}`);
      await context.close();
      return null;
    }

    // Wait for page to settle (fonts, images, initial animations)
    await page.waitForTimeout(SETTLE_MS);

    // Get total scrollable height
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = viewport.height;
    let scrolled = 0;

    // Smooth scroll down in steps
    while (scrolled < scrollHeight - viewportHeight) {
      const step = Math.min(viewport.scrollSpeed, scrollHeight - viewportHeight - scrolled);
      await page.mouse.wheel(0, step);
      scrolled += step;
      await page.waitForTimeout(SCROLL_PAUSE_MS);
    }

    // Pause at bottom
    await page.waitForTimeout(END_PAUSE_MS);

    // Scroll back to top smoothly
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

  } catch (err) {
    log.warn(`  Error during recording: ${err.message}`);
  }

  // Close context to finalize video
  await context.close();

  // Move video file to final destination
  const videoPath = await findVideo(videoDir);
  if (videoPath) {
    const finalName = `${slug}-${viewport.name}.webm`;
    const finalPath = join(outputDir, finalName);
    renameSync(videoPath, finalPath);
    const sizeMB = (statSync(finalPath).size / 1024 / 1024).toFixed(1);
    log.success(`  ${viewport.name.padEnd(8)} → ${c.green}${finalName}${c.reset} (${sizeMB} MB)`);

    // Convert to mp4 with ffmpeg
    const mp4Name = `${slug}-${viewport.name}.mp4`;
    const mp4Path = join(outputDir, mp4Name);
    try {
      execSync(`ffmpeg -i "${finalPath}" -c:v libx264 -crf 23 -preset fast -an "${mp4Path}" -y 2>/dev/null`);
      const mp4Size = (statSync(mp4Path).size / 1024 / 1024).toFixed(1);
      log.success(`  ${' '.repeat(8)} → ${c.green}${mp4Name}${c.reset} (${mp4Size} MB)`);
    } catch {
      log.warn(`  ffmpeg conversion failed — webm still available`);
    }

    return finalPath;
  }

  log.warn(`  No video file found`);
  return null;
}

async function findVideo(dir) {
  const files = readdirSync(dir).filter(f => f.endsWith('.webm'));
  return files.length > 0 ? join(dir, files[0]) : null;
}

// ─── Main ───
async function main() {
  const args = parseArgs();
  const root = resolve(new URL('.', import.meta.url).pathname, '..');
  const outputDir = join(root, 'out', 'recordings');
  mkdirSync(outputDir, { recursive: true });

  if (!args.slug && !args.all) {
    log.error('Use --slug=<name> or --all');
    log.dim('  node scripts/record-template.mjs --slug=form-builder --port=3099');
    log.dim('  node scripts/record-template.mjs --all --desktop-only');
    process.exit(1);
  }

  // Health check
  try {
    await fetch(args.baseUrl, { signal: AbortSignal.timeout(5000) });
  } catch {
    log.error(`Dev server not reachable at ${args.baseUrl}`);
    process.exit(1);
  }

  const slugs = args.all ? discoverSlugs(root) : [args.slug];
  log.info(`Recording ${slugs.length} template(s): ${slugs.join(', ')}`);

  const browser = await chromium.launch({ headless: true });
  const viewports = args.desktopOnly ? [VIEWPORTS[0]] : VIEWPORTS;
  let total = 0;

  for (const slug of slugs) {
    for (const vp of viewports) {
      const result = await recordTemplate(browser, args.baseUrl, slug, outputDir, vp);
      if (result) total++;
    }
  }

  await browser.close();

  // Cleanup tmp dir
  try { readdirSync(join(outputDir, '_tmp')).length === 0 && execSync(`rmdir "${join(outputDir, '_tmp')}"`); } catch {}

  console.log('');
  log.success(`Done. ${c.bold}${total}${c.reset}${c.green} recording(s) saved to out/recordings/${c.reset}`);
}

main().catch(err => { log.error(err.message); process.exit(1); });
