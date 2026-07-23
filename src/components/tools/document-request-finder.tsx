"use client";

import Link from "next/link";
import { FileSearch, FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { productFamilies, products } from "@/data/catalog";

const documentTypes = ["TDS", "SDS", "COA", "Compliance", "Processing guide"] as const;

function familyName(slug: string) {
  return productFamilies.find((family) => family.slug === slug)?.name ?? slug;
}

export function DocumentRequestFinder() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [documentType, setDocumentType] = useState(searchParams.get("type") ?? "TDS");

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products
      .filter((product) => {
        const searchable = `${product.name} ${product.description} ${familyName(product.familySlug)}`.toLowerCase();
        return !normalized || searchable.includes(normalized);
      })
      .slice(0, 12);
  }, [query]);

  return (
    <section className="mt-8 rounded-[var(--radius-lg)] border border-white/10 bg-navy-900/80 p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <label className="grid gap-2 text-sm font-semibold text-cyan-50">
          Product or family
          <span className="relative">
            <FileSearch aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-cyan-200" />
            <input
              className="h-12 w-full rounded-[var(--radius-md)] border border-white/12 bg-navy-950/72 pl-12 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-200 focus:ring-4 focus:ring-cyan-300/12"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search GT 40, PMDI 2401, KlayOl..."
              type="search"
              value={query}
            />
          </span>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-cyan-50">
          Document type
          <select
            className="h-12 rounded-[var(--radius-md)] border border-white/12 bg-navy-950/72 px-3 text-white outline-none focus:border-cyan-200"
            onChange={(event) => setDocumentType(event.target.value)}
            value={documentType}
          >
            {documentTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-slate-400">
        {matches.length} matching {matches.length === 1 ? "product" : "products"}. Availability is confirmed after request.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {matches.map((product) => (
          <article className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.04] p-4" key={`${product.familySlug}:${product.slug}`}>
            <FileText aria-hidden="true" className="size-5 text-cyan-200" />
            <h2 className="mt-3 font-semibold text-white">{product.name}</h2>
            <p className="mt-1 text-sm text-slate-400">{familyName(product.familySlug)}</p>
            <Link
              className="mt-4 inline-flex min-h-10 items-center justify-center rounded-[var(--radius-button)] border border-cyan-300/70 bg-cyan-300/10 px-4 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300 hover:text-navy-950"
              href={`/contact?type=${encodeURIComponent(`${documentType} request`)}&product=${encodeURIComponent(product.name)}&context=${encodeURIComponent(`Please confirm availability of the ${documentType} for ${product.name}.`)}`}
            >
              Request {documentType}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
