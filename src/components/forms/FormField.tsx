"use client";

type Option = {
  value: string;
  label: string;
};

type FormFieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "date" | "tel" | "number";
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: Option[];
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email";
  min?: string;
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
}: FormFieldProps) {
  const baseClass = "rounded-md border border-[#bdb4a2] bg-white px-3 py-3 text-base";

  return (
    <label className="grid gap-1 text-sm">
      <span className="font-semibold">{label}</span>
      {helpText ? <span className="text-xs text-slate-600">{helpText}</span> : null}
      {options ? (
        <select className={baseClass} name={name} required={required} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={baseClass}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          inputMode={inputMode}
          min={min}
        />
      )}
    </label>
  );
}
