import { applications, productFamilies } from "@/data/catalog";

type SignalRule = {
  applicationSlug: string;
  keywords: string[];
  reason: string;
};

const signalRules: SignalRule[] = [
  {
    applicationSlug: "thermal-insulation",
    keywords: ["thermal", "insulation", "temperature", "energy", "cold room", "roof", "wall"],
    reason: "The brief contains thermal-control or building-envelope signals.",
  },
  {
    applicationSlug: "spray-foam",
    keywords: ["spray", "foam", "attic", "crawl space", "cavity", "closed cell"],
    reason: "The brief points toward a spray-applied polyurethane pathway.",
  },
  {
    applicationSlug: "flexible-moulded-foam",
    keywords: ["flexible", "moulded", "molded", "resilience", "cushion", "comfort foam"],
    reason: "The brief contains flexible- or moulded-foam performance signals.",
  },
  {
    applicationSlug: "automotive-seating",
    keywords: ["automotive", "vehicle", "car seat", "seating", "headrest"],
    reason: "The brief relates to automotive seating or moulded comfort components.",
  },
  {
    applicationSlug: "furniture-bedding",
    keywords: ["mattress", "bedding", "furniture", "sofa", "comfort", "pillow"],
    reason: "The brief relates to furniture, bedding or comfort-foam production.",
  },
  {
    applicationSlug: "adhesives-coatings",
    keywords: ["adhesive", "bond", "coating", "sealant", "elastomer", "primer", "floor coating"],
    reason: "The brief contains bonding, coating, sealant or elastomer signals.",
  },
  {
    applicationSlug: "construction-systems",
    keywords: ["construction", "concrete", "building", "substrate", "site", "infrastructure"],
    reason: "The brief is connected to a construction substrate or project environment.",
  },
  {
    applicationSlug: "custom-formulation",
    keywords: ["custom", "pigment", "colour", "color", "catalyst", "silicone", "uv", "yellowing", "additive"],
    reason: "The brief includes formulation or processing-aid requirements.",
  },
];

export type GuidedPathway = {
  applicationSlug: string;
  applicationName: string;
  applicationHref: string;
  familyNames: string[];
  familyHrefs: string[];
  reason: string;
  score: number;
};

export type GuidedAnalysis = {
  pathways: GuidedPathway[];
  ureshieldMatch: boolean;
};

export function analyzeTechnicalChallenge(value: string): GuidedAnalysis {
  const normalized = value.trim().toLowerCase();
  const ureshieldMatch = [
    "waterproof",
    "water ingress",
    "leak",
    "grout",
    "grouting",
    "injection",
    "crack",
    "polyurea",
    "membrane",
  ].some((keyword) => normalized.includes(keyword));

  const ranked = signalRules
    .map((rule) => ({
      rule,
      score: rule.keywords.reduce(
        (score, keyword) => score + (normalized.includes(keyword) ? (keyword.includes(" ") ? 3 : 2) : 0),
        0,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const selected =
    ranked.length > 0
      ? ranked
      : [{ rule: signalRules.find((rule) => rule.applicationSlug === "custom-formulation")!, score: 1 }];

  return {
    ureshieldMatch,
    pathways: selected.map(({ rule, score }) => {
      const application = applications.find((item) => item.slug === rule.applicationSlug)!;
      const families = application.familySlugs
        .map((slug) => productFamilies.find((family) => family.slug === slug))
        .filter((family): family is (typeof productFamilies)[number] => Boolean(family));

      return {
        applicationSlug: application.slug,
        applicationName: application.name,
        applicationHref: `/applications/${application.slug}`,
        familyNames: families.map((family) => family.name),
        familyHrefs: families.map((family) => `/products/${family.slug}`),
        reason: rule.reason,
        score,
      };
    }),
  };
}
