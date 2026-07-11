import { ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Expert Validation | Urechem Technical Center" };

export default function Page() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">Expert Validation</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Use this Technical Center pathway to prepare a focused request for Urechem review.</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8 rounded-lg border border-white/10 bg-navy-900 p-6">
        <p className="text-slate-300">Document types may include TDS, SDS, COA, compliance and processing guides. Contact Urechem for current document availability.</p>
      </div>
    </Container>
  );
}
