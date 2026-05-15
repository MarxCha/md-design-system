import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import "./pk-stacking-cards.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--pks-font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--pks-font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--pks-font-body",
  display: "swap",
});

export const metadata = {
  title: "PieterKoopt Stacking Cards — MD Design System",
  description:
    "Faithful clone of pieterkoopt.nl section_stacking-cards (mwg_effect031 pin + scrub)",
};

export default function PkStackingCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="pk-stacking-cards-root"
      className={`pks-stacking-cards-template relative w-screen overflow-x-hidden bg-[#171c1c] ${cormorant.variable} ${geistMono.variable} ${inter.variable}`}
    >
      {children}
    </div>
  );
}
