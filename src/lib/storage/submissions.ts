import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  submissionLifecycleStates,
  type SubmissionLifecycleState,
  type SubmissionRecord,
} from "@/lib/forms/types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "submissions.json");

async function ensureFile() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, "[]", "utf8");
  }
}

function normalizeRecord(record: SubmissionRecord): SubmissionRecord {
  const fallbackState: SubmissionLifecycleState = "new";
  const rawState = (record as { lifecycleState?: string }).lifecycleState;
  const lifecycleState =
    submissionLifecycleStates.find((state) => state === rawState) ?? fallbackState;
  const legacyAddress = (record as { address?: string }).address?.trim() ?? "";
  const streetAddress = (record as { streetAddress?: string }).streetAddress?.trim() ?? "";
  const city = (record as { city?: string }).city?.trim() ?? "";
  const zip = (record as { zip?: string }).zip?.trim() ?? "";
  const state = (record as { state?: string }).state?.trim() || "MI";
  const computedAddress =
    streetAddress && city && zip ? `${streetAddress}, ${city}, ${state} ${zip}` : legacyAddress;

  const problemSignsRaw = (record as { problemSigns?: string[] | string }).problemSigns;
  const problemSigns = Array.isArray(problemSignsRaw)
    ? problemSignsRaw
    : typeof problemSignsRaw === "string" && problemSignsRaw.trim()
      ? [problemSignsRaw.trim()]
      : [];

  const accessIssuesRaw = (record as { accessIssues?: string[] | string }).accessIssues;
  const accessIssues = Array.isArray(accessIssuesRaw)
    ? accessIssuesRaw
    : typeof accessIssuesRaw === "string" && accessIssuesRaw.trim()
      ? [accessIssuesRaw.trim()]
      : [];

  return {
    ...record,
    lifecycleState,
    internalNote: (record as { internalNote?: string }).internalNote?.trim() ?? "",
    triageUpdatedAt:
      (record as { triageUpdatedAt?: string }).triageUpdatedAt || record.createdAt,
    streetAddress: streetAddress || legacyAddress,
    city,
    zip,
    state,
    address: computedAddress,
    ...(record.type === "septic-service"
      ? {
          problemSigns,
          accessIssues,
          tankLocationKnown:
            (record as { tankLocationKnown?: "yes" | "no" | "unsure" }).tankLocationKnown ||
            "unsure",
          additionalWarningDetails:
            (record as { additionalWarningDetails?: string }).additionalWarningDetails || "",
          existingCustomer:
            (record as { existingCustomer?: "yes" | "no" | "unsure" }).existingCustomer ||
            "unsure",
          propertyUsage:
            (record as { propertyUsage?: "residential" | "commercial" | "unsure" })
              .propertyUsage || "unsure",
          systemPumpedBefore:
            (record as { systemPumpedBefore?: "yes" | "no" | "unsure" }).systemPumpedBefore ||
            "unsure",
        }
      : {}),
    ...(record.type === "evaluation"
      ? {
          accessInstructions: (record as { accessInstructions?: string }).accessInstructions || "",
          utilityOnStatus:
            (record as { utilityOnStatus?: "yes" | "no" | "unknown" }).utilityOnStatus ||
            "unknown",
          occupantPresent:
            (record as { occupantPresent?: "yes" | "no" | "unknown" }).occupantPresent ||
            "unknown",
          propertyType:
            (record as {
              propertyType?: "single-family" | "multi-family" | "vacant-land" | "other";
            }).propertyType || "other",
        }
      : {}),
    ...(record.type === "rental"
      ? {
          handwashStationNeeded:
            (record as { handwashStationNeeded?: "yes" | "no" }).handwashStationNeeded || "no",
          adaUnitNeeded: (record as { adaUnitNeeded?: "yes" | "no" }).adaUnitNeeded || "no",
          placementSurface:
            (record as {
              placementSurface?: "grass" | "gravel" | "pavement" | "mixed" | "unknown";
            }).placementSurface || "unknown",
          siteAccessNotes: (record as { siteAccessNotes?: string }).siteAccessNotes || "",
        }
      : {}),
    ...(record.type === "commercial-service"
      ? {
          accessHours: (record as { accessHours?: string }).accessHours || "",
          greaseTrapLocation:
            (record as { greaseTrapLocation?: "indoor" | "outdoor" | "mixed" | "unknown" })
              .greaseTrapLocation || "unknown",
          previousServiceHistoryKnown:
            (record as { previousServiceHistoryKnown?: "yes" | "no" | "unknown" })
              .previousServiceHistoryKnown || "unknown",
          serviceUrgency:
            (record as { serviceUrgency?: "normal" | "urgent" | "emergency" }).serviceUrgency ||
            record.urgency,
        }
      : {}),
    ...(record.type === "general"
      ? {
          serviceLocationInvolved:
            (record as { serviceLocationInvolved?: "yes" | "no" | "unsure" })
              .serviceLocationInvolved || "unsure",
        }
      : {}),
  };
}

export async function listSubmissions(): Promise<SubmissionRecord[]> {
  await ensureFile();
  const raw = await readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw) as SubmissionRecord[];
  return parsed
    .map((row) => normalizeRecord(row))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function saveSubmission(record: SubmissionRecord): Promise<void> {
  const existing = await listSubmissions();
  existing.unshift(normalizeRecord(record));
  await writeFile(dataFile, JSON.stringify(existing, null, 2), "utf8");
}

export async function updateSubmissionTriageById(
  id: string,
  lifecycleState: SubmissionLifecycleState,
  internalNote: string,
): Promise<boolean> {
  const existing = await listSubmissions();
  const next = existing.map((row) => {
    if (row.id !== id) {
      return row;
    }

    return {
      ...row,
      lifecycleState,
      internalNote: internalNote.trim(),
      triageUpdatedAt: new Date().toISOString(),
    };
  });

  const changed = next.some((row, index) => {
    const prev = existing[index];
    return row.id === id && (row.lifecycleState !== prev.lifecycleState || row.internalNote !== prev.internalNote);
  });

  if (!changed) {
    return false;
  }

  await writeFile(dataFile, JSON.stringify(next, null, 2), "utf8");
  return true;
}
