---
section: pk-hero
source_url: https://www.pieterkoopt.nl/#hero
extracted_at: "2026-05-08T17:30:00Z"
extraction_method: "playwright + curl + manual JS reverse-engineering of inline <script> blocks"

tags_count: 65
classes_unique_count: 56
js_deps_detected:
  - "gsap@3.15.0"
  - "gsap/ScrollTrigger@3.15.0"
  - "gsap/SplitText@3.15.0"
  - "gsap/CustomEase@3.15.0"
  - "@dotlottie/player-component@latest"
  - "howler@2.2.3"

fonts_used:
  - { family: "Ivy Presto Headline", role: "display", substitute: "Cormorant Garamond" }
  - { family: "Geist Mono", role: "mono", substitute: null }
  - { family: "Inter", role: "body", substitute: null }

animations_declared:
  - id: hero-clip-reveal
    target: ".hero"
    props: ["clipPath"]
    timing: { duration: 1.0 }
    easing: "cubic-bezier(.87,0,.13,1)"
    trigger:
      type: "load"
      delay: 0.0
    sequence_index: 0
    source: "inline-gsap-blocks.js:398"
  - id: hero-video-entrance
    target: ".video-container"
    props: ["scale", "rotation", "clipPath"]
    timing: { duration: 1.25 }
    easing: "cubic-bezier(.87,0,.13,1)"
    trigger:
      type: "load"
      delay: 0.0
    sequence_index: 1
    source: "inline-gsap-blocks.js:398"
  - id: hero-intro-outline-reveal
    target: ".hero-outline_wrap"
    props: ["scale", "opacity", "visibility"]
    timing: { duration: 1.0, delay: 0.3 }
    easing: "power2.out"
    trigger:
      type: "load"
      delay: 0.3
    sequence_index: 2
    source: "inline-gsap-blocks.js:398"
  - id: hero-intro-signature-fadeout
    target: ".intro-signature"
    props: ["opacity"]
    timing: { duration: 0.6, delay: 1.0 }
    easing: "power2.out"
    trigger:
      type: "load"
      delay: 1.0
    sequence_index: 3
    source: "inline-gsap-blocks.js:398"
  - id: hero-intro-content-reveal
    target: ".intro-content"
    props: ["visibility", "opacity"]
    timing: { duration: 0.6 }
    easing: "cubic-bezier(.87,0,.13,1)"
    trigger:
      type: "load"
      delay: 0.1
    sequence_index: 4
    source: "inline-gsap-blocks.js:398"
  - id: hero-text-split-reveal-h1
    target: "h1.heading-m"
    props: ["opacity", "y"]
    timing: { duration: 0.6, perChar: 0.0 }
    easing: "cubic-bezier(.509,.188,.041,.989)"
    trigger:
      type: "scroll-trigger"
      selector: "self"
      threshold: "top 90%"
    sequence_index: 5
    source: "inline-gsap-blocks.js:130"
  - id: hero-text-split-reveal-p
    target: "p.paragraph-l"
    props: ["opacity", "y"]
    timing: { duration: 0.8, perChar: 0.0 }
    easing: "cubic-bezier(.509,.188,.041,.989)"
    trigger:
      type: "scroll-trigger"
      selector: "self"
      threshold: "top 90%"
    sequence_index: 6
    source: "inline-gsap-blocks.js:130"

interaction_model: "combination"

responsive_at:
  "1440": { layout: "full-bleed video, callout pinned top-left, h1+CTA bottom-left, intro overlay centered until dismissed" }
  "768": { layout: "full-bleed video, callout hidden (.hide-mobile), h1+CTA stack center-left, intro overlay full-screen" }
  "390": { layout: "full-bleed video, callout hidden, h1+CTA stack vertical, CTA full-width, intro overlay full-screen" }

text_splitting_method: "gsap-splittext"
text_splitting_exception: null
smooth_scroll_library: "gsap-scrollsmoother"

arsenal_md_consulted: ["AP-1", "AP-7", "AP-11", "AP-16", "AP-17"]

scoped_token_prefix: "--pk-"
---

# PieterKoopt Hero — Specification (Hugo-A strict)

> Auditable contract. Frontmatter is machine-validated. Body is human-readable detail.

## Overview

- **Target file:** `src/app/templates/pk-hero/_components/Hero.tsx`
- **Section evidence:** `clones/pieterkoopt-2026-05-08/_evidence/hero-section.html` (5.4KB extracted source)
- **JS source-of-truth:** `clones/pieterkoopt-2026-05-08/_evidence/js-chunks/inline-gsap-blocks.js` (15.5KB)
- **Original source HTML:** `/tmp/pk-source.html` (re-fetchable from `https://www.pieterkoopt.nl/`)
- **Section visible at:** `https://www.pieterkoopt.nl/` top of page (above-fold)

