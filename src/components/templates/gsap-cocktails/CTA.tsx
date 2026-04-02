"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ctaContent, footerLinks } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(headingRef.current, { opacity: 0, y: 60 });
      gsap.set(contentRef.current, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.2,
            ease: "power3.out",
          });
        },
      });

      // Footer columns stagger
      const cols = footerRef.current?.querySelectorAll(".gc-footer-col");
      if (cols) {
        gsap.set(cols, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(cols, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef}>
      {/* CTA section */}
      <div className="gc-cta-section relative overflow-hidden px-6 py-24 text-center md:px-12 lg:py-32">
        <div className="gc-cta-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2
            ref={headingRef}
            className="gc-cta-heading mb-6 text-4xl font-bold md:text-6xl"
          >
            {ctaContent.heading}
          </h2>
          <div ref={contentRef}>
            <p className="gc-body-text mb-10 text-lg">
              {ctaContent.subtitle}
            </p>
            <button
              type="button"
              className="gc-btn-primary rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-wider transition-all"
            >
              {ctaContent.buttonText}
            </button>
            <p className="gc-body-text mt-6 text-sm opacity-60">
              {ctaContent.note}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer ref={footerRef} className="gc-footer px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="gc-footer-col">
            <span className="gc-logo mb-4 block text-xl font-bold tracking-wider">
              COCKTAIL
            </span>
            <p className="gc-body-text text-sm opacity-60">
              Artisan cocktails crafted with passion in the heart of Mexico City.
            </p>
          </div>

          {/* Hours */}
          <div className="gc-footer-col">
            <h4 className="gc-footer-heading mb-4 text-sm font-bold uppercase tracking-wider">
              Hours
            </h4>
            {footerLinks.visit.map((line) => (
              <p key={line} className="gc-body-text mb-1 text-sm opacity-60">
                {line}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div className="gc-footer-col">
            <h4 className="gc-footer-heading mb-4 text-sm font-bold uppercase tracking-wider">
              Contact
            </h4>
            {footerLinks.contact.map((line) => (
              <p key={line} className="gc-body-text mb-1 text-sm opacity-60">
                {line}
              </p>
            ))}
          </div>

          {/* Social */}
          <div className="gc-footer-col">
            <h4 className="gc-footer-heading mb-4 text-sm font-bold uppercase tracking-wider">
              Follow
            </h4>
            {footerLinks.social.map((platform) => (
              <button
                key={platform}
                type="button"
                className="gc-social-link mb-1 block text-sm transition-colors"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="gc-footer-divider mx-auto mt-12 max-w-6xl border-t pt-6">
          <p className="gc-body-text text-center text-xs opacity-40">
            &copy; 2026 COCKTAIL. All rights reserved. Crafted by MD Consultoría TI.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default CTA;
