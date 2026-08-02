export type ApplicationDetail = {
  scopeTitle: string;
  overview: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  useCases: string[];
  requirements: string[];
  workflow: [string, string, string][];
  support: string;
};

const workflow = (a: string, b: string, c: string, d: string): [string, string, string][] => [
  ["01", "Requirement review", a],
  ["02", "Process and context", b],
  ["03", "Chemistry pathway", c],
  ["04", "Validation", d],
];

export const applicationDetails: Record<string, ApplicationDetail> = {
  "thermal-insulation": {
    scopeTitle: "Where thermal insulation systems are evaluated",
    overview: "Thermal-insulation enquiries are reviewed around the structure or equipment, substrate, climate, installation method and target performance before a system pathway is shortlisted.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Industrial insulation around process equipment",
    imageCaption: "Different substrates, climates and installation methods require different validation steps.",
    useCases: ["Roofs, walls and building envelopes", "Cold rooms and controlled spaces", "Industrial tanks and pipelines", "Warehouses and commercial facilities", "Sandwich panels", "Retrofit energy upgrades"],
    requirements: ["Thermal efficiency", "Substrate adhesion", "Moisture resistance", "Dimensional stability", "Reliable processing", "Service durability"],
    workflow: workflow("Define performance, environment and installation constraints.", "Review surface type, preparation, geometry and access.", "Shortlist relevant polyurethane and MDI family routes.", "Confirm processing, samples and documentation."),
    support: "Product-family guidance, application discussion, TDS/SDS coordination and sample planning.",
  },
  "spray-foam": {
    scopeTitle: "Spray-applied insulation and sealing pathways",
    overview: "Spray-foam projects are assessed around density, substrate, equipment, ambient conditions and applicator capability before a suitable formulation route is discussed.",
    image: "https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Construction insulation application",
    imageCaption: "Application quality depends on equipment condition, preparation and trained handling.",
    useCases: ["Roof and wall insulation", "Cavity filling", "Cold-room envelopes", "Industrial sheds", "Pipe insulation", "Retrofit upgrades"],
    requirements: ["Controlled rise and density", "Substrate adhesion", "Cell consistency", "Moisture resistance", "Equipment compatibility", "Safe handling"],
    workflow: workflow("Define area, thickness and performance target.", "Review temperature, humidity, access and substrate.", "Match density and chemistry to the application.", "Validate processing window and sample performance."),
    support: "System-family routing, processing discussion, documentation and coordination with trained applicators.",
  },
  "flexible-moulded-foam": {
    scopeTitle: "Flexible and moulded foam development contexts",
    overview: "Flexible and moulded foam projects balance comfort, resilience, mould fill, demould time, density and production repeatability.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Upholstered furniture with foam cushioning",
    imageCaption: "Comfort and resilience must be balanced with moulding conditions and cycle time.",
    useCases: ["Cushioning components", "Moulded seating parts", "Armrests and headrests", "Comfort inserts", "Specialty flexible parts", "Prototype production"],
    requirements: ["Comfort profile", "Resilience", "Mould filling", "Demould time", "Density control", "Production consistency"],
    workflow: workflow("Review geometry, feel, density and end use.", "Assess mould temperature, mixing and cycle conditions.", "Match polyol, isocyanate and additive routes.", "Evaluate samples before production validation."),
    support: "Family selection, development briefs, sample planning and technical review for moulded foam programs.",
  },
  "automotive-seating": {
    scopeTitle: "Automotive seat and transport comfort applications",
    overview: "Automotive seating requires a controlled balance of comfort, resilience, durability, moulding performance and repeatable production.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Automotive interior and seating",
    imageCaption: "Seat performance is assessed against comfort, loading, mould geometry and manufacturing consistency.",
    useCases: ["Car seat cushions", "Bus and commercial seats", "Headrests", "Armrests", "Seat bolsters", "Prototype programs"],
    requirements: ["Comfort distribution", "Fatigue resistance", "Resilience", "Mould repeatability", "Demould efficiency", "Quality control"],
    workflow: workflow("Define geometry, comfort and durability targets.", "Review mould, equipment, cycle and quality checkpoints.", "Route to moulded HR and polyol family discussions.", "Evaluate prototypes and repeated-load behaviour."),
    support: "Prototype planning, system-family guidance and technical documentation for automotive seating reviews.",
  },
  "furniture-bedding": {
    scopeTitle: "Comfort foam pathways for furniture and sleep products",
    overview: "Furniture and bedding enquiries are assessed around feel, support, durability, density, airflow and manufacturing method.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Upholstered furniture in a modern interior",
    imageCaption: "Comfort changes with product thickness, cover system, load and expected service life.",
    useCases: ["Sofa cushions", "Mattress comfort layers", "Backrests", "Pillows", "Custom comfort parts", "Institutional furniture"],
    requirements: ["Comfort and support", "Compression recovery", "Durability", "Density and airflow", "Processing suitability", "Foam consistency"],
    workflow: workflow("Define firmness, thickness and support.", "Review covers, layering and manufacturing route.", "Match flexible system and polyol options.", "Evaluate comfort, recovery and durability samples."),
    support: "Comfort-profile discussion, sample planning, family selection and document coordination.",
  },
  "adhesives-coatings": {
    scopeTitle: "Bonding, coating and surface-performance applications",
    overview: "Adhesive and coating projects are reviewed around substrate, cure profile, viscosity, exposure, film properties and application method.",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Industrial coating application",
    imageCaption: "Preparation, cure conditions and compatibility strongly influence long-term performance.",
    useCases: ["Industrial bonding", "Floor coatings", "Protective coatings", "Packaging adhesives", "Composite bonding", "Elastomeric coatings"],
    requirements: ["Substrate adhesion", "Application viscosity", "Cure speed", "Chemical resistance", "Mechanical durability", "Surface compatibility"],
    workflow: workflow("Identify surface chemistry and bonding challenge.", "Define cure, strength, flexibility and exposure.", "Match modified MDI, polyol and additive pathways.", "Validate mixing, application, cure and performance."),
    support: "Chemistry-family selection, processing review, sample trials and documentation support.",
  },
  "construction-systems": {
    scopeTitle: "Integrated polyurethane pathways for building systems",
    overview: "Construction-system enquiries combine substrate, environment, installation, compliance and service-life requirements.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Modern building construction project",
    imageCaption: "The correct route depends on how materials and installation requirements interact as one system.",
    useCases: ["Building envelopes", "Roofing systems", "Panel assemblies", "Floor coatings", "Sealants and bonding", "Commercial retrofits"],
    requirements: ["System compatibility", "Installation practicality", "Weather exposure", "Service demands", "Compliance documents", "Maintenance planning"],
    workflow: workflow("Map substrates, layers and service conditions.", "Identify moisture, movement and access risks.", "Connect requirements to suitable product families.", "Coordinate samples, checks and documents."),
    support: "Cross-family routing, application review, document coordination and technical escalation.",
  },
  "custom-formulation": {
    scopeTitle: "Structured development for non-standard requirements",
    overview: "Custom formulation converts a specific performance problem into a controlled development brief covering chemistry, process and acceptance criteria.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=85&w=1600",
    imageAlt: "Technical laboratory development environment",
    imageCaption: "Clear targets and measurable criteria reduce development cycles and assumptions.",
    useCases: ["New product development", "Performance improvement", "Process troubleshooting", "Alternative raw materials", "Specialty systems", "Pilot scale-up"],
    requirements: ["Clear performance target", "Processing constraints", "Defined test method", "Material compatibility", "Scale-up feasibility", "Approval plan"],
    workflow: workflow("Capture the application, issue and constraints.", "Identify likely chemistry and process variables.", "Define trials, measurements and acceptance criteria.", "Validate repeatability and production practicality."),
    support: "Development brief structuring, raw-material routing and technical development coordination.",
  },
};
