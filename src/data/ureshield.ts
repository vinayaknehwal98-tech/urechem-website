export type UreShieldProduct = {
  slug: string;
  name: string;
  category: "PU membrane" | "Grouting chemical" | "Polyurea";
  summary: string;
  features: string[];
  benefits: string[];
  applications: string[];
};

export const ureshieldProducts: UreShieldProduct[] = [
  {
    slug: "ureshield-1k-pu-m",
    name: "UreShield 1K PU-M",
    category: "PU membrane",
    summary:
      "Single-component waterproofing and protective coating that forms a flexible, elastomeric, seamless and impermeable polyurethane membrane on suitable substrates.",
    features: ["1 component", "Hydrophobic", "Flexible", "Fast reacting"],
    benefits: [
      "Available in self-levelling or rollable application grades.",
      "Creates a continuous waterproofing membrane to resist water penetration.",
    ],
    applications: [
      "Foundations, basements, tunnels and critical structural elements.",
      "Indoor and outdoor surfaces including car decks, roof terraces and patios.",
    ],
  },
  {
    slug: "ureshield-2k-pu-m",
    name: "UreShield 2K PU-M",
    category: "PU membrane",
    summary:
      "Two-part, fast-curing polyurethane waterproofing membrane formulated for horizontal and exposed surfaces where durable, low-odour protection is required.",
    features: ["2 component", "Hydrophobic", "Flexible", "Fast reacting"],
    benefits: [
      "Rapid installation can reduce time spent on preparatory works and detailing.",
      "Designed for good adhesion to compatible topcoats.",
    ],
    applications: [
      "Tunnel waterproofing and other water-ingress control work.",
      "Industrial and commercial structures requiring robust waterproofing.",
    ],
  },
  {
    slug: "ureshield-drucpietra",
    name: "UreShield DrucPietra",
    category: "Grouting chemical",
    summary:
      "Two-component, low-foam polyurethane grout developed for pre-excavation grouting, ground reinforcement and water-infiltration control.",
    features: ["2 component", "Hydrophobic", "Closed cell", "Fast reacting"],
    benefits: [
      "Strong adhesion and cohesion for durable reinforcement.",
      "Flexible response intended to accommodate strata movement after reinforcement.",
    ],
    applications: [
      "Pre-excavation grouting and ground stabilisation.",
      "Void filling and water-infiltration control in fractured ground.",
    ],
  },
  {
    slug: "ureshield-druc-pietra-v-sf-1",
    name: "UreShield Druc Pietra V.SF 1",
    category: "Grouting chemical",
    summary:
      "Low-foaming, two-component polymer-based injection resin for permeation grouting and consolidation work.",
    features: ["2 component", "Hydrophobic", "Closed cell", "Solvent free"],
    benefits: [
      "Low viscosity supports permeation through fine cracks and fissures.",
      "High adhesion and durable cohesion after curing.",
    ],
    applications: [
      "Consolidation of sands, gravels, fractured rock and coal faces.",
      "Repair work in underwater construction contexts.",
    ],
  },
  {
    slug: "ureshield-druchyd-2c",
    name: "UreShield DrucHyd 2C",
    category: "Grouting chemical",
    summary:
      "Two-component, water-reactive injection resin designed for consolidation, waterproofing and cavity filling where high-pressure water is present.",
    features: ["2 component", "Water reactive", "Closed cell", "Fast reacting"],
    benefits: [
      "Low viscosity supports penetration into small fissures.",
      "High reactivity with strong mechanical and chemical stability.",
    ],
    applications: [
      "Tunnels: major water infiltration through fissures, joints and cavities.",
      "Dams and hydraulic works: repair and sealing of fissures, including aquifer conditions.",
    ],
  },
  {
    slug: "ureshield-hpu-101",
    name: "UreShield HPU-101",
    category: "Polyurea",
    summary:
      "Spray-applied hybrid polyurea waterproofing system engineered for rapid curing and durable surface protection in hot and tropical climates.",
    features: ["2 component", "Hydrophobic", "Insulative", "Fast reacting"],
    benefits: [
      "Becomes tack-free within minutes, supporting near-immediate return to service.",
      "Moisture and weather changes have minimal impact on coating adhesion and performance.",
    ],
    applications: [
      "Bridge-deck construction and repairs, flooring, parking decks and roof coatings.",
      "Moulded parts, industrial and manufacturing facilities, and power plants.",
    ],
  },
  {
    slug: "ureshield-ppu-102",
    name: "UreShield PPU-102",
    category: "Polyurea",
    summary:
      "Advanced pure-polyurea protective coating for rapid application and durable surface protection using specialised two-component hot-spray equipment.",
    features: ["2 component", "Hydrophobic", "Insulative", "Fast reacting"],
    benefits: [
      "Becomes tack-free within minutes, supporting near-immediate return to service.",
      "Moisture and weather changes have minimal impact on coating adhesion and performance.",
    ],
    applications: [
      "Bridge-deck construction and repairs, flooring, parking decks and roof coatings.",
      "Moulded parts, industrial and manufacturing facilities, and power plants.",
    ],
  },
  {
    slug: "ureshield-hpu-101-cold",
    name: "UreShield HPU-101 Cold",
    category: "Polyurea",
    summary:
      "Two-component, solvent-free, hand-applied elastomeric hybrid-polyurea membrane for concrete waterproofing.",
    features: ["2 component", "Hydrophobic", "Hand applied", "Slow reacting"],
    benefits: [
      "Forms an integrated bond without gaps, laps or seams for a smooth, durable surface.",
      "Provides robust puncture resistance for reliable protection in high-impact areas.",
    ],
    applications: [
      "Terraces, podium decks, car-park decks and roofing where a fire-retardant coating is not required.",
      "Pour onto the prepared surface and distribute evenly with a notched trowel or spreader.",
    ],
  },
  {
    slug: "ureshield-hpu-101-cold-sl",
    name: "UreShield HPU-101 Cold SL",
    category: "Polyurea",
    summary:
      "Solvent-free, self-levelling, two-component hand-applied membrane based on elastomeric hybrid polyurea.",
    features: ["2 component", "Hydrophobic", "Self levelling", "Slow reacting"],
    benefits: [
      "Provides strong mechanical characteristics for demanding waterproofing applications.",
      "Its thermosetting nature helps maintain integrity at elevated temperatures.",
    ],
    applications: [
      "Concrete waterproofing across terraces, podium decks, car-park decks and suitable roofing.",
      "Apply onto correctly primed surfaces to support bonding and coating performance.",
    ],
  },
];

export const ureshieldReferenceNote =
  "This public pathway summarises the supplied PU membrane, grouting and polyurea reference content through page 62. Final product selection, performance claims and application suitability require validation by Urechem Chemicals specialists.";
