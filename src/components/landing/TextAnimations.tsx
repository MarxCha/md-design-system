"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/* ─── Shared ─────────────────────────────────────────────── */

function useIntersectionTrigger(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.3
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}

/* ─── CharSplit ──────────────────────────────────────────── */

type HeadingTag = "h1" | "h2" | "h3" | "p" | "span";

interface CharSplitProps {
  text: string;
  tag?: HeadingTag;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
}

export function CharSplit({
  text,
  tag: Tag = "h1",
  className,
  stagger = 0.03,
  duration = 0.7,
  delay = 0,
  threshold = 0.3,
}: CharSplitProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const visible = useIntersectionTrigger(containerRef, threshold);
  const animated = useRef(false);

  useEffect(() => {
    if (prefersReduced || !visible || animated.current) return;
    const el = containerRef.current;
    if (!el) return;

    animated.current = true;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const targets = el.querySelectorAll<HTMLElement>("[data-char]");
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
        }
      );
    };

    init();
  }, [visible, prefersReduced, duration, stagger, delay]);

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Split text into words, then characters
  const words = text.split(" ");

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={cn("leading-tight", className)}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              <span
                data-char
                style={{
                  display: "inline-block",
                  opacity: 0,
                  transform: "translateY(100%)",
                }}
              >
                {char}
              </span>
            </span>
          ))}
          {wi < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}

/* ─── ScrambleText ───────────────────────────────────────── */

interface ScrambleTextProps {
  text: string;
  tag?: HeadingTag;
  className?: string;
  duration?: number;
  chars?: string;
  threshold?: number;
}

export function ScrambleText({
  text,
  tag: Tag = "h2",
  className,
  duration = 1200,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  threshold = 0.3,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const visible = useIntersectionTrigger(containerRef, threshold);
  const [display, setDisplay] = useState(
    text.replace(/[^ ]/g, "\u00A0")
  );
  const animated = useRef(false);

  useEffect(() => {
    if (prefersReduced || !visible || animated.current) return;
    animated.current = true;

    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const resolvedCount = Math.floor(progress * text.length);

      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < resolvedCount) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplay(result);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [visible, prefersReduced, text, duration, chars]);

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={cn("whitespace-pre-wrap", className)}
      aria-label={text}
    >
      {display}
    </Tag>
  );
}

/* ─── CountUp ────────────────────────────────────────────── */

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1500,
  className,
  threshold = 0.3,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const visible = useIntersectionTrigger(ref, threshold);
  const [display, setDisplay] = useState(prefersReduced ? value : 0);
  const animated = useRef(false);

  useEffect(() => {
    if (prefersReduced || !visible || animated.current) return;
    animated.current = true;

    const startTime = performance.now();
    let frameId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = easedProgress * value;

      setDisplay(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [visible, prefersReduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ─── BlurReveal ─────────────────────────────────────────── */

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
}: BlurRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(8px)", scale: 1.02 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
