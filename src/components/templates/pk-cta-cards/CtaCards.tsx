"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { animation, ctaCardsContent } from "./constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { gsap: typeof gsap }).gsap = gsap;
  }
}

export default function CtaCards() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const pinHeightRef = useRef<HTMLDivElement | null>(null);
  const ucContainerRef = useRef<HTMLDivElement | null>(null);
  const ucCirclesRef = useRef<HTMLDivElement | null>(null);
  const circleRefs = useRef<Array<HTMLDivElement | null>>([]);

  /* pkc-panel-pin (sequence_index 0)
   * Source: clone-spec/02-cta-cards.md::animations_declared[0]
   * Mirrors block 30 in inline-gsap-blocks.js:402
   * Original: ScrollTrigger.create({trigger:".usp-cards-section",
   *           start:"top top", end:"bottom bottom", pin:".panel",
   *           pinSpacing:false, scrub:false}) — guarded innerWidth>991
   *
   * pkc-circles-pin + pkc-circle-rotate-{0..2} + pkc-card-rotate-and-shift-{0..2}
   * (sequence_index 1..7)
   * Source: clone-spec/02-cta-cards.md::animations_declared[1..7]
   * Mirrors block 31 in inline-gsap-blocks.js:406
   * Original: pin .uc-container against .pin-height + per-circle rotation tween
   *           where r=3, o starts at -((N-1)*r/2) = -3 and increments by r.
   */
  useEffect(() => {
    if (!sectionRef.current || !panelRef.current) return;
    if (!pinHeightRef.current || !ucContainerRef.current || !ucCirclesRef.current) return;

    // Match block 30 + block 31 guards: only run on viewports above the pin breakpoint.
    if (window.innerWidth <= 991) return;

    const section = sectionRef.current;
    const panel = panelRef.current;
    const pinHeight = pinHeightRef.current;
    const ucContainer = ucContainerRef.current;
    const ucCircles = ucCirclesRef.current;
    const circles = circleRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );

    if (circles.length === 0) return;

    // Block 30 — pin .panel through the entire section's scroll range.
    const panelPin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: panel,
      pinSpacing: false,
      scrub: false,
    });

    // Block 31 — pin .uc-container inside .pin-height while a constant fromTo
    // tween runs on .uc-circles (scrubbed). y stays at "0%" — the tween exists
    // purely to create the scrubbed pin lifecycle.
    const circlesPinTween = gsap.fromTo(
      ucCircles,
      { y: "0%" },
      {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: pinHeight,
          start: "top top",
          end: "bottom bottom",
          pin: ucContainer,
          scrub: true,
        },
      },
    );

    // Block 31 — per-circle rotation. Each circle (and its inner .uc-card)
    // rotates as the user scrolls through one segment of the pinned range.
    const r = animation.rotationStep;
    let o = -((circles.length - 1) * r) / 2; // → starts at -3 for N=3, r=3
    const segmentHeight =
      (pinHeight.clientHeight - window.innerHeight) / circles.length;

    const circleTweens: gsap.core.Tween[] = [];

    /* Animation IDs for citation tracking (Patrón Hugo A traceability):
     *   index 0 → pkc-circle-rotate-0 + pkc-card-rotate-and-shift-0
     *   index 1 → pkc-circle-rotate-1 + pkc-card-rotate-and-shift-1
     *   index 2 → pkc-circle-rotate-2 + pkc-card-rotate-and-shift-2
     * All sourced from inline-gsap-blocks.js:406 (block 31).
     *
     * Initial positions set via GSAP so subsequent gsap.to(rotation) doesn't
     * clobber the resting fan offsets (sampled from original cycle frames:
     * ~25% card-width step horizontally, ~1% vertically per card).
     */
    circles.forEach((circle, index) => {
      const card = circle.querySelector<HTMLDivElement>(".pkc-card");

      // Initial fan offset for this circle — preserved across GSAP animations.
      const xPercent = index * 25;
      const yPercent = index * 1;
      gsap.set(circle, { xPercent, yPercent });

      const rotateTween = gsap.to(circle, {
        rotation: o,
        ease: "power1.out",
        scrollTrigger: {
          trigger: pinHeight,
          start: `top top-=${segmentHeight * index}`,
          end: `+=${segmentHeight}`,
          scrub: true,
        },
      });
      circleTweens.push(rotateTween);

      if (card) {
        const cardTween = gsap.to(card, {
          rotation: o,
          y: "-50%",
          ease: "power1.out",
          scrollTrigger: {
            trigger: pinHeight,
            start: `top top-=${segmentHeight * index}`,
            end: `+=${segmentHeight}`,
            scrub: true,
          },
        });
        circleTweens.push(cardTween);
      }

      o += r;
    });

    return () => {
      panelPin.kill();
      circlesPinTween.scrollTrigger?.kill();
      circlesPinTween.kill();
      circleTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pkc-section_cta-cards"
      aria-label="PieterKoopt unique selling points"
    >
      <div className="pkc-container-col-12">
        <div className="pkc-usp-cards-section">
          {/* .panel — pinned via block 30 */}
          <div ref={panelRef} className="pkc-panel pkc-is-cta-cards">
            <div className="pkc-padding-global">
              <div className="pkc-cta-wrap pkc-is-cta-cards">
                <div className="pkc-container-col-10">
                  <div className="pkc-cc_content">
                    <h2 className="pkc-heading-wrapper">
                      <span className="pkc-heading-l">
                        {ctaCardsContent.headingLine1}
                      </span>
                      <span className="pkc-heading-l pkc-alt-heading">
                        {ctaCardsContent.headingLine2}
                      </span>
                    </h2>

                    <p className="pkc-paragraph-m">
                      At Pieter Koopt<sup>®</sup>, your artwork takes centre
                      stage: we treat each piece with respect and personal
                      attention. Our goal is to offer a hassle-free sales
                      process, so that the story of your artwork lives on.
                    </p>

                    <a
                      className="pkc-btn-animate-chars"
                      href={ctaCardsContent.cta.href}
                      aria-label="staggering button"
                    >
                      <span className="pkc-btn-animate-chars__text">
                        {ctaCardsContent.cta.label}
                      </span>
                      <span className="pkc-button-icon" aria-hidden>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 8 13"
                          fill="none"
                          className="pkc-icon-10px"
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

          {/* .pin-height — taller-than-viewport so .uc-container can pin & scrub */}
          <div ref={pinHeightRef} className="pkc-pin-height">
            <div ref={ucContainerRef} className="pkc-uc-container">
              <div ref={ucCirclesRef} className="pkc-uc-circles">
                {ctaCardsContent.circleCards.map((card, idx) => (
                  <div
                    key={idx}
                    ref={(el) => {
                      circleRefs.current[idx] = el;
                    }}
                    className="pkc-uc-circle"
                  >
                    <div className="pkc-uc-card pkc-is-usp pkc-card">
                      <h3 className="pkc-heading-s">{card.heading}</h3>
                      <p className="pkc-paragraph-xl pkc-alt-heading">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
