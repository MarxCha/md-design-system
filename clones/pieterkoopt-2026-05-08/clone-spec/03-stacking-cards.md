---
section: pk-stacking-cards
source_url: https://www.pieterkoopt.nl/#section_stacking-cards
extracted_at: "2026-05-08T20:30:00Z"
extraction_method: "playwright HTML capture + manual JS reverse-engineering of inline GSAP block 32 (mwg_effect031)"

tags_count: 56
classes_unique_count: 24
js_deps_detected:
  - "gsap@3.15.0"
  - "gsap/ScrollTrigger@3.15.0"

fonts_used:
  - { family: "Ivy Presto Headline", role: "display", substitute: "Cormorant Garamond" }
  - { family: "Inter", role: "body", substitute: null }
  - { family: "Geist Mono", role: "mono", substitute: null }

animations_declared:
  - id: pks-scroll-hint-fade
    target: ".scroll"
    props: ["autoAlpha"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "scroll-trigger"
      selector: ".scroll"
      threshold: "default (top bottom → bottom top)"
    sequence_index: 0
    source: "inline-gsap-blocks.js:409"
  - id: pks-card-rotate-and-shrink-0
    target: ".mwg_effect031 .slide:nth-child(1) .content"
    props: ["rotationZ", "scale", "rotationX"]
    timing: { duration: 0 }
    easing: "power1.in"
    trigger:
      type: "scroll-trigger"
      selector: ".mwg_effect031 .slide:nth-child(1)"
      threshold: "top 20% (≥992) | top 10% (≤991) → +=window.innerHeight"
    sequence_index: 1
    source: "inline-gsap-blocks.js:409"
  - id: pks-card-rotate-and-shrink-1
    target: ".mwg_effect031 .slide:nth-child(2) .content"
    props: ["rotationZ", "scale", "rotationX"]
    timing: { duration: 0 }
    easing: "power1.in"
    trigger:
      type: "scroll-trigger"
      selector: ".mwg_effect031 .slide:nth-child(2)"
      threshold: "top 20% (≥992) | top 10% (≤991) → +=window.innerHeight"
    sequence_index: 2
    source: "inline-gsap-blocks.js:409"
  - id: pks-card-fade-out-0
    target: ".mwg_effect031 .slide:nth-child(1) .content"
    props: ["autoAlpha"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "scroll-trigger"
      selector: ".mwg_effect031 .slide:nth-child(1) .content"
      threshold: "top -80% → +=0.2*window.innerHeight"
    sequence_index: 3
    source: "inline-gsap-blocks.js:409"
  - id: pks-card-fade-out-1
    target: ".mwg_effect031 .slide:nth-child(2) .content"
    props: ["autoAlpha"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "scroll-trigger"
      selector: ".mwg_effect031 .slide:nth-child(2) .content"
      threshold: "top -80% → +=0.2*window.innerHeight"
    sequence_index: 4
    source: "inline-gsap-blocks.js:409"
  - id: pks-card-fade-out-2
    target: ".mwg_effect031 .slide:nth-child(3) .content"
    props: ["autoAlpha"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "scroll-trigger"
      selector: ".mwg_effect031 .slide:nth-child(3) .content"
      threshold: "top -80% → +=0.2*window.innerHeight"
    sequence_index: 5
    source: "inline-gsap-blocks.js:409"
  - id: pks-content-pin-0
    target: ".mwg_effect031 .slide:nth-child(1) .content-wrapper"
    props: ["pin"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "scroll-trigger"
      selector: ".mwg_effect031 .slide:nth-child(1)"
      threshold: "top 20% (≥992) | top 10% (≤991) → +=window.innerHeight"
    sequence_index: 6
    source: "inline-gsap-blocks.js:409"
  - id: pks-content-pin-1
    target: ".mwg_effect031 .slide:nth-child(2) .content-wrapper"
    props: ["pin"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "scroll-trigger"
      selector: ".mwg_effect031 .slide:nth-child(2)"
      threshold: "top 20% (≥992) | top 10% (≤991) → +=window.innerHeight"
    sequence_index: 7
    source: "inline-gsap-blocks.js:409"

interaction_model: "scroll-driven"

responsive_at:
  "1440":
    layout: "Single column inside container-col-11. Heading 'SELLING PAINTINGS / WITHOUT THE HASSLE' (with green accent) + paragraph. Below, .mwg_effect031 wraps 3 vertical .slide elements. Each slide has .content-wrapper > .content > .stacking-card with: card-number (01/02/03), heading-s + alt-heading, paragraph-m, and a .stacking-card_video Vimeo MP4. As user scrolls, the first 2 slides PIN their content-wrapper while the .content rotateZ (random ±5deg) + scale 0.7 + rotateX 40deg, then autoAlpha→0. The 3rd (last) slide ONLY autoAlpha-fades — no rotate/scale tween (idx === slides.length-1 guard). Start trigger at top 20% on viewports >991."
  "768":
    layout: "Same DOM, single-column stack. Card-number sits above heading; video below text. Pin still active but start trigger shifts to 'top 10%' per the (max-width: 991px) media-query in source. Last-slide exclusion still applies."
  "390":
    layout: "Same single-column stack. Heading clamps down (~clamp 2rem→3rem). Video aspect ratio maintained. Pin/scrub still active (matches source: no innerWidth>991 guard around block 32 — only the start position changes). Card padding reduces to 1.25rem."

text_splitting_method: null
text_splitting_exception: null
smooth_scroll_library: null

arsenal_md_consulted:
  - "AP-1"
  - "AP-7"
  - "AP-11"
  - "AP-16"
  - "AP-17"
  - "AP-19"
  - "AP-20"

scoped_token_prefix: "--pks-"
---

# Section spec — pk-stacking-cards (`section_stacking-cards`)

## Source evidence

- HTML: `clones/pieterkoopt-2026-05-08/_evidence/section-stacking-cards.html`
- JS animations: `clones/pieterkoopt-2026-05-08/_evidence/js-chunks/inline-gsap-blocks.js`
  - Block 32 (line 409) — fades `.scroll` hint; for each `.slide` in `.mwg_effect031`,
    pins `.content-wrapper` and tweens `.content` (rotationZ, scale 0.7, rotationX 40,
    ease `power1.in`, scrub) — except the LAST slide. Then a separate scrubbed
    autoAlpha→0 fade on every `.content`.

## DOM structure (verbatim hierarchy)

```
section.section_stacking-cards
└── .padding-global
    └── .section-padding-256px.padding-top
        └── .container-col-11
            ├── .padding-bottom.padding-80px
            │   └── .hiw-header
            │       ├── h2.heading-l "SELLING PAINTINGS WITHOUT THE HASSLE" (alt span "WITHOUT THE HASSLE" in green)
            │       └── .max-width-col-03 > p.paragraph-l (intro copy)
            └── .mwg_effect031
                ├── .slide                                  (idx 0)
                │   └── .content-wrapper > .content
                │       └── .stacking-card
                │           ├── .stacking-card_info-wrap
                │           │   ├── .card-number "01"
                │           │   └── .stacking-card_info
                │           │       ├── h3.heading-wrapper > .heading-s "Upload your" + alt-heading "Artwork"
                │           │       └── .padding-top.padding-40px > p.paragraph-m
                │           └── .stacking-card_video > .video-cover > video (Vimeo MP4)
                ├── .slide                                  (idx 1)  → step 02 "Review by Pieter"
                └── .slide.is-last                          (idx 2 = LAST → no rotate/scale tween)
                    → step 03 "personal appointment"
```

## Content (verbatim)

### Heading
- `SELLING PAINTINGS` + green-accent span `WITHOUT THE HASSLE`

### Paragraph
> At PieterKoopt®, we keep things simple, fast and transparent. Follow the steps below and we will take care of the rest.

### Steps
1. **01 — Upload your Artwork** — Take clear photos, tell the story behind your artwork and upload everything easily via our platform.
2. **02 — Review by Pieter** — We carefully review your submission. If your painting qualifies, we'll arrange a personal viewing. You will hear from us within 48 hours.
3. **03 — personal appointment** — If your artwork is suitable, we will schedule an appointment. Pieter will visit you together with a specialist and give you a fair offer straight away.

### Vimeo video sources (mirrored to `public/templates/pk-stacking-cards/`)
- Step 01: `https://player.vimeo.com/progressive_redirect/playback/1090413369/rendition/720p/file.mp4` → `step-01.mp4`
- Step 02: `https://player.vimeo.com/progressive_redirect/playback/1090413357/rendition/720p/file.mp4` → `step-02.mp4`
- Step 03: `https://player.vimeo.com/progressive_redirect/playback/1090413333/rendition/720p/file.mp4` → `step-03.mp4`

NOTE (AP-7): These Vimeo URLs are signed and expire. We reference them via remote URL with `crossOrigin="anonymous"` fallback; if mirror is required, the foreman runs `curl -o public/templates/pk-stacking-cards/step-0N.mp4 <url>` post-dispatch.

## Animation logic (block 32 reverse-engineered)

```js
// Block 32 — inline-gsap-blocks.js:409
gsap.to(".scroll", { autoAlpha: 0, /* …scrubbed scroll-fade… */ });

const slides = document.querySelectorAll(".mwg_effect031 .slide");
const mq = window.matchMedia("(max-width: 991px)");

slides.forEach((slide, idx) => {
  const wrapper = slide.querySelector(".content-wrapper");
  const content = slide.querySelector(".content");
  const rand = Math.random();      // → ±5° rotateZ jitter

  // CRITICAL: last slide is EXCLUDED from rotate/scale tween
  if (idx !== slides.length - 1) {
    gsap.to(content, {
      rotationZ: 10 * (rand - 0.5), // → range [-5°, +5°]
      scale: 0.7,
      rotationX: 40,
      ease: "power1.in",
      scrollTrigger: {
        pin: wrapper,
        trigger: slide,
        start: mq.matches ? "top 10%" : "top 20%",
        end: "+=" + window.innerHeight,
        scrub: true,
      },
    });
  }

  // ALL slides (including last) fade out
  gsap.to(content, {
    autoAlpha: 0,
    scrollTrigger: {
      trigger: content,
      start: "top -80%",
      end: "+=" + 0.2 * window.innerHeight,
      scrub: true,
    },
  });
});
```

## Constraints declared

- AP-1: explicitly `scroll-driven`. Builder MUST register ScrollTrigger.
- AP-7: Remote Vimeo MP4 sources are signed; we reference by URL with `<video preload="metadata">`. If mirror needed, foreman copies to `public/templates/pk-stacking-cards/`.
- AP-11: 3 viewports declared. The (max-width: 991px) media-query swaps `start: "top 20%"` → `"top 10%"`. Block 32 is NOT guarded behind innerWidth>991 — animation runs at every viewport (only start point changes).
- AP-16: every animation in `animations_declared` cites `inline-gsap-blocks.js:409`.
- AP-17: NO additional gsap.* calls — exactly: scroll-fade (1) + per-slide rotate-and-shrink (N-1 = 2) + per-slide fade-out (N = 3) + per-slide pin (N-1 = 2 — pin is property of the rotate-tween, captured separately for traceability) = 8 declared animations.
- AP-19: `<h2>`, `<h3>` scoped under `.pks-stacking-cards-template`.
- AP-20: CSS lives under `.pks-stacking-cards-template { … }` only. No `@layer utilities`.

## Implementation notes

- Use `next/font/google` Cormorant Garamond + Inter via layout (matches `--pks-font-*` variables).
- Honor the LAST-slide exclusion: builder must check `idx !== slides.length - 1` before creating the rotate/scale tween. Returning a tween for the last slide → AP-16 violation.
- `rand` is computed at mount — use a stable seed (`Math.random()` per slide once on first effect tick) so the rotation jitter is consistent across renders.
- Pin uses `pinSpacing` default (`true`), so the section needs no extra trailing spacer (block 32 lets pin auto-create whitespace).
- Mobile (max-width:991): swap to `start: "top 10%"`. Animation still runs.
- `.scroll` element does not exist in this section's HTML. The `gsap.to(".scroll", ...)` call from block 32 targets a global scroll-hint indicator outside this section. We declare it for traceability but do NOT render a `.scroll` element here — the selector falls through harmlessly when absent (matches source behavior).
