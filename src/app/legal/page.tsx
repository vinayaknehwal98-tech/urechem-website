import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "Legal Notice",
  description: "Legal, business, copyright and technical information for the Urechem Chemicals website.",
};

const effectiveDate = "4 August 2026";

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Legal</SectionLabel>
      <div className="mt-5 max-w-4xl">
        <h1 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Legal notice</h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
          Effective and last updated: {effectiveDate}
        </p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          This page identifies the website operator and sets out important legal, copyright, technical and product-safety
          notices relating to the Urechem Chemicals website.
        </p>
      </div>

      <div className="mt-10 max-w-4xl space-y-10 text-base leading-8 text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-white">1. Website operator and business information</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            <dl className="divide-y divide-white/10">
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:px-6">
                <dt className="font-semibold text-white">Business name</dt>
                <dd>Urechem Chemicals</dd>
              </div>
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:px-6">
                <dt className="font-semibold text-white">Business address</dt>
                <dd>002 SF, MU II, Industrial Road, Gautam Buddha Nagar, Uttar Pradesh 201310, India</dd>
              </div>
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:px-6">
                <dt className="font-semibold text-white">GSTIN</dt>
                <dd>09CFUPC8658F1ZT</dd>
              </div>
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:px-6">
                <dt className="font-semibold text-white">PAN</dt>
                <dd>CFUPC8658F</dd>
              </div>
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:px-6">
                <dt className="font-semibold text-white">Telephone</dt>
                <dd>+91 88821 32954</dd>
              </div>
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:px-6">
                <dt className="font-semibold text-white">Website</dt>
                <dd>urechem-website.vercel.app</dd>
              </div>
            </dl>
          </div>
          <p className="mt-4">
            Commercial, technical, privacy and website enquiries may be submitted through the{" "}
            <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/contact">
              official contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">2. Copyright</h2>
          <p className="mt-3">© 2026 Urechem Chemicals. All rights reserved.</p>
          <p className="mt-3">
            Unless otherwise stated, the website structure, text, graphics, layouts, software, illustrations, original
            photographs, downloadable materials and other original content are owned by or licensed to Urechem Chemicals.
            They may not be copied, modified, republished, transmitted, distributed or commercially exploited without prior
            written permission, except where permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">3. Trademarks and product names</h2>
          <p className="mt-3">
            Urechem, Urechem Chemicals, UreShield and associated names, marks, logos and visual identifiers are trademarks,
            trade names or commercial identifiers of their respective owners. Other product or company names displayed on
            the website may belong to third parties. Their appearance does not grant a licence or imply endorsement beyond
            the relationship expressly stated.
          </p>
          <p className="mt-3">
            A registered-trademark symbol should be interpreted as applying only where the relevant mark is validly
            registered in the applicable jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">4. Product-safety notice</h2>
          <p className="mt-3">
            Chemical products must be used only for appropriate and documented purposes. Before storage, handling,
            processing, transport, application or disposal, users must obtain and review the latest applicable Safety Data
            Sheet, Technical Data Sheet, product label and written instructions.
          </p>
          <p className="mt-3">
            Users are responsible for suitable training, ventilation, protective equipment, emergency measures, workplace
            controls, compatibility testing, application trials and compliance with applicable health, safety,
            environmental, transport and disposal requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">5. Technical-information notice</h2>
          <p className="mt-3">
            Website content is intended for preliminary product discovery and technical discussion. Performance statements,
            application pathways, product-family relationships, comparisons and examples may not account for every
            formulation, substrate, process, environmental condition or end-use requirement.
          </p>
          <p className="mt-3">
            Current product specifications, availability, packaging, pricing, compliance status and application suitability
            must be confirmed directly with Urechem. The latest officially issued TDS, SDS, written quotation, order
            confirmation, specification and project-specific written guidance take priority over general website content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">6. AI and automated-content notice</h2>
          <p className="mt-3">
            AI-assisted tools on this website provide preliminary guidance only. Automated output may be inaccurate,
            incomplete or unsuitable for a particular application. It is not a final engineering decision, formulation
            instruction, safety approval, quotation, warranty or binding statement by Urechem.
          </p>
          <p className="mt-3">
            Important outputs must be verified against current official documents and reviewed by an authorised Urechem
            representative before purchase, testing, production or commercial use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">7. Quotations, orders and official communications</h2>
          <p className="mt-3">
            Website forms, automated responses, document downloads and general emails do not by themselves create a binding
            sale or service contract. Commercial commitments are valid only when confirmed through an authorised written
            quotation, order confirmation, invoice or agreement.
          </p>
          <p className="mt-3">
            Customers should verify payment instructions and bank details against a current official Urechem commercial
            document before transferring funds. Urechem is not responsible for payment made to substituted or fraudulent
            account details that were not independently verified through an official contact channel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">8. Accuracy and changes</h2>
          <p className="mt-3">
            Reasonable efforts are made to maintain accurate and useful information. However, website content may contain
            errors, omissions or outdated material. Urechem may correct, replace, suspend or remove content, products,
            documents or functionality without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">9. External links and third-party content</h2>
          <p className="mt-3">
            External links are provided for convenience. Urechem does not control and is not responsible for third-party
            websites, availability, accuracy, security, products, services or privacy practices. Access to an external site
            is at the user&apos;s own discretion and subject to that provider&apos;s terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">10. Reporting errors, infringement or security concerns</h2>
          <p className="mt-3">
            To report inaccurate content, suspected misuse of Urechem materials, an intellectual-property concern or a
            website-security issue, use the{" "}
            <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/contact">
              official contact pathway
            </Link>{" "}
            and provide enough information for the issue to be reviewed.
          </p>
        </section>

        <section className="border-t border-white/10 pt-8">
          <h2 className="text-2xl font-semibold text-white">Related policies</h2>
          <p className="mt-3">
            Use of this website is also governed by the{" "}
            <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/terms">
              Terms of Use
            </Link>{" "}
            and the{" "}
            <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
