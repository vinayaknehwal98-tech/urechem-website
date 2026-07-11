import { ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Ask Urechem AI | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">Ask Urechem AI</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Prepare focused questions for Urechem technical review using guided prompts and clear validation boundaries.</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-6"><p className="text-slate-200">Enter application, substrate, process, performance goal and constraints to create a preliminary brief for Urechem review.</p></div>
    </Container>
  );
}
