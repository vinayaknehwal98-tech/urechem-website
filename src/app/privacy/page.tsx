import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Detailed information about how Urechem Chemicals collects, uses, stores, shares and protects personal data.",
};

const effectiveDate = "4 August 2026";

const contents = [
  ["A", "Who is responsible for processing your information?", "controller"],
  ["B", "What information do we process, why and for how long?", "processing"],
  ["C", "Are you required to provide information?", "required"],
  ["D", "Who may receive your information?", "sharing"],
  ["E", "How do we protect your information?", "security"],
  ["F", "What choices and rights do you have?", "rights"],
  ["G", "How can you raise a privacy concern?", "complaints"],
  ["H", "How do we handle information relating to minors?", "minors"],
] as const;

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Legal</SectionLabel>

      <header className="mt-5 max-w-4xl">
        <h1 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Privacy policy</h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
          Effective and last updated: {effectiveDate}
        </p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          Urechem Chemicals respects the privacy of visitors, customers and business contacts. This policy explains in
          detail how information may be handled when you browse this website, contact us, request documents, submit a
          technical requirement or use an AI-assisted product-discovery tool.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
          This policy is intended to reflect the website&apos;s current functions and applicable Indian data-protection
          requirements as they come into force. It does not describe unrelated processing carried out by a third-party
          website after you leave Urechem&apos;s site.
        </p>
      </header>

      <nav
        aria-label="Privacy policy contents"
        className="mt-10 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7"
      >
        <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Contents</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {contents.map(([letter, label, id]) => (
            <li key={id}>
              <a
                className="group flex h-full gap-3 rounded-2xl border border-white/10 bg-slate-950/20 p-4 text-sm leading-6 text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                href={`#${id}`}
              >
                <span className="font-black text-cyan-200">{letter}.</span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12 max-w-4xl space-y-14 text-base leading-8 text-slate-300">
        <section className="scroll-mt-28" id="controller">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">A.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Who is responsible for processing your information?
          </h2>
          <p className="mt-4">
            The website is operated by Urechem Chemicals, which determines why and how personal information submitted
            through this website is used.
          </p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="font-semibold text-white">Urechem Chemicals</p>
            <p className="mt-2">002 SF, MU II, Industrial Road</p>
            <p>Gautam Buddha Nagar, Uttar Pradesh 201310, India</p>
            <p className="mt-2">Telephone: +91 88821 32954</p>
            <p className="mt-2">GSTIN: 09CFUPC8658F1ZT</p>
            <p className="mt-2">
              Privacy questions and requests may be submitted through the{" "}
              <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/contact">
                contact page
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="scroll-mt-28" id="processing">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">B.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            What information do we process, why and for how long?
          </h2>
          <p className="mt-4">
            The information processed depends on how you interact with the website. We use it only for lawful and
            reasonably necessary business, technical, security and compliance purposes.
          </p>

          <div className="mt-8 space-y-9">
            <article>
              <h3 className="text-xl font-semibold text-white">1. Website access and technical logs</h3>
              <p className="mt-3">
                When you open the website, the hosting and delivery infrastructure may automatically receive technical
                information such as your IP address, browser and device type, operating system, requested page or asset,
                referring page, date and time, access status, error information and transferred data volume.
              </p>
              <p className="mt-3">
                This information is used to deliver the requested content, maintain website stability, diagnose errors,
                prevent abuse and protect the website. Technical logs are normally retained only for the operational or
                security period applied by the relevant hosting provider, unless a longer period is required to investigate
                misuse, comply with law or establish, exercise or defend legal claims.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-semibold text-white">2. Browser storage and cookies</h3>
              <p className="mt-3">
                The website currently uses limited essential browser storage, including session or local-storage values that
                may remember whether an opening animation or consultation prompt has already been shown. These values are
                used for website functionality and are not intended to store your contact details or technical enquiry.
              </p>
              <p className="mt-3">
                Urechem does not currently describe advertising or behavioural-profiling cookies as part of this website.
                If analytics, advertising or other non-essential tracking technologies are introduced, the policy and any
                required consent controls will be updated before such use.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-semibold text-white">3. Contact forms, consultations and document requests</h3>
              <p className="mt-3">
                When you contact Urechem, we may process the information you choose to provide, including your name, company,
                job role, email address, telephone number, location, product interest, application, substrate, process
                conditions, performance target, message content and any files intentionally supplied for review.
              </p>
              <p className="mt-3">
                We use this information to identify and respond to your request, provide TDS or SDS documents, discuss
                quotations or samples, arrange technical follow-up, prevent misuse and maintain appropriate business
                records. Mandatory fields, where shown, are necessary to handle the selected request; optional information
                is provided voluntarily.
              </p>
              <p className="mt-3">
                Enquiry information is kept for as long as reasonably needed to respond, manage the related business or
                technical relationship, maintain records, resolve disputes and comply with tax, safety, contractual or other
                legal obligations. It may then be deleted, anonymised or securely archived.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-semibold text-white">4. AI-assisted product-discovery tools</h3>
              <p className="mt-3">
                Prompts, selected options and technical context entered into the AI Solution Finder or Ask Urechem AI may be
                processed to generate preliminary product-family guidance or prepare a structured enquiry. The output may be
                incomplete or unsuitable and does not constitute final formulation, engineering, regulatory, safety or
                purchasing approval.
              </p>
              <p className="mt-3">
                Do not enter passwords, payment-card information, identity documents, confidential formulations, trade
                secrets or sensitive personal information. Where a service provider is required to operate an AI feature,
                information may be processed by that provider only to the extent reasonably necessary to deliver and secure
                the feature, subject to the provider&apos;s applicable safeguards and Urechem&apos;s service arrangements.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-semibold text-white">5. Externally hosted media and links</h3>
              <p className="mt-3">
                Some website images or videos may be delivered from external content-hosting providers. When your browser
                requests that media, the provider may receive technical information such as your IP address, browser data,
                requested asset, referring page and time of access. Urechem does not control how a separate third-party
                website processes information after you follow an external link.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-semibold text-white">6. Commercial communication and legal records</h3>
              <p className="mt-3">
                If your enquiry develops into a quotation, order, supply relationship or technical engagement, Urechem may
                process business-contact details, correspondence, order information, delivery records, tax information and
                related documentation to take steps requested by you, perform the commercial relationship, meet legal
                obligations and protect legitimate business interests.
              </p>
              <p className="mt-3">
                Urechem will not use contact information for unrelated promotional communication without an appropriate
                permission or other lawful basis. You may ask to stop optional promotional follow-up at any time.
              </p>
            </article>
          </div>
        </section>

        <section className="scroll-mt-28" id="required">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">C.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Are you required to provide information?
          </h2>
          <p className="mt-4">
            You may browse the public website without submitting a contact or consultation form. Basic technical data is
            nevertheless transmitted automatically because it is needed to deliver a website over the internet.
          </p>
          <p className="mt-3">
            Providing enquiry information is voluntary, but Urechem may be unable to answer, send a requested document,
            prepare a quotation or continue a technical discussion if the details reasonably required for that purpose are
            not supplied. Optional fields may be left blank.
          </p>
        </section>

        <section className="scroll-mt-28" id="sharing">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">D.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Who may receive your information?
          </h2>
          <p className="mt-4">
            Access is limited to Urechem personnel, representatives and departments that reasonably need the information to
            handle your request, provide technical or commercial support, manage an order, maintain security or satisfy a
            legal obligation.
          </p>
          <p className="mt-3">Information may also be shared with:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-cyan-300">
            <li>Website-hosting, infrastructure, security and content-delivery providers.</li>
            <li>Email, communication, document-delivery or customer-support service providers.</li>
            <li>Technical consultants, testing partners, logistics providers or suppliers involved in your request.</li>
            <li>Professional advisers, auditors, insurers or authorities where disclosure is lawful and necessary.</li>
            <li>Another party involved in a business restructuring, subject to appropriate confidentiality safeguards.</li>
          </ul>
          <p className="mt-4">
            Service providers should process information only for the agreed purpose and with safeguards appropriate to
            their role. Urechem does not sell personal information to advertisers or data brokers.
          </p>
          <p className="mt-3">
            Some providers may process information outside your state or country. Where applicable, Urechem will take
            reasonable steps to use providers and arrangements that support lawful and secure processing.
          </p>
        </section>

        <section className="scroll-mt-28" id="security">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">E.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            How do we protect your information?
          </h2>
          <p className="mt-4">
            Urechem uses reasonable technical and organisational measures intended to protect information against
            unauthorised access, misuse, alteration, accidental loss or destruction. Measures may include access controls,
            secure hosting, encrypted transmission where supported, restricted internal access, backups and service-provider
            safeguards.
          </p>
          <p className="mt-3">
            Security measures are reviewed as website functions and risks change. No internet transmission or storage system
            can be guaranteed to be completely secure, so users should avoid sending information that is not necessary for
            the request.
          </p>
        </section>

        <section className="scroll-mt-28" id="rights">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">F.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            What choices and rights do you have?
          </h2>
          <p className="mt-4">
            Subject to the law applicable at the time of your request, you may ask Urechem to provide information about the
            personal data it holds concerning you, correct inaccurate or incomplete data, erase data that is no longer
            required, withdraw consent for optional processing, stop optional marketing communication or address a privacy
            grievance.
          </p>
          <p className="mt-3">
            Applicable Indian data-protection law also provides rights relating to access, correction and erasure, grievance
            redressal and nomination as the relevant provisions come into force. A request may be limited where retention or
            processing is required by law, necessary for a contract, needed for safety or compliance records, or required to
            establish, exercise or defend legal claims.
          </p>
          <p className="mt-3">
            Urechem may ask for reasonable information to verify your identity and locate the relevant records before acting
            on a request. Privacy requests should be made through the contact details in section G.
          </p>
        </section>

        <section className="scroll-mt-28" id="complaints">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">G.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            How can you raise a privacy concern?
          </h2>
          <p className="mt-4">
            Contact Urechem first so that the concern can be reviewed and addressed through its grievance process:
          </p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="font-semibold text-white">Privacy and grievance contact</p>
            <p className="mt-2">Urechem Chemicals</p>
            <p>002 SF, MU II, Industrial Road</p>
            <p>Gautam Buddha Nagar, Uttar Pradesh 201310, India</p>
            <p className="mt-2">Telephone: +91 88821 32954</p>
            <p className="mt-2">
              Online:{" "}
              <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/contact">
                Contact Urechem Chemicals
              </Link>
            </p>
          </div>
          <p className="mt-4">
            Where a statutory complaint mechanism or competent data-protection authority is available under applicable law,
            you may also use that mechanism after giving Urechem a reasonable opportunity to resolve the grievance.
          </p>
        </section>

        <section className="scroll-mt-28" id="minors">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">H.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            How do we handle information relating to minors?
          </h2>
          <p className="mt-4">
            This website is intended for businesses, technical professionals and adults. Urechem does not knowingly request
            personal information from children through the website. If Urechem becomes aware that a child has submitted
            personal information without appropriate authorisation, it will take reasonable steps to stop unnecessary
            processing and delete the information where legally permitted.
          </p>
        </section>

        <section className="border-t border-white/10 pt-9">
          <h2 className="text-2xl font-semibold text-white">Changes to this policy</h2>
          <p className="mt-3">
            This policy may be updated when website features, service providers, business processes or legal requirements
            change. The revised effective date will appear at the top of this page. Material changes may also be highlighted
            through the website where appropriate.
          </p>
        </section>
      </div>
    </Container>
  );
}
