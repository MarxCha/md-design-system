"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqItems } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".pu-faq-item");

      gsap.set(".pu-faq-heading", { opacity: 0, y: 24 });
      gsap.set(items, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: ".pu-faq-heading",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".pu-faq-heading", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".pu-faq-list",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: containerRef }
  );

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section
      id="faq"
      ref={containerRef}
      className="py-24 sm:py-32"
      style={{ background: "#0c0a1a" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="pu-faq-heading mb-14 text-center">
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "#1e1a35", color: "#a78bfa" }}
          >
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Everything you need to know before you start shipping.
          </p>
        </div>

        {/* Accordion */}
        <dl className="pu-faq-list flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className="pu-faq-item overflow-hidden rounded-xl border transition-colors duration-200"
                style={{
                  borderColor: isOpen ? "#4F46E5" : "#1e1b30",
                  background: "#0f0d1c",
                }}
              >
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span className="text-sm font-semibold text-slate-100 sm:text-base">
                      {item.question}
                    </span>
                    <span
                      className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform duration-200"
                      style={{
                        background: isOpen ? "#7C3AED" : "#1e1a35",
                        color: isOpen ? "#ffffff" : "#a78bfa",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">
                    {item.answer}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
