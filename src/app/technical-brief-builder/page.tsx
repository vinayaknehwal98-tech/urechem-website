import { ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Technical Brief Builder | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">Technical brief builder</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Organize application context, process conditions and performance goals into a concise brief for Urechem review.</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-6"><p className="text-slate-200">Enter application, substrate, process, performance goal and constraints to create a preliminary brief for Urechem review.</p></div>
    </Container>
  );
}
