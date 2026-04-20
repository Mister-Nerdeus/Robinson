import { Section } from "@/components/site/Section";
import { getSubmissions } from "@/lib/forms/actions";
import { SubmissionFilters } from "@/components/admin/SubmissionFilters";
import { SubmissionsTable } from "@/components/admin/SubmissionsTable";
import { getRuntimeEnv, isAdminReviewEnabled } from "@/lib/runtime/env";
import type { SubmissionRecord } from "@/lib/forms/types";

type SearchParams = {
  type?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
};

function filterRows(rows: SubmissionRecord[], searchParams: SearchParams) {
  const { type, status, dateFrom, dateTo } = searchParams;

  return rows.filter((row) => {
    if (type && row.type !== type) {
      return false;
    }

    if (status && row.lifecycleState !== status) {
      return false;
    }

    if (dateFrom) {
      const start = `${dateFrom}T00:00:00.000Z`;
      if (row.createdAt < start) {
        return false;
      }
    }

    if (dateTo) {
      const end = `${dateTo}T23:59:59.999Z`;
      if (row.createdAt > end) {
        return false;
      }
    }

    return true;
  });
}

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const runtime = getRuntimeEnv();

  if (!isAdminReviewEnabled()) {
    return (
      <Section title="Admin Submissions">
        <p>Admin review is blocked by runtime security policy.</p>
        <p className="mt-2 text-sm text-slate-700">
          Non-production review requires explicit enablement and a configured review access secret.
        </p>
      </Section>
    );
  }

  const rows = await getSubmissions();
  const filtered = filterRows(rows, params);

  return (
    <Section title="Admin Submissions Workspace">
      <p className="mb-3 text-sm">
        Protected review surface. Runtime mode: <span className="font-semibold">{runtime.mode}</span>.
      </p>
      <p className="mb-4 rounded-md border border-[#d8c1c1] bg-[#fff7f6] p-3 text-sm">
        Internal triage only. This workspace is guarded by runtime policy and explicit review-access control.
      </p>

      <SubmissionFilters
        selectedType={params.type}
        selectedStatus={params.status}
        dateFrom={params.dateFrom}
        dateTo={params.dateTo}
      />
      <p className="mt-3 text-xs text-slate-600">
        Showing {filtered.length} of {rows.length} submissions.
      </p>
      <div className="mt-3">
        <SubmissionsTable rows={filtered} />
      </div>
    </Section>
  );
}
