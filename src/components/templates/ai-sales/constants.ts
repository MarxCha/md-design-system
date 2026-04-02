// ─── AI Sales Template — Constants & Content ─────────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "ai-sales";
export const TEMPLATE_NAME = "AI Sales";

/** Navigation items */
export const navItems: string[] = ["Features", "How it works", "Pricing", "Contact"];

/** Hero section content */
export const heroContent = {
  badge: "AI-Powered Sales",
  title: "Close More Deals\nWith Less Effort",
  subtitle:
    "Automate your entire sales pipeline with AI. Score leads, personalize outreach, and close deals faster — all from one intelligent platform.",
  ctaPrimary: "Start Free Trial",
  ctaSecondary: "Watch Demo",
  socialProof: "Trusted by 500+ sales teams worldwide",
};

/** Main feature cards */
export const features = [
  {
    icon: "🎯",
    title: "Smart Lead Scoring",
    description:
      "AI analyzes hundreds of signals to rank your leads by conversion likelihood. Focus your energy where it matters most.",
  },
  {
    icon: "✉️",
    title: "Automated Outreach",
    description:
      "Send hyper-personalized emails at scale. Our AI writes sequences tailored to each prospect's context and behavior.",
  },
  {
    icon: "📈",
    title: "Revenue Intelligence",
    description:
      "Real-time pipeline insights powered by AI. Forecast accurately, spot risks early, and never miss a quota.",
  },
];

/** How It Works steps */
export const howItWorks = [
  {
    step: "01",
    title: "Connect Your CRM",
    description:
      "Sync your existing CRM data in minutes. We support Salesforce, HubSpot, Pipedrive, and 40+ more tools.",
  },
  {
    step: "02",
    title: "AI Analyzes Everything",
    description:
      "Our models study your pipeline history, win/loss patterns, and prospect behavior to build your ideal customer profile.",
  },
  {
    step: "03",
    title: "Close More Deals",
    description:
      "Get prioritized lead lists, drafted emails, and real-time coaching suggestions. Your team sells smarter every day.",
  },
];

/** Social proof stats */
export const socialProof = {
  companies: "500+",
  deals: "2M+",
  increase: "47%",
  stats: [
    { value: "500+", label: "Sales Teams" },
    { value: "2M+", label: "Deals Closed" },
    { value: "47%", label: "Revenue Increase" },
    { value: "3x", label: "Faster Outreach" },
  ],
};

/** Pricing tiers */
export const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for small sales teams getting started with AI.",
    features: [
      "Up to 5 users",
      "1,000 leads/month",
      "Smart lead scoring",
      "Email automation",
      "CRM integrations",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    description: "For growing teams that need the full AI sales stack.",
    features: [
      "Up to 25 users",
      "Unlimited leads",
      "Advanced AI scoring",
      "Multi-channel outreach",
      "Revenue intelligence",
      "A/B testing",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
];

/** CTA section content */
export const ctaContent = {
  badge: "Get started today",
  heading: "Ready to Transform\nYour Sales Process?",
  subheading:
    "Join 500+ sales teams already closing more deals with AI. Start your free 14-day trial — no credit card required.",
  inputPlaceholder: "Enter your work email",
  buttonText: "Start Free Trial",
  footnote: "No credit card required. Free 14-day trial. Cancel anytime.",
};

/** Footer link columns */
export const footerLinks: Record<string, string[]> = {
  Product: ["Features", "How it Works", "Pricing", "Changelog", "API"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "Integrations", "Templates", "Support"],
  Legal: ["Privacy", "Terms", "Security"],
};
