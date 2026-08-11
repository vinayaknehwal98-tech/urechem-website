import { Suspense } from "react";
import { Mail, Phone } from "lucide-react";
import { ContactEnquiryForm } from "@/components/contact/contact-enquiry-form";
import { AnimatedImage } from "@/components/media/animated-image";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Contact" };

const URECHEM_PHONE = "+91-8882132954";
const URECHEM_EMAIL = "sales@urechem.co.in";

export default function Page() {
  return (
    <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
      <Container>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Urechem Chemicals</p>
        <h1 className="mt-4 text-4xl font-black text-blue-950 sm:text-5xl">Contact Urechem</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Submit a structured enquiry so the Urechem team can route your request to the right commercial or technical consultant.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            className="group rounded-[var(--radius-md)] border border-blue-200 bg-white p-5 shadow-[0_12px_34px_rgba(30,64,175,0.07)] transition hover:-translate-y-0.5 hover:border-blue-300"
            href={`tel:${URECHEM_PHONE.replace(/[^+0-9]/g, "")}`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-700">
                <Phone aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">Call Urechem</p>
                <p className="mt-1 font-bold text-blue-950">{URECHEM_PHONE}</p>
              </div>
            </div>
          </a>
          <a
            className="group rounded-[var(--radius-md)] border border-blue-200 bg-white p-5 shadow-[0_12px_34px_rgba(30,64,175,0.07)] transition hover:-translate-y-0.5 hover:border-blue-300"
            href={`mailto:${URECHEM_EMAIL}`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-700">
                <Mail aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">Email Urechem</p>
                <p className="mt-1 break-all font-bold text-blue-950">{URECHEM_EMAIL}</p>
              </div>
            </div>
          </a>
        </div>

        <AnimatedImage
          alt="Technical consultants discussing project requirements in a structured meeting"
          className="mt-10 h-72 sm:h-80"
          imageClassName="object-center"
          sizes="100vw"
          src="https://images.unsplash.com/photo-1758518727929-4506fc031e1c?auto=format&fit=crop&fm=jpg&q=82&w=1900"
        />

        <Suspense
          fallback={
            <div className="mt-10 min-h-96 animate-pulse rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_18px_55px_rgba(30,64,175,0.09)]" />
          }
        >
          <ContactEnquiryForm />
        </Suspense>
      </Container>
    </section>
  );
}
