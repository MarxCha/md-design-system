// ─── GSAP Cocktails Template — Constants & Content ───────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "gsap-cocktails";
export const TEMPLATE_NAME = "GSAP Cocktails";

/** Navigation items */
export const navItems = ["Cocktails", "About", "Experience", "Reserve"];

/** Hero section content */
export const heroContent = {
  tagline: "Artisan Cocktail Bar",
  title: "Where Mixology\nMeets Art",
  subtitle: "Hand-crafted cocktails with locally sourced ingredients and a passion for perfection.",
  ctaPrimary: "Reserve a Table",
  ctaSecondary: "Our Menu",
};

/** Featured cocktails */
export const cocktails = [
  {
    name: "Oaxaca Old Fashioned",
    spirit: "Mezcal · Agave · Bitters",
    description: "Smoky mezcal meets artisanal agave syrup, finished with Angostura and a charred orange peel.",
    color: "#D4A574",
    price: "$280",
  },
  {
    name: "Tokyo Highball",
    spirit: "Japanese Whisky · Tonic · Yuzu",
    description: "Crisp Suntory Toki over hand-cut ice, topped with artisanal tonic and fresh yuzu zest.",
    color: "#A8C4B8",
    price: "$320",
  },
  {
    name: "Negroni Sbagliato",
    spirit: "Campari · Vermouth · Prosecco",
    description: "The Italian classic reimagined — bitter Campari, sweet vermouth, crowned with fine bubbles.",
    color: "#C75B5B",
    price: "$260",
  },
  {
    name: "Lavender Gimlet",
    spirit: "Gin · Lavender · Lime",
    description: "London dry gin infused with Provençal lavender, brightened with fresh lime and a floral mist.",
    color: "#9B8EC4",
    price: "$290",
  },
];

/** About section */
export const aboutContent = {
  heading: "Crafted with Intention",
  paragraph1: "Every cocktail tells a story. Our bartenders source ingredients from local markets, distill house syrups, and carve ice by hand.",
  paragraph2: "Founded in 2019, we've served over 50,000 cocktails — each one made to order, never rushed, always memorable.",
  stat1: { value: "50K+", label: "Cocktails Served" },
  stat2: { value: "12", label: "House Spirits" },
  stat3: { value: "4.9", label: "Rating" },
};

/** Experience / features section */
export const features = [
  {
    icon: "🍸",
    title: "Seasonal Menu",
    description: "Rotating cocktails inspired by the freshest ingredients of the season",
  },
  {
    icon: "🧊",
    title: "Hand-Cut Ice",
    description: "Every cube carved to order for perfect dilution and presentation",
  },
  {
    icon: "🎵",
    title: "Live Jazz",
    description: "Thursday through Saturday, curated sets from local artists",
  },
  {
    icon: "🌿",
    title: "Garden to Glass",
    description: "Herbs and botanicals grown on our rooftop garden",
  },
];

/** Reservation CTA */
export const ctaContent = {
  heading: "Your Table Awaits",
  subtitle: "Reserve your evening and let us craft something unforgettable.",
  buttonText: "Make a Reservation",
  note: "Walk-ins welcome · Open Tue–Sun · 6PM–2AM",
};

/** Footer links */
export const footerLinks = {
  visit: ["Tues–Thu: 6PM–12AM", "Fri–Sat: 6PM–2AM", "Sunday: 5PM–11PM"],
  contact: ["hola@cocktailbar.mx", "+52 55 1234 5678", "Col. Roma Norte, CDMX"],
  social: ["Instagram", "TikTok", "Spotify"],
};
