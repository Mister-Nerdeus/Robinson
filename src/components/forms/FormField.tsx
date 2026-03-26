"use client";

export function FormField({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-semibold">{label}</span>
      <input
        className="rounded-md border border-[#bdb4a2] bg-white px-3 py-2"
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}
