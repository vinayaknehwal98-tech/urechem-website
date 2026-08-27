"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { applicationCategories } from "@/data/homepage";
import { industries } from "@/data/catalog";
import { primaryNavigation, productFamilyLinks, type NavigationItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

const industryNavigationItems: NavigationItem[] = [
  ...industries.map((industry) => ({ label: industry.name, href: `/industries/${industry.slug}` })),
  { label: "Flexible packaging", href: "/industries/flexible-packaging" },
];

const dropdownItems: Record<string, NavigationItem[]> = {
  Products: productFamilyLinks,
  Applications: applicationCategories.map((application) => ({ label: application.title, href: application.href })),
  Industries: industryNavigationItems,
};

const CLOSE_DELAY_MS = 220;

export function DesktopNavigation() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const cancelScheduledClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openDropdown = useCallback((label: string) => {
    cancelScheduledClose();
    setOpenMenu(label);
  }, [cancelScheduledClose]);

  const closeDropdown = useCallback(() => {
    cancelScheduledClose();
    setOpenMenu(null);
  }, [cancelScheduledClose]);

  const scheduleDropdownClose = useCallback(() => {
    cancelScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [cancelScheduledClose]);

  useEffect(() => cancelScheduledClose, [cancelScheduledClose]);

  return (
    <nav
      aria-label="Primary navigation"
      className="relative z-20 hidden items-center justify-center gap-1 rounded-full border border-white/75 bg-white/55 px-2 py-1 shadow-[0_5px_20px_rgba(15,23,42,0.06)] backdrop-blur-lg lg:flex xl:gap-1.5"
      onKeyDown={(event) => event.key === "Escape" && closeDropdown()}
    >
      {primaryNavigation.map((item) => {
        const menu = dropdownItems[item.label];
        const isOpen = openMenu === item.label;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
        const commonClassName = cn(
          "group relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.83rem] font-semibold text-slate-700 transition-colors hover:bg-white/80 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 xl:px-4",
          (isActive || isOpen) && "bg-white/75 text-blue-800",
        );

        return (
          <div
            className="relative z-20 flex items-center"
            key={item.href}
            onMouseEnter={() => menu && openDropdown(item.label)}
            onMouseLeave={() => menu && scheduleDropdownClose()}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeDropdown();
            }}
          >
            <Link
              aria-current={isActive ? "page" : undefined}
              aria-expanded={menu ? isOpen : undefined}
              aria-haspopup={menu ? "menu" : undefined}
              className={commonClassName}
              href={item.href}
              onFocus={() => menu && openDropdown(item.label)}
              onClick={() => menu && setOpenMenu(isOpen ? null : item.label)}
            >
              {item.label}
              {menu && <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5", isOpen && "rotate-180")} />}
              <span aria-hidden="true" className={cn("absolute inset-x-4 bottom-1 h-px bg-blue-700", !(isActive || isOpen) && "opacity-0")} />
            </Link>

            {menu && isOpen && (
              <div
                className="absolute left-1/2 top-full z-[100] w-[22rem] -translate-x-1/2 pt-2"
                onMouseEnter={cancelScheduledClose}
                onMouseLeave={scheduleDropdownClose}
                role="presentation"
              >
                <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white/95 p-2 shadow-[0_20px_55px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                  <Link
                    className="mb-1 flex items-center justify-between rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-bold text-blue-950 hover:bg-blue-100"
                    href={item.href}
                    onClick={closeDropdown}
                  >
                    View all {item.label.toLowerCase()}
                    <span aria-hidden="true">→</span>
                  </Link>
                  <div className={cn("grid", menu.length > 6 && "grid-cols-2")}>
                    {menu.map((menuItem) => (
                      <Link
                        className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-800"
                        href={menuItem.href}
                        key={menuItem.href}
                        onClick={closeDropdown}
                      >
                        {menuItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
