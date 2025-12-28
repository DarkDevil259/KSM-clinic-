import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

function classesFor(variant: Variant, size: Size) {
  const sizeClasses = size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm";
  const base = `inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-200 active:scale-95 ${sizeClasses}`;

  if (variant === "primary")
    return `${base} bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5`;

  if (variant === "secondary")
    return `${base} bg-dental-500 text-white shadow-soft hover:bg-dental-600 hover:shadow-lg hover:-translate-y-0.5`;

  return `${base} bg-white text-navy-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm`;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  to,
  type = "button",
  onClick,
  className = "",
  target,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  to?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  target?: string;
}) {
  const cls = `${classesFor(variant, size)} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} target={target} rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}


