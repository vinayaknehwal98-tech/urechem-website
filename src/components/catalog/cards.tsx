import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, FileText, ShieldAlert } from "lucide-react";
import { applications, industries, productFamilies, type ProductFamily } from "@/data/catalog";

export function ValidationNote() {
  return (
    <p className="rounded-md border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
      <ShieldAlert className="mr-2 inline size-4" />
      Final product selection requires review by qualified Urechem technical stakeholders.
    </p>
  );
}

export function FamilyCard({ family }: { family: ProductFamily }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-[var(--shadow-soft)]">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">{family.shortName}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{family.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{family.positioning}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {family.products.slice(0, 6).map((product) => (
          <Link key={product.slug} href={`/products/${family.slug}/${product.slug}`} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200 hover:border-cyan-300">
            {product.name}
          </Link>
        ))}
      </div>
      <Link href={`/products/${family.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
        View family <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}

export function DocumentStatus() {
  return (
    <div className="rounded-lg border border-white/10 bg-navy-900 p-4">
      <h3 className="flex items-center gap-2 font-semibold">
        <FileText className="size-4 text-cyan-300" />
        Document status
      </h3>
      <p className="mt-2 text-sm text-slate-300">Technical documents are not published online. Contact Urechem for current document availability.</p>
    </div>
  );
}

function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "cyan" | "neutral" }) {
  const className = tone === "cyan" ? "rounded-full bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100" : "rounded-full bg-white/10 px-3 py-1 text-sm text-slate-100";
  return <span className={className}>{children}</span>;
}

export function FamilyLinks({ slugs }: { slugs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {slugs.map((slug) => {
        const family = productFamilies.find((item) => item.slug === slug);
        return family ? (
          <Link key={slug} href={`/products/${slug}`} className="rounded-full bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
            {family.shortName}
          </Link>
        ) : null;
      })}
    </div>
  );
}

export function FamilyTags({ slugs }: { slugs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {slugs.map((slug) => {
        const family = productFamilies.find((item) => item.slug === slug);
        return family ? <Tag key={family.slug} tone="cyan">{family.shortName}</Tag> : null;
      })}
    </div>
  );
}

export function AppLinks({ slugs }: { slugs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {slugs.map((slug) => {
        const application = applications.find((item) => item.slug === slug);
        return application ? (
          <Link key={slug} href={`/applications/${slug}`} className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-100">
            {application.name}
          </Link>
        ) : null;
      })}
    </div>
  );
}

export function AppTags({ slugs }: { slugs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {slugs.map((slug) => {
        const application = applications.find((item) => item.slug === slug);
        return application ? <Tag key={application.slug}>{application.name}</Tag> : null;
      })}
    </div>
  );
}

export function IndustryLinks({ slugs }: { slugs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {slugs.map((slug) => {
        const industry = industries.find((item) => item.slug === slug);
        return industry ? (
          <Link key={slug} href={`/industries/${slug}`} className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-100">
            {industry.name}
          </Link>
        ) : null;
      })}
    </div>
  );
}
