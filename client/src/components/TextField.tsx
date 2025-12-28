import type { ReactNode } from "react";

export function TextField({
  label,
  type = "text",
  placeholder,
  error,
  right,
  ...rest
}: {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  right?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2">
      <div className="flex items-end justify-between gap-4">
        <span className="text-sm font-bold text-slate-700">{label}</span>
        {right}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={[
          "h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition",
          error
            ? "border-red-300 focus:ring-4 focus:ring-red-100"
            : "border-slate-200 focus:border-dental-300 focus:ring-4 focus:ring-dental-100",
        ].join(" ")}
        {...rest}
      />
      {error ? <span className="text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}


