// ─── Cruip Open Template — Constants & Content ───────────────────────────────
// Single source of truth for all template copy.
// video-config.ts imports from here to keep web + video in sync.

export const TEMPLATE_SLUG = "cruip-open";
export const TEMPLATE_NAME = "Cruip Open";

/** Navigation items */
export const navItems = ["Features", "Workflows", "Testimonials", "GitHub"];

/** Hero section */
export const heroContent = {
  tagline: "Open Source",
  title: "Simple, Fast,\nOpen Source",
  subtitle:
    "The open-source SaaS toolkit that gets you from idea to production. No lock-in, no black boxes — just clean code you own.",
  ctaPrimary: "Get started free",
  ctaSecondary: "Star on GitHub",
  ctaGitHub: "https://github.com",
  socialProof: "6,000+ stars on GitHub",
};

/** Workflow steps */
export const workflows: Array<{
  number: string;
  title: string;
  description: string;
  icon: string;
}> = [
  {
    number: "01",
    title: "Connect your tools",
    description:
      "Integrate with your existing stack in minutes. OAuth, webhooks, REST APIs — every connector is open and auditable.",
    icon: "⚡",
  },
  {
    number: "02",
    title: "Automate workflows",
    description:
      "Define automations with a visual builder or YAML config. Trigger on events, schedules, or custom conditions.",
    icon: "🔄",
  },
  {
    number: "03",
    title: "Scale with confidence",
    description:
      "Deploy on your own infra or our managed cloud. Every component scales horizontally from day one.",
    icon: "🚀",
  },
];

/** Feature cards */
export const features: Array<{
  icon: string;
  title: string;
  description: string;
}> = [
  {
    icon: "⚡",
    title: "Blazing Performance",
    description:
      "Sub-50ms response times globally. Edge-optimized APIs with intelligent caching baked in at every layer.",
  },
  {
    icon: "🔒",
    title: "Security First",
    description:
      "SOC 2 compliant infrastructure. End-to-end encryption, RBAC, audit logs, and automatic secret rotation.",
  },
  {
    icon: "📈",
    title: "Infinite Scalability",
    description:
      "Horizontal autoscaling from 1 to 1 million users without changing a line of code. Pay only for what you use.",
  },
  {
    icon: "📊",
    title: "Built-in Analytics",
    description:
      "Real-time dashboards, cohort analysis, and retention metrics out of the box. No third-party analytics required.",
  },
  {
    icon: "🔗",
    title: "500+ Integrations",
    description:
      "Slack, GitHub, Stripe, Notion, Linear — connect everything your team already uses with one-click OAuth.",
  },
  {
    icon: "🛟",
    title: "Community Support",
    description:
      "Join 6,000+ contributors on GitHub. Open issues, submit PRs, and shape the roadmap alongside the core team.",
  },
];

/** Testimonials */
export const testimonials: Array<{
  quote: string;
  author: string;
  role: string;
  company: string;
  gradient: string;
}> = [
  {
    quote:
      "We cut our time-to-production by 60%. The open-source model means our security team can audit every dependency — that alone sold it to our CTO.",
    author: "Sarah Chen",
    role: "Head of Engineering",
    company: "Veritas Labs",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    quote:
      "Migrated from a proprietary stack in two weeks. The docs are exceptional and the community responds faster than most paid support tiers.",
    author: "Marcus Oliveira",
    role: "CTO",
    company: "Stacknode",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "The built-in analytics replaced three separate SaaS tools. We're saving $2,400/month and have more visibility than ever before.",
    author: "Amara Osei",
    role: "VP Product",
    company: "FluxCore",
    gradient: "from-indigo-400 to-cyan-500",
  },
];

/** CTA section */
export const ctaContent = {
  eyebrow: "Get early access",
  heading: "Ship faster.\nOwn your stack.",
  subheading:
    "Join thousands of engineers who chose transparency over lock-in. Free forever on the community tier.",
  placeholder: "Enter your work email",
  buttonText: "Join the waitlist",
  disclaimer: "No credit card required. Self-host or managed cloud.",
};

/** Footer link columns */
export const footerLinks: Array<{
  heading: string;
  links: string[];
}> = [
  {
    heading: "Product",
    links: ["Features", "Integrations", "Changelog", "Roadmap"],
  },
  {
    heading: "Developers",
    links: ["Documentation", "API Reference", "GitHub", "Status"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Press Kit"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookie Policy"],
  },
];
