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
  const baseClass = "w-full rounded-md border border-[#bdb4a2] bg-white px-3 py-3 text-base leading-snug";

  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold">{label}</span>
      {helpText ? <span className="text-xs text-slate-600">{helpText}</span> : null}
      {options ? (
        <select
          className={baseClass}
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
          className={baseClass}
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
