---
section: pk-stories-cta
source_url: https://www.pieterkoopt.nl/#section_stories-cta
extracted_at: "2026-05-08T20:30:00Z"
extraction_method: "playwright HTML capture + manual JS reverse-engineering of inline GSAP blocks 16 + 25 (universal SplitText reveal + IntersectionObserver video play/pause)"

tags_count: 37
classes_unique_count: 39
js_deps_detected:
  - "gsap@3.15.0"
  - "gsap/SplitText@3.15.0"
  - "gsap/ScrollTrigger@3.15.0"

fonts_used:
  - { family: "Ivy Presto Headline", role: "display", substitute: "Cormorant Garamond" }
  - { family: "Inter", role: "body", substitute: null }
  - { family: "Geist Mono", role: "mono", substitute: null }

animations_declared:
  - id: psc-h2-line-reveal
    target: "section.section_stories-cta h2"
    props: ["opacity", "y"]
    timing: { duration: 0.6, perChar: 0.15 }
    easing: "cubic-bezier(.509,.188,.041,.989)"
    trigger:
      type: "scroll-trigger"
      selector: "section.section_stories-cta h2"
      threshold: "top 90%"
    sequence_index: 0
    source: "inline-gsap-blocks.js:130"
  - id: psc-paragraph-line-reveal
    target: "section.section_stories-cta p.stories-cta_title"
    props: ["opacity", "y"]
    timing: { duration: 0.8, perChar: 0.1 }
    easing: "cubic-bezier(.509,.188,.041,.989)"
    trigger:
      type: "scroll-trigger"
      selector: "section.section_stories-cta p.stories-cta_title"
      threshold: "top 90%"
    sequence_index: 1
    source: "inline-gsap-blocks.js:130"
  - id: psc-cta-fade-in
    target: "[data-gsap-text='true']"
    props: ["opacity", "y"]
    timing: { duration: 0.7 }
    easing: "power2.out"
    trigger:
      type: "scroll-trigger"
      selector: "[data-gsap-text='true']"
      threshold: "top 90%"
    sequence_index: 2
    source: "inline-gsap-blocks.js:130"
  - id: psc-video-io-play-pause
    target: "section.section_stories-cta video"
    props: ["paused", "currentTime"]
    timing: { duration: 0 }
    easing: "none"
    trigger:
      type: "intersection"
      selector: "section.section_stories-cta video"
      threshold: 0.25
    sequence_index: 3
    source: "inline-gsap-blocks.js:288"

interaction_model: "scroll-driven"

responsive_at:
  "1440":
    layout: "Single-column stack inside container-col-12. Top: full-width video card (16:9-ish, .image-parallax > .image-parallax_image > .video-cover) ~720px tall. Below: .stories-cta_content with two-column composition — left .max-width-col-05 holds the heading 'Every painting has a Story' (with italic alt-heading 'Story'); right .max-width-col-03 holds paragraph + CTA button 'See all stories'. Heading + paragraph reveal via SplitText (block 16) on scroll; video play/pause via IntersectionObserver threshold 0.25 (block 25)."
  "768":
    layout: "Single-column stack. Video card stays full-width (aspect-ratio preserved). Heading drops to its own row above paragraph; paragraph + CTA stack below heading. SplitText reveal still fires; video IO still applies. CTA button widens but stays inline-flex."
  "390":
    layout: "Mobile single-column. Video card full-width with rounded corners; heading clamps to ~2.25rem; paragraph spans full width; CTA button widens to 100% with arrow pinned right. SplitText line reveal preserved (no per-char split — block 16 splits by lines only)."

text_splitting_method: "gsap-splittext"
text_splitting_exception: "Webflow `.image-parallax` class is opaque (no inline GSAP block targets it). We declare interaction_model=scroll-driven on the basis of declared animations 0-3 only; the parallax visual effect is substituted with a static rounded video card (no fake parallax tween invented). AP-16 honored: every animation in animations_declared cites inline-gsap-blocks.js:N. AP-17 honored: no invented GSAP refs."
smooth_scroll_library: null

arsenal_md_consulted:
  - "AP-1"
  - "AP-7"
  - "AP-16"
  - "AP-17"
  - "AP-19"
  - "AP-20"
  - "AP-21"

scoped_token_prefix: "--psc-"
---

# Section spec — pk-stories-cta (`section_stories-cta`)

## Source evidence

- HTML: `clones/pieterkoopt-2026-05-08/_evidence/section-stories-cta.html`
- JS animations: `clones/pieterkoopt-2026-05-08/_evidence/js-chunks/inline-gsap-blocks.js`
  - Block 16 (line 130) — universal SplitText `data-gsap-reveal` line-reveal targeting all `<h1>-<h4>`, `<p>`, and `[data-gsap-text="true"]` not opted out via `data-gsap-text="false"`. The CTA wrapper has `data-gsap-text="true"`.
  - Block 25 (line 288) — `IntersectionObserver` (threshold: 0.25) play/pause + `currentTime=0` on `<video>` elements when intersecting.
- Vimeo source: `https://player.vimeo.com/progressive_redirect/playback/1138418107/rendition/1440p/file.mp4` (mirrored locally per AP-7 to `public/templates/pk-stories-cta/stories-video.mp4` — 3.4 MB, verified `file` ≡ "ISO Media MP4").

