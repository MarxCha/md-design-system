"use client";

import dynamic from "next/dynamic";
import {
  Navbar,
  Hero,
  Highlights,
  Features,
  HowItWorks,
  Footer,
} from "@/components/templates/iphone-15";

const Model = dynamic(
  () =>
    import("@/components/templates/iphone-15/Model").then((m) => ({
      default: m.Model,
    })),
  { ssr: false }
);

export default function IPhone15Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
