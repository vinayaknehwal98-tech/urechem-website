import { ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";
import { products } from "@/data/catalog";

export const metadata = { title: "Product Comparison | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">Product comparison</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Compare catalog identifiers and document-publication status. This workflow does not approve suitability.</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/10"><tr><th className="p-4">Product</th><th className="p-4">Family</th><th className="p-4">Documents</th><th className="p-4">Selection status</th></tr></thead>
          <tbody>
            {products.map((product) => (
              <tr key={`${product.familySlug}:${product.slug}`} className="border-t border-white/10">
                <td className="p-4 font-semibold text-white">{product.name}</td>
                <td className="p-4 text-slate-300">{product.familySlug}</td>
                <td className="p-4 text-slate-300">Contact Urechem for current document availability</td>
                <td className="p-4 text-amber-100">Requires expert validation</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
