import { Search } from "lucide-react";
import { AnimatedImage } from "@/components/media/animated-image";
import { ButtonLink } from "@/components/ui/button";
import { technicalFilters, technicalResources } from "@/data/homepage";
import { HomeSection } from "./home-section";

export function TechnicalCenterPreviewSection() {
  return (
    <HomeSection
      className="bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.1),transparent_32%),linear-gradient(180deg,rgba(4,17,31,0.98),rgba(7,26,45,0.92))]"
      eyebrow="Technical center"
      id="technical-center-preview"
      intro="Verified technical resources will be published as approved documents become available."
      title="Technical knowledge, without the friction."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[var(--radius-lg)] border border-cyan-200/18 bg-navy-900/72 p-4 shadow-[var(--shadow-deep)]">
          <AnimatedImage
            alt="A technical specialist reviewing polyurethane samples, data sheets and test results"
            className="mb-4 h-48 border-white/8 shadow-none"
            imageClassName="object-[45%_center]"
            sizes="(min-width: 1024px) 40vw, 100vw"
            src="/images/technical-documentation.webp"
          />
          <label className="sr-only" htmlFor="technical-search">
            Search products, applications or technical documents
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-200"
            />
            <input
              className="h-14 w-full rounded-[var(--radius-md)] border border-white/12 bg-navy-950/54 pl-12 pr-4 text-base font-medium text-white outline-none placeholder:text-slate-400 focus:border-cyan-200/75 focus:ring-4 focus:ring-cyan-300/12"
              id="technical-search"
              placeholder="Search products, applications or technical documents..."
              type="search"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {technicalFilters.map((filter) => (
              <button
                className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-200/45 hover:text-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                key={filter}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="mt-5 rounded-[var(--radius-md)] border border-cyan-200/16 bg-cyan-300/8 px-4 py-3 text-sm leading-6 text-cyan-50">
            Verified technical resources will be published as approved documents become available.
          </p>
          <ButtonLink className="mt-5" href="/technical-center" variant="secondary">
            Open Technical Center
          </ButtonLink>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {technicalResources.map((resource) => (
            <article
              className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.045] p-4 shadow-[var(--shadow-soft)]"
              key={resource.title}
            >
              <resource.icon aria-hidden="true" className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-4 font-semibold text-white">{resource.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{resource.description}</p>
            </article>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
