// Best-effort in-memory limiter (per serverless instance). Swap for Upstash Redis for strict limits.
const hits = new Map<string, number[]>();
export function limited(key: string, max = 5, windowMs = 10 * 60_000) {
  const now = Date.now(), arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > max;
}
