import { cn } from "@/lib/utils";

type SectionLabelProps = React.ComponentPropsWithoutRef<"p">;

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-blue-200 bg-blue-50 px-3 py-2 font-mono text-xs font-semibold uppercase text-blue-700 shadow-[0_8px_24px_rgba(30,64,175,0.06)]",
        className,
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_14px_rgba(14,165,233,0.45)]" />
      {children}
    </p>
  );
}
