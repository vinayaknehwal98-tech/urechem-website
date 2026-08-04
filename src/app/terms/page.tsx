import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Urechem Chemicals website, AI tools, product information and enquiry pathways.",
};

const effectiveDate = "4 August 2026";

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Legal</SectionLabel>
      <div className="mt-5 max-w-4xl">
        <h1 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Terms of use</h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
          Effective and last updated: {effectiveDate}
        </p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          These terms govern access to and use of the Urechem Chemicals website, including product information,
          document-request pathways, consultation forms, the AI Solution Finder and Ask Urechem AI.
        </p>
      </div>

      <div className="mt-10 max-w-4xl space-y-10 text-base leading-8 text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-white">1. Acceptance of these terms</h2>
          <p className="mt-3">
            By accessing or using this website, you agree to these Terms of Use and the applicable Privacy Policy. If you do
            not agree, you should stop using the website. Separate written quotations, order confirmations, invoices,
            product documents or agreements may contain additional commercial terms. Where those specific written terms
            conflict with these website terms, the specific written terms will apply to that transaction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">2. Website purpose</h2>
          <p className="mt-3">
            The website is a business and technical-information resource for polyurethane systems, specialty chemicals,
            application pathways and related support. It is intended to help users identify areas for further discussion
            with Urechem. Website content is not a substitute for project-specific evaluation, testing, professional advice
            or written approval.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">3. Product and technical information</h2>
          <p className="mt-3">
            Product descriptions, comparisons, application pathways, performance statements and technical explanations are
            general and preliminary. Suitability may depend on formulation, substrate, equipment, processing conditions,
            environment, storage, installation method, end-use requirements and applicable standards.
          </p>
          <p className="mt-3">
            Users are responsible for conducting appropriate trials, compatibility checks and validation before purchase,
            specification, production or commercial use. No website statement should be treated as a guaranteed result or
            final engineering approval unless confirmed in a current written document issued by an authorised Urechem
            representative.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">4. SDS, TDS and safe use</h2>
          <p className="mt-3">
            Products must be stored, handled, processed, transported and disposed of only in accordance with the latest
            applicable Safety Data Sheet, Technical Data Sheet, product label, written instructions, workplace-safety
            requirements and applicable law. The latest officially issued SDS, TDS, specification, order confirmation and
            written technical guidance take priority over general website content.
          </p>
          <p className="mt-3">
            Website users must ensure that trained personnel, suitable protective equipment, ventilation, emergency
            procedures and legally required controls are in place before handling chemical products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">5. AI-assisted results</h2>
          <p className="mt-3">
            The AI Solution Finder and Ask Urechem AI may generate preliminary product-family suggestions, summaries or
            enquiry briefs. Automated output can be incomplete, incorrect or unsuitable for a specific application. It does
            not constitute a formulation instruction, safety approval, quotation, warranty, purchase recommendation or
            binding commitment by Urechem.
          </p>
          <p className="mt-3">
            Users should not submit confidential formulas, trade secrets or sensitive personal information. Any important
            result must be checked against current product documentation and reviewed by an authorised Urechem technical
            representative.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">6. Enquiries are not contracts</h2>
          <p className="mt-3">
            Submitting a contact form, requesting a consultation, downloading information, receiving an automated result or
            requesting a TDS/SDS does not create a purchase contract, distributorship, agency, exclusivity arrangement,
            technical-service agreement or other binding commercial relationship.
          </p>
          <p className="mt-3">
            A commercial transaction becomes binding only when accepted or confirmed in writing by an authorised Urechem
            representative in accordance with the applicable quotation, order confirmation, invoice or separate written
            agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">7. Quotations, orders and sale conditions</h2>
          <p className="mt-3">
            Unless otherwise stated in writing, quotations may be limited in validity and may be changed before acceptance
            where raw-material, packaging, freight, energy, tax, duty, insurance, currency or supply conditions change.
            Purchase orders should be submitted in writing and remain subject to Urechem&apos;s written acceptance or order
            confirmation.
          </p>
          <p className="mt-3">
            Delivery dates are estimates unless expressly guaranteed in writing. Delivery may depend on availability of raw
            materials, transport, compliance documentation, payment status and events beyond reasonable control. Any
            quantity tolerance, freight, taxes, payment schedule, Incoterm, delivery location or special condition shown in
            the relevant quotation, order confirmation or invoice forms part of that transaction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">8. Payment, title and risk</h2>
          <p className="mt-3">
            Prices, GST, freight, advance requirements, credit periods and payment instructions are those stated in the
            applicable commercial document. To the extent permitted by law and unless otherwise agreed in writing, products
            may remain the property of Urechem until all amounts due for the relevant transaction have been paid in full,
            while risk may transfer in accordance with the agreed delivery terms.
          </p>
          <p className="mt-3">
            Bank details must be verified against an official Urechem quotation or invoice before payment. Users should not
            rely on bank details copied from an unofficial message or third-party source.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">9. Inspection, defects and returns</h2>
          <p className="mt-3">
            Customers should inspect deliveries promptly for visible damage, incorrect quantity or other apparent issues
            and notify Urechem in writing without unreasonable delay. Latent defects should be reported promptly after
            discovery with supporting details. Products must not be returned, destroyed, reworked or rejected without prior
            written authorisation from Urechem, except where mandatory law provides otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">10. Intellectual property</h2>
          <p className="mt-3">
            Website text, graphics, layouts, software, documents, product names, trademarks, trade names, logos, photographs,
            technical materials and other content are owned by or licensed to Urechem or their respective owners. Access to
            the website does not grant a licence to copy, reproduce, modify, republish, distribute, reverse engineer or use
            those materials commercially without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">11. Acceptable use</h2>
          <p className="mt-3">You must not:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-cyan-300">
            <li>Use the website for unlawful, fraudulent, harmful or misleading activity.</li>
            <li>Attempt to gain unauthorised access to the website, servers, forms, accounts or connected systems.</li>
            <li>Upload malicious code, disrupt availability, scrape at an unreasonable rate or bypass security controls.</li>
            <li>Misrepresent your identity, authority, organisation or intended use of a product.</li>
            <li>Use automated output as final safety, regulatory, medical or engineering approval.</li>
            <li>Copy substantial website content or product documents for unauthorised commercial reuse.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">12. Availability and external services</h2>
          <p className="mt-3">
            Urechem may update, correct, suspend or remove website content or functionality without notice. The website may
            contain links to external websites or rely on third-party hosting, communications or document services. Urechem
            does not control third-party content, availability, security or privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">13. Warranties and liability</h2>
          <p className="mt-3">
            The website is provided on an availability basis. While reasonable efforts are made to keep information useful
            and accurate, Urechem does not guarantee that website content is complete, current, error-free or suitable for a
            particular application. Product warranties, if any, are limited to those expressly stated in the applicable
            written commercial and product documents.
          </p>
          <p className="mt-3">
            To the extent permitted by applicable law, Urechem is not responsible for indirect, incidental or consequential
            loss arising solely from reliance on preliminary website content, automated output, interrupted access or an
            unauthorised third-party service. Nothing in these terms excludes liability that cannot lawfully be excluded.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">14. Compliance</h2>
          <p className="mt-3">
            Users and customers must comply with applicable product-safety, environmental, labour, anti-bribery,
            anti-corruption, anti-money-laundering, GST, import, export, sanctions and controlled-substance requirements.
            Urechem may request information or documentation reasonably required for compliance and may decline or suspend a
            transaction where legal, safety, payment or compliance concerns arise.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">15. Force majeure</h2>
          <p className="mt-3">
            Urechem will not be responsible for delay or failure caused by events beyond reasonable control, including
            natural disasters, fire, flood, epidemic, civil disturbance, strike, governmental action, import or export
            restriction, transport disruption, equipment failure, raw-material shortage, utility interruption or supplier
            delay. Obligations may be suspended for the duration reasonably required to address the event.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">16. Governing law and disputes</h2>
          <p className="mt-3">
            These website terms are governed by the laws of India. Any transaction-specific dispute will be handled under
            the governing-law and jurisdiction clause stated in the applicable quotation, order confirmation, invoice or
            written agreement. Where no specific clause applies, jurisdiction will be determined under applicable Indian
            law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">17. Changes to these terms</h2>
          <p className="mt-3">
            Urechem may update these terms when the website, product range, commercial processes or legal requirements
            change. The revised effective date will be shown at the top of this page. Continued use after an update means
            that the revised website terms apply to subsequent use.
          </p>
        </section>

        <section className="border-t border-white/10 pt-8">
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="mt-3">
            Questions about these terms may be sent through the{" "}
            <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/contact">
              Urechem contact page
            </Link>{" "}
            or by telephone at +91 88821 32954.
          </p>
        </section>
      </div>
    </Container>
  );
}
