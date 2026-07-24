export type TpuPathway = {
  slug: string;
  name: string;
  positioning: string;
  strengths: string[];
  reviewQuestions: string[];
};

export const tpuPathways: TpuPathway[] = [
  {
    slug: "polyester-based",
    name: "Polyester-based TPU",
    positioning: "A TPU selection pathway where abrasion resistance, tensile performance and chemical resistance are central to the requirement.",
    strengths: ["Abrasion-resistance pathway", "High tensile-strength potential", "Broad hardness and transparency options"],
    reviewQuestions: ["Expected chemical exposure", "Target hardness and surface response", "Processing method and part geometry"],
  },
  {
    slug: "polyether-based",
    name: "Polyether-based TPU",
    positioning: "A TPU selection pathway for flexible parts that may require low-temperature response and hydrolysis-resistance review.",
    strengths: ["Low-temperature flexibility pathway", "Hydrolysis-resistance pathway", "Customisable additive package"],
    reviewQuestions: ["Moisture and hydrolysis exposure", "Minimum service temperature", "Required flexibility and rebound"],
  },
  {
    slug: "polycaprolactone-based",
    name: "Polycaprolactone-based TPU",
    positioning: "A specialist TPU pathway where mechanical durability, flexibility and application-specific processing need to be balanced.",
    strengths: ["Durability-focused pathway", "Mechanical-strength and flexibility balance", "Application-specific customisation"],
    reviewQuestions: ["Load and wear pattern", "Target service life", "Moulding, extrusion or other processing route"],
  },
];

export const tpuAdvantages = [
  "Good abrasion resistance",
  "Excellent chemical-resistance pathway",
  "Transparency options and a wide hardness range",
  "High tensile-strength potential",
  "Excellent low-temperature performance pathway",
  "UV-resistance pathway",
  "Customisability",
  "Compatibility review for UV, flame-retardant, antioxidant and colourant additive packages",
];

export const tpuSourceNote =
  "The supplied technical source identifies polyester-based, polyether-based and polycaprolactone-based TPU types and describes strength, flexibility, durability, abrasion resistance, chemical resistance, low-temperature performance, UV resistance and additive customisation. No approved public Urechem TPU grade codes or processing windows were supplied.";
