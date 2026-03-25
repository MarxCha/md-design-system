import type { LucideIcon } from "lucide-react";

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Products", href: "#products" },
  { label: "Nexus",    href: "#nexus" },
  { label: "Vault",    href: "#vault" },
  { label: "Prologue", href: "#prologue" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
];

// ─── Social Links ────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href: string;
  /** Lucide icon name — components should import from "lucide-react" */
  iconName: "MessageCircle" | "Twitter" | "Youtube" | "BookOpen";
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Discord",
    href:  "https://discord.gg/zentry",
    iconName: "MessageCircle",
  },
  {
    label: "Twitter",
    href:  "https://twitter.com/zentry",
    iconName: "Twitter",
  },
  {
    label: "YouTube",
    href:  "https://youtube.com/@zentry",
    iconName: "Youtube",
  },
  {
    label: "Medium",
    href:  "https://medium.com/zentry",
    iconName: "BookOpen",
  },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────

export const HERO_TAGLINE = "Enter the Metagame Layer";

export const HERO_DESCRIPTION =
  "Immerse yourself in a rich and ever-expanding ecosystem where a number of \
products converge into an interconnected universe.";

// ─── About Section ───────────────────────────────────────────────────────────

export const ABOUT_SUBHEADING = "Welcome to Zentry";

export const ABOUT_HEADING = "Disc\nover the world's\nlargest shared\nadventure";

export const ABOUT_BODY = `We're redefining gaming through play economy — where in-game assets and \
experiences hold real-world value. Zentry is the social and gaming layer of the \
new internet.`;

// ─── Features (Bento) Section ────────────────────────────────────────────────

export interface BentoFeature {
  title: string;
  description: string;
  videoIndex: number; // 1–5, maps to featureVideos
}

export const BENTO_FEATURES: BentoFeature[] = [
  {
    title: "radiant",
    description:
      "A cross-world AI Agent — elevating your gameplay to be more fun and productive.",
    videoIndex: 1,
  },
  {
    title: "zigma",
    description:
      "An anime and gaming-inspired NFT collection — the IP primed for expansion.",
    videoIndex: 2,
  },
  {
    title: "nexus",
    description:
      "A gamified social hub, adding a new dimension of play and connection.",
    videoIndex: 3,
  },
  {
    title: "azul",
    description: "A cross-world AI Agent — elevating your gameplay experience.",
    videoIndex: 4,
  },
  {
    title: "more coming soon",
    description:
      "Zentry's universe continues to grow — new products, new worlds.",
    videoIndex: 5,
  },
];

// ─── Story Section ────────────────────────────────────────────────────────────

export const STORY_TAGLINE = "The open IP Universe";

export const STORY_HEADING = "The st\nory of\na hidd\nen realm";

export const STORY_BODY = `The Zentry Universe is a vast tapestry of heroes, artifacts, and worlds \
waiting to be discovered. Each thread woven into this narrative becomes part of \
a larger, ever-evolving story that players help shape.`;

// ─── Contact Section ─────────────────────────────────────────────────────────

export const CONTACT_TAGLINE = "Join Zentry and Make fun happen!";

export const CONTACT_HEADING = "let\ns b\nuil\nd a\n new\n era\n of\n  ga\nming\n tog\neth\ner.";

export const CONTACT_CTA_PRIMARY = "contact us";

export const CONTACT_CTA_SECONDARY = "watch trailer";

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms of Service",  href: "/terms" },
];

export const FOOTER_COPYRIGHT =
  `© ${new Date().getFullYear()} Zentry. All rights reserved.`;

// ─── Misc ─────────────────────────────────────────────────────────────────────

/** Number of hero video clips cycling in the background */
export const HERO_VIDEO_COUNT = 4;

/** Number of feature video clips for bento cards */
export const FEATURE_VIDEO_COUNT = 5;