## DOM hierarchy (decoded from rendered HTML)

```
<section.section_home-hero>
├── <div.embed---intro-css.w-embed>
│     └── <style>  (inline CSS for .hero + .video-container)
└── <div.sticky-hero>
      ├── <div.hero-outline_wrap>
      │     └── <div.hero-outline>
      ├── <div.hero>
      │     ├── <div.callout-wrapper.is-hero.hide-mobile>  (top-left painting metadata)
      │     │     └── "VINCENT VAN GOGH - STERRENNACHT 1889"
      │     ├── <div#hero-video.video-container>
      │     │     └── <video src="vimeo:1076413178/1080p" autoplay muted loop playsinline>
      │     ├── <div.video-overlay>
      │     └── <div.hh_content>
      │           ├── <div.hh_title>
      │           │     ├── <h1.heading-m>Time changes everything.<br><span.alt-heading>Except history.</span></h1>
      │           │     └── <p.paragraph-l>Want to sell a painting or collection?...</p>
      │           └── <a.btn-animate-chars href="/sell-your-painting">Sell your painting</a>
      └── <div.padding-global><div.container-col-12>
            └── <div.intro>  (sibling overlay, full-screen until dismissed)
                  ├── <div.intro-signature>  (Lottie: pieterkoopt 3.lottie)
                  └── <div.intro-content>
                        ├── <svg.icon-40px>  (5-bar mountain glyph)
                        ├── <p>For the best experience, we recommend turning on your sound.</p>
                        └── <div.button-group>
                              ├── <a#without-audio>Without audio</a>
                              └── <a#with-audio>With audio</a>
```

## Initial CSS state (from inline `<style>`, before GSAP fires)

### `.hero`
- `position: relative; width: 100vw; height: 100svh`
- `background-color: #171C1C`  (deep ink — masthead until video reveals)
- `display: flex`

### `.video-container`
- `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`
- `width: 100%; height: 100%`
- `background-color: #000`
- `clip-path: polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)`  ← THE KEY: video starts as small inner box
- `will-change: transform, clip-path`
- `overflow: hidden`

### `.video-container video`
- `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`
- `width: auto; height: auto; min-width: 100%; min-height: 100%`
- `object-fit: cover`
- `opacity: 0.85`  ← intentional dark overlay from Pieter Koopt

## Out of scope (page-level, not Hero component)

Block 28 also drives `.navbar` slide-in (y:-150% → 0%, +0.7s), `.navbar_menu > *` stagger (+1.5s after navbar arrives), and `.popup-comp` slide-in (y:150% → 0%, +0.5s). These animate elements that live OUTSIDE this Hero section — they are page-level chrome rendered by a separate `<Navbar />` component (and `<PopupComp />` for the cookie/audio popup). They were intentionally removed from `animations_declared` because the post-dispatch verifier requires every declared animation to have a matching reference in the Hero output. Documenting the timing here so the future Navbar component spec can pick up the same delay budget (0.5s — 1.5s after Hero clip-reveal starts).

## States & behaviours

The Hero has TWO entry paths controlled by `localStorage.getItem("introPlayed")`:

### Path A — First visit (introPlayed == null)
1. `body.style.overflow = "hidden"`
2. ScrollSmoother paused
3. Initial GSAP set: `.intro-content` opacity:0, `.navbar` y:-150% opacity:0 hidden, `.popup-comp` y:150% opacity:0 hidden, `.hero-outline_wrap` scale:1.1 opacity:0 hidden, `.intro-signature` opacity:1 visible
4. Timeline `i`:
   - +0.3s: `.hero-outline_wrap` → visible, opacity:1, scale:1, dur:1, ease:power2.out
   - +1.0s after that: `.intro-signature` → opacity:0, dur:0.6, ease:power2.out
   - +0.1s after that: `.intro-content` → visible, opacity:1, dur:0.6, custom ease
5. User clicks `#with-audio` or `#without-audio`:
   - `.intro-content` → opacity:0, dur:0.6, ease:power2.out
   - on complete: `.intro-content` display:none, then function `t()` runs (the hero entrance), then `localStorage.setItem("introPlayed", "true")`

