import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "metal";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-blue-700 bg-blue-700 text-[color:#fff] shadow-[0_12px_30px_rgba(37,99,235,0.22)] hover:border-blue-800 hover:bg-blue-800 hover:text-[color:#fff]",
  secondary:
    "border-blue-200 bg-white text-blue-950 shadow-[0_10px_26px_rgba(30,64,175,0.1)] hover:border-sky-400 hover:bg-sky-50 hover:text-blue-950",
  ghost:
    "border-blue-100 bg-blue-50/70 text-blue-800 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-950",
  metal:
    "border-slate-200 bg-[linear-gradient(135deg,#ffffff,#eef6ff_55%,#dbeafe)] text-blue-950 shadow-[var(--shadow-metal)] hover:border-sky-300 hover:text-blue-900",
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
        "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-button)] border font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:pointer-events-none disabled:opacity-55",
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
        "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-button)] border font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
