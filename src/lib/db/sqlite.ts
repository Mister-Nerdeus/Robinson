import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

let db: DatabaseSync | null = null;

function databasePath(): string {
  const configured = (process.env.SUBMISSIONS_DB_PATH || "").trim();
  if (configured) {
    return path.isAbsolute(configured) ? configured : path.join(process.cwd(), configured);
  }

  return path.join(process.cwd(), "data", "submissions.sqlite");
}

function ensureDirectory(filePath: string) {
  mkdirSync(path.dirname(filePath), { recursive: true });
}

function migrate(connection: DatabaseSync) {
  connection.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;

    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      triage_updated_at TEXT NOT NULL,
      triage_updated_by TEXT NOT NULL,
      lifecycle_state TEXT NOT NULL,
      internal_note TEXT NOT NULL,
      submission_type TEXT NOT NULL,
      lane TEXT NOT NULL,
      attribution_source TEXT NOT NULL,
      attribution_path TEXT NOT NULL,
      attribution_referrer TEXT NOT NULL,
      correlation_id TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(submission_type);
    CREATE INDEX IF NOT EXISTS idx_submissions_lifecycle ON submissions(lifecycle_state);
    CREATE INDEX IF NOT EXISTS idx_submissions_lane ON submissions(lane);
    CREATE INDEX IF NOT EXISTS idx_submissions_attribution_source ON submissions(attribution_source);

    CREATE TABLE IF NOT EXISTS notification_delivery (
      submission_id TEXT NOT NULL,
      dedupe_key TEXT NOT NULL,
      channel TEXT NOT NULL,
      state TEXT NOT NULL,
      attempt_count INTEGER NOT NULL DEFAULT 0,
      message_id TEXT NOT NULL DEFAULT '',
      last_error TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      PRIMARY KEY(submission_id, dedupe_key)
    );

    CREATE INDEX IF NOT EXISTS idx_notification_delivery_submission ON notification_delivery(submission_id);
    CREATE INDEX IF NOT EXISTS idx_notification_delivery_state ON notification_delivery(state);
  `);
}

export function getSubmissionsDatabase(): DatabaseSync {
  if (db) {
    return db;
  }

  const dbPath = databasePath();
  ensureDirectory(dbPath);
  db = new DatabaseSync(dbPath);
  migrate(db);
  return db;
}

export function getSubmissionsDatabasePath(): string {
  return databasePath();
}
