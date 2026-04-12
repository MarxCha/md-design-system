// ─── GSAP Cocktails Template — Constants & Content ───────────────────────────────
// Faithful port of /tmp/gsap_cocktails/constants/index.js
// Paths updated: /images/ → /templates/gsap-cocktails/images/
//                /videos/ → /templates/gsap-cocktails/videos/

export const TEMPLATE_SLUG = "gsap-cocktails";
export const TEMPLATE_NAME = "GSAP Cocktails";

// ── Types ─────────────────────────────────────────────────────────────────────────

export interface NavLink {
  id: string;
  title: string;
}

export interface DrinkItem {
  name: string;
  country: string;
  detail: string;
  price: string;
}

export interface ProfileItem {
  imgPath: string;
}

export interface StoreInfo {
  heading: string;
  address: string;
  contact: {
    phone: string;
    email: string;
  };
}

export interface OpeningHour {
  day: string;
  time: string;
}

export interface Social {
  name: string;
  icon: string;
  url: string;
}

export interface Cocktail {
  id: number;
  name: string;
  image: string;
  title: string;
  description: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  {
    id: "cocktails",
    title: "Cocktails",
  },
  {
    id: "about",
    title: "About Us",
  },
  {
    id: "work",
    title: "The Art",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const cocktailLists: DrinkItem[] = [
  {
    name: "Chapel Hill Shiraz",
    country: "AU",
    detail: "Battle",
    price: "$10",
  },
  {
    name: "Caten Malbee",
    country: "AU",
    detail: "Battle",
    price: "$49",
  },
  {
    name: "Rhino Pale Ale",
    country: "CA",
    detail: "750 ml",
    price: "$20",
  },
  {
    name: "Irish Guinness",
    country: "IE",
    detail: "600 ml",
    price: "$29",
  },
];

export const mockTailLists: DrinkItem[] = [
  {
    name: "Tropical Bloom",
    country: "US",
    detail: "Battle",
    price: "$10",
  },
  {
    name: "Passionfruit Mint",
    country: "US",
    detail: "Battle",
    price: "$49",
  },
  {
    name: "Citrus Glow",
    country: "CA",
    detail: "750 ml",
    price: "$20",
  },
  {
    name: "Lavender Fizz",
    country: "IE",
    detail: "600 ml",
    price: "$29",
  },
];

export const profileLists: ProfileItem[] = [
  {
    imgPath: "/templates/gsap-cocktails/images/profile1.png",
  },
  {
    imgPath: "/templates/gsap-cocktails/images/profile2.png",
  },
  {
    imgPath: "/templates/gsap-cocktails/images/profile3.png",
  },
  {
    imgPath: "/templates/gsap-cocktails/images/profile4.png",
  },
];

export const featureLists: string[] = [
  "Perfectly balanced blends",
  "Garnished to perfection",
  "Ice-cold every time",
  "Expertly shaken & stirred",
];

export const goodLists: string[] = [
  "Handpicked ingredients",
  "Signature techniques",
  "Bartending artistry in action",
  "Freshly muddled flavors",
];

export const storeInfo: StoreInfo = {
  heading: "Where to Find Us",
  address: "456, Raq Blvd. #404, Los Angeles, CA 90210",
  contact: {
    phone: "(555) 987-6543",
    email: "hello@jsmcocktail.com",
  },
};

export const openingHours: OpeningHour[] = [
  { day: "Mon\u2013Thu", time: "11:00am \u2013 12am" },
  { day: "Fri", time: "11:00am \u2013 2am" },
  { day: "Sat", time: "9:00am \u2013 2am" },
  { day: "Sun", time: "9:00am \u2013 1am" },
];

export const socials: Social[] = [
  {
    name: "Instagram",
    icon: "/templates/gsap-cocktails/images/insta.png",
    url: "#",
  },
  {
    name: "X (Twitter)",
    icon: "/templates/gsap-cocktails/images/x.png",
    url: "#",
  },
  {
    name: "Facebook",
    icon: "/templates/gsap-cocktails/images/fb.png",
    url: "#",
  },
];

export const allCocktails: Cocktail[] = [
  {
    id: 1,
    name: "Classic Mojito",
    image: "/templates/gsap-cocktails/images/drink1.png",
    title: "Simple Ingredients, Bold Flavor",
    description:
      "Made with tequila, lime juice, and orange liqueur, the Margarita is easy to make and full of character. Add a salted rim for the perfect drink on summer nights.",
  },
  {
    id: 2,
    name: "Raspberry Mojito",
    image: "/templates/gsap-cocktails/images/drink2.png",
    title: "A Zesty Classic That Never Fails",
    description:
      "The Margarita is a classic that balances tangy lime, smooth tequila, and a touch of sweetness. Shaken, frozen, or on the rocks\u2014it's always crisp & refreshing.",
  },
  {
    id: 3,
    name: "Violet Breeze",
    image: "/templates/gsap-cocktails/images/drink3.png",
    title: "Simple Ingredients, Bold Flavor",
    description:
      "Made with tequila, lime juice, and orange liqueur, the Margarita is easy to make and full of character. Add a salted rim for the perfect drink on summer nights.",
  },
  {
    id: 4,
    name: "Curacao Mojito",
    image: "/templates/gsap-cocktails/images/drink4.png",
    title: "Crafted With Care, Poured With Love",
    description:
      "Each cocktail is made with fresh ingredients and a passion for perfecting every pour, whether you're celebrating or simply relaxing.",
  },
];
