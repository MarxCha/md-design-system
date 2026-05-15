import "./dashboard-pro.css";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Dashboard Pro — MD Design System",
  description: "SaaS admin dashboard template with KPIs, data table, and activity feed",
};

export default function DashboardProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="dashboard-pro-root"
      className={`dashboard-pro-template ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ minHeight: "100dvh", background: "#0f172a" }}
    >
      {children}
    </div>
  );
}