### Path B — Return visit (introPlayed == "true")
1. `.intro-signature` and `.intro-content` set to opacity:0 display:none immediately
2. `.hero-outline_wrap` set to visible, scale:1, opacity:1
3. `body.style.overflow = "visible"`, ScrollSmoother resumed
4. Function `t()` runs IMMEDIATELY (no intro)

### Function `t()` — hero entrance choreography
Fires on intro-end (Path A click) or page-load (Path B).

- `gsap.set(".video-container", { scale: 0, rotation: 20 })`  ← collapse video to 0
- `gsap.to(".hero", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: customEase })`
  - `customEase = CustomEase.create("custom", ".87,0,.13,1")`
  - Initial `.hero` clipPath was inherited from `.video-container`'s `polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)` (small inner box) — this expands to full viewport
- onStart of `.hero` clipPath:
  - `.video-container` → scale:1, rotation:0, clipPath:full polygon, dur:1.25, custom ease
  - `.navbar` & `.popup-comp` set visibility:visible
  - `.navbar` → y:0%, opacity:1, dur:1, ease:power2.out, **delay:0.7**
    - onComplete: `.navbar_menu > *` → opacity:1, y:0, dur:0.6, ease:power2.out, **stagger:0.15**
      - onComplete: body.style.overflow="visible", `.navbar-mask`.style.overflow="visible", ScrollSmoother resumed
  - `.popup-comp` → y:0%, opacity:1, dur:1, ease:power2.out, **delay:0.5**

### Concurrent: SplitText reveals (block 16)
- All `<h1>, <h2>, <h3>, <h4>, <p>` (excluding `[data-gsap-text="false"]`) get split into lines on `document.fonts.ready`
- Each heading's lines: from opacity:0 y:20 → visible, dur:0.6, ease:`cubic-bezier(.509,.188,.041,.989)`, stagger:0.15, scrollTrigger:start "top 90%"
- Each paragraph's lines: same but dur:0.8, stagger:0.1
- For above-fold hero text: fires immediately after fonts load

### Concurrent: Video IntersectionObserver (block 25)
- `IntersectionObserver({ threshold: 0.25 })` watches every `<video>`
- on isIntersecting → `video.play()`
- on !isIntersecting → `video.pause(); video.currentTime = 0`
- For hero video: plays on load (since 100% in viewport), pauses on scroll-away

### Concurrent: window load handler (block 24)
- `#hero-video.style.display = "block"` on `window.load` (FOUC protection — video stays display:none until full window assets ready)

### Concurrent: ScrollSmoother (block 14)
- On DOMContentLoaded, dynamically loads `https://cdn.jsdelivr.net/gh/devuncommon/gsap/ScrollSmoother.min.js`
- `ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: true, smoothTouch: 0.1, effects: true })`
- Excluded paths: `/sell-your-painting`, `/contact`. Hero is on `/` so smoother IS active.

