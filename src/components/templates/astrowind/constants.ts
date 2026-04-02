// ─── AstroWind Template — Constants & Content ────────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "astrowind";
export const TEMPLATE_NAME = "AstroWind";

/** Navigation items */
export const navItems: string[] = ["Features", "Services", "Pricing", "About"];

/** Hero section content */
export const heroContent = {
  tagline: "Welcome to AstroWind",
  title: "Free template for\nstartups & businesses",
  subtitle:
    "AstroWind is a free and open-source template to create your website using Astro + Tailwind CSS. Highly customizable, production-ready.",
  ctaPrimary: "Get Started",
  ctaSecondary: "Learn More",
};

/** Feature cards */
export const features = [
  {
    icon: "🔍",
    title: "Optimized SEO",
    description:
      "Built with SEO best practices in mind. Meta tags, sitemaps, and structured data configured out of the box.",
  },
  {
    icon: "⚡",
    title: "Performance",
    description:
      "Blazing fast load times with zero-JS by default, smart hydration, and automatic code splitting.",
  },
  {
    icon: "🔒",
    title: "Security",
    description:
      "Enterprise-grade security defaults. Content Security Policy headers configured and ready.",
  },
  {
    icon: "🎨",
    title: "Customizable",
    description:
      "Easily adapt the design to your brand. Tailwind CSS utility classes give you full creative control.",
  },
  {
    icon: "📱",
    title: "Responsive",
    description:
      "Every layout is mobile-first and tested across all screen sizes, from 320px to 4K displays.",
  },
  {
    icon: "💬",
    title: "Support",
    description:
      "Active community on GitHub and Discord. Extensive docs, video tutorials, and migration guides.",
  },
];

/** Stats */
export const stats = [
  { value: "132K+", label: "Downloads" },
  { value: "24K+", label: "Stars" },
  { value: "10K+", label: "Users" },
  { value: "99.9%", label: "Uptime" },
];

/** Steps (how it works) */
export const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Browse our template gallery and identify which layout fits your vision. Read docs to understand the architecture.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Customize the color palette, typography, and component configuration to match your brand guidelines.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Clone the repo, run npm install, and start building your pages. The dev server reloads in milliseconds.",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "Push to GitHub and deploy to Vercel, Netlify, or any CDN with a single command. Go live in minutes.",
  },
];

/** Pricing tiers */
export const pricingPlans = [
  {
    name: "Basic",
    price: "$0",
    period: "forever",
    description: "Perfect for personal projects and getting started for free.",
    features: [
      "1 website",
      "Community support",
      "Basic analytics",
      "Standard templates",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Standard",
    price: "$15",
    period: "/month",
    description: "Everything you need to launch a professional business site.",
    features: [
      "5 websites",
      "Priority support",
      "Advanced analytics",
      "Premium templates",
      "Custom domain",
      "Remove branding",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$45",
    period: "/month",
    description: "For teams and agencies managing multiple client projects.",
    features: [
      "Unlimited websites",
      "Dedicated support",
      "White-label",
      "Team collaboration",
      "API access",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

/** CTA section */
export const ctaContent = {
  badge: "Get started today",
  heading: "Ready to boost your projects?",
  subheading:
    "Join thousands of developers and businesses who use AstroWind to ship faster and look better.",
  inputPlaceholder: "Enter your email",
  buttonLabel: "Get started free",
  disclaimer: "No credit card required. Free forever on Basic plan.",
};

/** Footer link columns */
export const footerLinks: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "Guides", "Templates", "Community"],
  Legal: ["Privacy", "Terms", "Security"],
};
