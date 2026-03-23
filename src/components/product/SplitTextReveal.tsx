"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface SplitTextRevealProps {
  children: string;
  as?: HeadingTag;
  trigger?: "scroll" | "mount";
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
}

function buildWordNodes(text: string, container: HTMLElement): HTMLElement[] {
  // Clear container safely using DOM methods
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const words = text.split(" ");
  const innerNodes: HTMLElement[] = [];

  words.forEach((word, i) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";

    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    // Use textContent — never innerHTML — to set word text
    inner.textContent = word + (i < words.length - 1 ? "\u00a0" : "");

    wrapper.appendChild(inner);
    container.appendChild(wrapper);
    innerNodes.push(inner);
  });

  return innerNodes;
}

export function SplitTextReveal({
  children,
  as: Tag = "h2",
  trigger = "scroll",
  delay = 0,
  stagger = 0.04,
  duration = 0.8,
  className,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    let splitInstance: { revert: () => void } | null = null;
    let scrollTriggerInstance: { kill: () => void } | null = null;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      let lines: HTMLElement[] = [];

      try {
        const SplitTypeModule = await import("split-type");
        const SplitType =
          "default" in SplitTypeModule
            ? SplitTypeModule.default
            : SplitTypeModule;
        splitInstance = new SplitType(el, { types: "lines" });
        // @ts-expect-error split-type types vary by version
        lines = (splitInstance.lines as HTMLElement[]) ?? [];
      } catch {
        // Fallback: split by words using safe DOM methods only
        lines = buildWordNodes(children, el);
      }

      // Ensure each line's parent clips overflow for the y-slide reveal
      lines.forEach((line) => {
        const parent = line.parentElement;
        if (parent && !parent.classList.contains("split-line-wrapper")) {
          parent.style.overflow = "hidden";
          parent.classList.add("split-line-wrapper");
        }
      });

      gsap.set(lines, { y: "110%" });

      const animProps = {
        y: "0%",
        duration,
        ease: "power3.out",
        stagger,
        delay,
      };

      if (trigger === "scroll") {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.to(lines, animProps);
          },
          once: true,
        });
      } else {
        gsap.to(lines, animProps);
      }
    };

    setup();

    return () => {
      splitInstance?.revert();
      scrollTriggerInstance?.kill();
    };
  }, [reducedMotion, children, trigger, delay, stagger, duration]);

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}
