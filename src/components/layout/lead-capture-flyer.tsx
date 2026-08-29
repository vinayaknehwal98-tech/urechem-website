"use client";

import { ArrowRight, CheckCircle2, Mail, Phone, UserRound, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { lockBodyScroll } from "@/lib/body-scroll-lock";

const sessionStorageKey = "urechem-consultation-flyer-dismissed-session-v3";
const flyerDelay = 4500;
const minimumPostHeroDelay = 650;
const heroCompleteAttribute = "data-urechem-hero-intro-complete";
const heroCompleteEvent = "urechem:hero-intro-complete";

function hasDismissedFlyer() {
  try {
    return window.sessionStorage.getItem(sessionStorageKey) === "true";
  } catch {
    return false;
  }
}

function storeFlyerDismissal() {
  try {
    window.sessionStorage.setItem(sessionStorageKey, "true");
  } catch {
    // Dismissal still works when browser storage is unavailable.
  }
}

export function LeadCaptureFlyer() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const startedAtRef = useRef(0);
  const forcePreviewRef = useRef(false);
  const isExcludedPath =
    pathname === "/contact" ||
    pathname === "/consultant" ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/legal");

  const rememberDismissal = useCallback(() => {
    if (!forcePreviewRef.current) storeFlyerDismissal();
  }, []);

  const dismiss = useCallback(() => {
    rememberDismissal();
    setIsOpen(false);
    setSubmitState("idle");
    setSubmitMessage("");
  }, [rememberDismissal]);

  useEffect(() => {
    if (isExcludedPath) return;

    const forceFlyer = new URLSearchParams(window.location.search).get("flyer") === "force";
    forcePreviewRef.current = forceFlyer;

    if (!forceFlyer && hasDismissedFlyer()) return;

    let cancelled = false;
    let timer = 0;
    const mountedAt = performance.now();
    const isHomePage = pathname === "/";

    const showFlyer = () => {
      if (!cancelled) {
        startedAtRef.current = Date.now();
        setSubmitState("idle");
        setSubmitMessage("");
        setIsOpen(true);
      }
    };

    const scheduleFlyer = (delay: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(showFlyer, delay);
    };

    const scheduleAfterHero = () => {
      if (cancelled) return;
      const elapsed = performance.now() - mountedAt;
      const remainingBaseDelay = forceFlyer ? 180 : Math.max(0, flyerDelay - elapsed);
      scheduleFlyer(Math.max(forceFlyer ? 180 : minimumPostHeroDelay, remainingBaseDelay));
    };

    if (isHomePage) {
      if (document.documentElement.hasAttribute(heroCompleteAttribute)) scheduleAfterHero();
      else window.addEventListener(heroCompleteEvent, scheduleAfterHero, { once: true });
    } else {
      scheduleFlyer(forceFlyer ? 250 : flyerDelay);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener(heroCompleteEvent, scheduleAfterHero);
    };
  }, [isExcludedPath, pathname]);

  useEffect(() => {
    if (!isOpen || isExcludedPath) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
        return;
      }

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

    const releaseScrollLock = lockBodyScroll();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      releaseScrollLock();
      previouslyFocused?.focus();
    };
  }, [dismiss, isExcludedPath, isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "sending" || submitState === "sent") return;

    setSubmitState("sending");
    setSubmitMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Consultation request",
          name: String(formData.get("name") ?? ""),
          company: "",
          email: String(formData.get("email") ?? ""),
          mobile: String(formData.get("mobile") ?? ""),
          industry: "",
          product: "",
          quantity: "",
          context: "Initial website consultation request. Please contact the visitor to understand their application and technical requirement.",
          website: "",
          startedAt: startedAtRef.current,
        }),
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        setSubmitState("failed");
        setSubmitMessage(payload.message || "Something went wrong while sending your consultation request. Please try again.");
        return;
      }

      setSubmitState("sent");
      setSubmitMessage(payload.message || "Your consultation request was sent successfully.");
      rememberDismissal();
    } catch {
      setSubmitState("failed");
      setSubmitMessage("Something went wrong while sending your consultation request. Please check your connection and try again.");
    }
  };

  if (!isOpen || isExcludedPath) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-6"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      role="presentation"
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <button aria-hidden="true" className="absolute inset-0 h-full w-full cursor-default bg-blue-950/72 backdrop-blur-sm" tabIndex={-1} type="button" onClick={dismiss} />

      <motion.section
        animate={{ opacity: 1, scale: 1, y: 0 }}
        aria-labelledby="consultation-flyer-title"
        aria-modal="true"
        className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_30px_110px_rgba(3,19,43,0.38)] sm:max-h-[calc(100dvh-3rem)]"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.965, y: 28 }}
        ref={dialogRef}
        role="dialog"
        transition={{ delay: shouldReduceMotion ? 0 : 0.08, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div animate={{ scaleX: 1 }} className="h-2 origin-left bg-[linear-gradient(90deg,#1d4ed8,#22d3ee)]" initial={shouldReduceMotion ? false : { scaleX: 0 }} transition={{ delay: shouldReduceMotion ? 0 : 0.18, duration: 0.62, ease: [0.22, 1, 0.36, 1] }} />

        <button aria-label="Close consultation flyer" className="absolute right-4 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-950 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" ref={closeButtonRef} type="button" onClick={dismiss}>
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <div className="grid gap-7 p-6 sm:p-9">
          <motion.div animate={{ opacity: 1, y: 0 }} className="pr-12" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} transition={{ delay: shouldReduceMotion ? 0 : 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-sm font-black uppercase tracking-[0.17em] text-blue-700">Urechem Chemicals</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-blue-950 sm:text-4xl" id="consultation-flyer-title">Unlock expert polyurethane guidance.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">Share your contact details and we’ll send your consultation request directly to the Urechem team.</p>
          </motion.div>

          {submitState === "sent" ? (
            <section aria-live="polite" className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-5 text-blue-950">
              <div className="flex items-start gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-blue-700" />
                <div>
                  <h3 className="font-black">Consultation Request Sent</h3>
                  <p className="mt-1 text-sm leading-6">Thank you. Your request has been sent to Urechem. Our team will get back to you shortly.</p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button className="w-full sm:w-auto" variant="outline" type="button" onClick={dismiss}>Close</Button>
                <Button className="w-full sm:w-auto" type="button" onClick={() => { window.location.assign("/consultant"); }}>Continue to full consultation <ArrowRight aria-hidden="true" className="h-4 w-4" /></Button>
              </div>
            </section>
          ) : (
            <motion.form animate={{ opacity: 1, y: 0 }} className="grid gap-4" initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }} onSubmit={handleSubmit} transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}>
              <label className="grid gap-2 text-sm font-bold text-blue-950">
                Name
                <span className="relative">
                  <UserRound aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                  <input autoComplete="name" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 pl-12 pr-4 font-medium text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100" maxLength={100} minLength={2} name="name" placeholder="Your name" required />
                </span>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-blue-950">
                  Email address
                  <span className="relative">
                    <Mail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                    <input autoComplete="email" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 pl-12 pr-4 font-medium text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100" maxLength={254} name="email" placeholder="name@company.com" required type="email" />
                  </span>
                </label>

                <label className="grid gap-2 text-sm font-bold text-blue-950">
                  Mobile number
                  <span className="relative">
                    <Phone aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                    <input autoComplete="tel" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 pl-12 pr-4 font-medium text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100" inputMode="tel" maxLength={24} minLength={7} name="mobile" pattern="[+0-9 ()-]{7,24}" placeholder="Mobile number" required type="tel" />
                  </span>
                </label>
              </div>

              {submitState === "failed" ? (
                <p aria-live="polite" className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800"><strong>Unable to send:</strong> {submitMessage}</p>
              ) : null}

              <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-blue-800 hover:underline" type="button" onClick={dismiss}>Continue browsing</button>
                <Button className="w-full sm:w-auto" disabled={submitState === "sending"} size="lg" type="submit">
                  {submitState === "sending" ? "Sending…" : "Send consultation request"}
                  {submitState !== "sending" ? <ArrowRight aria-hidden="true" className="h-4 w-4" /> : null}
                </Button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
