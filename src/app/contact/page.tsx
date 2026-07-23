import { Suspense } from "react";
import { ContactEnquiryForm } from "@/components/contact/contact-enquiry-form";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Contact | Urechem Chemicals" };

export default function Page() {
  return (
    <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
      <Container>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Urechem Chemicals</p>
        <h1 className="mt-4 text-4xl font-black text-blue-950 sm:text-5xl">Contact Urechem</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Submit a structured enquiry so the Urechem team can route your request to the right commercial or technical consultant.
        </p>

        <Suspense
          fallback={
            <div className="mt-8 min-h-96 animate-pulse rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_18px_55px_rgba(30,64,175,0.09)]" />
          }
        >
          <ContactEnquiryForm />
        </Suspense>
      </Container>
    </section>
  );
}
