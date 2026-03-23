"use client";

import { ProductShowcaseTemplate } from "@/components/product/ProductShowcaseTemplate";
import type { ProductData } from "@/types/product";

const mockProduct: ProductData = {
  title: "Redise\u00f1ado. Reinventado. Revolucionario.",
  subtitle:
    "El sistema de dise\u00f1o m\u00e1s avanzado que hemos creado. Componentes de nivel Awwwards para cada proyecto de MD Consultor\u00eda.",
  ctaLabel: "Explorar Componentes",
  ctaHref: "/playground",
  backgroundVariant: "dark",
  features: [
    {
      title: "Scroll Storytelling",
      description:
        "ScrollStoryContainer + ScrollScene + Lenis smooth scroll. Crea narrativas inmersivas que se despliegan con el scroll, como My Little Storybook y The Boat.",
      tag: "Narrativa",
    },
    {
      title: "Animaciones de Nivel Awwwards",
      description:
        "GSAP ScrollTrigger + Framer Motion + animation presets. RevealOnScroll, SplitTextReveal, StaggerChildren \u2014 todo con prefers-reduced-motion.",
      tag: "Motion",
    },
    {
      title: "Audio Sincronizado",
      description:
        "Howler.js + NarrationSync + word-by-word highlighting. Crea experiencias de lectura interactiva donde el audio gu\u00eda la narrativa visual.",
      tag: "Audio",
    },
    {
      title: "3D Inmersivo",
      description:
        "Three.js + React Three Fiber + drei. Scene3D y FloatingObject SSR-safe con dynamic imports. Modelos 3D integrados en el flujo de scroll.",
      tag: "WebGL",
    },
  ],
  specs: [
    { label: "Componentes", value: "25", unit: "+" },
    { label: "Hooks Custom", value: "10" },
    { label: "Animation Presets", value: "16" },
    { label: "TypeScript", value: "100", unit: "%" },
    { label: "Errores TS", value: "0" },
    { label: "Design Tokens", value: "60", unit: "+" },
    { label: "Demo Pages", value: "4" },
    { label: "Accesibilidad", value: "AA", unit: "WCAG" },
  ],
};

export default function ProductShowcasePage() {
  return <ProductShowcaseTemplate product={mockProduct} />;
}
