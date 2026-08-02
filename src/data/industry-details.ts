export type IndustryDetail = {
  heroImage: string;
  heroPosition: string;
  overview: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  challenges: string[];
  useCases: string[];
  reviewPoints: string[];
  workflow: [string, string, string][];
  support: string[];
};

const workflow = (
  a: string,
  b: string,
  c: string,
  d: string,
): [string, string, string][] => [
  ["01", "Requirement mapping", a],
  ["02", "Operating context", b],
  ["03", "Product-family route", c],
  ["04", "Validation and support", d],
];

export const industryDetails: Record<string, IndustryDetail> = {
  construction: {
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=86&w=2400",
    heroPosition: "center 52%",
    overview:
      "Construction projects bring together substrate compatibility, installation method, climate exposure, compliance expectations and long-term service requirements. Urechem helps organize these variables into practical polyurethane system and raw-material pathways for technical review.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Modern construction project with structural building systems",
    imageCaption:
      "The right construction pathway depends on how substrates, installation conditions and long-term exposure interact as one complete system.",
    challenges: [
      "Substrate compatibility across concrete, metal, timber and panel systems",
      "On-site installation conditions, access and applicator capability",
      "Thermal, moisture and weather-exposure requirements",
      "Coordination of insulation, bonding, coating and sealing needs",
      "Documentation and compliance expectations",
      "Long-term durability and maintenance planning",
    ],
    useCases: [
      "Roof and wall insulation",
      "Spray-applied foam systems",
      "Sandwich and insulated panels",
      "Building-envelope assemblies",
      "Floor coatings and primers",
      "Construction bonding and sealing",
    ],
    reviewPoints: [
      "Substrate and surface preparation",
      "Ambient temperature and humidity",
      "Target density or thermal performance",
      "Installation equipment and process",
      "Exposure and service-life conditions",
      "Required TDS, SDS and compliance records",
    ],
    workflow: workflow(
      "Map the building element, substrate, project scale and required performance.",
      "Review climate, access, preparation, application method and installation constraints.",
      "Connect the requirement to insulation, MDI, coating or custom-formulation families.",
      "Coordinate samples, trial parameters, documentation and final technical review.",
    ),
    support: [
      "Product-family and application-pathway guidance",
      "TDS, SDS and document-availability coordination",
      "Sample and trial planning",
      "Technical escalation for non-standard construction requirements",
    ],
  },
  automotive: {
    heroImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=86&w=2400",
    heroPosition: "center 58%",
    overview:
      "Automotive seating and interior-comfort programs require a controlled balance of comfort, resilience, fatigue resistance, moulding behaviour and production repeatability. Urechem routes these enquiries toward moulded HR system and polyol pathways for qualified technical discussion.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Automotive interior and seating environment",
    imageCaption:
      "Seat performance is shaped by foam chemistry, mould geometry, process control, repeated loading and the final trim construction.",
    challenges: [
      "Consistent comfort and support across seat zones",
      "Fatigue resistance under repeated loading",
      "Mould filling, venting and demould efficiency",
      "Density and hardness repeatability",
      "Cycle-time and production consistency",
      "Traceable quality and documentation control",
    ],
    useCases: [
      "Car seat cushions and backrests",
      "Bus and commercial-vehicle seating",
      "Headrests and armrests",
      "Seat bolsters and comfort inserts",
      "Prototype and development mouldings",
      "Specialty transport seating components",
    ],
    reviewPoints: [
      "Comfort profile and load distribution",
      "Mould geometry and shot weight",
      "Mixing, temperature and cycle conditions",
      "Resilience and fatigue behaviour",
      "Demould time and surface quality",
      "Production validation and quality checkpoints",
    ],
    workflow: workflow(
      "Define component geometry, comfort, density and durability targets.",
      "Review mould, equipment, process window, cycle time and quality controls.",
      "Route the project to moulded HR, polyol, MDI and additive family discussions.",
      "Evaluate prototypes, repeated-load performance and production repeatability.",
    ),
    support: [
      "Moulded HR system and polyol-family guidance",
      "Prototype and sample-planning support",
      "Process-window and production-review coordination",
      "Technical-document routing for automotive programs",
    ],
  },
  "furniture-bedding": {
    heroImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=86&w=2400",
    heroPosition: "center 56%",
    overview:
      "Furniture and bedding products rely on a careful balance of comfort, support, compression recovery, airflow, durability and manufacturing consistency. Urechem helps connect cushioning and sleep-product requirements to flexible, moulded and memory-system pathways.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Upholstered furniture and comfort products",
    imageCaption:
      "Comfort changes with foam density, thickness, layering, cover tension, load distribution and expected service life.",
    challenges: [
      "Balancing softness, support and pressure distribution",
      "Compression recovery and long-term shape retention",
      "Consistent density, airflow and cell structure",
      "Durability under repeated daily use",
      "Matching foam behaviour to covers and layered constructions",
      "Repeatable manufacturing and quality control",
    ],
    useCases: [
      "Sofa and chair cushions",
      "Mattress comfort and support layers",
      "Backrests and armrests",
      "Pillows and specialty sleep products",
      "Institutional and hospitality furniture",
      "Custom moulded cushioning components",
    ],
    reviewPoints: [
      "Target feel, firmness and support",
      "Product thickness and layer construction",
      "Compression set and recovery",
      "Density, airflow and thermal comfort",
      "Processing and curing conditions",
      "Durability and service-life expectations",
    ],
    workflow: workflow(
      "Define end use, feel, support, thickness and durability expectations.",
      "Review foam format, moulding or slabstock process, covers and layer construction.",
      "Connect requirements to flexible, moulded memory and polyol-family routes.",
      "Plan comfort, recovery, durability and production-consistency evaluations.",
    ),
    support: [
      "Comfort-profile and product-family discussion",
      "Sample and prototype planning",
      "Processing and manufacturing-review coordination",
      "TDS, SDS and document-availability support",
    ],
  },
  "industrial-facilities": {
    heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=86&w=2400",
    heroPosition: "center 50%",
    overview:
      "Industrial facilities combine demanding operating environments with maintenance, safety, insulation, coating and process constraints. Urechem structures these enquiries around service conditions, substrate, exposure, application method and required technical documentation.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Industrial process facility with tanks and pipework",
    imageCaption:
      "Industrial performance depends on understanding temperature, chemical exposure, access, shutdown windows and maintenance strategy before selecting a pathway.",
    challenges: [
      "High or fluctuating service temperatures",
      "Moisture, chemical and weather exposure",
      "Complex substrates, geometry and access conditions",
      "Maintenance-window and shutdown constraints",
      "Safety, handling and documentation requirements",
      "Long-term reliability in critical operating areas",
    ],
    useCases: [
      "Tank, vessel and pipe insulation",
      "Industrial building and roof insulation",
      "Protective and floor coatings",
      "Maintenance bonding and repair pathways",
      "Custom formulation and troubleshooting",
      "Process-area thermal-management projects",
    ],
    reviewPoints: [
      "Operating temperature and exposure profile",
      "Substrate and surface condition",
      "Application method and access",
      "Chemical and moisture resistance",
      "Maintenance and shutdown planning",
      "Safety, TDS, SDS and compliance requirements",
    ],
    workflow: workflow(
      "Define the equipment, operating environment, exposure and maintenance objective.",
      "Review substrate, geometry, access, application method and shutdown constraints.",
      "Route the requirement to insulation, coating, MDI, polyol or custom-formulation families.",
      "Coordinate trials, documentation, safety review and project-specific validation.",
    ),
    support: [
      "Industrial application and product-family routing",
      "Technical-document and safety-information coordination",
      "Trial planning around maintenance windows",
      "Escalation for custom operating or exposure conditions",
    ],
  },
};
