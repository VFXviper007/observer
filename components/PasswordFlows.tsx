"use client";
import { useEffect, useState } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
const field = "mt-2 w-full border border-dim bg-void px-3 py-3 font-mono text-sm text-paper focus:border-phosphor";
const btn = "border border-phosphor bg-phosphor px-6 py-3 font-mono text-sm tracking-widest text-void hover:bg-transparent hover:text-phosphor disabled:opacity-50";
// Implicit flow: the emailed link works even if opened on a different device/browser.
const client = (): SupabaseClient => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { flowType: "implicit", persistSession: false, detectSessionInUrl: true } });

export function ForgotForm() {
  const [sent, setSent] = useState(false); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const email = String(new FormData(e.currentTarget).get("email") || "").trim().toLowerCase();
    const { error } = await client().auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/reset-password` });
    setBusy(false);
    if (error && /rate limit/i.test(error.message)) setErr("Too many requests. Try again later."); else setSent(true); // same message either way
  }
  if (sent) return <p role="status" className="border-l-2 border-phosphor bg-surface px-5 py-4 font-mono text-sm text-paper/85">If that address is registered, a reset link is on its way.</p>;
  return (
    <form onSubmit={submit} className="space-y-6">
      {err && <p role="alert" className="font-mono text-sm text-amber">{err}</p>}
      <div><label htmlFor="email" className="font-mono text-xs tracking-widest text-paper/70">EMAIL</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={field} /></div>
      <button disabled={busy} className={btn}>{busy ? "SENDING" : "SEND RESET LINK"}</button>
    </form>
  );
}

export function ResetForm() {
  const [sb] = useState(client); const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => {
    const { data } = sb.auth.onAuthStateChange((ev) => { if (ev === "PASSWORD_RECOVERY") setReady(true); });
    sb.auth.getSession().then(({ data: d }) => { if (d.session) setReady(true); });
    return () => data.subscription.unsubscribe();
  }, [sb]);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr("");
    const f = new FormData(e.currentTarget), p = String(f.get("password")), c = String(f.get("confirm"));
    if (p.length < 10) return setErr("Use at least 10 characters.");
    if (p !== c) return setErr("Passwords do not match.");
    setBusy(true);
    const { error } = await sb.auth.updateUser({ password: p });
    setBusy(false);
    if (error) setErr("Could not update the password. The link may have expired; request a new one."); else setDone(true);
  }
  if (done) return <p role="status" className="border-l-2 border-phosphor bg-surface px-5 py-4 font-mono text-sm text-paper/85">Password updated. <a href="/login" className="text-amber underline">Log in</a>.</p>;
  if (!ready) return <p className="font-mono text-sm text-paper/70">Waiting for a valid reset link. Open the link from your email, or <a href="/forgot-password" className="text-amber underline">request a new one</a>.</p>;
  return (
    <form onSubmit={submit} className="space-y-6">
      {err && <p role="alert" className="font-mono text-sm text-amber">{err}</p>}
      <div><label htmlFor="password" className="font-mono text-xs tracking-widest text-paper/70">NEW PASSWORD</label>
        <input id="password" name="password" type="password" autoComplete="new-password" required className={field} /></div>
      <div><label htmlFor="confirm" className="font-mono text-xs tracking-widest text-paper/70">CONFIRM PASSWORD</label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" required className={field} /></div>
      <button disabled={busy} className={btn}>{busy ? "SAVING" : "SET PASSWORD"}</button>
    </form>
  );
}
