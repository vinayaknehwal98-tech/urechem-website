export type InjectionGroutingProfile = {
  code: string;
  chemistry: string;
  components: "1 component" | "2 component";
  response: string;
  curedProfile: string;
  benefits: string[];
  applications: string[];
  validationNote: string;
};

export const injectionGroutingProfiles: InjectionGroutingProfile[] = [
  {
    code: "Reference 2421",
    chemistry: "Low-viscosity polyurea-silicate injection resin",
    components: "2 component",
    response: "Non-foaming injection pathway for rapid consolidation",
    curedProfile: "High-strength structural reinforcement profile",
    benefits: [
      "Does not absorb water on contact in the supplied reference.",
      "Reference material describes penetration into cracks larger than 0.25 mm.",
    ],
    applications: [
      "Consolidation of sands, gravels, fractured rock and coal faces.",
      "Underwater construction repair contexts.",
    ],
    validationNote: "Public Urechem grade name and project-specific strength claims require confirmation.",
  },
  {
    code: "Reference 2410",
    chemistry: "Hydrophobic polyurethane resin based on MDI, polyether polyols and an amine catalyst",
    components: "1 component",
    response: "Water-reactive with adjustable reaction timing",
    curedProfile: "Rigid, high-expansion polyurethane foam",
    benefits: ["Adjustable reaction time for application-specific needs.", "High expansion for volume filling and sealing."],
    applications: ["Tunnels.", "Soils and water-retaining structures."],
    validationNote: "Accelerator selection, reaction time and expansion must be validated for each project.",
  },
  {
    code: "Reference 2435",
    chemistry: "Semi-flexible, water-reactive polyurethane injection resin",
    components: "1 component",
    response: "High-foaming reaction with catalyst-adjustable speed",
    curedProfile: "Semi-flexible, closed-cell, non-shrinking foam",
    benefits: ["Designed to accommodate minor structural movement.", "The supplied reference describes a solvent-free and phthalate-free formulation."],
    applications: ["Sealing leaking cracks and joints.", "Controlling water ingress to or from structures."],
    validationNote: "Environmental and chemical-resistance claims require current Urechem documentation.",
  },
  {
    code: "Reference 2435-B",
    chemistry: "Low-viscosity hydrophobic polyurethane-urea injection resin",
    components: "1 component",
    response: "Water-reactive, high-expansion response with accelerator control",
    curedProfile: "Flexible, closed-cell water-stopping foam",
    benefits: ["Designed for penetration into water-filled cracks.", "Reaction profile can be adjusted with an accelerator."],
    applications: ["Water stopping against flowing or pressurised water.", "Pre-excavation grouting and specialist foundation structures."],
    validationNote: "Compliance, fire-retardant status and accelerator dosage must not be published without Urechem approval.",
  },
  {
    code: "Reference 2443",
    chemistry: "MDI-based hydrophobic polyurethane grout",
    components: "1 component",
    response: "Fast water-triggered transformation from liquid to semi-flexible foam",
    curedProfile: "Hydrophobic semi-flexible polyurethane foam",
    benefits: ["Fast reaction for high-volume water-leak control.", "The supplied reference describes a solvent-free formulation."],
    applications: ["Leaking construction joints.", "Leaking cracks in concrete or masonry."],
    validationNote: "Water flow, temperature and injection conditions require specialist review.",
  },
  {
    code: "Reference 2430",
    chemistry: "High-foaming polyurethane injection resin",
    components: "2 component",
    response: "Rapid water cut-off reaction",
    curedProfile: "Strong, rigid, closed-cell foam intended to resist hydrostatic pressure",
    benefits: ["Hydrophobic high-strength foam pathway.", "Fast water reaction for immediate sealing contexts."],
    applications: ["Void filling, slab levelling and soil stabilisation.", "Infrastructure repair, concrete rehabilitation, tunnels and mines with high water ingress."],
    validationNote: "Hydrostatic-pressure and strength claims require current test evidence.",
  },
  {
    code: "Reference 2455 MV",
    chemistry: "Hydrophilic MDI-based polyurethane resin",
    components: "1 component",
    response: "Controlled expansion on contact with water",
    curedProfile: "Dense, flexible polyurethane grout",
    benefits: ["Reference material describes adhesion to concrete, brick and mortar.", "Available reference viscosity variants are V.5, V.6 and V.7."],
    applications: ["Leaking cracks, fractures and joints.", "Flexible water-stop grouting in tunnels, mines and construction sites."],
    validationNote: "Viscosity variant, water ratio and cure profile require Urechem confirmation.",
  },
  {
    code: "Reference 2406 HS",
    chemistry: "Polyol and polymeric-MDI polyurethane grout",
    components: "2 component",
    response: "Controlled expansion with rapid early-strength development",
    curedProfile: "Rigid, durable, hydrophobic foam",
    benefits: ["Low-viscosity pathway for controlled placement.", "Designed for lifting, stabilisation and underpinning contexts."],
    applications: ["Foundation void filling and stabilisation.", "Slab jacking and soil consolidation."],
    validationNote: "Lift design, bearing capacity and injection sequence require engineering review.",
  },
  {
    code: "Reference 2405 SJ",
    chemistry: "Polymeric-MDI and polyol slab-jacking system",
    components: "2 component",
    response: "Fast reaction with controlled expansion",
    curedProfile: "High-strength, lightweight polyurethane foam",
    benefits: ["Rapid strength development for slab lifting.", "Reference material describes a high expansion ratio."],
    applications: ["Lifting and stabilising sunken slabs and pavements.", "Foundation void filling and soil consolidation."],
    validationNote: "Expansion, lift pressure and final load capacity require project-specific approval.",
  },
  {
    code: "Reference 2410 Earth-1",
    chemistry: "Water-reactive hydrophobic polyurethane resin",
    components: "1 component",
    response: "Instant water reaction with accelerator-adjustable timing",
    curedProfile: "Rigid, high-expansion polyurethane foam",
    benefits: ["Water-stopping and crack-sealing pathway.", "The supplied source describes solvent-free and environment-conscious positioning."],
    applications: ["Tunnels.", "Soils and water-retaining structures."],
    validationNote: "Do not publish regulatory-compliance claims until Urechem supplies current supporting evidence.",
  },
  {
    code: "Reference 2425 Earth-2",
    chemistry: "Polyol-blend and MDI polyurethane grouting material",
    components: "2 component",
    response: "Fast reaction with low reference expansion of 1x to 3x",
    curedProfile: "Tough, rigid, high-strength polyurethane material",
    benefits: ["Designed for high-water-ingress cut-off.", "Low expansion supports compressive-strength development in the supplied reference."],
    applications: ["High-water-ingress sealing.", "Void filling and waterproofing."],
    validationNote: "Expansion and compressive-strength values require Urechem technical confirmation before use.",
  },
];

export const injectionGroutingSourceNote =
  "These profiles retain neutral reference codes from the equal-priority supplied technical source so useful application data is not lost. They do not establish approved public Urechem grade names, certifications, design values or suitability for a specific project.";
