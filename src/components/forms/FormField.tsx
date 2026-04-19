"use client";

type Option = {
  value: string;
  label: string;
};

type FormFieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "date" | "tel" | "number" | "textarea";
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: Option[];
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email";
  min?: string;
  rows?: number;
  value?: string;
  onValueChange?: (name: string, value: string) => void;
};

export function FormField({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  helpText,
  options,
  inputMode,
  min,
  rows,
  value,
  onValueChange,
}: FormFieldProps) {
  const baseClass =
    "min-h-11 w-full rounded-md border border-[#bdb4a2] bg-white px-3 py-2.5 text-base leading-snug text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a1121f]/25 focus-visible:border-[#8f0f1a]";

  return (
    <label className="grid gap-2 text-sm">
      <span className="font-semibold text-slate-900">{label}</span>
      {helpText ? <span className="text-xs leading-relaxed text-slate-600">{helpText}</span> : null}
      {options ? (
        <select
          className={`${baseClass} pr-8`}
          name={name}
          required={required}
          value={value ?? ""}
          onChange={(event) => onValueChange?.(name, event.target.value)}
        >
          <option value="" disabled>
            Select one
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className={`${baseClass} min-h-[8rem] py-2.5 leading-relaxed`}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows ?? 4}
          value={value ?? ""}
          onChange={(event) => onValueChange?.(name, event.target.value)}
        />
      ) : (
        <input
          className={baseClass}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          inputMode={inputMode}
          min={min}
          value={value ?? ""}
          onChange={(event) => onValueChange?.(name, event.target.value)}
        />
      )}
    </label>
  );
}
