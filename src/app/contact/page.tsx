import { Container } from "@/components/ui/container";

const enquiryTypes = ["General enquiry", "Sample request", "Quotation request", "Site visit request", "Consultation request"] as const;

export const metadata = { title: "Contact | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">Contact Urechem</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Submit a structured enquiry so the Urechem team can route your request to the right commercial or technical contact.</p>
      <form className="mt-8 grid gap-4 rounded-lg border border-white/10 bg-navy-900 p-6">
        <label>
          Enquiry type
          <select className="mt-2 w-full rounded-md bg-navy-800 p-3">
            {enquiryTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <label>Name<input className="mt-2 w-full rounded-md bg-navy-800 p-3" /></label>
        <label>Technical context<textarea className="mt-2 min-h-32 w-full rounded-md bg-navy-800 p-3" /></label>
        <button className="rounded-md bg-cyan-300 px-5 py-3 font-semibold text-navy-950" type="button">Prepare enquiry brief</button>
      </form>
    </Container>
  );
}
