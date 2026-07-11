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

const product = (familySlug: string, name: string, description: string, applications: string[] = []): Product => ({
  slug: `${familySlug}-${slugify(name)}`,
  name,
  familySlug,
  description,
  applications,
  validation: "confirmed-name",
  documents: docs(),
  compareAttributes: {
    Family: familySlug,
    "Published documents": "Contact Urechem for current document availability",
    "Selection status": "Requires Urechem technical validation",
  },
});

export const productFamilies: ProductFamily[] = [
  {
    slug: "uretherm-spray-foam-systems",
    name: "Uretherm spray-foam systems",
    shortName: "Uretherm",
    positioning: "Spray-applied polyurethane system pathway for insulation and construction enquiries.",
    description: "Known product names include GT 40 and GT 50. Performance details require Urechem confirmation before publication.",
    applications: ["thermal-insulation", "spray-foam", "construction-systems"],
    industries: ["construction", "industrial-facilities"],
    validation: "confirmed-name",
    documents: docs(),
    products: [
      product("uretherm-spray-foam-systems", "GT 40", "GT 40 is a confirmed Urechem product name in the Uretherm family.", ["thermal-insulation", "spray-foam"]),
      product("uretherm-spray-foam-systems", "GT 50", "GT 50 is a confirmed Urechem product name in the Uretherm family.", ["thermal-insulation", "spray-foam"]),
    ],
  },
  {
    slug: "chemnate-mdi-range",
    name: "ChemNate MDI range",
    shortName: "ChemNate",
    positioning: "MDI product-name range for controlled polyurethane formulation discussions.",
    description: "Known ChemNate names are listed without unverified NCO, viscosity, packaging or processing claims.",
    applications: ["thermal-insulation", "adhesives-coatings", "construction-systems"],
    industries: ["construction", "industrial-facilities"],
    validation: "confirmed-name",
    documents: docs(),
    products: ["PMDI 2401", "FMDI 2402", "MDI 2450", "MDI 2437", "C MDI 2096"].map((name) =>
      product("chemnate-mdi-range", name, `${name} is a confirmed ChemNate product name requiring expert validation for application selection.`, []),
    ),
  },
  {
    slug: "klayol-polyol-range",
    name: "KlayOl polyol range",
    shortName: "KlayOl Polyols",
    positioning: "Polyol product-name range for flexible, moulded and custom polyurethane development discussions.",
    description: "Known KlayOl polyol names are presented as catalog identifiers until detailed properties are confirmed.",
    applications: ["flexible-moulded-foam"],
    industries: ["furniture-bedding", "automotive"],
    validation: "confirmed-name",
    documents: docs(),
    products: ["PE 2428", "PE 2435", "PE 2456", "POP"].map((name) =>
      product("klayol-polyol-range", name, `${name} is a confirmed KlayOl polyol product name.`, []),
    ),
  },
  {
    slug: "klayol-ppg-range",
    name: "KlayOl PPG range",
    shortName: "KlayOl PPG",
    positioning: "PPG product-name range for formulation review pathways.",
    description: "Known PPG 14xx names are shown as identifiers; detailed use claims require client confirmation.",
    applications: ["adhesives-coatings", "custom-formulation"],
    industries: ["industrial-facilities"],
    validation: "confirmed-name",
    documents: docs(),
    products: ["PPG 1420", "PPG 1440", "PPG 1410", "PPG 1404", "PPG 1412"].map((name) =>
      product("klayol-ppg-range", name, `${name} is a confirmed KlayOl PPG product name.`, []),
    ),
  },
  {
    slug: "flexible-systems",
    name: "Flexible systems",
    shortName: "Flexible Systems",
    positioning: "Flexible foam system names for comfort, seating and moulded foam review pathways.",
    description: "Known flexible-system names include VE4105 A/B and Flex 8305 A/B; processing data requires technical review.",
    applications: ["flexible-moulded-foam"],
    industries: ["automotive", "furniture-bedding"],
    validation: "confirmed-name",
    documents: docs(),
    products: ["VE4105 A/B", "Flex 8305 A/B"].map((name) =>
      product("flexible-systems", name, `${name} is a confirmed flexible-system product name requiring application-specific validation.`, []),
    ),
  },
  {
    slug: "additives-processing-aids",
    name: "Additives and processing aids",
    shortName: "Additives",
    positioning: "Known additive and processing-aid categories for formulation-support discussions.",
    description: "Category names are listed for enquiry routing; specific grades and performance claims require client confirmation.",
    applications: ["custom-formulation"],
    industries: ["industrial-facilities"],
    validation: "requires-client-validation",
    documents: docs(),
    products: ["Additives", "Pigments", "Catalysts", "Silicone oils", "Colour pastes", "Cell openers", "Anti-scorching agents", "Anti-UV agents", "Anti-yellowing agents", "Antibacterial agents", "Whitening agents"].map((name) =>
      product("additives-processing-aids", name, `${name} are known catalog category names for Urechem technical discussion.`, []),
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
  familySlugs: productFamilies.filter((family) => family.applications.includes(slug)).map((family) => family.slug),
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
