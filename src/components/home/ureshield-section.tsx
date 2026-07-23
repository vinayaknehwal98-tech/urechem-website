import Link from "next/link";
import { ArrowUpRight, Droplets, ShieldCheck } from "lucide-react";
import { ureshieldProducts } from "@/data/ureshield";
import { HomeSection } from "./home-section";

export function UreShieldSection() {
  return (
    <HomeSection
      className="bg-[linear-gradient(180deg,#071a2d,#0b2840)]"
      eyebrow="Waterproofing, grouting and polyurea"
      id="ureshield"
      intro="UreShield combines polyurethane membranes, injection-grouting systems and polyurea coatings for waterproofing, consolidation, water control and surface protection."
      title="UreShield systems built around demanding construction conditions."
    >
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <article className="relative overflow-hidden rounded-[var(--radius-lg)] border border-cyan-200/20 bg-blue-950 p-7 text-white shadow-[0_24px_80px_rgba(7,26,45,0.28)] sm:p-9">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-cyan-200/20" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
          <ShieldCheck aria-hidden="true" className="relative h-9 w-9 text-cyan-200" />
          <p className="relative mt-7 text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">URESHIELD</p>
          <h3 className="relative mt-3 text-3xl font-black leading-tight sm:text-4xl">Seamless protection. Controlled injection. Technical validation.</h3>
          <p className="relative mt-5 max-w-xl leading-7 text-slate-200">
            Explore single- and two-component PU membranes, specialist grouting products and high-performance polyurea coatings adapted from the supplied reference range through page 62.
          </p>
          <Link
            className="relative mt-8 inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-cyan-200/55 bg-cyan-300 px-5 py-3 font-bold text-navy-950 transition hover:bg-white"
            href="/products/ureshield-waterproofing-grouting-systems"
          >
            Explore UreShield
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {ureshieldProducts.map((product) => (
            <article className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-5 shadow-[0_14px_45px_rgba(0,0,0,0.14)]" key={product.slug}>
              <div className="flex items-start justify-between gap-4">
                <Droplets aria-hidden="true" className="h-6 w-6 text-blue-700" />
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-blue-800">
                  {product.category}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-black text-blue-950">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{product.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
