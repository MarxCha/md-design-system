"use client";

import {
  Navbar,
  Hero,
  Features,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
} from "@/components/templates/page-ui";

export default function PageUiPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
