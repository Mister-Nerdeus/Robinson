import type { ReactNode } from "react";

type FormFieldGroupProps = {
  children: ReactNode;
};

export function FormFieldGroup({ children }: FormFieldGroupProps) {
  return <div className="grid gap-5 lg:grid-cols-2">{children}</div>;
}
