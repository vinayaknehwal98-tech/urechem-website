import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  animateDrop?: boolean;
  className?: string;
  compact?: boolean;
  priority?: boolean;
  tone?: "dark" | "light";
};

export function BrandLogo({
  animateDrop = false,
  className,
  compact = false,
  priority = false,
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center",
        compact
          ? "h-10 w-[9.5rem] sm:h-12 sm:w-[11.25rem]"
          : "h-10 w-[9.5rem] sm:h-14 sm:w-[13rem]",
        className,
      )}
      data-urechem-logo-mark
    >
      <Image
        alt="Urechem Chemicals"
        className={cn(
          "h-full w-full object-contain object-left transition duration-500 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_8px_18px_rgba(14,165,233,0.24)]",
          animateDrop && "logo-drop-in",
        )}
        height={243}
        priority={priority}
        sizes={compact ? "(min-width: 640px) 180px, 152px" : "(min-width: 640px) 208px, 152px"}
        src="/brand/urechem-logo.png"
        width={900}
      />

      <span aria-hidden="true" className="sr-only" data-urechem-logo-name />
      <span aria-hidden="true" className="sr-only" data-urechem-logo-tagline />
    </span>
  );
}
