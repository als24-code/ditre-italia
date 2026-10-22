export interface NavItem {
  label: string;
  href: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const site = {
  name: "Ditre Italia",
  address: "Cordignano (Treviso), Italy",
  phone: "+39 0438 9999",
  email: "info@ditreitalia.it",
} as const;

export const primaryNav: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#language" },
  { label: "Services", href: "#values" },
  { label: "Gallery", href: "#studio" },
];

export const secondaryNav: NavItem[] = [
  { label: "Partners", href: "#team" },
  { label: "Social Media", href: "#contact" },
  { label: "Our Sponsor", href: "#team" },
  { label: "Sustainability", href: "#values" },
];

export const socials: NavItem[] = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Pinterest", href: "#" },
];

export const hero = {
  titleLines: ["Quiet Forms —", "Loud in Meaning"],
  caption:
    "Our furniture doesn't speak loudly. It whispers elegance, balance, and precision — crafted to last, designed to feel.",
  labels: ["Visual Archive", "Interior Stillness", "Design Atmosphere"],
};

export const mission = {
  statement:
    "Our mission is to create furniture that merges Italian craftsmanship with contemporary sensibility — pieces defined by clarity, comfort, and care.",
  body: "Our story begins in stillness — a quiet space where design takes shape slowly, and nothing is rushed. We work with care, guided by material, proportion, and feeling — creating pieces that belong, endure, and speak softly within the lives they enter.",
  supporting: "Our philosophy is rooted in the art of living well — blending refined materials, considered details, and enduring forms to create pieces that feel as natural as they are beautiful."
};

export const values = {
  statement:
    "More than design, we craft with values that quietly shape timeless, meaningful living.",
  body: "We believe that furniture is more than a physical object — it's a reflection of intention, heritage, and the way we choose to live.",
  items: [
    {
      title: "Designed with Intention",
      description:
        "Every line, proportion, and texture is chosen with care — nothing is random, everything has a reason.",
    },
    {
      title: "Elegance in Simplicity",
      description:
        "We embrace the quiet power of restraint. Through minimal gestures, we reveal lasting beauty.",
    },
    {
      title: "Rooted in Craft",
      description:
        "Tradition grounds us. Each piece reflects the precision and soul of Italian artisanal heritage.",
    },
    {
      title: "Made to Belong",
      description:
        "We create furniture meant to live with you — to adapt, age, and feel truly personal over time.",
    },
  ] satisfies ValueItem[],
};

export const language = {
  statement:
    "A language of lines and light, crafted with quiet precision — designed to bring calm, belonging in space, and evolve over time.",
  body: "We create with intention — combining timeless form, refined materials, and quiet detail to shape furniture that brings presence, warmth, and calm into everyday spaces, now and for years ahead.",
};

export const banner = {
  title: "Our mission is to create pieces that feel permanent",
  cardTitle: ["Studio Thinking —", "Artisan Execution"],
  cardBody:
    "From our studio in Via Europa 12, 31016 Cordignano (TV), Italy, we prototype ideas slowly.",
  quote: ["not just in durability,", "but in presence."],
};

export const team = {
  statement:
    "Behind every piece is a human hand — a team of specialists united by craft, curiosity, and attention to what truly matters.",
  body: "We are a studio of designers, artisans, and quiet thinkers — each dedicated to building objects that feel as good as they look. Ours is not a large team by size, but one held together by shared values: patience, precision, and emotional clarity.",
  members: [
    {
      name: "Elena Rossi",
      role: "Creative Director",
      image: "/images/team1.jpg",
    },
    {
      name: "Nicola Ferretti",
      role: "Lead Designer",
      image: "/images/team2.jpg",
    },
    {
      name: "Lucia Andreotti",
      role: "Visual & Styling",
      image: "/images/team3.jpg",
    },
    {
      name: "Aruna Santoro",
      role: "Spatial Designer",
      image: "/images/team4.jpg",
    },
  ] satisfies TeamMember[],
};

export const contact = {
  title: "GET IN TOUCH",
  body: "For press, projects, and partnerships — we welcome inquiries that reflect the same respect for form, detail, and material integrity.",
  label: "CONTACT/",
};
