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
  tone = "light",
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center",
        compact ? "h-12 w-[13.5rem] gap-2" : "h-14 w-[16.75rem] gap-2.5",
        className,
      )}
    >
      <span
        className={cn(
          "relative grid shrink-0 place-items-center transition duration-500 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_8px_18px_rgba(14,165,233,0.24)]",
          compact ? "h-11 w-11" : "h-14 w-14",
          animateDrop && "logo-drop-in",
        )}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="logo-mark-float h-full w-full object-contain"
          height={256}
          priority={priority}
          src="/brand/urechem-mark.png"
          width={256}
        />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "logo-name-reveal block whitespace-nowrap font-black uppercase leading-none tracking-[-0.035em]",
            compact ? "text-[0.98rem]" : "text-[1.22rem]",
            tone === "dark" ? "text-white" : "text-blue-950",
          )}
        >
          Urechem Chemical
        </span>
        <span
          className={cn(
            "logo-tagline-reveal mt-1.5 block whitespace-nowrap font-bold leading-none transition-colors duration-300",
            compact ? "text-[0.58rem]" : "text-[0.65rem]",
            tone === "dark" ? "text-cyan-100/80 group-hover:text-cyan-100" : "text-blue-600 group-hover:text-sky-600",
          )}
        >
          We deliver what we promise
        </span>
      </span>
    </span>
  );
}
