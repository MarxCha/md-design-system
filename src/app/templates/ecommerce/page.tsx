"use client";

import {
  Navbar,
  Hero,
  Categories,
  ProductGrid,
  PromoBar,
  CTA,
} from "@/components/templates/ecommerce";

export default function EcommercePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <ProductGrid />
      <PromoBar />
      <CTA />
    </main>
  );
}
