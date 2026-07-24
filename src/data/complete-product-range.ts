export type CompleteProductRangeItem = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  applications: string[];
  representativeProducts: string[];
  reviewNote: string;
  href?: string;
};

export const completeProductRange: CompleteProductRangeItem[] = [
  {
    slug: "uretherm-spray-foam",
    name: "Uretherm spray-foam systems",
    category: "Insulation systems",
    summary:
      "Two-component, closed-cell polyurethane spray systems for thermal-insulation enquiries in residential, commercial and industrial construction.",
    applications: ["Floors, attics, crawl spaces and walls", "Cold-surface construction applications", "Building and facility insulation"],
    representativeProducts: ["Uretherm GT 40", "Uretherm GT 50"],
    reviewNote: "Installation requires trained applicators and dedicated spray-foam equipment.",
    href: "/products/uretherm-spray-foam-systems",
  },
  {
    slug: "chemnate-mdi",
    name: "ChemNate MDI range",
    category: "Isocyanates",
    summary:
      "Polymeric, liquid, blended and modified MDI pathways for polyurethane production, adhesives, coatings, elastomers and insulation materials.",
    applications: ["Polyurethane production", "Adhesives and coatings", "Elastomers and insulation materials"],
    representativeProducts: ["ChemNate PMDI 2401", "ChemNate FMDI 2402", "ChemNate MDI 2450", "ChemNate MDI 2437", "ChemNate C MDI 2096"],
    reviewNote: "Processing conditions and grade selection require Urechem technical review.",
    href: "/products/chemnate-mdi-range",
  },
  {
    slug: "klayol-polyols",
    name: "KlayOl polyol range",
    category: "Polyols",
    summary:
      "Polyether and polymer polyol pathways for flexible foam, moulded foam, seating, bedding, sealing and related polyurethane development.",
    applications: ["Flexible and moulded foam", "Automotive seating and furniture", "Sealing and protective-film formulations"],
    representativeProducts: ["KlayOl PE 2428", "KlayOl PE 2435", "KlayOl PE 2456", "KlayOl POP"],
    reviewNote: "Molecular weight, solids content and formulation use must be confirmed against the current grade document.",
    href: "/products/klayol-polyol-range",
  },
  {
    slug: "klayol-ppg",
    name: "KlayOl PPG range",
    category: "Polypropylene glycols",
    summary:
      "Polypropylene-glycol pathways for coatings, adhesives, sealants and elastomeric applications where flexibility, adhesion and durability are required.",
    applications: ["Coatings", "Adhesives and sealants", "Elastomeric formulations"],
    representativeProducts: ["PPG grade set under client confirmation"],
    reviewNote: "The supplied documents contain conflicting 14xx and 24xx grade numbering; public grade numbers remain controlled until confirmed.",
    href: "/products/klayol-ppg-range",
  },
  {
    slug: "flexible-pu-systems",
    name: "Flexible polyurethane systems",
    category: "Formulated systems",
    summary:
      "Application-specific flexible and moulded polyurethane systems for comfort, resilience, seating and foam-development programmes.",
    applications: ["Furniture and bedding", "Automotive seating", "Flexible and moulded foam"],
    representativeProducts: ["VE4105 A/B", "Flex 8305 A/B"],
    reviewNote: "Performance values and processing windows require Urechem validation.",
    href: "/products/flexible-systems",
  },
  {
    slug: "ureshield-pu-membranes",
    name: "UreShield PU membranes",
    category: "Waterproofing membranes",
    summary:
      "Single- and two-component polyurethane membranes designed to form seamless, flexible and durable barriers against water ingress.",
    applications: ["Roofs, terraces and car decks", "Basements, tunnels and foundations", "Industrial and commercial structures"],
    representativeProducts: ["UreShield 1K PU-M", "UreShield 2K PU-M"],
    reviewNote: "Substrate preparation, primer, topcoat and exposure requirements must be reviewed per project.",
    href: "/products/ureshield-waterproofing-grouting-systems",
  },
  {
    slug: "ureshield-injection-grouting",
    name: "Urechem injection and grouting systems",
    category: "Ground support and water control",
    summary:
      "Low-viscosity polyurethane and polyurea-silicate injection pathways for leak sealing, void filling, soil and rock consolidation, slab lifting and structural reinforcement.",
    applications: ["Tunnels, mines and underground works", "Concrete cracks, joints and cavities", "Dams, foundations and water-retaining structures"],
    representativeProducts: ["Reference profiles 2421, 2410, 2435, 2430, 2455 MV, 2406 HS and 2405 SJ"],
    reviewNote: "Reference codes preserve source traceability; official public Urechem grade names and design values remain controlled.",
    href: "/products/injection-grouting-systems",
  },
  {
    slug: "ureshield-polyurea",
    name: "UreShield polyurea coatings",
    category: "Protective coatings",
    summary:
      "Spray- and hand-applied hybrid and pure-polyurea pathways for rapid-curing waterproofing and durable surface protection.",
    applications: ["Bridge decks, parking decks and roofs", "Industrial floors and manufacturing facilities", "Concrete waterproofing and moulded parts"],
    representativeProducts: ["UreShield HPU-101", "UreShield PPU-102", "UreShield HPU-101 Cold", "UreShield HPU-101 Cold SL"],
    reviewNote: "Hot-spray grades require specialised two-component equipment and trained application teams.",
    href: "/products/ureshield-waterproofing-grouting-systems",
  },
  {
    slug: "eco-grouting-systems",
    name: "Environment-conscious grouting pathways",
    category: "Specialist grouting",
    summary:
      "Source-backed pathways for solvent-free, phthalate-free, controlled-expansion and lower-exotherm grouting enquiries where project conditions demand a tailored response.",
    applications: ["Water cut-off", "Void filling and waterproofing", "Crack and joint sealing"],
    representativeProducts: ["Reference 2410 Earth-1", "Reference 2425 Earth-2"],
    reviewNote: "Environmental and regulatory claims are withheld until Urechem supplies current supporting evidence.",
    href: "/products/injection-grouting-systems",
  },
  {
    slug: "tpu-materials",
    name: "Thermoplastic polyurethane materials",
    category: "TPU",
    summary:
      "Thermoplastic polyurethane pathways combining strength, flexibility, durability, chemical resistance and low-temperature performance.",
    applications: ["Industrial components", "Flexible durable parts", "Application-specific moulding and processing"],
    representativeProducts: ["Polyester-based TPU", "Polyether-based TPU", "Polycaprolactone-based TPU"],
    reviewNote: "Hardness, processing method and performance requirements must be matched to a confirmed grade.",
    href: "/products/tpu-materials",
  },
  {
    slug: "additives-processing-aids",
    name: "Pigments, catalysts and processing aids",
    category: "Formulation support",
    summary:
      "Additives for colouring, reaction control, cell structure, UV and yellowing control, antibacterial pathways and other polyurethane-processing requirements.",
    applications: ["Foam colouring and stability", "Reaction and processing control", "Surface and ageing-performance support"],
    representativeProducts: ["Pigments", "Amine catalysts", "Silicone oils", "Cell openers", "Anti-UV and anti-yellowing agents"],
    reviewNote: "Specific grade, dosage, compatibility and safety guidance require Urechem technical validation.",
    href: "/products/additives-processing-aids",
  },
];
