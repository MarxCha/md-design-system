"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, productCategories } from "./constants";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  price: string;
  priceRaw: number;
  category: string;
  rating: number;
  reviews: number;
  colorHex: string;
  colorName: string;
  badge: string | null;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="ec-stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "ec-star ec-star-filled" : "ec-star ec-star-empty"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="ec-product-card group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product image — CSS art rectangle */}
      <div
        className="ec-product-image relative overflow-hidden"
        style={{ backgroundColor: product.colorHex, aspectRatio: "4/5" }}
      >
        {/* Decorative inner shapes */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div
            className="h-20 w-20 rounded-full"
            style={{ backgroundColor: `${product.colorHex}CC`, border: "2px solid rgba(255,255,255,0.25)" }}
          />
        </div>
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-tl-full"
          style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
          aria-hidden="true"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              product.badge === "New"
                ? "bg-amber-600 text-white"
                : product.badge === "Low Stock"
                ? "bg-red-100 text-red-700"
                : "bg-stone-900 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Quick-add overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleAdd}
            className={`ec-btn-add-to-cart w-full rounded-full py-2.5 text-xs font-semibold tracking-wide transition-all ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-stone-900 text-white hover:bg-stone-700"
            }`}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col gap-1.5 px-4 py-3.5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
          {product.category}
        </p>
        <p className="font-semibold text-stone-900 leading-tight">{product.name}</p>
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-stone-400">({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1.5">
          <span className="text-base font-bold text-stone-900">{product.price}</span>
          <span className="text-xs text-stone-400">{product.colorName}</span>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      gsap.set(".ec-grid-header", { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: ".ec-grid-header",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(".ec-grid-header", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        },
      });

      gsap.set(".ec-product-card", { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: ".ec-products-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".ec-product-card", {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.08,
          });
        },
      });
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  return (
    <section
      id="products"
      ref={containerRef}
      className="bg-stone-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="ec-grid-header mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
              Our Selection
            </p>
            <h2 className="ec-serif text-3xl font-bold text-stone-900 sm:text-4xl">
              Featured Products
            </h2>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {productCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="ec-products-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="ec-btn-outline inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-700 no-underline transition-all hover:border-stone-900 hover:text-stone-900 hover:shadow-md"
          >
            View All Products
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
