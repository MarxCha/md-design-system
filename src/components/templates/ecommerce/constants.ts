// ─── E-Commerce Template — Constants & Content ──────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "ecommerce";
export const TEMPLATE_NAME = "E-Commerce";

/** Navigation items */
export const navItems = [
  { label: "New Arrivals", href: "#products" },
  { label: "Collections", href: "#categories" },
  { label: "About", href: "#promo" },
];

/** Hero section content */
export const heroContent = {
  badge: "New Collection",
  title: "Curated with\nIntention",
  subtitle:
    "Each piece selected for its craftsmanship, longevity, and quiet beauty. Objects that earn their place in your everyday life.",
  ctaPrimary: "Shop Now",
  ctaSecondary: "View Lookbook",
};

/** Product catalog */
export const products = [
  {
    id: "p1",
    name: "Linen Overshirt",
    price: "$148",
    priceRaw: 148,
    category: "Clothing",
    rating: 4.8,
    reviews: 124,
    colorHex: "#C8B8A2",
    colorName: "Natural Linen",
    badge: "Bestseller" as string | null,
  },
  {
    id: "p2",
    name: "Ceramic Pour-Over Set",
    price: "$89",
    priceRaw: 89,
    category: "Home",
    rating: 4.9,
    reviews: 87,
    colorHex: "#E8E0D5",
    colorName: "Chalk White",
    badge: "New" as string | null,
  },
  {
    id: "p3",
    name: "Merino Wool Scarf",
    price: "$112",
    priceRaw: 112,
    category: "Accessories",
    rating: 4.7,
    reviews: 63,
    colorHex: "#8B7355",
    colorName: "Caramel",
    badge: null,
  },
  {
    id: "p4",
    name: "Leather Card Wallet",
    price: "$64",
    priceRaw: 64,
    category: "Accessories",
    rating: 4.6,
    reviews: 201,
    colorHex: "#5C4033",
    colorName: "Dark Cognac",
    badge: "Low Stock" as string | null,
  },
  {
    id: "p5",
    name: "Brushed Cotton Tote",
    price: "$42",
    priceRaw: 42,
    category: "Bags",
    rating: 4.5,
    reviews: 156,
    colorHex: "#D4C5B0",
    colorName: "Stone",
    badge: null,
  },
  {
    id: "p6",
    name: "Beeswax Pillar Candle",
    price: "$36",
    priceRaw: 36,
    category: "Home",
    rating: 4.9,
    reviews: 312,
    colorHex: "#F2E6C8",
    colorName: "Honey",
    badge: "Bestseller" as string | null,
  },
];

/** Category pills for filter */
export const productCategories = ["All", "Clothing", "Accessories", "Home", "Bags"];

/** Category showcase cards */
export const categories = [
  {
    id: "cat-clothing",
    name: "Clothing",
    itemCount: 48,
    gradientFrom: "#C8B8A2",
    gradientTo: "#A8927A",
    accentColor: "#3D2B1F",
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    itemCount: 32,
    gradientFrom: "#D4C5B0",
    gradientTo: "#B8A898",
    accentColor: "#3D2B1F",
  },
  {
    id: "cat-home",
    name: "Home",
    itemCount: 61,
    gradientFrom: "#E8E0D5",
    gradientTo: "#D0C8BC",
    accentColor: "#5C4033",
  },
  {
    id: "cat-bags",
    name: "Bags",
    itemCount: 19,
    gradientFrom: "#8B7355",
    gradientTo: "#6B5540",
    accentColor: "#F2E6C8",
  },
];

/** Testimonials */
export const testimonials = [
  {
    quote:
      "The quality exceeded my expectations. Everything arrived beautifully packaged and the linen overshirt is exactly what I was looking for — understated but clearly well-made.",
    author: "Marta L.",
    location: "Berlin",
    rating: 5,
  },
  {
    quote:
      "I have been searching for a ceramic pour-over set like this for years. The weight, the finish, the way it pours — nothing compares at this price point.",
    author: "James K.",
    location: "Portland",
    rating: 5,
  },
  {
    quote:
      "Slow fashion done right. These pieces actually last. My merino scarf is going on its third winter and still looks new.",
    author: "Sofia R.",
    location: "Amsterdam",
    rating: 5,
  },
];

/** Promo bar content */
export const promoContent = {
  message: "Free shipping on orders over $99",
  subMessage: "Use code FIRSTORDER for 10% off your first purchase",
  countdown: { hours: "23", minutes: "47", seconds: "12" },
};

/** Footer link columns */
export const footerLinks: Record<string, string[]> = {
  Shop: ["New Arrivals", "Clothing", "Accessories", "Home", "Bags", "Sale"],
  Company: ["About Us", "Sustainability", "Careers", "Press"],
  Support: ["Shipping & Returns", "Size Guide", "Care Instructions", "Contact"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Settings"],
};
