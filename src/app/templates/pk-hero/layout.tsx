import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import "./pk-hero.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--pk-font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--pk-font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--pk-font-body",
  display: "swap",
});

export const metadata = {
  title: "PieterKoopt Hero — MD Design System",
  description: "Faithful clone of pieterkoopt.nl Hero (internal validation)",
};

export default function PkHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="pk-hero-root"
      className={`pk-hero-template relative min-h-screen w-screen overflow-x-hidden bg-[#171C1C] ${cormorant.variable} ${geistMono.variable} ${inter.variable}`}
    >
      {children}
    </div>
  );
}
