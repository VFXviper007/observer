import { NextResponse } from "next/server";
import { z } from "zod";
import { serverClient } from "@/lib/supabase-server";
import { limited } from "@/lib/rateLimit";
export const dynamic = "force-dynamic";
const schema = z.object({ email: z.string().trim().toLowerCase().email().max(254), password: z.string().min(1).max(72) });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(`login:${ip}`, 10, 10 * 60_000)) return NextResponse.json({ ok: false, error: "Too many attempts. Wait a few minutes." }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Enter your email and password." }, { status: 422 });
  const { error } = await serverClient().auth.signInWithPassword(parsed.data);
  if (error) {
    if (/not confirmed/i.test(error.message)) return NextResponse.json({ ok: false, error: "Confirm your email first. Check your inbox for the link." }, { status: 401 });
    return NextResponse.json({ ok: false, error: "Email or password is incorrect." }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
