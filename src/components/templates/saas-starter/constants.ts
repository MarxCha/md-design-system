// ─── SaaS Starter Template — Constants & Content ───────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "saas-starter";
export const TEMPLATE_NAME = "SaaS Starter";

/** Navigation links */
export const navLinks = ["Features", "Pricing", "Testimonials"];

/** Hero section content */
export const heroContent = {
  badge: "Now in public beta",
  title: "Build faster.\nShip smarter.",
  subtitle:
    "The all-in-one platform that helps your team move from idea to production in record time. No complexity, just results.",
  ctaPrimary: "Start free trial",
  ctaSecondary: "Watch demo",
};

/** Feature cards */
export const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Deploy in seconds with our global edge network. Zero cold starts, infinite scale.",
  },
  {
    icon: "🔒",
    title: "Secure by Default",
    description:
      "Enterprise-grade security with SOC 2 compliance, SSO, and role-based access control.",
  },
  {
    icon: "📊",
    title: "Real-time Analytics",
    description:
      "Monitor everything with built-in dashboards. Track performance, errors, and user behavior.",
  },
  {
    icon: "🔌",
    title: "Powerful Integrations",
    description:
      "Connect with 200+ tools. GitHub, Slack, Jira, and more — all pre-built.",
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    description:
      "Built for teams. Shared workspaces, review workflows, and real-time editing.",
  },
  {
    icon: "🌍",
    title: "Global CDN",
    description:
      "Your content, everywhere. 300+ edge locations for sub-50ms response times worldwide.",
  },
];

/** Pricing tiers */
export const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for side projects and experimentation.",
    features: [
      "Up to 3 projects",
      "1GB storage",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams that need more power.",
    features: [
      "Unlimited projects",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated support",
      "SSO & SAML",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

/** Testimonials */
export const testimonials = [
  {
    quote:
      "We cut our deployment time by 80%. This platform is a game-changer for our engineering team.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow",
  },
  {
    quote:
      "The developer experience is unmatched. Everything just works, and the docs are incredible.",
    author: "Marcus Johnson",
    role: "Lead Engineer",
    company: "DataPulse",
  },
  {
    quote:
      "Finally, a platform that scales with us. We went from 1K to 1M users without changing a line of infra code.",
    author: "Elena Rodriguez",
    role: "VP Engineering",
    company: "ScaleUp",
  },
];

/** Footer link columns */
export const footerLinks: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Changelog", "Documentation", "API Reference"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Community", "Guides", "Templates", "Support"],
  Legal: ["Privacy", "Terms", "Security"],
};