## Animation: `hero-clip-reveal`
- **Source:** `inline-gsap-blocks.js:398` (block 28)
- **Trigger:** load (or audio-button click on first visit)
- **State A:** `.hero` clip-path inherited (effectively the inner-box from `.video-container`'s init)
- **State B:** `.hero` clip-path = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` (full)
- **Implementation hint:** Use a `useGSAP` hook with `clipPath` tween. CustomEase must be registered via `CustomEase.create("pkCustom", ".87,0,.13,1")`. Tie to either a `localStorage`-driven mount effect or a controlled `started` state from IntroOverlay's audio click.

## Animation: `hero-video-entrance`
- **Source:** `inline-gsap-blocks.js:398`
- **Trigger:** onStart of `hero-clip-reveal` (chained)
- **State A:** `.video-container` scale:0, rotation:20°, initial clip-path inner box
- **State B:** scale:1, rotation:0, clip-path full polygon
- **Implementation hint:** Single `gsap.to` with `transformOrigin` defaulting to center; the rotation:20→0 on a scale:0→1 means the box grows AND rotates. Don't separate into two tweens — must be coupled.

## Animation: `hero-text-split-reveal-h1` & `hero-text-split-reveal-p`
- **Source:** `inline-gsap-blocks.js:130` (block 16)
- **Trigger:** `ScrollTrigger.create({ trigger: heading, start: "top 90%", toggleActions: "play none none none" })` AFTER `document.fonts.ready`
- **State A:** Lines split, opacity:0, y:20px
- **State B:** opacity:1, y:0
- **Implementation hint:** Use `SplitText` with `type: "lines"`. Wait for `document.fonts.ready` Promise before splitting (font metrics affect line breaks). Stagger 0.15 for h1, 0.1 for p. **Do not** abstract to `data-gsap-text` attribute — for hero we KNOW the targets, hardcode them.

## Per-state content

### State: "intro-first-visit"
- Lottie signature: `https://cdn.prod.website-files.com/67890d3b1a9365a1173c954e/68273d4a0ac27c085d34af35_pieterkoopt%203.lottie`
- Body: "For the best experience, we recommend turning on your sound."
- Buttons: "With audio" / "Without audio"

### State: "hero-revealed" (post intro click OR return visit)
- Callout (top-left, ≥768px): "VINCENT VAN GOGH - STERRENNACHT 1889"
- H1: "Time changes everything." `<br>` "Except history." (2nd line in `.alt-heading`)
- Paragraph: "Want to sell a painting or collection? You can, with the respect it deserves! PieterKoopt® keeps the painting and its story alive."
- CTA: "Sell your painting" → `/sell-your-painting`

## Assets used

- `public/templates/pk-hero/hero-video.mp4` — Vimeo `1076413178` 1080p MP4 (mirror locally; do NOT hot-link Vimeo CDN per AP-7)
- `public/templates/pk-hero/intro-signature.lottie` — Lottie file from CDN (mirror locally)
- shadcn primitives: `@/components/ui/button` for "Sell your painting" CTA (variant="green" custom)
- Lucide icons: none — the 5-bar mountain SVG is custom inline (recreate as React component)

## Text content (verbatim — diff against `ground-truth.json`)

```
H1 line 1: "Time changes everything."
H1 line 2 (.alt-heading): "Except history."
Paragraph: "Want to sell a painting or collection? You can, with the respect it deserves! PieterKoopt® keeps the painting and its story alive."
CTA: "Sell your painting"
Callout L1: "VINCENT VAN GOGH - STERRENNACHT"
Callout L2: "1889"
Intro body: "For the best experience, we recommend turning on your sound."
Intro CTA A: "With audio"
Intro CTA B: "Without audio"
```

## Responsive details

| Width | Layout | What changes |
|-------|--------|--------------|
| 1440 | full-bleed video, callout pinned top-left, h1+CTA bottom-left, intro overlay centered | baseline; callout visible (`.hide-mobile` not active above 992px) |
| 768  | full-bleed video, callout hidden (`.hide-mobile`), h1+CTA stack center-left, intro overlay full-screen | callout disappears; ScrollSmoother smoothTouch=0.1 |
| 390  | full-bleed video, callout hidden, h1+CTA stack vertical, CTA full-width, intro overlay full-screen | smaller text scales, button full-width by Tailwind responsive utilities |

## Anti-patterns this spec is engineered to avoid

- **AP-1** (interaction model committed): `combination` — Hero has time-driven (intro timeline) + click-driven (audio buttons) + scroll-driven (SplitText reveals + IO video). `static` would be wrong.
- **AP-7** (don't hot-link 3rd-party CDN): mirror Vimeo MP4 + Lottie locally.
- **AP-11** (responsive committed): all 3 breakpoints documented.
- **AP-16** (don't invent animations from screenshot): every entry in `animations_declared` cites a source line in `inline-gsap-blocks.js`.
- **AP-17** (don't invent GSAP refs on static SVGs): GSAP refs are only for `.hero`, `.video-container`, `.navbar`, `.popup-comp`, `.hero-outline_wrap`, `.intro-signature`, `.intro-content`, plus h1 and p. The 5-bar mountain SVG inside `.intro-content` is static (animated only via parent's opacity tween).

## Pre-dispatch sanity (foreman fills in)

- [x] Frontmatter validates against `templates/spec-schema.json` (smoke-tested via post-dispatch-verify.py)
- [x] Initial CSS values copied verbatim from inline `<style>`
- [x] `interaction_model` is committed (`combination`)
- [x] Every `animations_declared` entry has `source: <file>:<line>` citation
- [x] Every `fonts_used` entry has either `substitute: null` or a documented substitute (Cormorant Garamond for Ivy Presto Headline)
- [x] Multi-state content captured (intro-first-visit + hero-revealed)
- [x] Verbatim text matches ground-truth.json (Hero text from `/tmp/pk-source.html`)
- [ ] Section assets present in `public/templates/pk-hero/` — **TODO Sprint 2 step 4 (download Vimeo + Lottie)**
- [x] `responsive_at` populated for 1440 + 768 + 390
- [x] Body under ~250 lines
- [x] `arsenal_md_consulted` lists ≥3 anti-patterns this spec is engineered to avoid
