"use client";

import { useState } from "react";
import { type Step2Data, ROLE_OPTIONS, VALIDATION_MESSAGES } from "./constants";

interface FormStep2Props {
  data: Step2Data;
  onChange: (data: Step2Data) => void;
}

interface Step2Errors {
  name?: string;
  company?: string;
  role?: string;
}

export function validateStep2(data: Step2Data): Step2Errors {
  const errors: Step2Errors = {};
  if (!data.name.trim()) errors.name = VALIDATION_MESSAGES.name.required;
  else if (data.name.trim().length < 2)
    errors.name = VALIDATION_MESSAGES.name.minLength;
  if (!data.company.trim()) errors.company = VALIDATION_MESSAGES.company.required;
  if (!data.role) errors.role = VALIDATION_MESSAGES.role.required;
  return errors;
}

export function isStep2Valid(data: Step2Data): boolean {
  const errors = validateStep2(data);
  return !errors.name && !errors.company && !errors.role;
}

export default function FormStep2({ data, onChange }: FormStep2Props) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = validateStep2(data);

  function handleBlur(field: keyof Step2Data) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleChange(field: keyof Step2Data, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="fb-step-content">
      <div className="mb-8">
        <h2 className="fb-step-heading">Your profile</h2>
        <p className="fb-step-subheading">
          This helps us personalize your experience.
        </p>
      </div>

      <div className="space-y-5">
        {/* Avatar upload area */}
        <div className="fb-field-group">
          <p className="fb-label">Profile photo</p>
          <div className="flex items-center gap-4">
            {/* Avatar placeholder */}
            <div
              className="fb-avatar-placeholder"
              aria-hidden="true"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            {/* Upload button (CSS-only, no actual upload) */}
            <div>
              <button
                type="button"
                className="fb-btn-secondary text-sm"
                aria-label="Upload profile photo"
              >
                Upload photo
              </button>
              <p className="mt-1 text-xs text-slate-400">
                JPG, PNG or GIF · Max 2 MB
              </p>
            </div>
          </div>
        </div>

        {/* Full name */}
        <div className="fb-field-group">
          <label htmlFor="fb-name" className="fb-label">
            Full name
            <span className="fb-required" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="fb-name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-describedby={touched.name && errors.name ? "fb-name-error" : undefined}
            aria-invalid={!!(touched.name && errors.name)}
            placeholder="Ada Lovelace"
            className={[
              "fb-input",
              touched.name && errors.name ? "fb-input--error" : "",
            ].join(" ")}
          />
          {touched.name && errors.name && (
            <p id="fb-name-error" role="alert" className="fb-field-error">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="fb-field-group">
          <label htmlFor="fb-company" className="fb-label">
            Company
            <span className="fb-required" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="fb-company"
            type="text"
            autoComplete="organization"
            value={data.company}
            onChange={(e) => handleChange("company", e.target.value)}
            onBlur={() => handleBlur("company")}
            aria-describedby={
              touched.company && errors.company ? "fb-company-error" : undefined
            }
            aria-invalid={!!(touched.company && errors.company)}
            placeholder="Acme Inc."
            className={[
              "fb-input",
              touched.company && errors.company ? "fb-input--error" : "",
            ].join(" ")}
          />
          {touched.company && errors.company && (
            <p id="fb-company-error" role="alert" className="fb-field-error">
              {errors.company}
            </p>
          )}
        </div>

        {/* Role select */}
        <div className="fb-field-group">
          <label htmlFor="fb-role" className="fb-label">
            Role
            <span className="fb-required" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="fb-role"
            value={data.role}
            onChange={(e) => handleChange("role", e.target.value)}
            onBlur={() => handleBlur("role")}
            aria-describedby={
              touched.role && errors.role ? "fb-role-error" : undefined
            }
            aria-invalid={!!(touched.role && errors.role)}
            className={[
              "fb-select",
              touched.role && errors.role ? "fb-input--error" : "",
            ].join(" ")}
          >
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {touched.role && errors.role && (
            <p id="fb-role-error" role="alert" className="fb-field-error">
              {errors.role}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="fb-field-group">
          <label htmlFor="fb-bio" className="fb-label">
            Short bio
            <span className="ml-2 text-xs font-normal text-slate-400">
              (optional)
            </span>
          </label>
          <textarea
            id="fb-bio"
            value={data.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={4}
            maxLength={300}
            placeholder="Tell us a little about yourself…"
            className="fb-textarea"
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {data.bio.length}/300
          </p>
        </div>
      </div>
    </div>
  );
}
