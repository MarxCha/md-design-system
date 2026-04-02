"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import StepIndicator from "./StepIndicator";
import FormStep1, { isStep1Valid } from "./FormStep1";
import FormStep2, { isStep2Valid } from "./FormStep2";
import FormStep3, { isStep3Valid } from "./FormStep3";
import FormStep4 from "./FormStep4";
import {
  DEFAULT_FORM_DATA,
  type FormData,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

type SubmitStatus = "idle" | "submitting" | "success";

export default function FormShell() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger.refresh on mount — required when inside a scrolling context
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  // Animate in on initial mount
  useGSAP(
    () => {
      gsap.set(".fb-shell-card", { opacity: 0, y: 24 });
      gsap.to(".fb-shell-card", {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: shellRef }
  );

  // Animate step transition
  const animateStepTransition = useCallback(
    (direction: "forward" | "back", callback: () => void) => {
      if (!contentRef.current) {
        callback();
        return;
      }

      const xOut = direction === "forward" ? -24 : 24;
      const xIn = direction === "forward" ? 24 : -24;

      gsap.to(contentRef.current, {
        opacity: 0,
        x: xOut,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          callback();
          gsap.set(contentRef.current, { x: xIn });
          gsap.to(contentRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.28,
            ease: "power2.out",
          });
        },
      });
    },
    []
  );

  function canProceed(): boolean {
    if (currentStep === 1) return isStep1Valid(formData.step1);
    if (currentStep === 2) return isStep2Valid(formData.step2);
    if (currentStep === 3) return isStep3Valid();
    return true;
  }

  function handleNext() {
    if (!canProceed() || currentStep >= 4) return;
    animateStepTransition("forward", () =>
      setCurrentStep((s) => Math.min(s + 1, 4))
    );
  }

  function handleBack() {
    if (currentStep <= 1) return;
    animateStepTransition("back", () =>
      setCurrentStep((s) => Math.max(s - 1, 1))
    );
  }

  function handleEditStep(step: number) {
    animateStepTransition("back", () => setCurrentStep(step));
  }

  async function handleSubmit() {
    setSubmitStatus("submitting");
    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setSubmitStatus("success");
  }

  if (submitStatus === "success") {
    return (
      <div ref={shellRef} className="fb-shell">
        <div className="fb-shell-card fb-success-card">
          <div className="flex flex-col items-center py-12 text-center">
            {/* Emerald check */}
            <div className="fb-success-icon" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              You&apos;re all set!
            </h2>
            <p className="mt-2 text-slate-500">
              Account created for{" "}
              <span className="font-semibold text-slate-700">
                {formData.step1.email}
              </span>
              .
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitStatus("idle");
                setCurrentStep(1);
                setFormData(DEFAULT_FORM_DATA);
              }}
              className="fb-btn-secondary mt-8"
            >
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={shellRef} className="fb-shell">
      <div className="fb-shell-card">
        {/* Step indicator */}
        <div className="mb-8 px-6 pt-6 sm:px-8 sm:pt-8">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Divider */}
        <div className="fb-divider" aria-hidden="true" />

        {/* Step content */}
        <div ref={contentRef} className="px-6 py-6 sm:px-8 sm:py-8">
          {currentStep === 1 && (
            <FormStep1
              data={formData.step1}
              onChange={(d) => setFormData((f) => ({ ...f, step1: d }))}
            />
          )}
          {currentStep === 2 && (
            <FormStep2
              data={formData.step2}
              onChange={(d) => setFormData((f) => ({ ...f, step2: d }))}
            />
          )}
          {currentStep === 3 && (
            <FormStep3
              data={formData.step3}
              onChange={(d) => setFormData((f) => ({ ...f, step3: d }))}
            />
          )}
          {currentStep === 4 && (
            <FormStep4
              data={formData}
              onEditStep={handleEditStep}
              onSubmit={handleSubmit}
              isSubmitting={submitStatus === "submitting"}
            />
          )}
        </div>

        {/* Navigation footer — hidden on step 4 (submit is inside FormStep4) */}
        {currentStep < 4 && (
          <>
            <div className="fb-divider" aria-hidden="true" />
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="fb-btn-ghost"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mr-1.5"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="fb-btn-primary"
                aria-label={currentStep === 3 ? "Continue to review" : "Continue to next step"}
              >
                {currentStep === 3 ? "Review" : "Continue"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="ml-1.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
