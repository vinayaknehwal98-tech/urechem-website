"use client";

import Link from "next/link";
import { Menu, MessageSquareText, Sparkles, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { ButtonLink } from "@/components/ui/button";
import { primaryNavigation } from "@/data/navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
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
        return;
      }

      if (event.key === "Tab" && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
          ),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
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
        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-button)] border border-blue-200 bg-blue-50 text-blue-950 transition hover:border-blue-500 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            aria-hidden="true"
            className="absolute inset-0 h-full w-full cursor-default bg-navy-950/84 backdrop-blur-sm"
            tabIndex={-1}
            type="button"
            onClick={() => setIsOpen(false)}
          />
          <nav
            aria-label="Mobile navigation"
            className="absolute right-3 top-3 flex max-h-[calc(100dvh-1.5rem)] w-[min(28rem,calc(100vw-1.5rem))] flex-col overflow-y-auto rounded-[var(--radius-lg)] border border-blue-200 bg-white p-4 shadow-[var(--shadow-deep)]"
            id={panelId}
            ref={panelRef}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <Link
                className="group inline-flex min-w-0 items-center rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                href="/"
                onClick={() => setIsOpen(false)}
              >
                <BrandLogo compact />
              </Link>
              <button
                ref={closeButtonRef}
                aria-label="Close navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-button)] border border-blue-200 bg-blue-50 text-blue-950 transition hover:border-blue-500 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-1">
              {primaryNavigation.map((item) => (
                <Link
                  className="rounded-[var(--radius-sm)] px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-t border-blue-100 pt-5">
              <ButtonLink className="w-full" href="/contact?type=Consultation%20request" onClick={() => setIsOpen(false)}>
                <MessageSquareText aria-hidden="true" className="h-4 w-4" />
                Talk to a consultant
              </ButtonLink>
              <ButtonLink className="w-full" href="/ask-urechem-ai" variant="metal" onClick={() => setIsOpen(false)}>
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                Ask Urechem AI
              </ButtonLink>
              <p className="text-sm leading-6 text-slate-600">
                Preliminary guidance is reviewed before final product selection or engineering approval.
              </p>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
