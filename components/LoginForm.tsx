"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
const field = "mt-2 w-full border border-dim bg-void px-3 py-3 font-mono text-sm text-paper focus:border-phosphor";
export default function LoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: f.get("email"), password: f.get("password") }) });
      const data = await res.json();
      if (data.ok) { router.push("/dashboard"); router.refresh(); return; }
      setError(data.error || "Login failed.");
    } catch { setError("Could not reach the system. Check your connection."); }
    setBusy(false);
  }
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <p role="alert" className="border-l-2 border-amber bg-surface px-4 py-3 font-mono text-sm text-amber">{error}</p>}
      <div><label htmlFor="email" className="font-mono text-xs tracking-widest text-paper/70">EMAIL</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={field} /></div>
      <div><label htmlFor="password" className="font-mono text-xs tracking-widest text-paper/70">PASSWORD</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={field} /></div>
      <div className="flex items-center justify-between gap-4">
        <button disabled={busy} className="inline-flex items-center gap-3 border border-phosphor bg-phosphor px-6 py-3 font-mono text-sm tracking-widest text-void hover:bg-transparent hover:text-phosphor disabled:opacity-50">
          {busy && <Loader2 size={16} className="animate-spin" aria-hidden />}{busy ? "CHECKING" : "ENTER SYSTEM"}</button>
        <Link href="/forgot-password" className="font-mono text-xs text-paper/70 hover:text-phosphor">Forgot password?</Link>
      </div>
    </form>
  );
}
