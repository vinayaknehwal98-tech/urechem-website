import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "metal";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-cyan-300/80 bg-cyan-300 text-navy-950 shadow-[var(--shadow-cyan)] hover:border-white hover:bg-white",
  secondary:
    "border-white/18 bg-white/7 text-white hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-cyan-100",
  ghost:
    "border-transparent bg-transparent text-slate-200 hover:border-white/12 hover:bg-white/7 hover:text-white",
  metal:
    "border-white/15 bg-metallic text-white shadow-[var(--shadow-metal)] hover:border-cyan-200/50 hover:text-cyan-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-3.5 text-sm",
  md: "h-11 gap-2.5 px-5 text-sm",
  lg: "h-12 gap-3 px-6 text-base",
};

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = BaseButtonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> & {
    className?: string;
  };

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-button)] border font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 disabled:pointer-events-none disabled:opacity-55",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-button)] border font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
