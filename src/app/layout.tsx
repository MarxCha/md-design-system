import type { Metadata } from "next";
import { Instrument_Sans, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { AgentationWrapper } from "@/components/dev/AgentationWrapper";

/* ============================================================
   Fonts — Instrument Sans (display) + DM Sans (body)
   NEVER Inter, Roboto, or Arial
   ============================================================ */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ============================================================
   Metadata
   ============================================================ */
export const metadata: Metadata = {
  title: {
    default: "MD Design System",
    template: "%s | MD Design System",
  },
  description:
    "Sistema de diseño de MD Consultoría TI — tokens, componentes y patrones de interfaz.",
  keywords: ["design system", "MD Consultoría", "UI", "componentes"],
  authors: [{ name: "MD Consultoría TI" }],
};

/* ============================================================
   Root Layout
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${dmSans.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <AgentationWrapper />
      </body>
    </html>
  );
}
