import { getApplicationFamilySlugs } from "@/data/application-family-mappings";
export type ValidationState = "confirmed-name" | "requires-client-validation" | "unavailable";
export type DocumentType = "TDS" | "SDS" | "COA" | "Compliance" | "Processing guide";
export type DocumentStatus = "not-published-online" | "contact-for-availability";

export type ProductDocument = {
  type: DocumentType;
  status: DocumentStatus;
  note: string;
};

export type ProductFamily = {
  slug: string;
  name: string;
  shortName: string;
  positioning: string;
  description: string;
  applications: string[];
  industries: string[];
  products: Product[];
  documents: ProductDocument[];
  validation: ValidationState;
};

export type Product = {
  slug: string;
  name: string;
  familySlug: string;
  description: string;
  applications: string[];
  compareAttributes: Record<string, string>;
  documents: ProductDocument[];
  validation: ValidationState;
};

export type Application = {
  slug: string;
  name: string;
  summary: string;
  needs: string[];
  familySlugs: string[];
  industrySlugs: string[];
};

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  needs: string[];
  applicationSlugs: string[];
  familySlugs: string[];
};

type ApplicationSeed = readonly [slug: string, name: string, summary: string];

const documentNote =
  "Technical documents are not published online. Contact Urechem for current document availability and review requirements.";

const docs = (): ProductDocument[] => [
  { type: "TDS", status: "contact-for-availability", note: documentNote },
  { type: "SDS", status: "contact-for-availability", note: documentNote },
  { type: "COA", status: "contact-for-availability", note: documentNote },
];

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const product = (
  familySlug: string,
  name: string,
  description: string,
  applications: string[] = [],
  compareAttributes: Record<string, string> = {},
): Product => ({
  slug: `${familySlug}-${slugify(name)}`,
  name,
  familySlug,
  description,
  applications,
  validation: "confirmed-name",
  documents: docs(),
  compareAttributes,
});

