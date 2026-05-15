import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Showcase",
  description:
    "Demostraci\u00f3n de template de producto estilo Apple \u2014 MD Design System",
};

export default function ProductShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
