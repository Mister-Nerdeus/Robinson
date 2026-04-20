import { updateSubmissionTriage } from "@/lib/forms/actions";
import {
  getSubmissionSummaryFields,
  submissionLifecycleStates,
  type SubmissionLifecycleState,
  type SubmissionRecord,
} from "@/lib/forms/types";

type Props = {
  rows: SubmissionRecord[];
};

const statusLabel: Record<SubmissionLifecycleState, string> = {
  new: "New",
  "in-progress": "In Progress",
  scheduled: "Scheduled",
  closed: "Closed",
};

const statusTone: Record<SubmissionLifecycleState, string> = {
  new: "bg-[#fff3c4] border-[#eedf9f]",
  "in-progress": "bg-[#e6f2ff] border-[#bdd8f7]",
  scheduled: "bg-[#e9f5e5] border-[#c9e3bc]",
  closed: "bg-[#efeef5] border-[#d5d2e4]",
};

function toExportText(rows: SubmissionRecord[]) {
  return rows
    .map((row) => {
      const summary = getSubmissionSummaryFields(row)
        .map((field) => `${field.label}: ${field.value}`)
        .join(" | ");
      const note = row.internalNote ? ` | Internal Note: ${row.internalNote}` : "";
      return `${row.createdAt} | ${row.type} | ${row.fullName} | ${row.phone} | Status: ${row.lifecycleState} | ${summary} | ${row.message}${note}`;
    })
    .join("\n");
}

function csvEscape(value: string) {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}

function toCsv(rows: SubmissionRecord[]) {
  const header = [
    "id",
    "createdAt",
    "triageUpdatedAt",
    "type",
    "lifecycleState",
    "fullName",
    "phone",
    "email",
    "address",
    "urgency",
    "message",
  ];

  const lines = rows.map((row) =>
    [
      row.id,
      row.createdAt,
      row.triageUpdatedAt,
      row.type,
      row.lifecycleState,
      row.fullName,
      row.phone,
      row.email,
      row.address,
      row.urgency,
      row.message,
    ]
      .map((value) => csvEscape(String(value ?? "")))
      .join(","),
  );

  return [header.join(","), ...lines].join("\n");
}

export function SubmissionsTable({ rows }: Props) {
  if (rows.length === 0) {
    return <p>No submissions yet.</p>;
  }

  const csv = toCsv(rows);
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

  return (
    <div className="grid gap-4">
      <a
        href={csvHref}
        download={`submissions-export-${new Date().toISOString().slice(0, 10)}.csv`}
        className="inline-flex w-fit rounded-md border border-[var(--brand)] bg-white px-3 py-2 text-xs font-semibold text-[var(--brand)]"
      >
        Export CSV
      </a>

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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-slate-600">{row.createdAt}</p>
            <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${statusTone[row.lifecycleState]}`}>
              {statusLabel[row.lifecycleState]}
            </span>
          </div>
          <p className="font-semibold text-[var(--brand)]">{row.type}</p>
          <p className="text-sm">{row.fullName} | {row.phone} | {row.email}</p>
          <p className="mt-1 text-xs text-slate-600">
            Internal note: {row.internalNote ? "present" : "none"} | Triage updated: {row.triageUpdatedAt}
          </p>
          <div className="mt-2 grid gap-1 text-xs text-slate-700 sm:grid-cols-3">
            {getSubmissionSummaryFields(row).map((field) => (
              <p key={`${row.id}-${field.label}`}>
                <span className="font-semibold">{field.label}:</span> {field.value}
              </p>
            ))}
          </div>
          <p className="mt-2 text-sm">{row.message}</p>

          <form action={updateSubmissionTriage} className="mt-3 grid gap-2 rounded-md border border-[#e0d5c3] bg-[#fffaf4] p-3 md:grid-cols-[170px,1fr,auto] md:items-end">
            <input type="hidden" name="id" value={row.id} />
            <label className="grid gap-1 text-xs">
              <span className="font-semibold">Lifecycle</span>
              <select name="lifecycleState" defaultValue={row.lifecycleState} className="rounded-md border border-[#bdb4a2] bg-white px-2 py-2 text-sm">
                {submissionLifecycleStates.map((state) => (
                  <option key={state} value={state}>
                    {statusLabel[state]}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-xs">
              <span className="font-semibold">Internal note (owner-only)</span>
              <textarea
                name="internalNote"
                defaultValue={row.internalNote}
                className="min-h-16 rounded-md border border-[#bdb4a2] bg-white px-2 py-2 text-sm"
                placeholder="Add triage context, callback notes, or scheduling follow-up"
              />
            </label>

            <button type="submit" className="rounded-md bg-[var(--brand)] px-3 py-2 text-xs font-semibold text-white">
              Save
            </button>
          </form>

          <details className="mt-2">
            <summary className="cursor-pointer text-xs font-semibold text-[var(--brand)]">Full submission payload</summary>
            <pre className="mt-2 overflow-x-auto rounded-md border border-[#d8c1c1] bg-white p-2 text-xs">{JSON.stringify(row, null, 2)}</pre>
          </details>
        </article>
      ))}
    </div>
  );
}
