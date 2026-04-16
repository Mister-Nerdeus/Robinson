import type { SubmissionType, SubmissionLifecycleState } from "@/lib/forms/types";

type Props = {
  selectedType?: string;
  selectedStatus?: string;
  dateFrom?: string;
  dateTo?: string;
};

const typeOptions: Array<{ value: SubmissionType; label: string }> = [
  { value: "general", label: "General" },
  { value: "septic-service", label: "Septic Service" },
  { value: "evaluation", label: "Evaluation" },
  { value: "rental", label: "Rental" },
  { value: "commercial-service", label: "Commercial" },
];

const statusOptions: Array<{ value: SubmissionLifecycleState; label: string }> = [
  { value: "new", label: "New" },
  { value: "in-progress", label: "In Progress" },
  { value: "scheduled", label: "Scheduled" },
  { value: "closed", label: "Closed" },
];

export function SubmissionsFilters({ selectedType = "", selectedStatus = "", dateFrom = "", dateTo = "" }: Props) {
  return (
    <form className="grid gap-3 rounded-md border border-[#d8c1c1] bg-[#fff7f6] p-4 md:grid-cols-[1fr,1fr,1fr,1fr,auto] md:items-end" method="get">
      <label className="grid gap-1 text-sm">
        <span className="font-semibold">Service Type</span>
        <select name="type" defaultValue={selectedType} className="rounded-md border border-[#bdb4a2] bg-white px-3 py-2">
          <option value="">All</option>
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1 text-sm">
        <span className="font-semibold">Lifecycle Status</span>
        <select name="status" defaultValue={selectedStatus} className="rounded-md border border-[#bdb4a2] bg-white px-3 py-2">
          <option value="">All</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1 text-sm">
        <span className="font-semibold">Date From</span>
        <input className="rounded-md border border-[#bdb4a2] bg-white px-3 py-2" type="date" name="dateFrom" defaultValue={dateFrom} />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="font-semibold">Date To</span>
        <input className="rounded-md border border-[#bdb4a2] bg-white px-3 py-2" type="date" name="dateTo" defaultValue={dateTo} />
      </label>

      <div className="flex gap-2">
        <button type="submit" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white">
          Apply
        </button>
        <a href="/admin/submissions" className="rounded-md border border-[#bdb4a2] bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          Reset
        </a>
      </div>
    </form>
  );
}