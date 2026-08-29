export type NavigationItem = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: NavigationItem[];
};

export const primaryNavigation: NavigationItem[] = [
  // Technical Center remains available on the site but is intentionally omitted from the header.
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Industries", href: "/industries" },
  { label: "Innovation & R&D", href: "/innovation-rd" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const productFamilyLinks: NavigationItem[] = [
  { label: "Complete product range", href: "/products/complete-range" },
  { label: "TPU material pathways", href: "/products/tpu-materials" },
  { label: "UreShield waterproofing and polyurea", href: "/products/ureshield-waterproofing-polyurea-systems" },
  { label: "Uretherm spray-foam systems", href: "/products/complete-range" },
  { label: "ChemNate MDI range", href: "/products/complete-range" },
  { label: "KlayOl polyol range", href: "/products/klayol-ppg-range" },
  { label: "KlayOl PPG range", href: "/products/klayol-ppg-range" },
  { label: "Flexible systems and additives", href: "/products/complete-range" },
];

export const applicationLinks: NavigationItem[] = [
  { label: "Product discovery", href: "/applications" },
  { label: "Technical challenge intake", href: "/ai-solution-finder" },
  { label: "Consultation request", href: "/consultant" },
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
  { label: "Talk to a consultant", href: "/consultant" },
  { label: "Contact", href: "/contact" },
  { label: "Solution Finder", href: "/ai-solution-finder" },
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
