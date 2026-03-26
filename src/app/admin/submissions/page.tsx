import { Section } from "@/components/site/Section";
import { getSubmissions } from "@/lib/forms/actions";

export default async function AdminSubmissionsPage() {
  if (process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW !== "true") {
    return (
      <Section title="Admin Submissions">
        <p>Disabled. Set ENABLE_ADMIN_SUBMISSIONS_REVIEW=true in local env to enable.</p>
      </Section>
    );
  }

  const rows = await getSubmissions();

  return (
    <Section title="Admin Submissions">
      <p className="mb-4">Local-only review surface. Do not expose publicly.</p>
      <div className="grid gap-3">
        {rows.length === 0 ? <p>No submissions yet.</p> : null}
        {rows.map((row) => (
          <article className="rounded-md border border-[#c8c1b1] bg-[var(--surface)] p-3" key={row.id}>
            <p className="text-xs">{row.createdAt}</p>
            <p className="font-semibold">{row.type}</p>
            <p>{row.fullName} | {row.phone} | {row.email}</p>
            <p>{row.message}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
