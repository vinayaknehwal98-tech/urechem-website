import { Container } from "@/components/ui/container";

export const metadata = { title: "About Urechem | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">About Urechem</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Urechem is positioned as a polyurethane and specialty-chemical solutions partner for application problem-solving, formulation development, implementation support, quality validation and supply.</p>
    </Container>
  );
}
