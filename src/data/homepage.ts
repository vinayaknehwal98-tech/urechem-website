import { getApplicationFamilyLabels } from "@/data/application-family-mappings";
import {
  BookOpen,
  Boxes,
  BrainCircuit,
  Building2,
  Car,
  ClipboardCheck,
  FileBadge,
  FileText,
  FlaskConical,
  Layers3,
  PackageSearch,
  Paintbrush,
  PanelTop,
  ShieldCheck,
  Sofa,
  SprayCan,
  ThermometerSun,
  type LucideIcon,
} from "lucide-react";

export type Pathway = {
  title: string;
  text: string;
  cta: string;
  href: string;
  icon: LucideIcon;
};

export type ProductFamily = {
  name: string;
  description: string;
  products: string[];
  href: string;
  accent: string;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
};

export type ApplicationCategory = {
  title: string;
  description: string;
  families: string[];
  href: string;
  icon: LucideIcon;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
};

export type ProofMetric = {
  value: number;
  suffix: string;
  label: string;
  validationRequired: boolean;
};

export type WorkflowStage = {
  title: string;
  description: string;
};

export type TechnicalResource = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const pathways: Pathway[] = [
  {
    title: "Describe a technical challenge",
    text: "Let Urechem Intelligence structure your application requirements.",
    cta: "Start AI Solution Finder",
    href: "/ai-solution-finder",
    icon: BrainCircuit,
  },
  {
    title: "Explore by application",
    text: "Discover systems based on the performance or process you need.",
    cta: "Browse Applications",
    href: "/applications",
    icon: Layers3,
  },
  {
    title: "Find a product",
    text: "Search Urechem product families and known product names.",
    cta: "Explore Products",
    href: "/products",
    icon: PackageSearch,
  },
];

export const productFamilies: ProductFamily[] = [
  {
    name: "Uretherm",
    description: "Closed-cell polyurethane spray-foam systems",
    products: ["GT 40", "GT 50"],
    href: "/products/uretherm-spray-foam-systems",
    accent: "cyan",
    image: {
      src: "https://images.unsplash.com/photo-1674485135526-b5a686b33dfe?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "A protected applicator spraying polyurethane foam across an industrial surface",
      position: "object-center",
    },
  },
  {
    name: "ChemNate",
    description: "MDI systems for polyurethane, coatings, adhesives and insulation",
    products: ["PMDI 2401", "FMDI 2402", "MDI 2450", "MDI 2437", "C MDI 2096"],
    href: "/products/chemnate-mdi-range",
    accent: "turquoise",
    image: {
      src: "https://images.unsplash.com/photo-1567016958860-87d898933af1?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "Rows of sealed blue raw-material drums in an industrial warehouse",
      position: "object-center",
    },
  },
  {
    name: "KlayOl Polyols",
    description: "Polyether and polymer polyols for flexible and moulded foam",
    products: ["PE 2428", "PE 2435", "PE 2456", "POP"],
    href: "/products/klayol-polyol-range",
    accent: "metal",
    image: {
      src: "https://images.unsplash.com/photo-1774169440296-9b366349b048?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "A laboratory display of labelled chemical and polyol sample bottles",
      position: "object-center",
    },
  },
  {
    name: "KlayOl PPG",
    description: "Polypropylene glycol systems for coatings, adhesives, sealants and elastomers",
    products: ["PPG 1420", "PPG 1440", "PPG 1410", "PPG 1404", "PPG 1412"],
    href: "/products/klayol-ppg-range",
    accent: "cyan",
    image: {
      src: "https://images.unsplash.com/photo-1709666414169-654f60926304?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "A measured liquid formulation being filled into a laboratory bottle",
      position: "object-center",
    },
  },
  {
    name: "Flexible Systems",
    description: "Memory-foam and high-resilience moulded systems",
    products: ["VE4105 A/B", "Flex 8305 A/B"],
    href: "/products/flexible-systems",
    accent: "turquoise",
    image: {
      src: "https://images.unsplash.com/photo-1759176171634-674f37841636?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "A modern cushioned mattress and pillow system designed for comfort",
      position: "object-center",
    },
  },
  {
    name: "Additives & Performance Materials",
    description: "Catalysts, silicone oils, pigments, colour pastes, cell openers and performance additives",
    products: [],
    href: "/products/additives-processing-aids",
    accent: "metal",
    image: {
      src: "https://images.unsplash.com/photo-1562411054-4861622f1a22?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "Assorted laboratory jars containing colour and performance additive samples",
      position: "object-center",
    },
  },
];

