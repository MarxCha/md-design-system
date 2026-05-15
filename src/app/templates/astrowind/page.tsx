import {
  Navbar,
  Hero,
  Features,
  Stats,
  Steps,
  Pricing,
  CTA,
} from "@/components/templates/astrowind";

export default function AstrowindPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Steps />
      <Pricing />
      <CTA />
    </main>
  );
}
