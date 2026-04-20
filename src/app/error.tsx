"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { company } from "@/config/company";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container py-10">
      <div className="grid gap-4">
        <EmptyState
          title="Something went wrong"
          description={`Retry this page. If the issue continues and your need is urgent, call ${company.primaryPhone}.`}
          actionHref="/contact"
          actionLabel="Open Contact Router"
        />
        <button onClick={reset} className="inline-flex w-fit min-h-11 items-center rounded-md border border-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--brand)]">
          Retry
        </button>
      </div>
    </main>
  );
}
