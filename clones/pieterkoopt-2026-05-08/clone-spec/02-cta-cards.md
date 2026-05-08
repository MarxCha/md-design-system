---
section: pk-cta-cards
source_url: https://www.pieterkoopt.nl/#section_cta-cards
extracted_at: "2026-05-08T19:00:00Z"
extraction_method: "playwright HTML capture + manual JS reverse-engineering of inline GSAP blocks 30-31"

tags_count: 38
classes_unique_count: 22
js_deps_detected:
  - "gsap@3.15.0"
  - "gsap/ScrollTrigger@3.15.0"

fonts_used:
  - { family: "Ivy Presto Headline", role: "display", substitute: "Cormorant Garamond" }
  - { family: "Inter", role: "body", substitute: null }
  - { family: "Geist Mono", role: "mono", substitute: null }

animations_declared:
  - id: pkc-panel-pin
    target: ".panel"
    props: ["pin", "pinSpacing"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "scroll-trigger"
      selector: ".usp-cards-section"
      threshold: "top top → bottom bottom"
    sequence_index: 0
    source: "inline-gsap-blocks.js:402"
  - id: pkc-circles-pin
    target: ".uc-container"
    props: ["pin", "y"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "scroll-trigger"
      selector: ".pin-height"
      threshold: "top top → bottom bottom"
    sequence_index: 1
    source: "inline-gsap-blocks.js:406"
  - id: pkc-circle-rotate-0
    target: ".uc-circle:nth-child(1)"
    props: ["rotation"]
    timing: { duration: 0 }
    easing: "power1.out"
    trigger:
      type: "scroll-trigger"
      selector: ".pin-height"
      threshold: "top top → +=segmentHeight"
    sequence_index: 2
    source: "inline-gsap-blocks.js:406"
  - id: pkc-circle-rotate-1
    target: ".uc-circle:nth-child(2)"
    props: ["rotation"]
    timing: { duration: 0 }
    easing: "power1.out"
    trigger:
      type: "scroll-trigger"
      selector: ".pin-height"
      threshold: "top top-=segmentHeight*1 → +=segmentHeight"
    sequence_index: 3
    source: "inline-gsap-blocks.js:406"
  - id: pkc-circle-rotate-2
    target: ".uc-circle:nth-child(3)"
    props: ["rotation"]
    timing: { duration: 0 }
    easing: "power1.out"
    trigger:
      type: "scroll-trigger"
      selector: ".pin-height"
      threshold: "top top-=segmentHeight*2 → +=segmentHeight"
    sequence_index: 4
    source: "inline-gsap-blocks.js:406"
  - id: pkc-card-rotate-and-shift-0
    target: ".uc-circle:nth-child(1) .uc-card"
    props: ["rotation", "y"]
    timing: { duration: 0 }
    easing: "power1.out"
    trigger:
      type: "scroll-trigger"
      selector: ".pin-height"
      threshold: "top top → +=segmentHeight"
    sequence_index: 5
    source: "inline-gsap-blocks.js:406"
  - id: pkc-card-rotate-and-shift-1
    target: ".uc-circle:nth-child(2) .uc-card"
    props: ["rotation", "y"]
    timing: { duration: 0 }
    easing: "power1.out"
    trigger:
      type: "scroll-trigger"
      selector: ".pin-height"
      threshold: "top top-=segmentHeight*1 → +=segmentHeight"
    sequence_index: 6
    source: "inline-gsap-blocks.js:406"
  - id: pkc-card-rotate-and-shift-2
    target: ".uc-circle:nth-child(3) .uc-card"
    props: ["rotation", "y"]
    timing: { duration: 0 }
    easing: "power1.out"
    trigger:
      type: "scroll-trigger"
      selector: ".pin-height"
      threshold: "top top-=segmentHeight*2 → +=segmentHeight"
    sequence_index: 7
    source: "inline-gsap-blocks.js:406"

interaction_model: "scroll-driven"

responsive_at:
  "1440":
    layout: "Two-column inside container-col-12: left .cc_content (heading + paragraph + CTA + 3 stacked uc-card USPs in cta-cards-wrap), right .uc-container with 3 stacked .uc-circle elements that pin and rotate as user scrolls. .panel pinned via ScrollTrigger; .uc-container pins inside .pin-height. Active only when innerWidth > 991."
  "768":
    layout: "Single-column stack. .panel and .uc-container do NOT pin (block 30 + 31 guarded by innerWidth>991). The cta-cards-wrap USP cards stack as static cards under the heading; the .uc-container becomes a static fallback (visually identical content; rotation skipped)."
  "390":
    layout: "Single-column stack identical to 768 strategy. No pin, no rotation. Heading clamps down, paragraph spans full width, CTA full width. The duplicated USP cards inside .uc-circle are hidden on mobile to avoid duplication (visual-only fallback)."

text_splitting_method: null
text_splitting_exception: null
smooth_scroll_library: null

arsenal_md_consulted:
  - "AP-1"
  - "AP-16"
  - "AP-17"
  - "AP-19"
  - "AP-20"
  - "AP-11"

scoped_token_prefix: "--pkc-"
---

# Section spec — pk-cta-cards (`section_cta-cards`)

## Source evidence

- HTML: `clones/pieterkoopt-2026-05-08/_evidence/section-cta-cards.html`
- JS animations: `clones/pieterkoopt-2026-05-08/_evidence/js-chunks/inline-gsap-blocks.js`
  - Block 30 (line 402) — pins `.panel` while `.usp-cards-section` scrolls (innerWidth > 991 guard).
  - Block 31 (line 406) — pins `.uc-container` inside `.pin-height` and rotates each `.uc-circle` + inner `.uc-card` per scroll segment.

## DOM structure (verbatim hierarchy)

```
section.section_cta-cards
└── .container-col-12
    └── #section_hero.usp-cards-section
        ├── .panel.is-cta-cards
        │   └── .padding-global
        │       └── .cta-wrap.is-cta-cards
        │           └── .container-col-10
        │               └── .cc_content
        │                   ├── h2.heading-wrapper
        │                   │   ├── .heading-l "Selling your painting?"
        │                   │   └── .heading-l.alt-heading "It starts here"
        │                   ├── p.paragraph-m  (with sup ®)
        │                   ├── a.btn-animate-chars  "Read more about Pieter Koopt"
        │                   └── .cta-cards-wrap (3× uc-card.is-usp)
        └── .pin-height
            └── .uc-container
                └── .uc-circles
                    ├── .uc-circle (1) → .uc-card.is-usp "No hidden fees"
                    ├── .uc-circle (2) → .uc-card.is-usp "Expert assessment at home"
                    └── .uc-circle (3) → .uc-card.is-usp "Fast and personal process"
```

## Content (verbatim)

### Headline
- `Selling your painting?`
- `It starts here` (alt-heading)

### Paragraph
> At Pieter Koopt®, your artwork takes centre stage: we treat each piece with respect and personal attention. Our goal is to offer a hassle-free sales process, so that the story of your artwork lives on.

### CTA
- Label: `Read more about Pieter Koopt`
- Href: `/about`

### USP cards (cta-cards-wrap — left column, static)
1. `No commission fees` → `100% of the offer is yours.`
2. `Expert assessment at home` → `We come to you and arrange everything.`
3. `Fast and personal process` → `A response to your submission within 48 hours.`

### Circle USP cards (.uc-circles — right column, scroll-rotated)
1. `No hidden fees` → `You receive 100% of the offer.`
2. `Expert assessment at home` → `We come to you and arrange everything.`
3. `Fast and personal process` → `A response to your submission within 48 hours.`

## Animation logic (block 31 reverse-engineered)

```js
// per ".uc-circle"  — k=3 base step in degrees, o starts at -k*(N-1)/2 = -3
// for each circle indexed c:
//   trigger: ".pin-height"
//   start:   "top top-=" + segmentHeight*c
//   end:     "+=segmentHeight"
//   gsap.to(circle,    { rotation: o,            ease: "power1.out", scrub: true })
//   gsap.to(circle.uc-card, { rotation: o, y: "-50%", ease: "power1.out", scrub: true })
//   o += k  // → o sweeps -3 → 0 → +3 across 3 circles
```

`segmentHeight = (pin-height.clientHeight - window.innerHeight) / circles.length`

## Constraints declared

- AP-1: explicitly `scroll-driven`. Builder MUST register ScrollTrigger; static-only render → BLOCK.
- AP-11: 3 viewports declared. ≤991 (768/390) MUST NOT pin (matches `innerWidth>991` guards in source).
- AP-16/AP-17: every animation in `animations_declared` cites `inline-gsap-blocks.js:N`. No invented animations allowed.
- AP-19: scoped `<h2>` is allowed only inside `.pkc-cta-cards-template` selector tree; we override `<h2>` font-family explicitly to `--pkc-font-display` so the global override doesn't bleed.
- AP-20: CSS lives under `.pkc-cta-cards-template { … }` only. No `@layer utilities`.

## Implementation notes

- Use `next/font/google` Cormorant Garamond + Geist Mono + Inter via layout (matches `--pkc-font-*` variables).
- `pinSpacing:false` on the `.panel` ScrollTrigger means downstream content overlaps — be sure body is taller than the section (page mounts a tall spacer below to allow scrolling through pin range).
- Only register GSAP plugins inside a `typeof window !== "undefined"` guard at module top (matches Hero pattern).
- For 992+ behavior: pin both `.panel` and `.uc-container` (two independent ScrollTrigger.create calls, mirroring blocks 30/31).
- For ≤991: skip GSAP setup entirely (matches `if (window.innerWidth > 991)` guard in source).
