import { ApplicationDiscoverySection } from "@/components/home/application-discovery-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { PathwaysSection } from "@/components/home/pathways-section";
import { ProductUniverseSection } from "@/components/home/product-universe-section";
import { ProofExpertiseSection } from "@/components/home/proof-expertise-section";
import { TechnicalCenterPreviewSection } from "@/components/home/technical-center-preview-section";
import { UreShieldSection } from "@/components/home/ureshield-section";
import { WorkflowSection } from "@/components/home/workflow-section";
import { SiteOpeningAnimation } from "@/components/layout/site-opening-animation";

export default function Home() {
  return (
    <>
      <SiteOpeningAnimation />
      <HeroSection />
      <PathwaysSection />
      <ProductUniverseSection />
      <UreShieldSection />
      <ApplicationDiscoverySection />
      <ProofExpertiseSection />
      <WorkflowSection />
      <TechnicalCenterPreviewSection />
      <FinalCtaSection />
    </>
  );
}
