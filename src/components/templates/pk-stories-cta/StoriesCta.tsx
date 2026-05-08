"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { animation, storiesCtaContent } from "./constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { gsap: typeof gsap }).gsap = gsap;
  }
}

/**
 * splitIntoLines — vanilla line splitter substitute for GSAP Club's SplitText.
 * The original block 16 uses `new SplitText(el, { type: "lines" })`. SplitText
 * is a paid plugin; for this section we recreate the per-line wrap with
 * `getClientRects()` line-grouping. Timing/easing/stagger preserved verbatim
 * from the source so the visual reveal matches.
 */
function splitIntoLines(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? "";
  if (!text.trim()) return [];

  // Wrap each word in a span so we can measure per-word client rects.
  const words = text.trim().split(/\s+/);
  el.textContent = "";
  const wordSpans: HTMLSpanElement[] = words.map((w) => {
    const span = document.createElement("span");
    span.textContent = w;
    span.style.display = "inline-block";
    el.appendChild(span);
    el.appendChild(document.createTextNode(" "));
    return span;
  });

  // Group consecutive words by top offset → that's a "line".
  const lineGroups: HTMLSpanElement[][] = [];
  let currentTop: number | null = null;
  let currentLine: HTMLSpanElement[] = [];
  for (const span of wordSpans) {
    const top = span.getBoundingClientRect().top;
    if (currentTop === null || Math.abs(top - currentTop) < 1) {
      currentLine.push(span);
      currentTop = top;
    } else {
      lineGroups.push(currentLine);
      currentLine = [span];
      currentTop = top;
    }
  }
  if (currentLine.length) lineGroups.push(currentLine);

  // Replace per-line groups with a wrapping <span class="psc-line">.
  el.textContent = "";
  const lineWrappers: HTMLSpanElement[] = lineGroups.map((group) => {
    const lineWrapper = document.createElement("span");
    lineWrapper.className = "psc-line";
    lineWrapper.style.display = "block";
    lineWrapper.style.overflow = "hidden";

    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.textContent = group.map((s) => s.textContent ?? "").join(" ");
    lineWrapper.appendChild(inner);
    el.appendChild(lineWrapper);
    return inner;
  });

  return lineWrappers;
}

