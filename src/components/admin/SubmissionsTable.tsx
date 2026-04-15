import type { SubmissionRecord } from "@/lib/forms/types";
import { getSubmissionSummaryFields } from "@/lib/forms/types";

type Props = {
  rows: SubmissionRecord[];
};

function toExportText(rows: SubmissionRecord[]) {
  return rows
    .map((row) => {
      const summary = getSubmissionSummaryFields(row)
        .map((field) => `${field.label}: ${field.value}`)
        .join(" | ");
      return `${row.createdAt} | ${row.type} | ${row.fullName} | ${row.phone} | ${summary} | ${row.message}`;
    })
    .join("\n");
}

export function SubmissionsTable({ rows }: Props) {
  if (rows.length === 0) {
    return <p>No submissions yet.</p>;
  }

  return (
    <div className="grid gap-4">
      <label className="grid gap-1 text-sm">
        <span className="font-semibold">Copy/Export (filtered rows)</span>
        <textarea
          readOnly
          value={toExportText(rows)}
          className="min-h-24 rounded-md border border-[#bdb4a2] bg-white px-3 py-2 text-xs"
        />
      </label>

      {rows.map((row) => (
        <article className="rounded-md border border-[#c8c1b1] bg-[var(--surface)] p-3" key={row.id}>
          <p className="text-xs text-slate-600">{row.createdAt}</p>
          <p className="font-semibold text-[var(--brand)]">{row.type}</p>
          <p className="text-sm">{row.fullName} | {row.phone} | {row.email}</p>
          <div className="mt-2 grid gap-1 text-xs text-slate-700 sm:grid-cols-3">
            {getSubmissionSummaryFields(row).map((field) => (
              <p key={`${row.id}-${field.label}`}>
                <span className="font-semibold">{field.label}:</span> {field.value}
              </p>
            ))}
          </div>
          <p className="mt-2 text-sm">{row.message}</p>
          <details className="mt-2">
            <summary className="cursor-pointer text-xs font-semibold text-[var(--brand)]">Full submission payload</summary>
            <pre className="mt-2 overflow-x-auto rounded-md border border-[#d8c1c1] bg-white p-2 text-xs">{JSON.stringify(row, null, 2)}</pre>
          </details>
        </article>
      ))}
    </div>
  );
}
