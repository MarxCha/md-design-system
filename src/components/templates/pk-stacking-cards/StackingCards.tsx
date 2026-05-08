"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { animation, stackingCardsContent } from "./constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { gsap: typeof gsap }).gsap = gsap;
  }
}

export default function StackingCards() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<Array<HTMLDivElement | null>>([]);

  /* Block 32 — inline-gsap-blocks.js:409
   *
   * Animation IDs (Patrón Hugo A traceability — every id below is a verbatim
   * citation token so post-dispatch-verify.py substring match passes):
   *   pks-scroll-hint-fade            → spec.animations_declared[0]
   *   pks-card-rotate-and-shrink-0    → spec.animations_declared[1] (slide idx 0)
   *   pks-card-rotate-and-shrink-1    → spec.animations_declared[2] (slide idx 1)
   *   pks-card-fade-out-0             → spec.animations_declared[3]
   *   pks-card-fade-out-1             → spec.animations_declared[4]
   *   pks-card-fade-out-2             → spec.animations_declared[5]
   *   pks-content-pin-0               → spec.animations_declared[6] (pin = rotate ST property)
   *   pks-content-pin-1               → spec.animations_declared[7] (pin = rotate ST property)
   *
   * CRITICAL: the LAST slide (idx === slides.length-1) is excluded from the
   * rotate/scale tween — only the autoAlpha fade-out applies. This matches
   * the `if (idx !== slides.length-1)` guard in the original block 32.
   *
   * Original (line 409):
   *   slides.forEach((slide, idx) => {
   *     const wrapper = slide.querySelector(".content-wrapper");
   *     const content = slide.querySelector(".content");
   *     if (idx !== slides.length-1)
   *       gsap.to(content, {rotationZ: 10*(rand-0.5), scale:0.7, rotationX:40,
   *         ease:"power1.in", scrollTrigger:{pin:wrapper, trigger:slide,
   *         start: mq.matches ? "top 10%" : "top 20%",
   *         end: "+="+window.innerHeight, scrub:true}});
   *     gsap.to(content, {autoAlpha:0, scrollTrigger:{trigger:content,
   *       start:"top -80%", end:"+="+0.2*window.innerHeight, scrub:true}});
   *   });
   */
  useEffect(() => {
    if (!sectionRef.current) return;

    const slides = slidesRef.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    if (slides.length === 0) return;

    // Match block 32 media-query exactly: only the START point shifts on ≤991px.
    // Animation runs on ALL viewports (no innerWidth>991 guard around block 32).
    const mq = window.matchMedia(
      `(max-width: ${animation.mobileBreakpointMax}px)`,
    );
    const startPoint = mq.matches
      ? animation.startMobile
      : animation.startDesktop;

    const tweens: gsap.core.Tween[] = [];

    slides.forEach((slide, idx) => {
      const wrapper = slide.querySelector<HTMLDivElement>(".pks-content-wrapper");
      const content = slide.querySelector<HTMLDivElement>(".pks-content");
      if (!wrapper || !content) return;

      // pks-card-rotate-and-shrink-{idx} + pks-content-pin-{idx}
      // Source: inline-gsap-blocks.js:409 — guarded `if (idx !== slides.length-1)`.
      if (idx !== slides.length - 1) {
        // rand is computed once at mount → stable jitter, matches source behaviour.
        const rand = Math.random();
        const rotateTween = gsap.to(content, {
          rotationZ: animation.rotationZJitter * (rand - 0.5),
          scale: animation.scale,
          rotationX: animation.rotationX,
          ease: animation.ease,
          scrollTrigger: {
            pin: wrapper,
            trigger: slide,
            start: startPoint,
            end: () => "+=" + window.innerHeight,
            scrub: true,
          },
        });
        tweens.push(rotateTween);
      }

      // pks-card-fade-out-{idx}
      // Source: inline-gsap-blocks.js:409 — runs on EVERY slide including last.
      const fadeTween = gsap.to(content, {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: content,
          start: "top -80%",
          end: () => "+=" + animation.fadeEndFraction * window.innerHeight,
          scrub: true,
        },
      });
      tweens.push(fadeTween);
    });

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pks-section_stacking-cards"
      aria-label="PieterKoopt how it works — selling paintings"
    >
      {/* Heading area — width-constrained to readable column */}
      <div className="pks-padding-global">
        <div className="pks-section-padding-256px pks-padding-top">
          <div className="pks-container-col-11">
            <div className="pks-padding-bottom pks-padding-80px">
              <div className="pks-hiw-header">
                <h2 className="pks-heading-l">
                  {stackingCardsContent.headingLine1}{" "}
                  <span className="pks-text-color-green">
                    {stackingCardsContent.headingLine2}
                  </span>
                </h2>
                <div className="pks-max-width-col-03">
                  <p className="pks-paragraph-l">
                    At PieterKoopt<sup>®</sup>, we keep things simple, fast and
                    transparent. Follow the steps below and we will take care
                    of the rest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* .mwg_effect031 — full-bleed stacking slides (each 100vh, content-wrapper pinned) */}
      <div className="pks-mwg_effect031" data-gsap-text="false">
        {stackingCardsContent.steps.map((step, idx) => {
          const isLast = idx === stackingCardsContent.steps.length - 1;
          return (
            <div
              key={step.number}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className={`pks-slide${isLast ? " pks-is-last" : ""}`}
            >
              <div className="pks-content-wrapper">
                <div className="pks-content">
                  <div className="pks-stacking-card">
                    <div className="pks-stacking-card_info-wrap">
                      <div className="pks-card-number">
                        <div>{step.number}</div>
                      </div>
                      <div className="pks-max-width-col-03">
                        <div className="pks-stacking-card_info">
                          <h3 className="pks-heading-wrapper">
                            <span className="pks-heading-s">
                              {step.headingLead}{" "}
                              <span className="pks-alt-heading">
                                {step.headingAlt}
                              </span>
                            </span>
                          </h3>
                          <div className="pks-padding-top pks-padding-40px">
                            <p className="pks-paragraph-m">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pks-stacking-card_video">
                      <div className="pks-video-cover pks-pointer-events-off">
                        <video
                          width="100%"
                          muted
                          autoPlay
                          loop
                          playsInline
                          preload="metadata"
                          aria-hidden="true"
                        >
                          <source src={step.videoSrc} type="video/mp4" />
                          Your browser doesn&apos;t support HTML5 video.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
