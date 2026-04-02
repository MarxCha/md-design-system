"use client";

import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  SocialProof,
  Pricing,
  CTA,
} from "@/components/templates/ai-sales";

export default function AiSalesPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <SocialProof />
      <Pricing />
      <CTA />
    </main>
  );
}
