// ─── Form Builder Template — Constants & Content ───────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "form-builder";
export const TEMPLATE_NAME = "Form Builder";

// ─── Steps ────────────────────────────────────────────────────────────────────

export interface WizardStep {
  id: number;
  slug: "account" | "profile" | "preferences" | "review";
  label: string;
  description: string;
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    slug: "account",
    label: "Account",
    description: "Set up your login credentials",
  },
  {
    id: 2,
    slug: "profile",
    label: "Profile",
    description: "Tell us about yourself",
  },
  {
    id: 3,
    slug: "preferences",
    label: "Preferences",
    description: "Customize your experience",
  },
  {
    id: 4,
    slug: "review",
    label: "Review",
    description: "Confirm your information",
  },
];

// ─── Field Definitions ────────────────────────────────────────────────────────

export const ROLE_OPTIONS = [
  { value: "", label: "Select a role…" },
  { value: "engineer", label: "Engineer" },
  { value: "designer", label: "Designer" },
  { value: "product", label: "Product Manager" },
  { value: "founder", label: "Founder / CEO" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "other", label: "Other" },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
] as const;

export const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

// ─── Validation Messages ──────────────────────────────────────────────────────

export const VALIDATION_MESSAGES = {
  email: {
    required: "Email address is required.",
    invalid: "Please enter a valid email address.",
  },
  password: {
    required: "Password is required.",
    minLength: "Password must be at least 8 characters.",
    uppercase: "Password must include at least one uppercase letter.",
    number: "Password must include at least one number.",
  },
  confirmPassword: {
    required: "Please confirm your password.",
    mismatch: "Passwords do not match.",
  },
  name: {
    required: "Full name is required.",
    minLength: "Name must be at least 2 characters.",
  },
  company: {
    required: "Company name is required.",
  },
  role: {
    required: "Please select your role.",
  },
} as const;

// ─── Form Data Types ──────────────────────────────────────────────────────────

export interface Step1Data {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Step2Data {
  name: string;
  company: string;
  role: string;
  bio: string;
}

export interface Step3Data {
  notifyEmail: boolean;
  notifyPush: boolean;
  notifySms: boolean;
  theme: "light" | "dark" | "system";
  language: string;
}

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

export const DEFAULT_FORM_DATA: FormData = {
  step1: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  step2: {
    name: "",
    company: "",
    role: "",
    bio: "",
  },
  step3: {
    notifyEmail: true,
    notifyPush: false,
    notifySms: false,
    theme: "system",
    language: "en",
  },
};
