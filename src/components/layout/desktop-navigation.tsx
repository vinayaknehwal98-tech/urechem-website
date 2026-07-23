"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
              <div className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3">
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
                        className="mb-1 flex items-center justify-between rounded-[var(--radius-sm)] bg-blue-50 px-3 py-2.5 text-sm font-black text-blue-950 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        role="menuitem"
                      >
                        View all {item.label.toLowerCase()}
                        <span aria-hidden="true" className="text-blue-700">
                          →
                        </span>
                      </Link>
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
