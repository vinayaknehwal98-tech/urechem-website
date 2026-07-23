import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Privacy policy</h1>
      <div className="mt-8 max-w-4xl space-y-8 text-base leading-8 text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-white">Information you choose to provide</h2>
          <p className="mt-3">The enquiry tools collect only the details you enter, such as your name, email address, mobile number, requested product and technical context. The site prepares this information for you to review, copy, download or send through an approved contact channel.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Browser storage</h2>
          <p className="mt-3">A small browser-storage flag may remember that you dismissed the consultation prompt. It does not contain your contact details or technical enquiry content.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Technical enquiries</h2>
          <p className="mt-3">Information sent to Urechem should be limited to what is necessary for the commercial or technical review. Do not submit passwords, payment-card details or confidential information that is not required for the enquiry.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Your choices</h2>
          <p className="mt-3">You may leave optional fields blank, continue browsing without using the enquiry tools, and request follow-up through the contact pathway. This policy will be updated if analytics, cookies or additional data-processing services are introduced.</p>
        </section>
      </div>
    </Container>
  );
}
