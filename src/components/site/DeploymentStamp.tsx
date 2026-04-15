import { getRuntimeEnv } from "@/lib/runtime/env";

export function DeploymentStamp() {
  const env = getRuntimeEnv();

  if (!env.deploymentStampVisible) {
    return null;
  }

  const { commitSha, ref, buildTimestampUtc } = env.deploymentProvenance;

  return (
    <div className="rounded-md border border-[#d3c0c0] bg-[#fff8f7] px-3 py-2 text-[11px] text-slate-700">
      <p className="font-semibold uppercase tracking-[0.15em] text-[var(--brand)]">Deployment Provenance</p>
      <p>Mode: {env.mode}</p>
      <p>Commit: {commitSha}</p>
      <p>Ref: {ref}</p>
      <p>Built (UTC): {buildTimestampUtc}</p>
    </div>
  );
}
