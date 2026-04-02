// ─── Form Builder Template — Barrel Export ─────────────────────────────────────

// ── Foundation ──────────────────────────────────────────────────────────
export * from "./constants";

// ── Components (internal names — for use within the template page) ──────
export { default as StepIndicator } from "./StepIndicator";
export { default as FormStep1 } from "./FormStep1";
export { default as FormStep2 } from "./FormStep2";
export { default as FormStep3 } from "./FormStep3";
export { default as FormStep4 } from "./FormStep4";
export { default as FormShell } from "./FormShell";

// ── Named components (FormBuilder-prefixed — for use in other contexts) ────
export { default as FormBuilderStepIndicator } from "./StepIndicator";
export { default as FormBuilderShell } from "./FormShell";
