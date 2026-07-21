export type ApplicationFamilyMapping = {
  slug: string;
  familySlugs: readonly string[];
  familyLabels: readonly string[];
};

export const applicationFamilyMappings = [
  { slug: "thermal-insulation", familySlugs: ["uretherm-spray-foam-systems", "chemnate-mdi-range"], familyLabels: ["Uretherm", "ChemNate"] },
  { slug: "spray-foam", familySlugs: ["uretherm-spray-foam-systems", "additives-processing-aids"], familyLabels: ["Uretherm", "Additives"] },
  { slug: "flexible-moulded-foam", familySlugs: ["klayol-polyol-range", "flexible-systems"], familyLabels: ["KlayOl Polyols", "Flexible Systems"] },
  { slug: "automotive-seating", familySlugs: ["flexible-systems", "klayol-polyol-range"], familyLabels: ["Flexible Systems", "KlayOl Polyols"] },
  { slug: "furniture-bedding", familySlugs: ["flexible-systems", "klayol-polyol-range"], familyLabels: ["Flexible Systems", "KlayOl Polyols"] },
  { slug: "adhesives-coatings", familySlugs: ["chemnate-mdi-range", "klayol-ppg-range"], familyLabels: ["ChemNate", "KlayOl PPG"] },
  { slug: "construction-systems", familySlugs: ["uretherm-spray-foam-systems", "chemnate-mdi-range"], familyLabels: ["Uretherm", "ChemNate"] },
  { slug: "custom-formulation", familySlugs: ["additives-processing-aids"], familyLabels: ["Additives"] },
] as const satisfies readonly ApplicationFamilyMapping[];

export function getApplicationFamilySlugs(slug: string) {
  return applicationFamilyMappings.find((mapping) => mapping.slug === slug)?.familySlugs ?? [];
}

export function getApplicationFamilyLabels(slug: string) {
  return applicationFamilyMappings.find((mapping) => mapping.slug === slug)?.familyLabels ?? [];
}
