"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * CinematicSection — WISC+Flow pattern
 *
 * A full-viewport section that pins during scroll and reveals child elements
 * sequentially via a GSAP timeline scrubbed to scroll progress.
 *
 * Children with `data-reveal` attribute animate in staggered order.
 * Background media gets parallax treatment automatically.
 *
 * Usage:
 * ```tsx
 * <CinematicSection
 *   background={<img src="/hero.jpg" alt="" className="object-cover w-full h-full" />}
 *   scrollLength="200vh"
 * >
 *   <h1 data-reveal>Title</h1>
 *   <p data-reveal>Subtitle</p>
 *   <div data-reveal>CTA</div>
 * </CinematicSection>
 * ```
 */

type RevealPreset = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp" | "blur";

interface CinematicSectionProps {
  children: ReactNode;
  /** Background element (image, video, or gradient) — fills viewport behind content */
  background?: ReactNode;
  /** How far the pin extends; more = slower scroll-through. Default "250vh" */
  scrollLength?: string;
  /** Parallax intensity for background (0 = static, 1 = full). Default 0.3 */
  parallaxIntensity?: number;
  /** Default reveal animation for data-reveal children. Default "fadeUp" */
  revealPreset?: RevealPreset;
  /** Overlay gradient over background. Default true */
  overlay?: boolean;
  /** Custom overlay CSS. Default: bottom-up dark gradient */
  overlayStyle?: React.CSSProperties;
  className?: string;
  id?: string;
}

const REVEAL_FROM: Record<RevealPreset, gsap.TweenVars> = {
  fadeUp: { opacity: 0, y: 60 },
  fadeIn: { opacity: 0 },
  slideLeft: { opacity: 0, x: -80 },
  slideRight: { opacity: 0, x: 80 },
  scaleUp: { opacity: 0, scale: 0.85 },
  blur: { opacity: 0, filter: "blur(12px)" },
};

const REVEAL_TO: Record<RevealPreset, gsap.TweenVars> = {
  fadeUp: { opacity: 1, y: 0, ease: "power3.out" },
  fadeIn: { opacity: 1, ease: "power2.out" },
  slideLeft: { opacity: 1, x: 0, ease: "power3.out" },
  slideRight: { opacity: 1, x: 0, ease: "power3.out" },
  scaleUp: { opacity: 1, scale: 1, ease: "back.out(1.4)" },
  blur: { opacity: 1, filter: "blur(0px)", ease: "power2.out" },
};

export function CinematicSection({
  children,
  background,
  scrollLength = "250vh",
  parallaxIntensity = 0.3,
  revealPreset = "fadeUp",
  overlay = true,
  overlayStyle,
  className,
  id,
}: CinematicSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReduced) return;

    let cleanup: (() => void) | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const revealEls = el.querySelectorAll("[data-reveal]");
      const bgEl = bgRef.current;

      // Set initial state for all reveal elements
      revealEls.forEach((revealEl) => {
        const preset =
          (revealEl.getAttribute("data-reveal") as RevealPreset) || revealPreset;
        gsap.set(revealEl, REVEAL_FROM[preset] ?? REVEAL_FROM.fadeUp);
      });

      // Master timeline scrubbed to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Background parallax: subtle Y shift over scroll duration
      if (bgEl && parallaxIntensity > 0) {
        tl.fromTo(
          bgEl,
          { y: -30 * parallaxIntensity, scale: 1 + 0.05 * parallaxIntensity },
          { y: 30 * parallaxIntensity, scale: 1, ease: "none" },
          0,
        );
      }

      // Stagger reveal children across the timeline
      const count = revealEls.length;
      if (count > 0) {
        const segmentSize = 0.7 / count; // Use 70% of timeline for reveals
        const startOffset = 0.1; // Start reveals at 10% of scroll

        revealEls.forEach((revealEl, i) => {
          const preset =
            (revealEl.getAttribute("data-reveal") as RevealPreset) || revealPreset;
          const toVars = REVEAL_TO[preset] ?? REVEAL_TO.fadeUp;
          const position = startOffset + i * segmentSize;

          tl.to(revealEl, { ...toVars, duration: segmentSize * 0.8 }, position);
        });
      }

      cleanup = () => {
        tl.kill();
        ScrollTrigger.getAll()
          .filter((st) => st.vars.trigger === el)
          .forEach((st) => st.kill());
      };
    };

    init();

    return () => {
      cleanup?.();
    };
  }, [scrollLength, parallaxIntensity, revealPreset, prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
      data-cinematic-section
    >
      {/* Background layer */}
      {background && (
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            inset: "-5%",
            width: "110%",
            height: "110%",
            willChange: prefersReduced ? "auto" : "transform",
          }}
          aria-hidden="true"
        >
          {background}
        </div>
      )}

      {/* Overlay gradient */}
      {overlay && (
        <div
          style={
            overlayStyle ?? {
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)",
              pointerEvents: "none",
            }
          }
          aria-hidden="true"
        />
      )}

      {/* Content layer */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(24px, 5vw, 64px)",
        }}
      >
        {children}
      </div>
    </section>
  );
}
