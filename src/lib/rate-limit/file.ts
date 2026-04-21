import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Record<string, RateLimitRecord>;

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "rate-limit.json");

async function readStore(): Promise<RateLimitStore> {
  await mkdir(dataDir, { recursive: true });
  try {
    const raw = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as RateLimitStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeStore(store: RateLimitStore) {
  await writeFile(dataFile, JSON.stringify(store, null, 2), "utf8");
}

export async function checkFileRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const store = await readStore();

  for (const [storeKey, record] of Object.entries(store)) {
    if (record.resetAt < now) {
      delete store[storeKey];
    }
  }

  const current = store[key];
  if (!current || now > current.resetAt) {
    store[key] = { count: 1, resetAt: now + windowMs };
    await writeStore(store);
    return { allowed: true, remaining: max - 1, resetAt: store[key].resetAt };
  }

  if (current.count >= max) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  store[key] = current;
  await writeStore(store);
  return { allowed: true, remaining: max - current.count, resetAt: current.resetAt };
}