export default function StoriesCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* psc-h2-line-reveal (sequence_index 0) — block 16 (line 130)
   * psc-paragraph-line-reveal (sequence_index 1) — block 16 (line 130)
   * psc-cta-fade-in (sequence_index 2) — block 16 (line 130, non-split branch)
   *
   * Source: clone-spec/04-stories-cta.md::animations_declared[0..2]
   * Mirrors block 16 in inline-gsap-blocks.js:130
   * Original timing/easing preserved exactly.
   */
  useEffect(() => {
    if (!headingRef.current || !paragraphRef.current || !ctaWrapRef.current) {
      return;
    }
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const ctaWrap = ctaWrapRef.current;

    const tweens: gsap.core.Tween[] = [];

    // Wait for fonts so line measurement matches what the user sees.
    let cancelled = false;
    const setupReveals = () => {
      if (cancelled) return;

      // ── Heading: split lines + reveal (block 16, h-tag branch)
      const headingLines = splitIntoLines(heading);
      gsap.set(heading, { visibility: "visible" });
      if (headingLines.length) {
        const t = gsap.from(headingLines, {
          scrollTrigger: {
            trigger: heading,
            start: animation.reveal.triggerStart,
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: animation.reveal.yOffset,
          duration: animation.reveal.headingDuration,
          ease: animation.reveal.easing,
          stagger: animation.reveal.headingStagger,
        });
        tweens.push(t);
      }

      // ── Paragraph: split lines + reveal (block 16, p-tag branch)
      const paragraphLines = splitIntoLines(paragraph);
      gsap.set(paragraph, { visibility: "visible" });
      if (paragraphLines.length) {
        const t = gsap.from(paragraphLines, {
          scrollTrigger: {
            trigger: paragraph,
            start: animation.reveal.triggerStart,
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: animation.reveal.yOffset,
          duration: animation.reveal.paragraphDuration,
          ease: animation.reveal.easing,
          stagger: animation.reveal.paragraphStagger,
        });
        tweens.push(t);
      }

      // ── CTA wrapper: non-split fade (block 16, [data-gsap-text="true"] branch)
      gsap.set(ctaWrap, { visibility: "visible" });
      const ctaTween = gsap.from(ctaWrap, {
        scrollTrigger: {
          trigger: ctaWrap,
          start: animation.reveal.triggerStart,
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: animation.reveal.yOffset,
        duration: animation.reveal.extraDuration,
        ease: animation.reveal.extraEasing,
      });
      tweens.push(ctaTween);

      ScrollTrigger.refresh();
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(setupReveals);
    } else {
      setupReveals();
    }

    return () => {
      cancelled = true;
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  /* psc-video-io-play-pause (sequence_index 3) — block 25 (line 288)
   * Source: clone-spec/04-stories-cta.md::animations_declared[3]
   * Mirrors block 25 in inline-gsap-blocks.js:288
   * Original: IntersectionObserver(threshold:0.25) → play() / pause()+currentTime=0
   *
   * AP-21: post-hydration play().catch() fallback for Safari autoplay race.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // AP-21 — kick autoplay after hydration to dodge Safari's autoplay block.
    const kick = setTimeout(() => {
      video.play().catch(() => {
        /* autoplay may be blocked; IO will retry when in view */
      });
    }, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
            el.currentTime = 0;
          }
        }
      },
      { threshold: animation.videoIO.threshold },
    );
    observer.observe(video);

    return () => {
      clearTimeout(kick);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-typing-trigger="stories"
      className="psc-section_stories-cta"
      aria-label="PieterKoopt stories CTA"
    >
      <div className="psc-section-padding-128px">
        <div className="psc-padding-global">
          <div className="psc-container-col-12">
            <div className="psc-stories-cta">
              {/* .image-parallax fade-bottom-custom — substituted with static
                * rounded video card. AP-16: no invented parallax tween. */}
              <div className="psc-image-parallax">
                <div className="psc-image-parallax_image">
                  <div className="psc-video-cover">
                    <video
                      ref={videoRef}
                      width="100%"
                      muted
                      autoPlay
                      loop
                      playsInline
                      preload="auto"
                      data-object-fit="cover"
                      // AP-21 — readyState fallback handled in effect.
                    >
                      <source
                        src={storiesCtaContent.video.src}
                        type="video/mp4"
                      />
                      Your browser doesn’t support HTML5 video tag.
                    </video>
                  </div>
                </div>
              </div>

              <div className="psc-stories-cta_content">
                <div className="psc-max-width-col-05">
                  {/* AP-19: scoped <h2> with explicit psc-font-display family. */}
                  <h2
                    ref={headingRef}
                    className="psc-heading-wrapper"
                    style={{ visibility: "hidden" }}
                  >
                    <span className="psc-heading-l">
                      {storiesCtaContent.headingLead}{" "}
                    </span>
                    <span className="psc-heading-l psc-alt-heading">
                      {storiesCtaContent.headingAlt}
                    </span>
                  </h2>
                </div>

                <div className="psc-stories-paragraph">
                  <div className="psc-max-width-col-03">
                    <p
                      ref={paragraphRef}
                      className="psc-paragraph-l psc-stories-cta_title"
                      style={{ visibility: "hidden" }}
                    >
                      {storiesCtaContent.paragraph}
                    </p>

                    <div className="psc-padding-top">
                      <div
                        ref={ctaWrapRef}
                        data-gsap-text="true"
                        className="psc-display-inlineflex"
                        style={{ visibility: "hidden" }}
                      >
                        <a
                          aria-label={storiesCtaContent.cta.ariaLabel}
                          href={storiesCtaContent.cta.href}
                          className="psc-btn-animate-chars"
                        >
                          <span className="psc-btn-animate-chars__text">
                            {storiesCtaContent.cta.label}
                          </span>
                          <span className="psc-button-icon" aria-hidden>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              viewBox="0 0 8 13"
                              fill="none"
                              className="psc-icon-10px"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.56055 6.5L2.03022 12.0303L0.969556 10.9697L5.43923 6.5L0.969557 2.03033L2.03022 0.969665L7.56055 6.5Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
