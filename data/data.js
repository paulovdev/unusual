import team01 from "@/public/assets/images/team/img-1.png";
import team02 from "@/public/assets/images/team/img-2.png";
import team03 from "@/public/assets/images/team/img-3.png";
import team04 from "@/public/assets/images/team/img-4.png";
import team05 from "@/public/assets/images/team/img-5.png";

import testimonial01 from "@/public/assets/images/about/testimonial-1.png";
import testimonial02 from "@/public/assets/images/about/testimonial-2.png";
import testimonial03 from "@/public/assets/images/about/testimonial-3.png";
import imgTest1 from "@/public/assets/images/price.jpg";

import {
  SiNotion,
  SiStripe,
  SiVercel,
  SiLinear,
  SiRaycast,
  SiFramer,
  SiSupabase,
  SiOpenai,
  SiReplit,
  SiFigma,
  SiTesla,
  SiThenorthface,
} from "react-icons/si";

export const team = [
  {
    src: team01,
    name: "Ethan Walker",
    role: "Interior Design Director",
    bio: [
      `Leads the creative direction of interior design projects, defining concepts, material palettes, and the spatial identity of each environment.`,
      `Oversees every stage of the process, from initial concept development to final execution, ensuring consistency across layouts, architectural volumes, lighting, and finishes.`,
      `His work focuses on creating functional, refined interiors with a strong architectural identity and a clear design vision.`,
    ],
    email: "ethan@studio.com",
    instagram: "@ethanwalker",
    location: "London, United Kingdom",
  },
  {
    src: team02,
    name: "Sophie Mitchell",
    role: "Materials & Finishes Designer",
    bio: [
      `Specializes in selecting materials, textures, and finishes for residential and commercial interior design projects.`,
      `Explores combinations of surfaces, colors, and tactile qualities to create balanced, cohesive, and visually engaging environments.`,
    ],
    email: "sophie@studio.com",
    instagram: "@sophiemitchell",
    location: "Copenhagen, Denmark",
  },
  {
    src: team03,
    name: "Lucas Anderson",
    role: "Lighting Design Specialist",
    bio: [
      `Develops natural and artificial lighting schemes for residential and commercial interiors, balancing technical requirements with aesthetic intention.`,
      `Works with color temperature, light intensity, and fixture placement to enhance architectural features, highlight materials, and shape the atmosphere of each space.`,
    ],
    email: "lucas@studio.com",
    instagram: "@lucasanderson",
    location: "New York, United States",
  },
  /*   {
    src: team04,
    name: "Olivia Bennett",
    role: "Architectural Visualization Artist",
    bio: [
      `Creates high-quality architectural visualizations of interior spaces, focusing on materials, lighting, composition, and atmosphere.`,
      `Transforms design concepts into realistic renderings, helping clients visualize and evaluate projects before construction begins.`,
    ],
    email: "olivia@studio.com",
    instagram: "@oliviabennett",
    location: "Barcelona, Spain",
  },
  {
    src: team05,
    name: "Maya Collins",
    role: "Interior Designer",
    bio: [
      `Develops thoughtful interior design concepts with a focus on spatial planning, furniture selection, and visual composition.`,
      `Combines aesthetics, functionality, and comfort to create cohesive environments tailored to the needs and lifestyles of each client.`,
    ],
    email: "maya@studio.com",
    instagram: "@mayacollins",
    location: "Amsterdam, Netherlands",
  }, */
];

export const awards = [
  {
    title: "Dezeen Awards",
    year: "2026",
    organization: "Dezeen Awards",
    category: "Residential Interior of the Year",
    description:
      "International recognition honoring residential projects that demonstrate unmatched excellence in interior architecture, materiality, and spatial experience.",
    result: "Winner",
  },
  {
    title: "Andrew Martin Awards",
    year: "2025",
    organization: "Andrew Martin International Interior Design Awards",
    category: "Best Residential Furniture & Artwork",
    description:
      "Global award celebrating interior designers with a distinct, tailored vision for bespoke furniture, fine art curation, and spatial composition.",
    result: "Winner",
  },
  {
    title: "European Design Awards",
    year: "2025",
    organization: "European Design Awards",
    category: "Best Use of Material — Residential",
    description:
      "Recognized for exceptional mastery over tactile materials, raw finishes, and innovative craftsmanship in high-end residential interiors.",
    result: "Winner",
  },
  {
    title: "SBID International Design Awards",
    year: "2024",
    organization: "Society of British Interior Design",
    category: "Private Residential",
    description:
      "Honoring world-class private residential projects that seamlessly balance spatial functionality with understated luxury.",
    result: "Highly Commended",
  },
  {
    title: "Wallpaper* Design Awards",
    year: "2023",
    organization: "Wallpaper*",
    category: "Interior Design Studio of the Year",
    description:
      "Celebrated globally for a sophisticated practice in interior architecture, contemporary form, and the creation of timeless environments.",
    result: "Winner",
  },
  {
    title: "House & Garden Top 100",
    year: "2022",
    organization: "House & Garden",
    category: "Heritage Residential Design",
    description:
      "Selected among top global interior designers, celebrating residences engineered with deep respect for proportion, light, and artisanal detail.",
    result: "Winner",
  },
];

export const clients = [
  { title: "Notion", icon: SiNotion },
  { title: "Stripe", icon: SiStripe },
  { title: "Vercel", icon: SiVercel },
  { title: "Audi", icon: SiLinear },
  { title: "Dior", icon: SiRaycast },
  { title: "Puma", icon: SiFramer },
  { title: "The north face ", icon: SiThenorthface },
  { title: "New Balance", icon: SiSupabase },
  { title: "Under Armour", icon: SiOpenai },
  { title: "BMW", icon: SiReplit },
  { title: "Mercedes", icon: SiFigma },
  { title: "Tesla", icon: SiTesla },
];

export const testimonials = [
  {
    spaceImg: imgTest1,
    clientImg: testimonial01,
    text: `“The project achieved exactly the balance we were looking for — understated, precise, and functional. Every decision was made with intention, eliminating any unnecessary elements.”`,
    client: "Private Client",
    space: "contemporary residence",
  },
  {
    spaceImg: imgTest1,
    clientImg: testimonial02,
    text: `“The entire process was seamless from beginning to end. The ideas were translated into a cohesive, functional, and visually refined space.”`,
    client: "Art Director",
    space: "creative studio",
  },
  {
    spaceImg: imgTest1,
    clientImg: testimonial03,
    text: `“There is a quiet harmony that runs throughout the entire project. Nothing is decorative without purpose — everything serves a role within the space.”`,
    client: "Architect",
    space: "bespoke apartment",
  },
];
