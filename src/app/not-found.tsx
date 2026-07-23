import { ArrowLeft, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">404</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">This page could not be found.</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-300">
          The link may have changed. Return to the homepage or search the structured product catalog.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Return home
          </ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            <Search aria-hidden="true" className="size-4" />
            Search products
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
