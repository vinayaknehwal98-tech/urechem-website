"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { primaryNavigation } from "@/data/navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("overflow-hidden");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label="Open navigation menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-button)] border border-white/12 bg-white/7 text-white transition hover:border-cyan-200/45 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close navigation overlay"
            className="absolute inset-0 h-full w-full cursor-default bg-navy-950/84 backdrop-blur-sm"
            type="button"
            onClick={() => setIsOpen(false)}
          />
          <nav
            aria-label="Mobile navigation"
            className="absolute right-3 top-3 flex max-h-[calc(100dvh-1.5rem)] w-[min(28rem,calc(100vw-1.5rem))] flex-col overflow-y-auto rounded-[var(--radius-lg)] border border-white/12 bg-navy-900 p-4 shadow-[var(--shadow-deep)]"
            id={panelId}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <Link
                className="group flex items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                href="/"
                onClick={() => setIsOpen(false)}
              >
                <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] border border-cyan-200/25 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[var(--shadow-cyan)]">
                  U
                </span>
                <span>
                  <span className="block text-base font-black text-white">URECHEM</span>
                  <span className="block text-xs font-medium text-cyan-100/80">Polyurethane Intelligence</span>
                </span>
              </Link>
              <button
                ref={closeButtonRef}
                aria-label="Close navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-button)] border border-white/12 bg-white/7 text-white transition hover:border-cyan-200/45 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-1">
              {primaryNavigation.map((item) => (
                <Link
                  className="rounded-[var(--radius-sm)] px-3 py-3 text-base font-semibold text-slate-100 transition hover:bg-white/7 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <ButtonLink className="w-full" href="/ask-urechem-ai" onClick={() => setIsOpen(false)}>
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                Ask Urechem AI
              </ButtonLink>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                AI guidance is preliminary. Final product selection requires Urechem technical validation.
              </p>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
