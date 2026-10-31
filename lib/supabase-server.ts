import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
/** Cookie-backed client for Server Components and Route Handlers. RLS applies as the logged-in user. */
export function serverClient() {
  const store = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list: { name: string; value: string; options: CookieOptions }[]) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* called from a Server Component: middleware refreshes instead */ } },
    },
  });
}
