import { createClient } from "@supabase/supabase-js";
/** Server-only anon client. No session persistence; RLS still applies. */
export function anonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("SUPABASE_NOT_CONFIGURED");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, flowType: "implicit" } });
}
