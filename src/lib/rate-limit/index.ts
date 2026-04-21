import { checkRateLimit as checkInMemoryRateLimit } from "@/lib/rate-limit/memory";
import { checkFileRateLimit } from "@/lib/rate-limit/file";

type RateLimitMode = "memory" | "file";

function readMode(): RateLimitMode {
  const mode = (process.env.RATE_LIMIT_MODE || "file").trim().toLowerCase();
  return mode === "memory" ? "memory" : "file";
}

export async function checkRateLimit(key: string, max: number, windowMs: number) {
  if (readMode() === "memory") {
    return checkInMemoryRateLimit(key, max, windowMs);
  }
  return checkFileRateLimit(key, max, windowMs);
}
