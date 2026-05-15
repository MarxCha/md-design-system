"use client";

import { useEffect, useRef, useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type TextAnimation = "splitByChar" | "splitByWord" | "typewriter" | "highlight";
type TriggerType = "scroll" | "mount" | "hover";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface AnimatedTextProps {
  children: string;
  animation?: TextAnimation;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: TriggerType;
  highlightColor?: string;
  className?: string;
  as?: HeadingTag;
}

export function AnimatedText({
  children,
  animation = "splitByChar",
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  trigger = "scroll",
  highlightColor = "hsl(217 91% 60% / 0.3)",
  className,
  as: Tag = "p",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const initialized = useRef(false);

  const parts = useMemo(() => {
    if (animation === "splitByChar") {
      return children.split("").map((char, i) => ({
        key: i,
        text: char === " " ? "\u00A0" : char,
      }));
    }
    if (animation === "splitByWord" || animation === "highlight") {
      return children.split(" ").map((word, i) => ({ key: i, text: word }));
    }
    return null;
  }, [children, animation]);

  useEffect(() => {
    if (prefersReduced || initialized.current) return;
    const el = containerRef.current;
    if (!el) return;

    initialized.current = true;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const targets = el.querySelectorAll<HTMLElement>("[data-text-part]");
      if (!targets.length && animation !== "typewriter") return;

      const runAnimation = () => {
        switch (animation) {
          case "splitByChar":
          case "splitByWord":
            gsap.fromTo(
              targets,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                delay,
                ease: "power2.out",
              }
            );
            break;

          case "typewriter": {
            const fullText = children;
            let charIndex = 0;
            el.textContent = "";
            const interval = setInterval(() => {
              el.textContent = fullText.slice(0, charIndex + 1);
              charIndex++;
              if (charIndex >= fullText.length) clearInterval(interval);
            }, stagger * 1000);
            break;
          }

          case "highlight":
            targets.forEach((target, i) => {
              gsap.to(target, {
                backgroundColor: highlightColor,
                duration: 0.3,
                delay: delay + i * stagger,
                ease: "power1.inOut",
                yoyo: true,
                repeat: 1,
              });
            });
            break;
        }
      };

      if (trigger === "scroll") {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: runAnimation,
        });

        // Set initial hidden state
        if (animation !== "typewriter" && animation !== "highlight") {
          gsap.set(targets, { opacity: 0, y: 20 });
        }
      } else if (trigger === "mount") {
        runAnimation();
        if (animation !== "typewriter" && animation !== "highlight") {
          gsap.set(targets, { opacity: 0, y: 20 });
          // Immediately queue the animation for next frame
          requestAnimationFrame(runAnimation);
        }
      } else if (trigger === "hover") {
        el.addEventListener("mouseenter", runAnimation);
        return () => el.removeEventListener("mouseenter", runAnimation);
      }
    };

    init();
  }, [animation, children, delay, duration, highlightColor, prefersReduced, stagger, trigger]);

  // Typewriter: render raw, GSAP controls text content
  if (animation === "typewriter") {
    return (
      <Tag
        ref={containerRef as React.RefObject<HTMLHeadingElement>}
        className={className}
        aria-label={children}
      >
        {prefersReduced ? children : ""}
      </Tag>
    );
  }

  const isHighlight = animation === "highlight";

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      aria-label={children}
      aria-hidden={!prefersReduced}
    >
      {prefersReduced
        ? children
        : parts?.map(({ key, text }, i) => (
            <span
              key={key}
              data-text-part
              style={{
                display: "inline-block",
                whiteSpace: animation === "splitByChar" ? "pre" : "normal",
                paddingInline: isHighlight ? "2px" : undefined,
                borderRadius: isHighlight ? "2px" : undefined,
              }}
            >
              {text}
              {animation === "splitByWord" && i < (parts?.length ?? 0) - 1
                ? "\u00A0"
                : ""}
            </span>
          ))}
    </Tag>
  );
}
