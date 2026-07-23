"use client";

import { ArrowRight, Mail, Phone, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const storageKey = "urechem-consultation-flyer-dismissed";
const dismissalWindow = 7 * 24 * 60 * 60 * 1000;

export function LeadCaptureFlyer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const dismiss = useCallback(() => {
    window.localStorage.setItem(storageKey, String(Date.now()));
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (pathname === "/contact" || pathname.startsWith("/privacy") || pathname.startsWith("/terms") || pathname.startsWith("/legal")) {
      return;
    }

    const dismissedAt = Number(window.localStorage.getItem(storageKey) ?? "0");
    if (dismissedAt && Date.now() - dismissedAt < dismissalWindow) {
      return;
    }

    const timer = window.setTimeout(() => setIsOpen(true), 8000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      }
    };

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
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
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);
    document.body.classList.add("overflow-hidden");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
      document.body.classList.remove("overflow-hidden");
      previouslyFocused?.focus();
    };
  }, [dismiss, isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams({
      type: "Consultation request",
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      mobile: String(formData.get("mobile") ?? ""),
    });

    window.localStorage.setItem(storageKey, String(Date.now()));
    window.location.assign(`/contact?${params.toString()}`);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-6" role="presentation">
      <button
        aria-hidden="true"
        className="absolute inset-0 h-full w-full cursor-default bg-blue-950/72 backdrop-blur-sm"
        tabIndex={-1}
        type="button"
        onClick={dismiss}
      />

      <section
        aria-labelledby="consultation-flyer-title"
        aria-modal="true"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_30px_110px_rgba(3,19,43,0.38)]"
        ref={dialogRef}
        role="dialog"
      >
        <div className="h-2 bg-[linear-gradient(90deg,#1d4ed8,#22d3ee)]" />
        <button
          aria-label="Close consultation flyer"
          className="absolute right-4 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-950 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          ref={closeButtonRef}
          type="button"
          onClick={dismiss}
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <div className="grid gap-7 p-6 sm:p-9">
          <div className="pr-12">
            <p className="text-sm font-black uppercase tracking-[0.17em] text-blue-700">Urechem Chemicals</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-blue-950 sm:text-4xl" id="consultation-flyer-title">
              Unlock expert polyurethane guidance.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Share your contact details to continue to a consultation request. We deliver what we promise.
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-bold text-blue-950">
              Name
              <span className="relative">
                <UserRound aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                <input autoComplete="name" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 pl-12 pr-4 font-medium text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100" name="name" placeholder="Your name" required />
              </span>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-blue-950">
                Email address
                <span className="relative">
                  <Mail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                  <input autoComplete="email" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 pl-12 pr-4 font-medium text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100" name="email" placeholder="name@company.com" required type="email" />
                </span>
              </label>

              <label className="grid gap-2 text-sm font-bold text-blue-950">
                Mobile number
                <span className="relative">
                  <Phone aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                  <input autoComplete="tel" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 pl-12 pr-4 font-medium text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100" inputMode="tel" name="mobile" placeholder="Mobile number" required type="tel" />
                </span>
              </label>
            </div>

            <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-blue-800 hover:underline" type="button" onClick={dismiss}>
                Continue browsing
              </button>
              <Button className="w-full sm:w-auto" size="lg" type="submit">
                Continue to consultation
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
