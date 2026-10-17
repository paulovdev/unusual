import work1 from "@/public/assets/images/works/work-1.png";
import work2 from "@/public/assets/images/works/work-2.png";
import work3 from "@/public/assets/images/works/work-3.png";

export const worksData = [
  {
    id: "1",
    year: "2025",
    title: "800J Lofts Renovation",
    titleMark: "PH",
    scope: "Penthouse Renovation",
    location: "Milpitas, CA",
    services: ["Architectural Planning", "Interior Design", "Styling"],
    duration: "24",
    size: "450",
    conclusion: "December 2025",
    client: "horizonte_ph",
    credits: ["Studio RP", "Lucas Mendes"],
    heroMedia: {
      image: work2,
    },
    sections: [
      {
        _type: "workText",
        label: "Vision",
        text: [
          "Creating a panoramic sanctuary overlooking the ocean, balancing raw concrete elements with warm wood finishes.",
        ],
      },
    ],
  },
  {
    id: "2",
    year: "2026",
    title: "McClellan Jet Services FBO",
    titleMark: "AP",
    scope: "Residential Interior Design",
    location: "McClellan Park, CA",
    services: ["Interior Design", "Custom Furniture", "Lighting Design"],
    duration: "18",
    size: "240",
    conclusion: "June 2026",
    client: "vilanova_res",
    credits: ["Studio RP", "Elena Rostova", "Marcus Vance"],
    heroMedia: {
      image: work1,
    },
    sections: [
      {
        _type: "workText",
        label: "Concept",
        text: [
          "A seamless blend of organic textures and clean contemporary lines, designed to maximize natural light and spatial flow.",
          "Every furniture piece was custom-built to reflect the timeless personality of the residents.",
        ],
      },
      {
        _type: "workImage",
        image: work2,
        overlayText: "Living Area Integration",
      },
    ],
  },
  {
    id: "3",
    year: "2024",
    title: "Novo Interiors",
    titleMark: "PH",
    scope: "Penthouse Renovation",
    location: "Mountain View, CA",
    services: ["Architectural Planning", "Interior Design", "Styling"],
    duration: "24",
    size: "450",
    conclusion: "December 2025",
    client: "horizonte_ph",
    credits: ["Studio RP", "Lucas Mendes"],
    heroMedia: {
      image: work3,
    },
    sections: [
      {
        _type: "workText",
        label: "Vision",
        text: [
          "Creating a panoramic sanctuary overlooking the ocean, balancing raw concrete elements with warm wood finishes.",
        ],
      },
    ],
  },
];
