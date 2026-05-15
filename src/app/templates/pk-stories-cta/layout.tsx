import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import "./pk-stories-cta.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--psc-font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--psc-font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--psc-font-body",
  display: "swap",
});

export const metadata = {
  title: "PieterKoopt Stories CTA — MD Design System",
  description:
    "Faithful clone of pieterkoopt.nl section_stories-cta (final video + CTA panel)",
};

export default function PkStoriesCtaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="pk-stories-cta-root"
      className={`psc-stories-cta-template relative w-screen overflow-x-hidden bg-[#f5f1ea] ${cormorant.variable} ${geistMono.variable} ${inter.variable}`}
    >
      {children}
    </div>
  );
}
