"use client";

import Link from "next/link";
import { FileText, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { applications, productFamilies, products } from "@/data/catalog";

const MAX_SELECTIONS = 3;
const unavailableValue = "Not stated in supplied reference";

function productKey(product: (typeof products)[number]) {
  return `${product.familySlug}:${product.slug}`;
}

function familyName(slug: string) {
  return productFamilies.find((family) => family.slug === slug)?.name ?? slug;
}

function applicationNames(slugs: string[]) {
  return slugs
    .map((slug) => applications.find((application) => application.slug === slug)?.name)
    .filter((name): name is string => Boolean(name))
    .join(", ");
}

export function ProductComparison() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
    const requested = searchParams.getAll("product");
    return requested
      .map((key) => products.find((item) => productKey(item) === key))
      .filter((item): item is (typeof products)[number] => Boolean(item))
      .slice(0, MAX_SELECTIONS)
      .map(productKey);
  });

  const selectedProducts = selectedKeys
    .map((key) => products.find((product) => productKey(product) === key))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const searchable = `${product.name} ${familyName(product.familySlug)} ${product.description}`.toLowerCase();
      return normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
    });
  }, [query]);

  const comparisonRows = useMemo(() => {
    const keys = Array.from(
      new Set(selectedProducts.flatMap((product) => Object.keys(product.compareAttributes))),
    );

    if (selectedProducts.length < 2) {
      return keys;
    }

    return keys.filter((key) => {
      const values = selectedProducts.map((product) => product.compareAttributes[key] ?? "");
      return new Set(values).size > 1;
    });
  }, [selectedProducts]);

  const addProduct = (key: string) => {
    if (selectedKeys.includes(key) || selectedKeys.length >= MAX_SELECTIONS) return;
    setSelectedKeys([...selectedKeys, key]);
  };

  const removeProduct = (key: string) => {
    setSelectedKeys(selectedKeys.filter((selectedKey) => selectedKey !== key));
  };

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
      <div className="rounded-[var(--radius-lg)] border border-cyan-200/12 bg-navy-900/80 p-5 shadow-[var(--shadow-soft)]">
        <label className="relative block" htmlFor="product-comparison-search">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">Select up to three products</span>
          <Search className="pointer-events-none absolute left-3 top-11 size-5 text-slate-400" />
          <input
            className="mt-3 w-full rounded-[var(--radius-sm)] border border-white/10 bg-white/5 py-3 pl-11 pr-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
            id="product-comparison-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by product or family"
            type="search"
            value={query}
          />
        </label>
        <div className="mt-4 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
          {filteredProducts.map((product) => {
            const key = productKey(product);
            const isSelected = selectedKeys.includes(key);
            const isDisabled = !isSelected && selectedKeys.length >= MAX_SELECTIONS;
            return (
              <button
                className="w-full rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.035] p-3 text-left transition hover:border-cyan-300/70 hover:bg-cyan-300/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:cursor-not-allowed disabled:opacity-45"
                disabled={isDisabled || isSelected}
                key={key}
                onClick={() => addProduct(key)}
                type="button"
              >
                <span className="block font-semibold text-white">{product.name}</span>
                <span className="mt-1 block text-sm text-slate-300">{familyName(product.familySlug)}</span>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  {isSelected ? "Selected" : isDisabled ? "Remove a product to add" : "Add to comparison"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-cyan-200/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(34,211,238,0.035)_42%,rgba(4,17,31,0.62))] p-5 shadow-[var(--shadow-deep)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Selected comparison</h2>
            <p className="mt-1 text-sm text-slate-300">
              Product-specific differences from the supplied reference are shown first. Missing values are not inferred.
            </p>
          </div>
          {selectedProducts.length > 0 ? <Button onClick={() => setSelectedKeys([])} variant="secondary">Clear all</Button> : null}
        </div>

        {selectedProducts.length === 0 ? (
          <div className="mt-8 rounded-[var(--radius-md)] border border-dashed border-white/20 p-8 text-center text-slate-300">
            Search and select products to build a focused comparison. No product is selected yet.
          </div>
        ) : (
          <>
            <div className="mt-6 hidden overflow-hidden rounded-[var(--radius-md)] border border-white/10 md:block">
              <table className="w-full table-fixed text-left text-sm">
                <thead className="bg-white/10 text-cyan-100">
                  <tr>
                    <th className="p-4">Field</th>
                    {selectedProducts.map((product) => (
                      <th className="p-4" key={productKey(product)}>
                        <span className="flex items-start justify-between gap-3">
                          <span>{product.name}</span>
                          <button
                            aria-label={`Remove ${product.name}`}
                            className="rounded-full border border-white/10 p-1.5 text-slate-200 transition hover:border-cyan-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                            onClick={() => removeProduct(productKey(product))}
                            type="button"
                          >
                            <X aria-hidden="true" className="size-3.5" />
                          </button>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                  <tbody>
                  <tr className="border-t border-white/10">
                    <th className="p-4 align-top text-cyan-100">Family</th>
                    {selectedProducts.map((product) => (
                      <td className="p-4 align-top leading-6 text-slate-300" key={productKey(product)}>
                        {familyName(product.familySlug)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-white/10">
                    <th className="p-4 align-top text-cyan-100">Reference description</th>
                    {selectedProducts.map((product) => (
                      <td className="p-4 align-top leading-6 text-slate-300" key={productKey(product)}>
                        {product.description}
                      </td>
                    ))}
                  </tr>
                  {comparisonRows.map((row) => (
                    <tr className="border-t border-white/10" key={row}>
                      <th className="p-4 align-top text-cyan-100">{row}</th>
                      {selectedProducts.map((product) => (
                        <td className="p-4 align-top leading-6 text-slate-300" key={productKey(product)}>
                          {product.compareAttributes[row] ?? (
                            <span className="text-slate-500">{unavailableValue}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-white/10">
                    <th className="p-4 align-top text-cyan-100">Application pathways</th>
                    {selectedProducts.map((product) => (
                      <td className="p-4 align-top leading-6 text-slate-300" key={productKey(product)}>
                        {applicationNames(product.applications) || unavailableValue}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-white/10">
                    <th className="p-4 align-top text-cyan-100">Technical documents</th>
                    {selectedProducts.map((product) => (
                      <td className="p-4 align-top text-slate-300" key={productKey(product)}>
                        <Link
                          className="inline-flex items-center gap-2 font-semibold text-cyan-100 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-white"
                          href={`/contact?type=TDS%20request&product=${encodeURIComponent(product.name)}`}
                        >
                          <FileText aria-hidden="true" className="size-4" />
                          Ask for TDS
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 md:hidden">
              {selectedProducts.map((product) => (
                <article className="rounded-[var(--radius-md)] border border-white/10 bg-navy-900/80 p-4" key={productKey(product)}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <button aria-label={`Remove ${product.name}`} className="rounded-full border border-white/10 p-2 text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200" onClick={() => removeProduct(productKey(product))} type="button"><X className="size-4" /></button>
                  </div>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div><dt className="font-semibold text-cyan-100">Family</dt><dd className="mt-1 text-slate-300">{familyName(product.familySlug)}</dd></div>
                    <div><dt className="font-semibold text-cyan-100">Reference description</dt><dd className="mt-1 text-slate-300">{product.description}</dd></div>
                    {comparisonRows.map((row) => (
                      <div key={row}>
                        <dt className="font-semibold text-cyan-100">{row}</dt>
                        <dd className="mt-1 text-slate-300">{product.compareAttributes[row] ?? unavailableValue}</dd>
                      </div>
                    ))}
                    <div>
                      <dt className="font-semibold text-cyan-100">Application pathways</dt>
                      <dd className="mt-1 text-slate-300">{applicationNames(product.applications) || unavailableValue}</dd>
                    </div>
                  </dl>
                  <Link
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan-100 underline decoration-cyan-300/40 underline-offset-4"
                    href={`/contact?type=TDS%20request&product=${encodeURIComponent(product.name)}`}
                  >
                    <FileText aria-hidden="true" className="size-4" />
                    Ask for TDS
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