## DOM structure (verbatim hierarchy)

```
section.section_stories-cta [data-typing-trigger="stories"]
└── .section-padding-128px
    └── .padding-global
        └── .container-col-12
            └── .stories-cta
                ├── .image-parallax.fade-bottom-custom
                │   ├── .image-parallax_image.is-default
                │   │   └── .video-cover
                │   │       └── .video-embed.w-embed
                │   │           └── .video-cover (loading="lazy")
                │   │               └── <video muted autoplay loop playsinline>
                │   │                   └── <source src="vimeo://1138418107/1440p" type="video/mp4">
                │   ├── .image-parallax_trigger.is-default
                │   └── .fade-bottom-custom
                └── .stories-cta_content
                    ├── .max-width-col-05
                    │   └── h2.heading-wrapper.text-color-black
                    │       └── .heading-l "Every painting has a "
                    │           └── span.alt-heading "Story"
                    └── .stories-paragraph
                        └── .max-width-col-03
                            ├── p.paragraph-l.stories-cta_title
                            │   "Art is more than an object, ..."
                            └── .padding-top.padding-48px
                                └── div[data-gsap-text="true"].display-inlineflex
                                    └── a.btn-animate-chars[href="/stories"]
                                        ├── .btn-animate-chars__bg
                                        ├── span.btn-animate-chars__text "See all stories"
                                        └── .button-icon (rotation-90)
```

## Content (verbatim from HTML)

### Heading
- `Every painting has a` + italic alt-heading `Story`

### Paragraph
> Art is more than an object, it's a story that lives on. Every painting holds a moment, a memory, an emotion. And stories like these deserve to be shared.

### CTA
- Label: `See all stories`
- Href: `/stories`
- aria-label: `staggering button`

### Video
- Source: local mirror of Vimeo asset 1138418107/1440p.
- Attrs: `muted autoplay loop playsinline data-object-fit="cover" data-autoplay="true"`.

## Animation logic (blocks 16 + 25 reverse-engineered)

```js
// Block 16 (line 130) — universal SplitText line-reveal
//   Selectors: h1..h4, p, [data-gsap-text="true"]
//   Skips: anything inside [data-gsap-text="false"]
//   For h-tags + p:
//     SplitText(el, { type: "lines" })
//     gsap.set(el, { visibility: "visible" })
//     gsap.from(split.lines, {
//       scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
//       opacity: 0, y: 20,
//       duration: 0.6 (h) | 0.8 (p),
//       ease: "cubic-bezier(.509,.188,.041,.989)",
//       stagger: 0.15 (h) | 0.1 (p)
//     })
//   For [data-gsap-text="true"] (no split):
//     gsap.from(el, { scrollTrigger: same, opacity: 0, y: 20, duration: 0.7, ease: "power2.out" })

// Block 25 (line 288) — IntersectionObserver play/pause
//   threshold: 0.25
//   intersecting → video.play()
//   not intersecting → video.pause(); video.currentTime = 0
```

## Constraints declared

- AP-1: explicitly `scroll-driven`. The section's life comes from text reveal (block 16) + video play (block 25). Static-only render → BLOCK.
- AP-7: Vimeo URL mirrored locally to `public/templates/pk-stories-cta/stories-video.mp4`. No remote `<source src="https://player.vimeo.com/...">` in component. No reference to external CDN at runtime.
- AP-16: every animation in `animations_declared` cites `inline-gsap-blocks.js:N`. The Webflow `.image-parallax` and `.fade-bottom-custom` Webflow effects are NOT cited (no JS block touches them). Per AP-16, we substitute with a static rounded video card — NO invented parallax tween.
- AP-17: no GSAP refs invented for static SVGs. The only GSAP code paths are SplitText + ScrollTrigger from block 16 (text only) and a vanilla IntersectionObserver (block 25). The CTA's animated chars is a hover-only CSS effect — not declared as a GSAP animation.
- AP-19: scoped `<h2>` is allowed only inside `.psc-stories-cta-template` selector tree; we override `<h2>` font-family explicitly to `--psc-font-display`.
- AP-20: CSS lives under `.psc-stories-cta-template { … }` only. No `@layer utilities`.
- AP-21: video uses `muted + playsInline + autoPlay + loop` + post-mount `play().catch()` fallback to handle Safari hydration race.

## Implementation notes

- Use `next/font/google` Cormorant Garamond + Geist Mono + Inter via layout (matches `--psc-font-*` variables).
- SplitText is a GSAP Club plugin; for the rebuild we ship a vanilla line-split via `Element.getClientRects()` and explicit `<span>` wrapping (cheaper than pulling Club JS for one section). Animation timing/easing/stagger preserved verbatim.
- IntersectionObserver pattern lives in `useEffect` with cleanup; threshold 0.25 verbatim.
- Video element: `muted playsInline autoPlay loop preload="auto"` + `useEffect` calls `videoRef.current?.play().catch(() => {})` post-hydration (AP-21).
- The `.image-parallax fade-bottom-custom` visual is substituted with a static rounded video card. The substitution is documented in `text_splitting_exception` (re-purposed as the substitution-acknowledgement field per spec convention) — Webflow's bundled CSS for `.image-parallax` is opaque, so we honestly render a non-parallax presentation rather than invent a translateY tween.
