import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--pkf-font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--pkf-font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--pkf-font-body",
  display: "swap",
});

export const metadata = {
  title: "PieterKoopt Full Clone — MD Design System",
  description:
    "Integrated clone of pieterkoopt.nl: hero + cta-cards + stacking-cards + stories-cta. Internal validation.",
};

export default function PieterkooptFullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="pkf-root"
      className={`pieterkoopt-full relative min-h-screen w-screen overflow-x-hidden bg-[#171c1c] ${cormorant.variable} ${geistMono.variable} ${inter.variable}`}
    >
      {children}
    </div>
  );
}
