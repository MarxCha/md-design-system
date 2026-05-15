"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

interface SmoothScrollNavProps {
  items: NavItem[];
  activeColor?: string;
  className?: string;
}

export function SmoothScrollNav({
  items,
  activeColor = "#ffffff",
  className,
}: SmoothScrollNavProps) {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const lenisRef = useRef<{ scrollTo: (target: string | HTMLElement, opts?: object) => void } | null>(null);

  // Lazy-init Lenis
  useEffect(() => {
    let lenis: typeof lenisRef.current = null;

    import("lenis").then(({ default: Lenis }) => {
      const instance = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      lenis = instance as unknown as typeof lenisRef.current;
      lenisRef.current = lenis;

      const raf = (time: number) => {
        instance.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    });

    return () => {
      (lenis as unknown as { destroy?: () => void })?.destroy?.();
    };
  }, []);

  // Detect active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const threshold = 0.4;

    items.forEach(({ href }) => {
      const id = href.replace(/^#/, "");
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHref(href);
        },
        { threshold }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -64 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="Page sections" className={className}>
      <ul className="flex flex-wrap gap-1">
        {items.map(({ label, href }) => {
          const isActive = activeHref === href;
          return (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors"
                style={{
                  color: isActive ? activeColor : "rgb(255 255 255 / 0.55)",
                }}
                aria-current={isActive ? "location" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="smooth-nav-indicator"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
