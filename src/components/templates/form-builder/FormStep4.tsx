"use client";

import { type FormData, WIZARD_STEPS, ROLE_OPTIONS, LANGUAGE_OPTIONS } from "./constants";

interface FormStep4Props {
  data: FormData;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

interface ReviewRowProps {
  label: string;
  value: string;
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="fb-review-row">
      <dt className="fb-review-label">{label}</dt>
      <dd className="fb-review-value">{value || <span className="text-slate-400 italic">Not provided</span>}</dd>
    </div>
  );
}

interface ReviewSectionProps {
  title: string;
  stepNumber: number;
  onEdit: () => void;
  children: React.ReactNode;
}

function ReviewSection({ title, stepNumber, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="fb-review-section">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="fb-edit-link"
          aria-label={`Edit ${title} — step ${stepNumber}`}
        >
          Edit
        </button>
      </div>
      <dl className="space-y-2">{children}</dl>
    </div>
  );
}

export default function FormStep4({
  data,
  onEditStep,
  onSubmit,
  isSubmitting,
}: FormStep4Props) {
  const roleName =
    ROLE_OPTIONS.find((r) => r.value === data.step2.role)?.label ?? data.step2.role;
  const languageName =
    LANGUAGE_OPTIONS.find((l) => l.value === data.step3.language)?.label ?? data.step3.language;

  const activeNotifications = [
    data.step3.notifyEmail && "Email",
    data.step3.notifyPush && "Push",
    data.step3.notifySms && "SMS",
  ]
    .filter(Boolean)
    .join(", ") || "None";

  return (
    <div className="fb-step-content">
      <div className="mb-8">
        <h2 className="fb-step-heading">Review your information</h2>
        <p className="fb-step-subheading">
          Everything look right? You can edit any section before submitting.
        </p>
      </div>

      <div className="space-y-4">
        {/* Step 1 — Account */}
        <ReviewSection
          title={WIZARD_STEPS[0].label}
          stepNumber={1}
          onEdit={() => onEditStep(1)}
        >
          <ReviewRow label="Email" value={data.step1.email} />
          <ReviewRow label="Password" value={data.step1.password ? "••••••••" : ""} />
        </ReviewSection>

        {/* Step 2 — Profile */}
        <ReviewSection
          title={WIZARD_STEPS[1].label}
          stepNumber={2}
          onEdit={() => onEditStep(2)}
        >
          <ReviewRow label="Full name" value={data.step2.name} />
          <ReviewRow label="Company" value={data.step2.company} />
          <ReviewRow label="Role" value={roleName} />
          {data.step2.bio && (
            <ReviewRow label="Bio" value={data.step2.bio} />
          )}
        </ReviewSection>

        {/* Step 3 — Preferences */}
        <ReviewSection
          title={WIZARD_STEPS[2].label}
          stepNumber={3}
          onEdit={() => onEditStep(3)}
        >
          <ReviewRow label="Notifications" value={activeNotifications} />
          <ReviewRow
            label="Theme"
            value={
              data.step3.theme.charAt(0).toUpperCase() + data.step3.theme.slice(1)
            }
          />
          <ReviewRow label="Language" value={languageName} />
        </ReviewSection>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="fb-btn-submit"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="fb-spinner"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating account…
            </span>
          ) : (
            "Create account"
          )}
        </button>

        <p className="mt-4 text-center text-xs text-slate-400">
          By creating an account you agree to our{" "}
          <a href="#" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
