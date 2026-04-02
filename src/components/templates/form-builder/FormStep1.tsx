"use client";

import { useState } from "react";
import { type Step1Data, VALIDATION_MESSAGES } from "./constants";

interface FormStep1Props {
  data: Step1Data;
  onChange: (data: Step1Data) => void;
}

interface Step1Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validateEmail(value: string): string | undefined {
  if (!value.trim()) return VALIDATION_MESSAGES.email.required;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return VALIDATION_MESSAGES.email.invalid;
}

function validatePassword(value: string): string | undefined {
  if (!value) return VALIDATION_MESSAGES.password.required;
  if (value.length < 8) return VALIDATION_MESSAGES.password.minLength;
  if (!/[A-Z]/.test(value)) return VALIDATION_MESSAGES.password.uppercase;
  if (!/\d/.test(value)) return VALIDATION_MESSAGES.password.number;
}

function validateConfirmPassword(
  value: string,
  password: string
): string | undefined {
  if (!value) return VALIDATION_MESSAGES.confirmPassword.required;
  if (value !== password) return VALIDATION_MESSAGES.confirmPassword.mismatch;
}

export function validateStep1(data: Step1Data): Step1Errors {
  return {
    email: validateEmail(data.email),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(
      data.confirmPassword,
      data.password
    ),
  };
}

export function isStep1Valid(data: Step1Data): boolean {
  const errors = validateStep1(data);
  return !errors.email && !errors.password && !errors.confirmPassword;
}

export default function FormStep1({ data, onChange }: FormStep1Props) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const errors = validateStep1(data);

  function handleBlur(field: keyof Step1Data) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleChange(field: keyof Step1Data, value: string) {
    onChange({ ...data, [field]: value });
  }

  const emailError = touched.email ? errors.email : undefined;
  const passwordError = touched.password ? errors.password : undefined;
  const confirmError = touched.confirmPassword
    ? errors.confirmPassword
    : undefined;

  return (
    <div className="fb-step-content">
      <div className="mb-8">
        <h2 className="fb-step-heading">Create your account</h2>
        <p className="fb-step-subheading">
          You&apos;ll use these credentials to sign in.
        </p>
      </div>

      <div className="space-y-5">
        {/* Email */}
        <div className="fb-field-group">
          <label htmlFor="fb-email" className="fb-label">
            Email address
            <span className="fb-required" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="fb-email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-describedby={emailError ? "fb-email-error" : undefined}
            aria-invalid={!!emailError}
            placeholder="you@company.com"
            className={["fb-input", emailError ? "fb-input--error" : ""].join(" ")}
          />
          {emailError && (
            <p id="fb-email-error" role="alert" className="fb-field-error">
              {emailError}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="fb-field-group">
          <label htmlFor="fb-password" className="fb-label">
            Password
            <span className="fb-required" aria-hidden="true">
              *
            </span>
          </label>
          <div className="relative">
            <input
              id="fb-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              aria-describedby={
                passwordError
                  ? "fb-password-error"
                  : "fb-password-hint"
              }
              aria-invalid={!!passwordError}
              placeholder="Min. 8 characters"
              className={[
                "fb-input pr-12",
                passwordError ? "fb-input--error" : "",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="fb-password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {passwordError ? (
            <p id="fb-password-error" role="alert" className="fb-field-error">
              {passwordError}
            </p>
          ) : (
            <p id="fb-password-hint" className="fb-field-hint">
              Must be 8+ chars with an uppercase letter and a number.
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div className="fb-field-group">
          <label htmlFor="fb-confirm-password" className="fb-label">
            Confirm password
            <span className="fb-required" aria-hidden="true">
              *
            </span>
          </label>
          <div className="relative">
            <input
              id="fb-confirm-password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              value={data.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              aria-describedby={
                confirmError ? "fb-confirm-error" : undefined
              }
              aria-invalid={!!confirmError}
              placeholder="Re-enter your password"
              className={[
                "fb-input pr-12",
                confirmError ? "fb-input--error" : "",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="fb-password-toggle"
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {confirmError && (
            <p id="fb-confirm-error" role="alert" className="fb-field-error">
              {confirmError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
