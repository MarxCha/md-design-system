"use client";

import { type Step3Data, THEME_OPTIONS, LANGUAGE_OPTIONS } from "./constants";

interface FormStep3Props {
  data: Step3Data;
  onChange: (data: Step3Data) => void;
}

export function isStep3Valid(/* _data */): boolean {
  // All fields are optional booleans/selects — always valid
  return true;
}

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

function Toggle({ id, checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="fb-toggle-row">
      <div className="flex-1">
        <label htmlFor={id} className="fb-toggle-label">
          {label}
        </label>
        {description && (
          <p className="fb-toggle-description">{description}</p>
        )}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={["fb-toggle", checked ? "fb-toggle--on" : "fb-toggle--off"].join(" ")}
        aria-label={label}
      >
        <span className="fb-toggle-thumb" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function FormStep3({ data, onChange }: FormStep3Props) {
  function handleToggle(field: "notifyEmail" | "notifyPush" | "notifySms", value: boolean) {
    onChange({ ...data, [field]: value });
  }

  function handleTheme(theme: Step3Data["theme"]) {
    onChange({ ...data, theme });
  }

  function handleLanguage(language: string) {
    onChange({ ...data, language });
  }

  return (
    <div className="fb-step-content">
      <div className="mb-8">
        <h2 className="fb-step-heading">Preferences</h2>
        <p className="fb-step-subheading">
          You can change these at any time from your settings.
        </p>
      </div>

      <div className="space-y-8">
        {/* Notifications section */}
        <section aria-labelledby="fb-notif-heading">
          <h3 id="fb-notif-heading" className="fb-section-label">
            Notifications
          </h3>
          <div className="fb-toggle-group">
            <Toggle
              id="fb-notify-email"
              checked={data.notifyEmail}
              onChange={(v) => handleToggle("notifyEmail", v)}
              label="Email notifications"
              description="Receive updates and activity summaries by email."
            />
            <Toggle
              id="fb-notify-push"
              checked={data.notifyPush}
              onChange={(v) => handleToggle("notifyPush", v)}
              label="Push notifications"
              description="Get real-time alerts on your device."
            />
            <Toggle
              id="fb-notify-sms"
              checked={data.notifySms}
              onChange={(v) => handleToggle("notifySms", v)}
              label="SMS notifications"
              description="Critical alerts sent directly to your phone."
            />
          </div>
        </section>

        {/* Theme section */}
        <section aria-labelledby="fb-theme-heading">
          <fieldset>
            <legend
              id="fb-theme-heading"
              className="fb-section-label"
            >
              Theme preference
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {THEME_OPTIONS.map((opt) => {
                const isSelected = data.theme === opt.value;
                return (
                  <label
                    key={opt.value}
                    htmlFor={`fb-theme-${opt.value}`}
                    className={[
                      "fb-radio-card",
                      isSelected ? "fb-radio-card--selected" : "",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      id={`fb-theme-${opt.value}`}
                      name="fb-theme"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => handleTheme(opt.value as Step3Data["theme"])}
                      className="sr-only"
                    />
                    {/* Icon */}
                    <span className="fb-radio-icon" aria-hidden="true">
                      {opt.value === "light" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="5" />
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="1" y1="12" x2="3" y2="12" />
                          <line x1="21" y1="12" x2="23" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                      )}
                      {opt.value === "dark" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      )}
                      {opt.value === "system" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                    </span>
                    <span className="mt-1 block text-center text-sm font-medium">
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </section>

        {/* Language section */}
        <section aria-labelledby="fb-lang-heading">
          <h3 id="fb-lang-heading" className="fb-section-label">
            Language
          </h3>
          <div className="mt-3">
            <label htmlFor="fb-language" className="sr-only">
              Select language
            </label>
            <select
              id="fb-language"
              value={data.language}
              onChange={(e) => handleLanguage(e.target.value)}
              className="fb-select"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </section>
      </div>
    </div>
  );
}
