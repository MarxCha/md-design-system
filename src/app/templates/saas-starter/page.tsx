"use client";

import {
  Navbar,
  Hero,
  Features,
  Pricing,
  Testimonials,
  CTA,
  Footer,
} from "@/components/templates/saas-starter";

export default function SaasStarterPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