export const productFamilies: ProductFamily[] = [
  {
    slug: "uretherm-spray-foam-systems",
    name: "Uretherm spray-foam systems",
    shortName: "Uretherm",
    positioning: "Spray-applied polyurethane system pathway for insulation and construction enquiries.",
    description: "Part of the Uretherm spray-foam systems range, with GT 40 and GT 50 catalog identifiers routed through technical review.",
    applications: ["thermal-insulation", "spray-foam", "construction-systems"],
    industries: ["construction", "industrial-facilities"],
    validation: "confirmed-name",
    documents: docs(),
    products: [
      product(
        "uretherm-spray-foam-systems",
        "GT 40",
        "A fully formulated polyol blend used as part of a two-component, closed-cell polyurethane spray system for building-insulation applications.",
        ["thermal-insulation", "spray-foam", "construction-systems"],
        {
          "Product role": "Fully formulated spray-foam polyol blend",
          "System profile": "Two-component, closed-cell polyurethane spray system",
          "Reference density": "40-45",
          "Primary applications": "Floors, attics, crawl spaces and walls in residential and commercial buildings",
          "Reference benefits": "Thermal insulation, moisture resistance, durable structure and adhesion to common construction materials",
          "Application requirement": "For trained applicators using dedicated spray-foam dispensing equipment",
        },
      ),
      product(
        "uretherm-spray-foam-systems",
        "GT 50",
        "A fully formulated polyol blend used as part of a two-component, closed-cell polyurethane spray system for higher-density building-insulation applications.",
        ["thermal-insulation", "spray-foam", "construction-systems"],
        {
          "Product role": "Fully formulated spray-foam polyol blend",
          "System profile": "Two-component, closed-cell polyurethane spray system",
          "Reference density": "50-55",
          "Primary applications": "Floors, attics, crawl spaces and walls in residential and commercial buildings",
          "Reference benefits": "Thermal insulation, moisture resistance, durable structure and adhesion to common construction materials",
          "Application requirement": "For trained applicators using dedicated spray-foam dispensing equipment",
        },
      ),
    ],
  },
  {
    slug: "chemnate-mdi-range",
    name: "ChemNate MDI range",
    shortName: "ChemNate",
    positioning: "MDI product-name range for controlled polyurethane formulation discussions.",
    description: "ChemNate MDI catalog identifiers are presented for enquiry routing, with performance data reviewed case by case.",
    applications: ["thermal-insulation", "adhesives-coatings", "construction-systems"],
    industries: ["construction", "industrial-facilities"],
    validation: "confirmed-name",
    documents: docs(),
    products: [
      product(
        "chemnate-mdi-range",
        "PMDI 2401",
        "A standard-functionality polymeric diphenylmethane diisocyanate (MDI) for polyurethane formulation enquiries.",
        ["thermal-insulation", "adhesives-coatings", "construction-systems"],
        {
          "Product role": "Standard-functionality polymeric MDI",
          Chemistry: "Polymeric diphenylmethane diisocyanate",
          "Primary applications": "Polyurethane production, adhesives, coatings and insulation materials",
          "Reference benefits": "Bonding strength, moisture resistance and thermal-insulation performance",
        },
      ),
      product(
        "chemnate-mdi-range",
        "FMDI 2402",
        "A prepolymerized diphenylmethane diisocyanate presented in the supplied reference as a liquid pure MDI.",
        ["adhesives-coatings", "custom-formulation"],
        {
          "Product role": "Prepolymerized liquid MDI",
          Chemistry: "Diphenylmethane diisocyanate",
          "Physical profile": "Liquid at room temperature",
          "Reference benefits": "Easier handling and faster curing for processing efficiency",
        },
      ),
      product(
        "chemnate-mdi-range",
        "MDI 2450",
        "A 2,4-rich blend of 2,4- and 4,4-diphenylmethane diisocyanates for formulation review.",
        ["adhesives-coatings", "custom-formulation"],
        {
          "Product role": "2,4-rich isocyanate blend",
          Chemistry: "Blend of 2,4- and 4,4-diphenylmethane diisocyanates",
          "Physical profile": "Clear, colourless to light-yellow liquid at room temperature",
          "Reference benefits": "Mechanical strength, stiffness, durability, high reactivity and faster curing",
        },
      ),
      product(
        "chemnate-mdi-range",
        "MDI 2437",
        "A viscosity- and reactivity-modified MDI for adhesive, coating and elastomer formulation pathways.",
        ["adhesives-coatings", "custom-formulation"],
        {
          "Product role": "Viscosity- and reactivity-modified MDI",
          Chemistry: "Modified diphenylmethane diisocyanate",
          "Primary applications": "Adhesives, coatings, elastomers and flexible-packaging applications",
          "Reference benefits": "Adhesion, durability and chemical resistance",
        },
      ),
      product(
        "chemnate-mdi-range",
        "C MDI 2096",
        "A low-viscosity modified MDI for specialist polyurethane, floor-coating and primer enquiries.",
        ["adhesives-coatings", "construction-systems", "custom-formulation"],
        {
          "Product role": "Low-viscosity modified MDI",
          Chemistry: "Modified diphenylmethane diisocyanate",
          "Primary applications": "Specialty polyurethanes, polyurethane floor coatings and primers",
          "Reference benefits": "Thermal stability and formulation flexibility for application-specific properties",
        },
      ),
    ],
  },
  {
    slug: "klayol-polyol-range",
    name: "KlayOl polyol range",
    shortName: "KlayOl Polyols",
    positioning: "Polyol product-name range for flexible, moulded and custom polyurethane development discussions.",
    description: "KlayOl polyol catalog identifiers support flexible, moulded and development enquiries that require technical review.",
    applications: ["flexible-moulded-foam", "automotive-seating", "furniture-bedding"],
    industries: ["furniture-bedding", "automotive"],
    validation: "confirmed-name",
    documents: docs(),
    products: [
      product(
        "klayol-polyol-range",
        "PE 2428",
        "A trifunctional polyether polyol with a reference molecular weight of 6,000.",
        ["flexible-moulded-foam", "automotive-seating", "furniture-bedding"],
        {
          "Product role": "Trifunctional polyether polyol",
          "Reference molecular weight": "6,000",
          "Primary applications": "Polyurethane sealing, moulded foam and flexible foam",
          "Reference benefits": "Crosslinking strength, flexibility, hardness balance and resilience",
        },
      ),
      product(
        "klayol-polyol-range",
        "PE 2435",
        "A trifunctional reactive polyether polyol with a reference molecular weight of 5,000.",
        ["flexible-moulded-foam", "automotive-seating", "furniture-bedding"],
        {
          "Product role": "Trifunctional reactive polyether polyol",
          "Reference molecular weight": "5,000",
          "Primary applications": "Moulded high-resilience foams",
          "Reference benefits": "Crosslinking, tensile strength and flexibility",
        },
      ),
      product(
        "klayol-polyol-range",
        "PE 2456",
        "A propylene-oxide and ethylene-oxide triol with a reference molecular weight of 3,000.",
        ["flexible-moulded-foam", "furniture-bedding"],
        {
          "Product role": "Polyether triol",
          "Reference molecular weight": "3,000",
          Composition: "Propylene oxide and ethylene oxide",
          "Primary applications": "Flexible polyurethane foam slabs and one-shot flexible foam",
          "Reference benefits": "Crosslinking, rigidity, flexibility and resilience",
        },
      ),
      product(
        "klayol-polyol-range",
        "POP",
        "A polymer polyol used across polyurethane foam and related formulation applications.",
        ["flexible-moulded-foam", "automotive-seating", "furniture-bedding"],
        {
          "Product role": "Polymer polyol",
          "Primary applications": "Mattresses, automotive seating, furniture foam and protective-film formulations",
          "Reference benefits": "Foam durability and comfort; abrasion, scratch, oil, solvent and UV resistance in film applications",
        },
      ),
    ],
  },
  {
    slug: "klayol-ppg-range",
    name: "KlayOl PPG range",
    shortName: "KlayOl PPG",
    positioning: "PPG product-name range for formulation review pathways.",
    description: "KlayOl PPG catalog identifiers support formulation discussions where detailed use guidance is reviewed per enquiry.",
    applications: ["adhesives-coatings", "custom-formulation"],
    industries: ["industrial-facilities"],
    validation: "confirmed-name",
    documents: docs(),
    products: [
      product(
        "klayol-ppg-range",
        "PPG 1420",
        "A KlayOl PPG grade for coatings, adhesives, sealants and elastomer formulation enquiries.",
        ["adhesives-coatings", "custom-formulation"],
        {
          "Product role": "KlayOl PPG grade",
          "Primary applications": "Coatings, adhesives, sealants and elastomers",
          "Technical status": "Grade-specific properties require Urechem confirmation",
        },
      ),
      product(
        "klayol-ppg-range",
        "PPG 1440",
        "A KlayOl PPG grade for polyurethane coating, adhesive and sealant formulation enquiries.",
        ["adhesives-coatings", "custom-formulation"],
        {
          "Product role": "KlayOl PPG grade",
          "Primary applications": "Polyurethane coatings, adhesives and sealants",
          "Technical status": "Grade-specific properties require Urechem confirmation",
        },
      ),
      product(
        "klayol-ppg-range",
        "PPG 1410",
        "A KlayOl PPG grade for application-specific polyurethane formulation review.",
        ["adhesives-coatings", "custom-formulation"],
        {
          "Product role": "KlayOl PPG grade",
          "Primary applications": "Polyurethane formulation pathways requiring durability and stable processing",
          "Technical status": "Grade-specific properties require Urechem confirmation",
        },
      ),
      product(
        "klayol-ppg-range",
        "PPG 1404",
        "A KlayOl PPG grade for coating, sealant, adhesive and elastomer formulation enquiries.",
        ["adhesives-coatings", "custom-formulation"],
        {
          "Product role": "KlayOl PPG grade",
          "Primary applications": "Coatings, sealants, adhesives and elastomers",
          "Technical status": "Grade-specific properties require Urechem confirmation",
        },
      ),
      product(
        "klayol-ppg-range",
        "PPG 1412",
        "A KlayOl PPG grade for advanced sealant, adhesive, coating and elastomer formulation enquiries.",
        ["adhesives-coatings", "custom-formulation"],
        {
          "Product role": "KlayOl PPG grade",
          "Primary applications": "Advanced sealants, adhesives, coatings and elastomers",
          "Technical status": "Grade-specific properties require Urechem confirmation",
        },
      ),
    ],
  },
  {
    slug: "flexible-systems",
    name: "Flexible systems",
    shortName: "Flexible Systems",
    positioning: "Flexible foam system names for comfort, seating and moulded foam review pathways.",
    description: "Flexible system catalog identifiers connect comfort, seating and moulded-foam enquiries to technical review.",
    applications: ["flexible-moulded-foam", "automotive-seating", "furniture-bedding"],
    industries: ["automotive", "furniture-bedding"],
    validation: "confirmed-name",
    documents: docs(),
    products: ["VE4105 A/B", "Flex 8305 A/B"].map((name) =>
      product(
        "flexible-systems",
        name,
        `${name} is part of the Flexible Systems range for application-specific technical review.`,
        ["flexible-moulded-foam", "automotive-seating", "furniture-bedding"],
        {
          "Product role": "Flexible polyurethane system",
          "Primary applications": "Flexible and moulded foam development pathways",
          "Technical status": "Detailed performance data requires Urechem validation",
        },
      ),
    ),
  },
  {
    slug: "additives-processing-aids",
    name: "Additives and processing aids",
    shortName: "Additives",
    positioning: "Known additive and processing-aid categories for formulation-support discussions.",
    description: "Additive and processing-aid categories are listed for enquiry routing; grade selection is reviewed with Urechem specialists.",
    applications: ["spray-foam", "custom-formulation"],
    industries: ["industrial-facilities"],
    validation: "requires-client-validation",
    documents: docs(),
    products: [
      ["Additives", "Application-specific polyurethane formulation support"],
      ["Pigments", "Polyurethane foam colouring"],
      ["Catalysts", "Promoting the reaction between isocyanate and polyether polyol"],
      ["Silicone oils", "Foam stability, regular cell structure and processing latitude"],
      ["Colour pastes", "Polyurethane foam colouring"],
      ["Cell openers", "Cell opening in slow-recovery and high-resilience foams"],
      ["Anti-scorching agents", "Foam anti-yellowing and scorching-control pathways"],
      ["Anti-UV agents", "UV-related anti-yellowing pathways for foam"],
      ["Anti-yellowing agents", "Anti-yellowing pathways for foam, footwear and polyurethane leather"],
      ["Antibacterial agents", "Formulation pathways intended to help prevent bacterial growth"],
      ["Whitening agents", "Polyurethane foam-whitening pathways"],
    ].map(([name, primaryApplication]) =>
      product(
        "additives-processing-aids",
        name,
        `${name} can be routed through Urechem technical discussion for formulation support.`,
        ["custom-formulation"],
        {
          "Product role": name,
          "Primary applications": primaryApplication,
          "Grade-selection status": "Specific grade, dosage and processing guidance require Urechem validation",
        },
      ),
    ),
  },
];

