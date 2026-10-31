import { NextResponse } from "next/server";
import { serverClient } from "@/lib/supabase-server";
export async function POST(req: Request) {
  await serverClient().auth.signOut();
  return NextResponse.redirect(new URL("/", req.url), { status: 303 });
}
