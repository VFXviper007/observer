import { NextResponse } from "next/server";
import { z } from "zod";
import { serverClient } from "@/lib/supabase-server";
export const dynamic = "force-dynamic";

/** Player actions run as the logged-in user; the SQL functions enforce auth.uid() themselves. */
export async function POST(req: Request, { params }: { params: { action: string } }) {
  const supabase = serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  if (params.action === "consent") {
    const b = z.object({ optIn: z.boolean() }).safeParse(await req.json().catch(() => null));
    if (!b.success) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 422 });
    const { error } = await supabase.rpc("set_my_consent", { p_opt_in: b.data.optIn });
    return error ? NextResponse.json({ ok: false, error: "Could not update consent." }, { status: 400 }) : NextResponse.json({ ok: true });
  }
  if (params.action === "decline") {
    const b = z.object({ eventId: z.string().uuid() }).safeParse(await req.json().catch(() => null));
    if (!b.success) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 422 });
    const { error } = await supabase.rpc("decline_selection", { p_event: b.data.eventId });
    return error ? NextResponse.json({ ok: false, error: "No active selection to decline." }, { status: 400 }) : NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 404 });
}
