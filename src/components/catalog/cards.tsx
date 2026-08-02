import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { applications, industries, productFamilies, type ProductFamily } from "@/data/catalog";

export function ValidationNote() {
  return null;
}

export function FamilyCard({ family }: { family: ProductFamily }) {
  return (
    <article className="rounded-[var(--radius-lg)] border border-blue-100 bg-white p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_18px_48px_rgba(30,64,175,0.14)] focus-within:border-blue-400">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">{family.shortName}</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-950">{family.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{family.positioning}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {family.products.slice(0, 6).map((product) => (
          <Link
            key={product.slug}
            href={`/products/${family.slug}/${product.slug}`}
            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-blue-400 hover:bg-blue-100 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {product.name}
          </Link>
        ))}
      </div>
      <Link
        href={`/products/${family.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        View family <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}

export function DocumentStatus() {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-4">
      <h3 className="flex items-center gap-2 font-semibold text-slate-950">
        <FileText className="size-4 text-blue-700" />
        Document status
      </h3>
      <p className="mt-2 text-sm text-slate-700">Technical documents are not published online. Contact Urechem for current document availability.</p>
    </div>
  );
}

function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "cyan" | "neutral" }) {
  const className = tone === "cyan"
    ? "rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800"
    : "rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700";
  return <span className={className}>{children}</span>;
}

export function FamilyLinks({ slugs }: { slugs: string[] }) {
  const resolved = slugs.map((slug) => productFamilies.find((item) => item.slug === slug)).filter((family): family is ProductFamily => Boolean(family));
  if (resolved.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {resolved.map((family) => (
        <Link
          key={family.slug}
          href={`/products/${family.slug}`}
          className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 transition hover:border-blue-400 hover:bg-blue-100 hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {family.shortName}
        </Link>
      ))}
    </div>
  );
}

export function FamilyTags({ slugs }: { slugs: string[] }) {
  const resolved = slugs.map((slug) => productFamilies.find((item) => item.slug === slug)).filter((family): family is ProductFamily => Boolean(family));
  if (resolved.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {resolved.map((family) => <Tag key={family.slug} tone="cyan">{family.shortName}</Tag>)}
    </div>
  );
}

export function AppLinks({ slugs }: { slugs: string[] }) {
  const resolved = slugs.map((slug) => applications.find((item) => item.slug === slug)).filter((application): application is (typeof applications)[number] => Boolean(application));
  if (resolved.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {resolved.map((application) => (
        <Link
          key={application.slug}
          href={`/applications/${application.slug}`}
          className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {application.name}
        </Link>
      ))}
    </div>
  );
}

export function AppTags({ slugs }: { slugs: string[] }) {
  const resolved = slugs.map((slug) => applications.find((item) => item.slug === slug)).filter((application): application is (typeof applications)[number] => Boolean(application));
  if (resolved.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {resolved.map((application) => <Tag key={application.slug}>{application.name}</Tag>)}
    </div>
  );
}

export function IndustryLinks({ slugs }: { slugs: string[] }) {
  const resolved = slugs.map((slug) => industries.find((item) => item.slug === slug)).filter((industry): industry is (typeof industries)[number] => Boolean(industry));
  if (resolved.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {resolved.map((industry) => (
        <Link
          key={industry.slug}
          href={`/industries/${industry.slug}`}
          className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {industry.name}
        </Link>
      ))}
    </div>
  );
}
