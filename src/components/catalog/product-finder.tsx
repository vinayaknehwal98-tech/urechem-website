"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { FamilyCard } from "@/components/catalog/cards";
import { productFamilies } from "@/data/catalog";

export function ProductFinder() {
  const [query, setQuery] = useState("");
  const [familySlug, setFamilySlug] = useState("all");

  const filteredFamilies = useMemo(
    () =>
      productFamilies.filter((family) => {
        const matchesFamily = familySlug === "all" || family.slug === familySlug;
        const searchable = `${family.name} ${family.description} ${family.products.map((product) => product.name).join(" ")}`.toLowerCase();
        return matchesFamily && searchable.includes(query.toLowerCase());
      }),
    [query, familySlug],
  );

  return (
    <section className="space-y-6">
      <div className="grid gap-3 rounded-lg border border-white/10 bg-navy-900 p-4 md:grid-cols-[1fr_260px]">
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-3 top-3 size-5 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product names, families or applications" className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-11 pr-3 text-white outline-none focus:border-cyan-300" />
        </label>
        <label>
          <span className="sr-only">Filter by family</span>
          <select value={familySlug} onChange={(event) => setFamilySlug(event.target.value)} className="w-full rounded-md border border-white/10 bg-navy-800 p-3 text-white">
            <option value="all">All families</option>
            {productFamilies.map((family) => <option key={family.slug} value={family.slug}>{family.name}</option>)}
          </select>
        </label>
      </div>
      {filteredFamilies.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filteredFamilies.map((family) => <FamilyCard key={family.slug} family={family} />)}</div>
      ) : (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center text-slate-300">No matching product families. Try a broader term or contact Urechem for guided discovery.</div>
      )}
    </section>
  );
}
