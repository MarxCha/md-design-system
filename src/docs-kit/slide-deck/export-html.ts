/**
 * export-html.ts — Generate a standalone HTML slide deck
 *
 * Produces a single .html file with inline CSS and JS that can be opened
 * in any browser without dependencies. Uses vanilla JS for navigation.
 */

import type { SlideDeckConfig, Slide } from "../types";
import { resolveTheme, themeToCssVars } from "../theme-bridge";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSlideHtml(slide: Slide, logo?: string): string {
  switch (slide.type) {
    case "title":
      return `
      <div class="slide slide--title">
        <div class="accent-bar"></div>
        ${logo ? `<img src="${escapeHtml(logo)}" alt="Logo" class="slide__logo" />` : ""}
        <h1 class="slide__title">${escapeHtml(slide.title)}</h1>
        ${slide.subtitle ? `<p class="slide__subtitle">${escapeHtml(slide.subtitle)}</p>` : ""}
      </div>`;

    case "content":
      return `
      <div class="slide slide--content">
        <div class="slide__heading-row">
          <div class="accent-bar accent-bar--vertical"></div>
          <h2 class="slide__heading">${escapeHtml(slide.title)}</h2>
        </div>
        <ul class="slide__bullets">
          ${slide.bullets.map((b) => `<li><span class="bullet-dot">&#x25CF;</span> ${escapeHtml(b)}</li>`).join("\n          ")}
        </ul>
        ${slide.image ? `<img src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.title)}" class="slide__image" />` : ""}
      </div>`;

    case "image":
      return `
      <div class="slide slide--image">
        <img src="${escapeHtml(slide.src)}" alt="${escapeHtml(slide.alt)}" class="slide__fullimage slide__fullimage--${slide.fit ?? "cover"}" />
        ${slide.caption ? `<p class="slide__caption">${escapeHtml(slide.caption)}</p>` : ""}
      </div>`;

    case "stats":
      return `
      <div class="slide slide--stats">
        <div class="slide__heading-row">
          <div class="accent-bar accent-bar--vertical"></div>
          <h2 class="slide__heading">${escapeHtml(slide.title)}</h2>
        </div>
        <div class="stats-grid">
          ${slide.stats
            .map(
              (s) => `
          <div class="stat-card">
            <span class="stat-value">${escapeHtml(s.value)}</span>
            <span class="stat-label">${escapeHtml(s.label)}</span>
            ${s.delta ? `<span class="stat-delta">${escapeHtml(s.delta)}</span>` : ""}
          </div>`
            )
            .join("\n")}
        </div>
      </div>`;

    case "quote":
      return `
      <div class="slide slide--quote">
        <div class="accent-bar"></div>
        <blockquote class="slide__quote">&ldquo;${escapeHtml(slide.quote)}&rdquo;</blockquote>
        <p class="slide__author">${escapeHtml(slide.author)}</p>
        ${slide.role ? `<p class="slide__role">${escapeHtml(slide.role)}</p>` : ""}
      </div>`;

    case "cta":
      return `
      <div class="slide slide--cta">
        <div class="accent-bar"></div>
        <h2 class="slide__title">${escapeHtml(slide.title)}</h2>
        ${slide.subtitle ? `<p class="slide__subtitle">${escapeHtml(slide.subtitle)}</p>` : ""}
        ${slide.buttonText ? `<a href="${escapeHtml(slide.url ?? "#")}" target="_blank" rel="noopener" class="slide__button">${escapeHtml(slide.buttonText)}</a>` : ""}
      </div>`;

    default:
      return '<div class="slide"><p>Unknown slide type</p></div>';
  }
}

export function generateStandaloneHtml(config: SlideDeckConfig): string {
  const theme = resolveTheme(config.layout, config.brandColors);
  const cssVars = themeToCssVars(theme);

  const slidesHtml = config.slides
    .map((slide, i) => `<section class="slide-wrapper" data-index="${i}" ${i > 0 ? 'style="display:none"' : ""}>${renderSlideHtml(slide, config.logo)}</section>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(config.title)} — ${escapeHtml(config.company)}</title>
  <style>
    :root {
      ${cssVars}
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: var(--dk-font-body);
      background: var(--dk-bg);
      color: var(--dk-fg);
      overflow: hidden;
      height: 100vh;
      width: 100vw;
    }

    .deck { position: relative; height: 100vh; width: 100vw; }

    .slide-wrapper {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 4rem;
    }

    /* Title */
    .slide__title {
      font-family: var(--dk-font-display);
      font-size: clamp(2rem, 5vw, 3.8rem);
      font-weight: 900;
      text-align: center;
      line-height: 1.2;
      max-width: 900px;
    }
    .slide__subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--dk-muted-fg);
      text-align: center;
      margin-top: 1.5rem;
      max-width: 600px;
      font-weight: 300;
    }
    .slide__logo { height: 48px; margin-bottom: 2rem; opacity: 0.8; }

    /* Accent bar */
    .accent-bar { width: 96px; height: 4px; border-radius: 9999px; background: var(--dk-accent); margin-bottom: 3rem; }
    .accent-bar--vertical { width: 6px; height: 32px; border-radius: 9999px; background: var(--dk-accent); margin-bottom: 0; }

    /* Content */
    .slide--content { align-items: flex-start; justify-content: center; }
    .slide__heading-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; }
    .slide__heading {
      font-family: var(--dk-font-display);
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      font-weight: 700;
    }
    .slide__bullets { list-style: none; max-width: 800px; padding-left: 1.5rem; }
    .slide__bullets li {
      font-size: clamp(0.9rem, 1.8vw, 1.25rem);
      line-height: 1.6;
      margin-bottom: 1.25rem;
      color: var(--dk-muted-fg);
    }
    .bullet-dot { color: var(--dk-accent); margin-right: 0.75rem; font-size: 0.8em; }
    .slide__image { max-height: 250px; border-radius: var(--dk-radius-lg); margin-top: 2rem; }

    /* Image */
    .slide--image { padding: 2rem; }
    .slide__fullimage { max-width: 100%; max-height: 80vh; border-radius: var(--dk-radius-lg); }
    .slide__fullimage--cover { object-fit: cover; }
    .slide__fullimage--contain { object-fit: contain; }
    .slide__caption { font-size: 0.875rem; color: var(--dk-muted-fg); margin-top: 1rem; }

    /* Stats */
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 900px; width: 100%; }
    .stat-card {
      display: flex; flex-direction: column; align-items: center;
      padding: 2rem; border-radius: var(--dk-radius-lg);
      border: 1px solid color-mix(in srgb, var(--dk-fg) 10%, transparent);
    }
    .stat-value { font-family: var(--dk-font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: var(--dk-accent); }
    .stat-label { font-size: 1.1rem; color: var(--dk-muted-fg); margin-top: 0.75rem; }
    .stat-delta { font-size: 0.875rem; color: var(--dk-accent); opacity: 0.8; margin-top: 0.25rem; }

    /* Quote */
    .slide__quote {
      font-family: var(--dk-font-display);
      font-size: clamp(1.2rem, 2.5vw, 1.8rem);
      font-style: italic;
      text-align: center;
      line-height: 1.6;
      max-width: 800px;
    }
    .slide__author { font-weight: 600; margin-top: 2rem; }
    .slide__role { font-size: 0.875rem; color: var(--dk-muted-fg); margin-top: 0.25rem; }

    /* CTA */
    .slide--cta { background: var(--dk-bg); }
    .slide__button {
      display: inline-block; margin-top: 2.5rem;
      padding: 1rem 2rem; border-radius: var(--dk-radius-md);
      background: var(--dk-accent); color: var(--dk-bg);
      font-weight: 600; font-size: 1.1rem;
      text-decoration: none; transition: opacity 0.2s;
    }
    .slide__button:hover { opacity: 0.85; }

    /* Bottom bar */
    .bottom-bar {
      position: fixed; bottom: 0; left: 0; right: 0;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1rem 2rem; z-index: 10;
    }
    .bottom-bar__meta { font-size: 0.75rem; color: var(--dk-muted-fg); }
    .nav-dots { display: flex; gap: 0.5rem; }
    .nav-dot {
      width: 8px; height: 8px; border-radius: 9999px;
      background: var(--dk-border); border: none; cursor: pointer;
      transition: all 0.2s;
    }
    .nav-dot--active { width: 24px; background: var(--dk-accent); }

    /* Click zones */
    .click-zone {
      position: fixed; top: 0; width: 25%; height: 100%;
      z-index: 5; background: none; border: none; opacity: 0;
    }
    .click-zone--prev { left: 0; cursor: w-resize; }
    .click-zone--next { right: 0; cursor: e-resize; }

    @media print {
      .slide-wrapper { display: block !important; page-break-after: always; position: relative; height: 100vh; }
      .bottom-bar, .click-zone { display: none; }
    }
  </style>
</head>
<body>
  <div class="deck" role="region" aria-label="Presentation: ${escapeHtml(config.title)}" aria-roledescription="slide deck">
    ${slidesHtml}
  </div>

  <div class="bottom-bar">
    <span class="bottom-bar__meta">${escapeHtml(config.author)} &middot; ${escapeHtml(config.date)}</span>
    <div class="nav-dots" id="nav-dots"></div>
    <span class="bottom-bar__meta" id="slide-counter">1 / ${config.slides.length}</span>
  </div>

  <button class="click-zone click-zone--prev" aria-label="Previous slide" id="prev-zone"></button>
  <button class="click-zone click-zone--next" aria-label="Next slide" id="next-zone"></button>

  <script>
    (function() {
      var current = 0;
      var total = ${config.slides.length};
      var slides = document.querySelectorAll('.slide-wrapper');
      var dots = document.getElementById('nav-dots');
      var counter = document.getElementById('slide-counter');

      // Create dots
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'nav-dot' + (i === 0 ? ' nav-dot--active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener('click', function() { goTo(parseInt(this.dataset.index)); });
        dots.appendChild(dot);
      }

      function goTo(n) {
        if (n < 0 || n >= total) return;
        slides[current].style.display = 'none';
        current = n;
        slides[current].style.display = 'flex';
        counter.textContent = (current + 1) + ' / ' + total;
        var allDots = dots.querySelectorAll('.nav-dot');
        allDots.forEach(function(d, i) {
          d.className = 'nav-dot' + (i === current ? ' nav-dot--active' : '');
        });
      }

      document.getElementById('prev-zone').addEventListener('click', function() { goTo(current - 1); });
      document.getElementById('next-zone').addEventListener('click', function() { goTo(current + 1); });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
        if (e.key === 'Home') { e.preventDefault(); goTo(0); }
        if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
      });
    })();
  </script>
</body>
</html>`;
}
