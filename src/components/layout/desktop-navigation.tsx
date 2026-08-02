"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Armchair, Building2, Car, ChevronDown, Factory } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { applicationCategories } from "@/data/homepage";
import { industries } from "@/data/catalog";
import { primaryNavigation, productFamilyLinks, type NavigationItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

const dropdownItems: Record<string, NavigationItem[]> = {
  Products: productFamilyLinks,
  Applications: applicationCategories.map((application) => ({
    label: application.title,
    href: application.href,
  })),
  Industries: industries.map((industry) => ({
    label: industry.name,
    href: `/industries/${industry.slug}`,
  })),
};

const industryIcons = {
  construction: Building2,
  automotive: Car,
  "furniture-bedding": Armchair,
  "industrial-facilities": Factory,
} as const;

export function DesktopNavigation() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center justify-between gap-0.5 px-1 lg:flex xl:gap-1 xl:px-3"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenMenu(null);
        }
      }}
    >
      {primaryNavigation.map((item) => {
        const menu = dropdownItems[item.label];
        const isOpen = openMenu === item.label;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
        const isIndustriesMenu = item.label === "Industries";

        return (
          <div
            className="relative flex items-center"
            key={item.href}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setOpenMenu(null);
              }
            }}
            onMouseEnter={() => menu && setOpenMenu(item.label)}
            onMouseLeave={() => menu && setOpenMenu(null)}
          >
            <Link
              aria-current={isActive ? "page" : undefined}
              aria-expanded={menu ? isOpen : undefined}
              aria-haspopup={menu ? "menu" : undefined}
              className={cn(
                "group relative inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-2.5 text-[0.78rem] font-semibold text-slate-700 transition duration-300 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 xl:px-2.5 xl:text-[0.83rem]",
                isActive && "text-blue-800",
              )}
              href={item.href}
              onFocus={() => menu && setOpenMenu(item.label)}
            >
              {item.label}
              {menu ? (
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180")}
                />
              ) : null}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-2 bottom-1 h-px origin-left scale-x-0 bg-blue-700 transition-transform duration-300 group-hover:scale-x-100",
                  (isActive || isOpen) && "scale-x-100",
                )}
              />
            </Link>

            {menu ? (
              <div
                className={cn(
                  "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3",
                  isIndustriesMenu ? "w-[38rem]" : "w-[22rem]",
                )}
              >
                <AnimatePresence>
                  {isOpen ? (
                    <motion.div
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="overflow-hidden rounded-[var(--radius-lg)] border border-blue-100 bg-white p-2 shadow-[0_24px_70px_rgba(15,23,42,0.2)]"
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -8 }}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -10 }}
                      role="menu"
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        className="mb-2 flex items-center justify-between rounded-[var(--radius-sm)] bg-blue-50 px-4 py-3 text-sm font-black text-blue-950 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        role="menuitem"
                      >
                        <span>
                          View all {item.label.toLowerCase()}
                          {isIndustriesMenu ? (
                            <span className="mt-0.5 block text-xs font-medium text-slate-600">
                              Explore sector-specific polyurethane systems and technical pathways.
                            </span>
                          ) : null}
                        </span>
                        <span aria-hidden="true" className="text-lg text-blue-700">
                          →
                        </span>
                      </Link>

                      {isIndustriesMenu ? (
                        <div className="grid grid-cols-2 gap-2 p-1">
                          {industries.map((industry) => {
                            const Icon = industryIcons[industry.slug as keyof typeof industryIcons] ?? Factory;

                            return (
                              <Link
                                className="group rounded-lg border border-slate-200 bg-white p-3 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                                href={`/industries/${industry.slug}`}
                                key={industry.slug}
                                onClick={() => setOpenMenu(null)}
                                role="menuitem"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                                    <Icon aria-hidden="true" className="h-5 w-5" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="flex items-center justify-between gap-2 text-sm font-extrabold text-blue-950">
                                      {industry.name}
                                      <span aria-hidden="true" className="text-blue-600 transition-transform group-hover:translate-x-1">
                                        →
                                      </span>
                                    </span>
                                    <span className="mt-1 block text-xs leading-5 text-slate-600">
                                      {industry.summary}
                                    </span>
                                    <span className="mt-2 flex flex-wrap gap-1">
                                      {industry.needs.slice(0, 2).map((need) => (
                                        <span
                                          className="rounded-full bg-slate-100 px-2 py-1 text-[0.65rem] font-semibold text-slate-600"
                                          key={need}
                                        >
                                          {need}
                                        </span>
                                      ))}
                                    </span>
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <div className={cn("grid", menu.length > 6 && "grid-cols-2")}>
                          {menu.map((menuItem) => (
                            <Link
                              className="rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium leading-5 text-slate-700 transition duration-300 hover:bg-blue-50 hover:pl-4 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                              href={menuItem.href}
                              key={menuItem.href}
                              onClick={() => setOpenMenu(null)}
                              role="menuitem"
                            >
                              {menuItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
