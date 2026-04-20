import { company } from "@/config/company";

export function FormErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-[#efd0d0] bg-[#fff6f6] px-3 py-2 text-sm text-[#6d1f1f]" aria-live="assertive" aria-atomic="true">
      <p>{message}</p>
      <p className="mt-1 text-xs">If this keeps failing and your need is urgent, call {company.primaryPhone} now.</p>
    </div>
  );
}
