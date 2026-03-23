/**
 * MD Design System — Main Package Entry
 *
 * Re-exports all components, hooks, providers, and utilities
 * for consumption by CuentosIA, Palabras Vivas, dashboards, etc.
 */

// ─── UI Components (shadcn/ui) ──────────────────────────────
export * from "./components/ui";

// ─── Custom Components ──────────────────────────────────────
export * from "./components/animation";
export * from "./components/scroll";
export * from "./components/parallax";
export * from "./components/effects";
export * from "./components/interactive";
export * from "./components/navigation";
export * from "./components/audio";
export * from "./components/story";
export * from "./components/three";
export * from "./components/product";

// ─── Hooks ──────────────────────────────────────────────────
export * from "./hooks";

// ─── Providers ──────────────────────────────────────────────
export {
  SmoothScrollProvider,
  useLenis,
} from "./providers/SmoothScrollProvider";

export {
  AudioProvider,
  useAudio,
  type AudioTrack,
  type AudioTrackId,
} from "./providers/AudioProvider";

// ─── Utilities ──────────────────────────────────────────────
export { cn } from "./lib/utils";

// ─── Theme & Design Tokens ──────────────────────────────────
export * from "./lib/theme";

// ─── Animation Presets ──────────────────────────────────────
export * from "./lib/animation-presets";
