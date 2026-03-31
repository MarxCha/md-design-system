"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "Overview", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Performance", href: "#performance" },
  { label: "Display", href: "#display" },
  { label: "Specs", href: "#specs" },
];

const legalLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Sales and Refunds",
  "Legal",
  "Sitemap",
];

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 90%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative w-full overflow-hidden bg-black"
    >
      {/* CTA band */}
      <div
        ref={ctaRef}
        className="flex flex-col items-center gap-8 border-t border-gray-800 px-6 py-20 text-center opacity-0 md:py-28"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
          Available now
        </p>
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-bold text-white leading-tight">
          The new MacBook Pro.
          <br />
          <span className="gm-gradient-text">Ready when you are.</span>
        </h2>

        <p className="max-w-lg text-base font-light text-gray-400">
          Starting at <span className="font-semibold text-white">$1,999</span>.
          Free delivery. Free returns.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            className="gm-btn-primary inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            Buy
          </button>
          <button
            type="button"
            className="gm-btn-secondary inline-flex items-center justify-center rounded-full border border-gray-600 px-8 py-3 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-gray-400 hover:text-white hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Nav links */}
      <div ref={linksRef} className="border-t border-gray-800 px-6 py-8 opacity-0">
        <div className="mx-auto max-w-5xl">
          <nav
            aria-label="Footer navigation"
            className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Legal divider */}
          <div className="my-4 h-[1px] w-full bg-gray-800" aria-hidden="true" />

          {/* Legal links + copyright */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-gray-600">
              Copyright &copy; {new Date().getFullYear()} MD Consultoría TI.
              All rights reserved.
            </p>
            <nav
              aria-label="Legal links"
              className="flex flex-wrap justify-center gap-x-4 gap-y-1"
            >
              {legalLinks.map((link) => (
                <span
                  key={link}
                  className="cursor-pointer text-xs text-gray-600 transition-colors duration-200 hover:text-gray-400"
                >
                  {link}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
