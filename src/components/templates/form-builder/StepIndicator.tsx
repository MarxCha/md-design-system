"use client";

import { WIZARD_STEPS } from "./constants";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Form progress" className="fb-step-indicator">
      {/* ── Desktop: full horizontal bar ─────────────────────────── */}
      <ol className="hidden items-center sm:flex">
        {WIZARD_STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <li key={step.id} className="flex flex-1 items-center">
              {/* Step node */}
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "fb-step-circle",
                    isCompleted ? "fb-step-circle--done" : "",
                    isCurrent ? "fb-step-circle--active" : "",
                    isUpcoming ? "fb-step-circle--upcoming" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    // Checkmark SVG
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8L6.5 11.5L13 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>

                {/* Label + description below circle */}
                <div className="mt-2 text-center">
                  <p
                    className={[
                      "text-xs font-semibold",
                      isCurrent ? "text-indigo-600" : isCompleted ? "text-slate-700" : "text-slate-400",
                    ].join(" ")}
                  >
                    {step.label}
                  </p>
                  <p className="hidden text-[10px] text-slate-400 lg:block">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector line (not after last step) */}
              {index < WIZARD_STEPS.length - 1 && (
                <div
                  className={[
                    "fb-step-connector",
                    isCompleted ? "fb-step-connector--done" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* ── Mobile: minimal pill ──────────────────────────────────── */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-3">
          {/* Active step circle */}
          <div className="fb-step-circle fb-step-circle--active">
            <span className="text-sm font-semibold">{currentStep}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              {WIZARD_STEPS[currentStep - 1]?.label}
            </p>
            <p className="text-xs text-slate-400">
              Step {currentStep} of {WIZARD_STEPS.length}
            </p>
          </div>
        </div>

        {/* Mini dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {WIZARD_STEPS.map((step) => (
            <span
              key={step.id}
              className={[
                "h-1.5 rounded-full transition-all",
                step.id < currentStep
                  ? "w-3 bg-indigo-500"
                  : step.id === currentStep
                    ? "w-4 bg-indigo-600"
                    : "w-1.5 bg-slate-300",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
