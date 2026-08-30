import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "Privacy Policy",
  description: "Information about how Urechem Chemicals handles personal data.",
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
          Urechem Chemicals respects the privacy of visitors, customers and business contacts. This policy explains how
          information may be handled when you browse this website, contact us, request documents, submit a technical
          requirement or use an AI-assisted product-discovery tool.
        </p>
      </header>

      <nav aria-label="Privacy policy contents" className="mt-10 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Contents</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {contents.map(([letter, label, id]) => (
            <li key={id}>
              <a className="group flex h-full gap-3 rounded-2xl border border-white/10 bg-slate-950/20 p-4 text-sm leading-6 text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.05] hover:text-white" href={`#${id}`}>
                <span className="font-black text-cyan-200">{letter}.</span><span>{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12 max-w-4xl space-y-14 text-base leading-8 text-slate-300">
        <section className="scroll-mt-28" id="controller">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">A.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Who is responsible for processing your information?</h2>
          <p className="mt-4">The website is operated by Urechem Chemicals, which determines why and how personal information submitted through this website is used.</p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="font-semibold text-white">Urechem Chemicals</p>
            <p className="mt-2">India business address: 002 SF, MU II, Industrial Road</p>
            <p>Gautam Buddha Nagar, Uttar Pradesh 201310, India</p>
            <p className="mt-2">U.S. headquarters: 212 N. 2nd St. STE 100</p>
            <p>Richmond, Kentucky 40475, USA</p>
            <p className="mt-2">Telephone: <a className="font-medium text-cyan-100 underline underline-offset-4" href="tel:+918882132954">+91 88821 32954</a></p>
            <p className="mt-2">Email: <a className="font-medium text-cyan-100 underline underline-offset-4" href="mailto:sales@urechem.co.in">sales@urechem.co.in</a></p>
            <p className="mt-2">GSTIN: 09CFUPC8658F1ZT</p>
            <p className="mt-2">PAN: CFUPC8658F</p>
            <p className="mt-2">Privacy questions and requests may be submitted through the <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/contact">contact page</Link>.</p>
          </div>
        </section>

        <section className="scroll-mt-28" id="processing">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">B.</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">What information do we process, why and for how long?</h2>
          <p className="mt-4">The information processed depends on how you interact with the website. We use it only for lawful and reasonably necessary business, technical, security and compliance purposes.</p>
          <div className="mt-8 space-y-9">
            <article><h3 className="text-xl font-semibold text-white">1. Website access and technical logs</h3><p className="mt-3">Hosting and delivery infrastructure may automatically receive technical information such as your IP address, browser and device type, operating system, requested page or asset, referring page, date and time, access status, error information and transferred data volume. This is used to deliver content, maintain stability, diagnose errors, prevent abuse and protect the website.</p></article>
            <article><h3 className="text-xl font-semibold text-white">2. Browser storage and cookies</h3><p className="mt-3">The website may use limited essential browser storage, including session or local-storage values that remember website functionality such as whether an opening animation or consultation prompt has already been shown. Urechem does not currently describe advertising or behavioural-profiling cookies as part of this website.</p></article>
            <article><h3 className="text-xl font-semibold text-white">3. Contact forms, consultations and document requests</h3><p className="mt-3">When you contact Urechem, we may process information you choose to provide, including your name, company, job role, email address, telephone number, location, product interest, application, substrate, process conditions, performance target, message content and files intentionally supplied for review.</p><p className="mt-3">We use this information to respond to your request, provide TDS or SDS documents, discuss quotations or samples, arrange technical follow-up, prevent misuse and maintain appropriate business records. Enquiry information is retained only for as long as reasonably needed for these purposes and applicable legal or business obligations.</p></article>
            <article><h3 className="text-xl font-semibold text-white">4. AI-assisted product-discovery tools</h3><p className="mt-3">Prompts, selected options and technical context entered into AI-assisted tools may be processed to generate preliminary product-family guidance or prepare a structured enquiry. Do not enter passwords, payment-card information, identity documents, confidential formulations, trade secrets or sensitive personal information. AI output is preliminary and must be independently verified.</p></article>
            <article><h3 className="text-xl font-semibold text-white">5. Externally hosted media and links</h3><p className="mt-3">Some website media may be delivered from external content-hosting providers. Those providers may receive technical information when your browser requests their content. Urechem does not control how a separate third-party website processes information after you follow an external link.</p></article>
            <article><h3 className="text-xl font-semibold text-white">6. Commercial communication and legal records</h3><p className="mt-3">If your enquiry develops into a quotation, order, supply relationship or technical engagement, Urechem may process business-contact details, correspondence, order information, delivery records, tax information and related documentation to perform the relationship, meet legal obligations and protect legitimate business interests.</p></article>
          </div>
        </section>

        <section className="scroll-mt-28" id="required"><p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">C.</p><h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Are you required to provide information?</h2><p className="mt-4">You may browse the public website without submitting a contact or consultation form. Basic technical data is transmitted automatically because it is needed to deliver a website over the internet. Providing enquiry information is voluntary, but Urechem may be unable to answer or process a request if reasonably necessary details are not supplied.</p></section>

        <section className="scroll-mt-28" id="sharing"><p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">D.</p><h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Who may receive your information?</h2><p className="mt-4">Access is limited to Urechem personnel, representatives and departments that reasonably need the information to handle your request, provide technical or commercial support, manage an order, maintain security or satisfy a legal obligation.</p><ul className="mt-4 list-disc space-y-2 pl-6 marker:text-cyan-300"><li>Website-hosting, infrastructure, security and content-delivery providers.</li><li>Email, communication, document-delivery or customer-support service providers.</li><li>Technical consultants, testing partners, logistics providers or suppliers involved in your request.</li><li>Professional advisers, auditors, insurers or authorities where disclosure is lawful and necessary.</li><li>Another party involved in a business restructuring, subject to appropriate confidentiality safeguards.</li></ul><p className="mt-4">Urechem does not sell personal information to advertisers or data brokers. Some providers may process information outside your state or country; where applicable, reasonable safeguards will be used.</p></section>

        <section className="scroll-mt-28" id="security"><p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">E.</p><h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">How do we protect your information?</h2><p className="mt-4">Urechem uses reasonable technical and organisational measures intended to protect information against unauthorised access, misuse, alteration, accidental loss or destruction. Measures may include access controls, secure hosting, encrypted transmission where supported, restricted internal access, backups and service-provider safeguards. No internet transmission or storage system can be guaranteed to be completely secure.</p></section>

        <section className="scroll-mt-28" id="rights"><p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">F.</p><h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">What choices and rights do you have?</h2><p className="mt-4">Subject to applicable law, you may ask Urechem for information about personal data it holds concerning you, correction of inaccurate data, erasure where appropriate, withdrawal of consent for optional processing, cessation of optional marketing communication or assistance with a privacy grievance. Urechem may request reasonable information to verify your identity before acting on a request.</p></section>

        <section className="scroll-mt-28" id="complaints"><p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">G.</p><h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">How can you raise a privacy concern?</h2><p className="mt-4">Contact Urechem first so that the concern can be reviewed and addressed through its grievance process:</p><div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"><p className="font-semibold text-white">Privacy and grievance contact</p><p className="mt-2">Urechem Chemicals</p><p>002 SF, MU II, Industrial Road</p><p>Gautam Buddha Nagar, Uttar Pradesh 201310, India</p><p className="mt-2">U.S. headquarters: 212 N. 2nd St. STE 100, Richmond, Kentucky 40475, USA</p><p className="mt-2">Telephone: <a className="text-cyan-100 underline underline-offset-4" href="tel:+918882132954">+91 88821 32954</a></p><p className="mt-2">Email: <a className="text-cyan-100 underline underline-offset-4" href="mailto:sales@urechem.co.in">sales@urechem.co.in</a></p><p className="mt-2">Online: <Link className="text-cyan-100 underline underline-offset-4" href="/contact">Contact Urechem Chemicals</Link></p></div></section>

        <section className="scroll-mt-28" id="minors"><p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">H.</p><h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">How do we handle information relating to minors?</h2><p className="mt-4">This website is intended for businesses, technical professionals and adults. Urechem does not knowingly request personal information from children through the website. If Urechem becomes aware that a child has submitted personal information without appropriate authorisation, it will take reasonable steps to stop unnecessary processing and delete the information where legally permitted.</p></section>

        <section className="border-t border-white/10 pt-9"><h2 className="text-2xl font-semibold text-white">Changes to this policy</h2><p className="mt-3">This policy may be updated when website features, service providers, business processes or legal requirements change. The revised effective date will appear at the top of this page.</p></section>
      </div>
    </Container>
  );
}
