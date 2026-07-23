import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
  priority?: boolean;
  tone?: "dark" | "light";
};

export function BrandLogo({ className, compact = false, priority = false, tone = "light" }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative block shrink-0",
        compact ? "h-12 w-[13.25rem]" : "h-14 w-[15.25rem]",
        className,
      )}
    >
      <span className="logo-reveal absolute left-0 top-0 block transition duration-500 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_8px_18px_rgba(14,165,233,0.2)]">
        <Image
          alt="Urechem Chemicals"
          className={cn("logo-breathe w-auto object-contain object-left", compact ? "h-12" : "h-14")}
          height={243}
          priority={priority}
          src="/brand/urechem-logo.png"
          width={900}
        />
      </span>
      <span
        className={cn(
          "absolute bottom-0 whitespace-nowrap font-bold leading-none tracking-[0.01em] transition-colors duration-300",
          compact ? "left-[3.65rem] text-[0.62rem]" : "left-[4.18rem] text-[0.68rem]",
          tone === "dark" ? "text-cyan-100/85 group-hover:text-cyan-100" : "text-blue-700 group-hover:text-sky-600",
        )}
      >
        We deliver what we promise
      </span>
    </span>
  );
}
