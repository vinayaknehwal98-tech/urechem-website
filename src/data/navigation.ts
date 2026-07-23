export type NavigationItem = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: NavigationItem[];
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Industries", href: "/industries" },
  { label: "Innovation & R&D", href: "/innovation-rd" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const productFamilyLinks: NavigationItem[] = [
  { label: "UreShield waterproofing and grouting systems", href: "/products/ureshield-waterproofing-grouting-systems" },
  { label: "Uretherm spray-foam systems", href: "/products/uretherm-spray-foam-systems" },
  { label: "ChemNate MDI range", href: "/products/chemnate-mdi-range" },
  { label: "KlayOl polyol range", href: "/products/klayol-polyol-range" },
  { label: "KlayOl PPG range", href: "/products/klayol-ppg-range" },
  { label: "Flexible systems", href: "/products/flexible-systems" },
  { label: "Additives and processing aids", href: "/products/additives-processing-aids" },
];

export const applicationLinks: NavigationItem[] = [
  { label: "Product discovery", href: "/applications" },
  { label: "Technical challenge intake", href: "/ai-solution-finder" },
  { label: "Consultation request", href: "/contact?type=Consultation%20request" },
  { label: "Industry pathways", href: "/industries" },
  { label: "Product comparison", href: "/products/compare" },
];

export const technicalCenterLinks: NavigationItem[] = [
  { label: "Document library", href: "/technical-center/documents" },
  { label: "Testing and validation", href: "/technical-center/testing-validation" },
  { label: "AI-assisted document search", href: "/technical-center/ai-document-search" },
  { label: "Expert validation", href: "/technical-center/expert-validation" },
];

export const companyLinks: NavigationItem[] = [
  { label: "About Urechem Chemicals", href: "/about" },
  { label: "Innovation & R&D", href: "/innovation-rd" },
  { label: "Talk to a consultant", href: "/contact?type=Consultation%20request" },
  { label: "Contact", href: "/contact" },
  { label: "Ask Urechem AI", href: "/ask-urechem-ai" },
];

export const footerGroups: FooterGroup[] = [
  { title: "Product families", links: productFamilyLinks },
  { title: "Applications", links: applicationLinks },
  { title: "Technical Center", links: technicalCenterLinks },
  { title: "Company", links: companyLinks },
];

export const legalLinks: NavigationItem[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Legal notice", href: "/legal" },
];
