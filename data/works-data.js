import work1 from "@/public/assets/images/works/work-1.png";
import work2 from "@/public/assets/images/works/work-2.png";
import work3 from "@/public/assets/images/works/work-3.png";
import work4 from "@/public/assets/images/works/work-4.png";
import work5 from "@/public/assets/images/works/work-5.png";

export const worksData = [
  {
    id: "1",
    year: "2025",
    title: "Monolith Residence",
    titleMark: "MR",
    scope: "Architectural & Interior Design",
    location: "Kyoto, Japan",
    services: ["Spatial Architecture", "Interior Curation", "Custom Joinery"],
    duration: "20",
    size: "520",
    conclusion: "November 2025",
    client: "private_collector",
    credits: ["Unusual® Studio", "Kenzo Takahashi"],
    heroMedia: {
      image: work2,
    },
    sections: [
      {
        _type: "workText",
        label: "Vision",
        text: [
          "A monolithic retreat engineered to frame ambient natural light through raw basalt stone, micro-cement finishes, and brushed dark timber.",
        ],
      },
    ],
  },
  {
    id: "2",
    year: "2026",
    title: "Solis Pavilion",
    titleMark: "SP",
    scope: "Coastal Villa Interiors",
    location: "Comporta, Portugal",
    services: [
      "Interior Architecture",
      "Bespoke Lighting",
      "Material Sourcing",
    ],
    duration: "14",
    size: "380",
    conclusion: "August 2026",
    client: "solis_estate",
    credits: ["Unusual® Studio", "Mateo Silva", "Elena Rostova"],
    heroMedia: {
      image: work1,
    },
    sections: [
      {
        _type: "workText",
        label: "Concept",
        text: [
          "An exploration of tactile minimalism where cast limestone walls intersect with soft linen acoustics, designed to evoke tranquility and stillness.",
          "Every structural element and piece of integrated furniture was custom-tailored to celebrate the surrounding coastal horizon.",
        ],
      },
      {
        _type: "workImage",
        image: work2,
        overlayText: "Atrium & Lounge Spatial Continuity",
      },
    ],
  },
  {
    id: "3",
    year: "2024",
    title: "Aether Sanctuary",
    titleMark: "AS",
    scope: "Penthouse Redesign",
    location: "Zurich, Switzerland",
    services: ["Full Interior Overhaul", "Art Curation", "Acoustic Design"],
    duration: "18",
    size: "310",
    conclusion: "October 2024",
    client: "aether_group",
    credits: ["Unusual® Studio", "Julian Vance"],
    heroMedia: {
      image: work3,
    },
    sections: [
      {
        _type: "workText",
        label: "Vision",
        text: [
          "Reimagining urban high-rise living into an elevated sanctuary, blending industrial steel details with warm travertines and minimalist silhouettes.",
        ],
      },
    ],
  },
  {
    id: "4",
    year: "2025",
    title: "Vesper Residence",
    titleMark: "VR",
    scope: "Hillside Residence & Landscape Integration",
    location: "Oslo, Norway",
    services: ["Architecture", "Lighting Design", "Sustainable Materials"],
    duration: "22",
    size: "640",
    conclusion: "December 2025",
    client: "nordic_living_co",
    credits: ["Unusual® Studio", "Lars Lindqvist"],
    heroMedia: {
      image: work4,
    },
    sections: [
      {
        _type: "workText",
        label: "Concept",
        text: [
          "Harmonizing sharp modernist geometric forms with the rugged Scandinavian terrain, utilizing scorched pine cladding and triple-glazed panoramic glass.",
        ],
      },
      {
        _type: "workImage",
        image: work5,
        overlayText: "Cantilevered Living Space Overlooking Fjord",
      },
    ],
  },
  {
    id: "5",
    year: "2026",
    title: "Komorebi Loft",
    titleMark: "KL",
    scope: "Urban Restoration & Interior Design",
    location: "Milan, Italy",
    services: [
      "Interior Architecture",
      "Custom Furniture",
      "Lighting Curation",
    ],
    duration: "12",
    size: "240",
    conclusion: "May 2026",
    client: "private_client",
    credits: ["Unusual® Studio", "Giulia Romano"],
    heroMedia: {
      image: work5,
    },
    sections: [
      {
        _type: "workText",
        label: "Vision",
        text: [
          "An industrial heritage warehouse transformed into a serene residential sanctuary, defined by filtered natural light, fluted glass partitions, and brushed bronze accents.",
        ],
      },
    ],
  },
];
