import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import "./pk-cta-cards.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--pkc-font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--pkc-font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--pkc-font-body",
  display: "swap",
});

export const metadata = {
  title: "PieterKoopt CTA Cards — MD Design System",
  description:
    "Faithful clone of pieterkoopt.nl section_cta-cards (pin + scrub USP cards)",
};

export default function PkCtaCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="pk-cta-cards-root"
      className={`pkc-cta-cards-template relative w-screen overflow-x-hidden bg-[#171c1c] ${cormorant.variable} ${geistMono.variable} ${inter.variable}`}
    >
      {children}
    </div>
  );
}
