import {
  CreceHero,
  CreceProof,
  CrecePillars,
  CreceCasos,
  CreceBlindaje,
  CreceCTA,
} from "@/components/landing/crece";
import { Fraunces, JetBrains_Mono, DM_Sans } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-crece-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-crece-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-crece-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function CreceLandingPage() {
  return (
    <div
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${dmSans.variable} crece-root`}
    >
      <style>{`
        .crece-root {
          font-family: var(--font-crece-body), system-ui, sans-serif;
        }
        .crece-root .crece-display {
          font-family: var(--font-crece-display), Georgia, serif;
        }
        .crece-root .font-mono,
        .crece-root pre,
        .crece-root code,
        .crece-root .tabular-nums {
          font-family: var(--font-crece-mono), ui-monospace, monospace;
        }
      `}</style>
      <main>
        <CreceHero />
        <CreceProof />
        <CrecePillars />
        <CreceCasos />
        <CreceBlindaje />
        <CreceCTA />
      </main>
    </div>
  );
}
