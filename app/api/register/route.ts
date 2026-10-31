import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validation";
import { anonClient } from "@/lib/supabase";
import { getEventInfo } from "@/lib/event";
import { limited } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";
const fail = (status: number, error: string, fields?: Record<string, string>) => NextResponse.json({ ok: false, error, fields }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(`reg:${ip}`)) return fail(429, "Too many attempts. Wait a few minutes and try again.");

  let body: unknown;
  try { body = await req.json(); } catch { return fail(400, "Invalid request."); }
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const i of parsed.error.issues) fields[String(i.path[0])] ??= i.message;
    return fail(422, "Check the highlighted fields.", fields);
  }
  const ev = await getEventInfo();
  if (!ev.registrationOpen) return fail(403, "Registration is not open right now.");

  const site = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/$/, "");
  const { fullName, email, password } = parsed.data;
  const { data, error } = await anonClient().auth.signUp({
    email, password,
    options: { data: { full_name: fullName, consent: "true" }, emailRedirectTo: `${site}/registered?verified=1` },
  });
  if (error) {
    const m = error.message || "";
    if ((error as { code?: string }).code === "user_already_exists" || /already registered/i.test(m)) return fail(409, "That email is already registered.", { email: "Already registered. Log in instead." });
    if (/REGISTRATION_CLOSED/.test(m)) return fail(403, "Registration is not open right now.");
    if (/rate limit/i.test(m)) return fail(429, "Too many emails sent. Try again later.");
    if (/password/i.test(m)) return fail(422, "That password was rejected.", { password: "Choose a stronger password." });
    console.error("signUp error:", m);
    return fail(500, "Registration failed. Try again shortly.");
  }
  // confirmed=true when Supabase "Confirm email" is OFF (a session is returned immediately).
  return NextResponse.json({ ok: true, confirmed: !!data.session });
}