export const products = productFamilies.flatMap((family) => family.products);

const applicationSeeds = [
  ["thermal-insulation", "Thermal insulation", "Structure insulation enquiries around substrate, environment, installation method and validation needs."],
  ["spray-foam", "Spray foam", "Connect spray-applied polyurethane enquiries to expert review pathways."],
  ["flexible-moulded-foam", "Flexible and moulded foam", "Explore foam pathways for comfort, resilience and moulded production contexts."],
  ["automotive-seating", "Automotive seating", "Frame seating enquiries for qualified Urechem technical discussion."],
  ["furniture-bedding", "Furniture and bedding", "Route comfort-product enquiries toward expert review."],
  ["adhesives-coatings", "Adhesives and coatings", "Evaluate bonding and coating formulation enquiries with expert review."],
  ["construction-systems", "Construction systems", "Organize building application requirements across insulation, substrate and compliance context."],
  ["custom-formulation", "Custom formulation", "Convert non-standard performance needs into a controlled development brief."],
] as const satisfies readonly ApplicationSeed[];



export const industries: Industry[] = [
  { slug: "construction", name: "Construction", summary: "Insulation, spray foam and building-system evaluation pathways.", needs: ["Substrate compatibility", "Installation method", "Compliance documentation"], applicationSlugs: ["thermal-insulation", "spray-foam", "construction-systems"], familySlugs: ["uretherm-spray-foam-systems", "chemnate-mdi-range"] },
  { slug: "automotive", name: "Automotive", summary: "Seating and moulded-foam enquiry pathways for manufacturing teams.", needs: ["Foam response", "Production repeatability", "Document control"], applicationSlugs: ["automotive-seating", "flexible-moulded-foam"], familySlugs: ["flexible-systems", "klayol-polyol-range"] },
  { slug: "furniture-bedding", name: "Furniture and bedding", summary: "Comfort foam pathways for furniture and sleep-product programs.", needs: ["Comfort profile", "Foam processing", "Sample evaluation"], applicationSlugs: ["furniture-bedding", "flexible-moulded-foam"], familySlugs: ["flexible-systems", "klayol-polyol-range"] },
  { slug: "industrial-facilities", name: "Industrial facilities", summary: "Maintenance, insulation, coatings and custom formulation enquiry routes.", needs: ["Operating environment", "Application constraints", "Safety review"], applicationSlugs: ["thermal-insulation", "adhesives-coatings", "custom-formulation"], familySlugs: ["chemnate-mdi-range", "klayol-ppg-range", "additives-processing-aids"] },
];

export const applications: Application[] = applicationSeeds.map(([slug, name, summary]) => ({
  slug,
  name,
  summary,
  needs: ["Application context", "Performance target", "Processing constraints", "Required documents"],
  familySlugs: [...getApplicationFamilySlugs(slug)],
  industrySlugs: industries.filter((industry) => industry.applicationSlugs.includes(slug)).map((industry) => industry.slug),
}));

export function getFamily(slug: string) {
  return productFamilies.find((family) => family.slug === slug);
}

export function getProduct(familySlug: string, slug: string) {
  return products.find((item) => item.familySlug === familySlug && item.slug === slug);
}

export function getApplication(slug: string) {
  return applications.find((application) => application.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function relatedFamilies(slug: string) {
  const family = getFamily(slug);
  return productFamilies
    .filter((item) => item.slug !== slug && item.applications.some((application) => family?.applications.includes(application)))
    .slice(0, 3);
}

export function comparisonEligible(familySlug: string, productSlug: string) {
  return products.some(
    (item) => item.familySlug === familySlug && item.slug === productSlug && Object.keys(item.compareAttributes).length > 0,
  );
}
