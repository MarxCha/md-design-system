// ─── Page UI / Shipixen Template — Constants & Content ──────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "page-ui";
export const TEMPLATE_NAME = "Page UI";

/** Navigation items */
export const navItems: string[] = ["Features", "Pricing", "Testimonials", "FAQ"];

/** Hero section content */
export const heroContent = {
  tagline: "Ship Faster",
  title: "Build Beautiful\nLanding Pages",
  subtitle:
    "The rapid landing page builder designed for indie hackers and SaaS founders. Go from idea to live in minutes, not weeks.",
  ctaPrimary: "Get Started Free",
  ctaSecondary: "See Examples",
  socialProof: "Trusted by 10,000+ developers",
};

/** Feature cards */
export const features: Array<{
  icon: string;
  title: string;
  description: string;
}> = [
  {
    icon: "📊",
    title: "Analytics Dashboard",
    description:
      "Track visitors, conversions, and revenue in real time. Beautiful charts with zero configuration needed.",
  },
  {
    icon: "🔐",
    title: "Auth & Security",
    description:
      "Built-in authentication with OAuth, magic links, and 2FA. Enterprise-grade security out of the box.",
  },
  {
    icon: "🔌",
    title: "API Integration",
    description:
      "Connect to any service via REST or GraphQL. 200+ pre-built integrations ready to drop in.",
  },
  {
    icon: "⚡",
    title: "Real-time Sync",
    description:
      "Live data across all connected clients. WebSocket-powered updates with automatic conflict resolution.",
  },
  {
    icon: "🎨",
    title: "Smart Templates",
    description:
      "Start from a library of professionally designed templates. Customize every pixel with zero friction.",
  },
  {
    icon: "☁️",
    title: "Cloud Deploy",
    description:
      "One-click deploys to global edge networks. Instant rollbacks, preview branches, and zero downtime.",
  },
];

/** Pricing tiers */
export const pricingPlans: Array<{
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}> = [
  {
    name: "Hobby",
    price: "$0",
    period: "forever",
    description: "Perfect for personal projects and experimenting.",
    features: [
      "3 landing pages",
      "1,000 monthly visitors",
      "Basic templates",
      "Community support",
      "Page UI branding",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For indie hackers who ship fast and iterate faster.",
    features: [
      "Unlimited pages",
      "100,000 monthly visitors",
      "All premium templates",
      "Custom domain",
      "Analytics dashboard",
      "Priority support",
      "Remove branding",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$79",
    period: "/month",
    description: "Scale your team and ship with confidence.",
    features: [
      "Everything in Pro",
      "Unlimited visitors",
      "5 team seats",
      "A/B testing",
      "Advanced analytics",
      "Dedicated support",
      "SSO & SAML",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

/** Testimonials */
export const testimonials: Array<{
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  gradient: string;
}> = [
  {
    quote:
      "Page UI cut our landing page launch time from two weeks to two hours. We shipped our product hunt launch overnight and hit #2 product of the day.",
    author: "Alex Kim",
    role: "Founder",
    company: "Launchpad",
    initials: "AK",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    quote:
      "I've tried every landing page tool out there. Page UI is the only one where I don't feel like I'm fighting the tool — it just gets out of my way.",
    author: "Sara Patel",
    role: "Product Designer",
    company: "Stackd",
    initials: "SP",
    gradient: "from-indigo-500 to-cyan-500",
  },
  {
    quote:
      "We went from zero to $10k MRR in 6 weeks. Having a polished landing page on day one made all the difference for our early conversions.",
    author: "Tomás Reyes",
    role: "CEO",
    company: "Nuvelo",
    initials: "TR",
    gradient: "from-fuchsia-500 to-violet-600",
  },
];

/** FAQ items */
export const faqItems: Array<{ question: string; answer: string }> = [
  {
    question: "Can I use my own custom domain?",
    answer:
      "Yes. On the Pro and Team plans you can connect any custom domain with a simple DNS record. SSL is provisioned automatically within minutes.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "Not at all. Page UI is built for founders, marketers, and designers. Our visual editor lets you build and ship without writing a single line of code. Developers can also drop into the underlying HTML/CSS for full control.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "Start a Pro trial for 14 days — no credit card required. You get full access to all features. At the end of the trial you can subscribe or switch to the Hobby plan.",
  },
  {
    question: "Can I export my pages?",
    answer:
      "Yes. You can export clean HTML/CSS/JS at any time on all paid plans. Your content is always yours — no lock-in.",
  },
  {
    question: "What analytics does Page UI provide?",
    answer:
      "Page UI includes a built-in analytics dashboard with visitor counts, conversion rates, scroll depth, and referrer tracking — all without cookies so you stay GDPR compliant by default.",
  },
];

/** CTA section */
export const ctaContent = {
  heading: "Ready to ship?",
  subheading: "Join 10,000+ developers building with Page UI.",
  inputPlaceholder: "you@example.com",
  buttonLabel: "Get early access",
};

/** Footer link columns */
export const footerLinks: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Templates", "Changelog"],
  Developers: ["Documentation", "API Reference", "GitHub", "Status"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};
