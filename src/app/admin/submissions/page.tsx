import { Section } from "@/components/site/Section";
import { SubmissionFilters } from "@/components/admin/SubmissionFilters";
import { SubmissionsTable } from "@/components/admin/SubmissionsTable";
import { getRuntimeEnv } from "@/lib/runtime/env";
import { hasConfiguredAdminTokens, resolveAdminIdentity } from "@/lib/auth";
import { listSubmissionReport, listSubmissions } from "@/lib/submissions/repository";
import { headers } from "next/headers";

type SearchParams = {
  type?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  source?: string;
};

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const runtime = getRuntimeEnv();
  const requestHeaders = await headers();
  const identity = resolveAdminIdentity(
    new Request("http://localhost/admin/submissions", { headers: requestHeaders }),
  );

  if (!runtime.enableAdminSubmissionsReview) {
    return (
      <Section title="Admin Submissions" layout="marketing">
        <p>Admin review is blocked by runtime security policy.</p>
      </Section>
    );
  }
  if (!hasConfiguredAdminTokens()) {
    return (
      <Section title="Admin Submissions" layout="marketing">
        <p>Admin authentication is not configured.</p>
        <p className="mt-2 text-sm text-slate-700">Set `ADMIN_OWNER_TOKEN` and/or `ADMIN_OPS_TOKEN`.</p>
      </Section>
    );
  }
  if (!identity.authenticated || (identity.role !== "owner" && identity.role !== "ops")) {
    return (
      <Section title="Admin Submissions" layout="marketing">
        <p>Admin access requires authenticated owner/ops identity.</p>
      </Section>
    );
  }

  const filters = {
    type: params.type,
    status: params.status,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
    source: params.source,
  };
  const rows = await listSubmissions(filters);
  const report = await listSubmissionReport(filters);

  return (
    <Section title="Admin Submissions Workspace" layout="marketing">
      <p className="mb-3 text-sm">
        Protected review surface. Runtime mode: <span className="font-semibold">{runtime.mode}</span>. Role:{" "}
        <span className="font-semibold">{identity.role}</span>.
      </p>
      <p className="mb-4 rounded-md border border-[#d8c1c1] bg-[#fff7f6] p-3 text-sm">
        Internal triage only. This workspace is guarded by runtime policy and authenticated owner/ops access.
      </p>

      <SubmissionFilters
        selectedType={params.type}
        selectedStatus={params.status}
        dateFrom={params.dateFrom}
        dateTo={params.dateTo}
        selectedSource={params.source}
      />
      <p className="mt-3 text-xs text-slate-600">
        Showing {rows.length} filtered submissions.
      </p>
      <div className="mt-2 rounded-md border border-[#e3d9cb] bg-[#fffdf9] p-3 text-xs text-slate-700">
        <p className="font-semibold text-slate-900">Export grouping preview (lane/status/source)</p>
        {report.length === 0 ? <p className="mt-1">No grouped rows for current filters.</p> : null}
        {report.slice(0, 8).map((entry) => (
          <p key={`${entry.lane}-${entry.lifecycleState}-${entry.attributionSource}`}>
            {entry.lane} | {entry.lifecycleState} | {entry.attributionSource}: {entry.count}
          </p>
        ))}
      </div>
      <div className="mt-3">
        <SubmissionsTable rows={rows} />
      </div>
    </Section>
  );
}
