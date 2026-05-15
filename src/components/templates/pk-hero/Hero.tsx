"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

import { animation, assets, heroContent } from "./constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
  if (!CustomEase.get("pkCustom")) {
    CustomEase.create("pkCustom", ".87,0,.13,1");
  }
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { gsap: typeof gsap }).gsap = gsap;
  }
}

type IntroState = "first-visit" | "revealing" | "revealed";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const titleH1Ref = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  /* SSR-safe: always start "first-visit" so server + client render identically.
   * useEffect reads localStorage AFTER hydration and transitions to "revealed"
   * for return visitors. Avoids hydration mismatch on aria-hidden + intro tree.
   */
  const [introState, setIntroState] = useState<IntroState>("first-visit");

  useEffect(() => {
    if (localStorage.getItem(animation.introPlayedKey) === "true") {
      setIntroState("revealed");
    }
  }, []);

  /* hero-clip-reveal + hero-video-entrance
   * Source: clone-spec/01-hero.md::animations_declared[0..1]
   * Implements function t() from inline-gsap-blocks.js:398 (block 28).
   * Original targets: ".hero", ".video-container"
   */
  useEffect(() => {
    if (introState !== "revealing" && introState !== "revealed") return;
    if (!heroRef.current || !videoContainerRef.current) return;

    const hero = heroRef.current;
    const videoContainer = videoContainerRef.current;

    gsap.set(videoContainer, { scale: 0, rotation: 20 });

    const tl = gsap.timeline();
    tl.to(hero, {
      clipPath: animation.fullClipPath,
      duration: 1,
      ease: "pkCustom",
      onStart: () => {
        gsap.to(videoContainer, {
          scale: 1,
          rotation: 0,
          clipPath: animation.fullClipPath,
          duration: 1.25,
          ease: "pkCustom",
        });
      },
    });

    return () => {
      tl.kill();
    };
  }, [introState]);

  /* hero-text-split-reveal-h1 + hero-text-split-reveal-p
   * Source: clone-spec/01-hero.md::animations_declared[5..6]
   * Mirrors block 16 (inline-gsap-blocks.js:130) — SplitText reveal on fonts.ready.
   * Original targets: "h1.heading-m", "p.paragraph-l"
   */
  useEffect(() => {
    if (introState !== "revealed") return;
    if (!titleH1Ref.current || !paragraphRef.current) return;

    let cleanups: Array<() => void> = [];
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;

      const h1 = titleH1Ref.current!;
      const p = paragraphRef.current!;

      const splitH1 = new SplitText(h1, { type: "lines" });
      gsap.set(h1, { visibility: "visible" });
      gsap.from(splitH1.lines, {
        scrollTrigger: { trigger: h1, start: "top 90%", toggleActions: "play none none none" },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: animation.splitTextEase,
        stagger: 0.15,
      });

      const splitP = new SplitText(p, { type: "lines" });
      gsap.set(p, { visibility: "visible" });
      gsap.from(splitP.lines, {
        scrollTrigger: { trigger: p, start: "top 90%", toggleActions: "play none none none" },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: animation.splitTextEase,
        stagger: 0.1,
      });

      cleanups = [() => splitH1.revert(), () => splitP.revert()];
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [introState]);

  /* Block 25 (inline-gsap-blocks.js:288) — IntersectionObserver play/pause for hero video. */
  useEffect(() => {
    if (introState !== "revealed") return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [introState]);

  const handleAudioChoice = () => {
    setIntroState("revealing");
    localStorage.setItem(animation.introPlayedKey, "true");
    requestAnimationFrame(() => setIntroState("revealed"));
  };

  return (
    <section ref={heroRef} className="pk-hero" aria-label="PieterKoopt hero">
      <div ref={videoContainerRef} id="hero-video" className="pk-video-container">
        <video
          ref={videoRef}
          src={assets.heroVideo}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <aside className="pk-callout" aria-hidden={introState !== "revealed"}>
        <span>{heroContent.callout.line1}</span>
        <span className="pk-callout-line" />
        <span>{heroContent.callout.line2}</span>
      </aside>

      <div className="pk-hh_content">
        <div className="pk-hh_title">
          <h1 ref={titleH1Ref} className="pk-display">
            {heroContent.titleLine1}
            <br />
            <span className="alt-heading">{heroContent.titleLine2}</span>
          </h1>
          <p ref={paragraphRef}>{heroContent.paragraph}</p>
        </div>
        <div>
          <a className="pk-cta" href={heroContent.cta.href}>
            <span>{heroContent.cta.label}</span>
            <svg viewBox="0 0 8 13" fill="none" className="pk-cta-icon" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.56055 6.5L2.03022 12.0303L0.969556 10.9697L5.43923 6.5L0.969557 2.03033L2.03022 0.969665L7.56055 6.5Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>

      {introState === "first-visit" ? (
        <IntroOverlay onChoose={handleAudioChoice} />
      ) : null}
    </section>
  );
}

/* hero-intro-outline-reveal + hero-intro-signature-fadeout + hero-intro-content-reveal
 * Source: clone-spec/01-hero.md::animations_declared[2..4]
 * Mirrors the timeline `i` in inline-gsap-blocks.js:398 (block 28).
 * Original targets: ".hero-outline_wrap", ".intro-signature", ".intro-content"
 */
function IntroOverlay({ onChoose }: { onChoose: () => void }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const signatureRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!outlineRef.current || !signatureRef.current || !contentRef.current) return;

    gsap.set(outlineRef.current, { scale: 1.1, opacity: 0, visibility: "hidden" });
    gsap.set(signatureRef.current, { opacity: 1 });
    gsap.set(contentRef.current, { opacity: 0, visibility: "hidden" });

    const tl = gsap.timeline();
    tl.to(
      outlineRef.current,
      { visibility: "visible", opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "+=0.3"
    );
    tl.to(
      signatureRef.current,
      { opacity: 0, duration: 0.6, ease: "power2.out" },
      "+=1.0"
    );
    tl.to(
      contentRef.current,
      { visibility: "visible", opacity: 1, duration: 0.6, ease: "pkCustom" },
      ">+=0.1"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const dismiss = () => {
    if (!contentRef.current || !wrapRef.current) {
      onChoose();
      return;
    }
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: onChoose,
    });
  };

  return (
    <div ref={wrapRef} className="pk-intro" role="dialog" aria-label="Audio preference">
      <div ref={outlineRef} className="pk-hero-outline_wrap" aria-hidden>
        <div className="pk-hero-outline" />
      </div>

      <div ref={signatureRef} className="pk-intro-signature" aria-hidden>
        {/* Static fallback for the Lottie — keeps AP-17 clean (no GSAP refs on this SVG). */}
        <svg viewBox="0 0 240 80" fill="none" aria-hidden>
          <text x="50%" y="62%" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="44" fill="rgba(245,241,234,0.92)">
            PieterKoopt
          </text>
        </svg>
      </div>

      <div ref={contentRef} className="pk-intro-content">
        <svg height={40} viewBox="0 0 41 41" fill="none" aria-hidden>
          <path d="M37.582 25.625V15.375" stroke="currentColor" />
          <path d="M29.043 33.3125V7.6875" stroke="currentColor" />
          <path d="M20.5 37.5827V3.41602" stroke="currentColor" />
          <path d="M11.957 33.3125V7.6875" stroke="currentColor" />
          <path d="M3.41797 25.625V15.375" stroke="currentColor" />
        </svg>
        <p className="pk-mono">{heroContent.intro.body}</p>
        <div className="pk-intro-button-group">
          <button type="button" className="pk-intro-button is-outline" onClick={dismiss}>
            {heroContent.intro.secondary}
          </button>
          <button type="button" className="pk-intro-button is-primary" onClick={dismiss}>
            {heroContent.intro.primary}
          </button>
        </div>
      </div>
    </div>
  );
}
