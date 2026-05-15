import type { ReactNode } from "react";

export interface FeatureItem {
  title: string;
  description: string;
  tag?: string;
  icon?: ReactNode;
}

export interface SpecItem {
  label: string;
  value: string;
  unit?: string;
  icon?: ReactNode;
}

export interface ProductData {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  videoSrc?: string;
  heroModel?: string;
  posterSrc?: string;
  features: FeatureItem[];
  specs: SpecItem[];
  backgroundVariant?: "dark" | "light" | "gradient";
}
