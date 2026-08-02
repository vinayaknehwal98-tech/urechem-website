"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import chunk1 from "@/components/home/proof-water-chunk-1";
import chunk2 from "@/components/home/proof-water-chunk-2";
import chunk3 from "@/components/home/proof-water-chunk-3";
import chunk4 from "@/components/home/proof-water-chunk-4";

const proofWaterImage = `data:image/webp;base64,${chunk1}${chunk2}${chunk3}${chunk4}`;

export function ProofWaterBackdrop() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const applyBackdrop = () => {
      const target = document.querySelector<HTMLElement>(
        "#proof-expertise [data-no-site-motion]",
      );

      if (!target) return false;

      target.dataset.proofWaterBackdrop = "true";
      target.style.backgroundImage = `linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.34) 18%, rgba(255,255,255,0.04) 48%, rgba(255,255,255,0.02) 100%), url("${proofWaterImage}")`;
      return true;
    };

    if (applyBackdrop()) return;

    const observer = new MutationObserver(() => {
      if (applyBackdrop()) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