export const applicationCategories: ApplicationCategory[] = [
  {
    title: "Thermal insulation",
    description: "Improve enclosure performance with chemistry selected around thermal control goals.",
    families: [...getApplicationFamilyLabels("thermal-insulation")],
    href: "/applications/thermal-insulation",
    icon: ThermometerSun,
    image: {
      src: "/images/application-site-review.webp",
      alt: "An engineer checking the thermal performance of installed foam insulation",
      position: "object-center",
    },
  },
  {
    title: "Spray foam",
    description: "Map spray-applied polyurethane needs to system families and implementation constraints.",
    families: [...getApplicationFamilyLabels("spray-foam")],
    href: "/applications/spray-foam",
    icon: SprayCan,
    image: {
      src: "/images/spray-foam-application.webp",
      alt: "A protected installer applying spray foam between structural wall studs",
      position: "object-center",
    },
  },
  {
    title: "Flexible and moulded foam",
    description: "Explore material pathways for comfort, resilience and moulded foam applications.",
    families: [...getApplicationFamilyLabels("flexible-moulded-foam")],
    href: "/applications/flexible-moulded-foam",
    icon: Sofa,
    image: {
      src: "https://images.unsplash.com/photo-1762803841519-25bb12e01579?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "A sculptural upholstered foam furniture piece in a materials workshop",
      position: "object-center",
    },
  },
  {
    title: "Automotive seating",
    description: "Structure seating challenges around foam response, process and production needs.",
    families: [...getApplicationFamilyLabels("automotive-seating")],
    href: "/applications/automotive-seating",
    icon: Car,
    image: {
      src: "https://images.unsplash.com/photo-1760161339261-56487b766a17?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "Detailed quilted automotive seats inside a modern vehicle",
      position: "object-center",
    },
  },
  {
    title: "Furniture and bedding",
    description: "Connect comfort applications to flexible foam and specialty additive pathways.",
    families: [...getApplicationFamilyLabels("furniture-bedding")],
    href: "/applications/furniture-bedding",
    icon: PanelTop,
    image: {
      src: "https://images.unsplash.com/photo-1768946131536-39b5f3ec329d?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "A textured upholstered sofa showing comfort and cushioning materials",
      position: "object-center",
    },
  },
  {
    title: "Adhesives and coatings",
    description: "Evaluate chemistry routes for bonding, coating and surface-performance applications.",
    families: [...getApplicationFamilyLabels("adhesives-coatings")],
    href: "/applications/adhesives-coatings",
    icon: Paintbrush,
    image: {
      src: "https://images.unsplash.com/photo-1632605192331-085fa2082575?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "A technician preparing a coated automotive surface for a smooth finish",
      position: "object-center",
    },
  },
  {
    title: "Construction systems",
    description: "Organize building-system requirements around application, substrate and environment.",
    families: [...getApplicationFamilyLabels("construction-systems")],
    href: "/applications/construction-systems",
    icon: Building2,
    image: {
      src: "/images/ureshield-injection.webp",
      alt: "Construction specialists injecting a concrete joint inside an infrastructure tunnel",
      position: "object-center",
    },
  },
  {
    title: "Custom formulation",
    description: "Turn a non-standard material challenge into a structured development brief.",
    families: [...getApplicationFamilyLabels("custom-formulation")],
    href: "/applications/custom-formulation",
    icon: FlaskConical,
    image: {
      src: "https://images.unsplash.com/photo-1709662217659-c7966220219f?auto=format&fit=crop&fm=jpg&q=84&w=1800",
      alt: "A gloved formulator dispensing a precise liquid sample with a pipette",
      position: "object-center",
    },
  },
];

export const proofMetrics: ProofMetric[] = [
  { value: 10000, suffix: "+", label: "R&D man-hours", validationRequired: true },
  { value: 100, suffix: "+", label: "Years cumulative experience", validationRequired: true },
  { value: 30, suffix: "+", label: "Projects executed", validationRequired: true },
  { value: 20, suffix: "+", label: "Brands owned", validationRequired: true },
  { value: 20, suffix: "+", label: "Experienced professionals", validationRequired: true },
  { value: 5, suffix: "+", label: "Industries served", validationRequired: true },
];

export const workflowStages: WorkflowStage[] = [
  {
    title: "Problem identification",
    description: "Capture application context, constraints and performance goals before proposing a route.",
  },
  {
    title: "Research and global solution search",
    description: "Investigate available chemistry pathways and relevant solution references.",
  },
  {
    title: "Raw-material procurement",
    description: "Align required inputs with the intended formulation and supply pathway.",
  },
  {
    title: "Custom product development",
    description: "Develop candidate systems around the client application and implementation need.",
  },
  {
    title: "Third-party testing",
    description: "Support external testing where required by the project and application context.",
  },
  {
    title: "Certification and compliance",
    description: "Address certification and compliance steps only where verified for the specific product or project.",
  },
  {
    title: "Client sample approval",
    description: "Move candidate materials through client review and sample feedback.",
  },
  {
    title: "Final product delivery",
    description: "Supply the approved product path with supporting implementation coordination.",
  },
];

export const technicalResources: TechnicalResource[] = [
  {
    title: "Technical Data Sheets",
    description: "Product-level technical files organized for fast technical review.",
    icon: FileText,
  },
  {
    title: "Safety Data Sheets",
    description: "Safety resources grouped for product and application context.",
    icon: ShieldCheck,
  },
  {
    title: "Application Guides",
    description: "Guides will organize use-case knowledge without replacing technical review.",
    icon: BookOpen,
  },
  {
    title: "Product Brochures",
    description: "Product literature surfaced beside related families and applications.",
    icon: Boxes,
  },
  {
    title: "Certificates",
    description: "Certificate resources organized by product and application area.",
    icon: FileBadge,
  },
  {
    title: "Case Studies",
    description: "Project stories grouped around application outcomes and chemistry routes.",
    icon: ClipboardCheck,
  },
];

export const technicalFilters = ["TDS", "SDS", "COA", "Compliance", "Processing guide"];

export const ctaBriefFields = ["Application", "Material", "Environment", "Performance goal"];
