export type KlayOlPpgProduct = {
  slug: string;
  name: string;
  molecularWeight: string;
  chemistry: string;
  summary: string;
  benefits: string[];
  applications: string[];
  image: string;
  imageAlt: string;
};

export const klayOlPpgOverview = {
  title: "KlayOl PPG range",
  shortName: "KlayOl PPG",
  description:
    "Premium polypropylene-glycol polyether polyols for flexible, rigid and specialty polyurethane formulations. The supplied references position the range around reliable quality, processing efficiency, durability and tailored grades for application-specific requirements.",
  strengths: [
    "Reliable quality for controlled polyurethane formulation work",
    "Tailored grades for coatings, adhesives, sealants and elastomers",
    "Molecular-weight options from 400 to 12,000",
    "Low-unsaturation and BHT-free pathways where identified in the supplied references",
  ],
};

export const klayOlPpgProducts: KlayOlPpgProduct[] = [
  {
    slug: "klayol-ppg-range-ppg-1420",
    name: "PPG 1420",
    molecularWeight: "2,000",
    chemistry: "Polypropylene oxide-based diol",
    summary:
      "A BHT-free, low-unsaturation polyether polyol intended for coatings, adhesives, sealants and elastomers.",
    benefits: [
      "Versatile formulation route across coatings, adhesives, sealants and elastomers",
      "Low-unsaturation profile supports durability and consistent performance",
      "BHT-free composition for cleaner application-specific formulations",
    ],
    applications: ["Coatings", "Adhesives", "Sealants", "Elastomers"],
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&fm=jpg&q=84&w=1800",
    imageAlt: "Clear liquid being measured in a laboratory formulation environment",
  },
  {
    slug: "klayol-ppg-range-ppg-1440",
    name: "PPG 1440",
    molecularWeight: "400",
    chemistry: "Polypropylene oxide-based diol",
    summary:
      "A BHT-free, low-water and low-potassium polyether polyol used in polyurethane coatings, adhesives and sealants.",
    benefits: [
      "Low water and potassium content for improved formulation stability",
      "BHT-free profile for high-quality polyurethane systems",
      "Suitable for coating, adhesive and sealant development pathways",
    ],
    applications: ["Polyurethane coatings", "Adhesives", "Sealants"],
    image:
      "https://images.unsplash.com/photo-1562411054-4861622f1a22?auto=format&fit=crop&fm=jpg&q=84&w=1800",
    imageAlt: "Laboratory materials prepared for coating and adhesive formulation",
  },
  {
    slug: "klayol-ppg-range-ppg-1410",
    name: "PPG 1410",
    molecularWeight: "1,000",
    chemistry: "Polypropylene oxide-based diol",
    summary:
      "A polyether polyol produced through ring-opening polymerisation of propylene oxide with active-hydrogen initiators.",
    benefits: [
      "Low water and potassium content supports polyurethane-product durability",
      "BHT-free composition supports stable, application-focused formulation work",
      "Balanced molecular-weight pathway for coatings, bonding and elastomer development",
    ],
    applications: ["Coatings", "Adhesives", "Sealants", "Elastomer systems"],
    image:
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&fm=jpg&q=84&w=1800",
    imageAlt: "Technical material being applied to a prepared surface",
  },
  {
    slug: "klayol-ppg-range-ppg-1404",
    name: "PPG 1404",
    molecularWeight: "4,000",
    chemistry: "Low-unsaturation polypropylene oxide-based diol",
    summary:
      "A low-unsaturation diol primarily used for coatings, sealants, adhesives and elastomers.",
    benefits: [
      "Specialty polypropylene glycol route for specific product requirements",
      "Broad use across coatings, sealants, adhesives and elastomers",
      "Low-unsaturation profile for performance-focused formulations",
    ],
    applications: ["Coatings", "Sealants", "Adhesives", "Elastomers"],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&fm=jpg&q=84&w=1800",
    imageAlt: "Industrial component and material-performance evaluation environment",
  },
  {
    slug: "klayol-ppg-range-ppg-1412",
    name: "PPG 1412",
    molecularWeight: "12,000",
    chemistry: "High-performance, low-unsaturation polypropylene oxide-based diol",
    summary:
      "A high-molecular-weight diol designed for advanced sealants, adhesives and elastomers.",
    benefits: [
      "Specialty polypropylene glycol for demanding product requirements",
      "Improves flexibility, adhesion and longevity",
      "Suitable for advanced coating, adhesive, sealant and elastomeric pathways",
    ],
    applications: ["Advanced sealants", "Adhesives", "Coatings", "Elastomers"],
    image:
      "https://images.unsplash.com/photo-1709666414169-654f60926304?auto=format&fit=crop&fm=jpg&q=84&w=1800",
    imageAlt: "Measured liquid formulation being filled into a laboratory bottle",
  },
];

export function getKlayOlPpgProduct(slug: string) {
  return klayOlPpgProducts.find((product) => product.slug === slug);
}
