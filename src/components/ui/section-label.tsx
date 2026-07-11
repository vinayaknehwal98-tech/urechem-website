import { cn } from "@/lib/utils";

type SectionLabelProps = React.ComponentPropsWithoutRef<"p">;

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-cyan-200/18 bg-cyan-300/8 px-3 py-2 font-mono text-xs font-semibold uppercase text-cyan-100",
        className,
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-turquoise-300 shadow-[0_0_16px_rgba(45,212,191,0.85)]" />
      {children}
    </p>
  );
}
