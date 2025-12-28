export function TextAreaField({
  label,
  placeholder,
  error,
  rows = 5,
  ...rest
}: {
  label: string;
  placeholder?: string;
  error?: string;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={[
          "w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
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


