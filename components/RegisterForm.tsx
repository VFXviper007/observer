"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Errs = Record<string, string>;
const field = "mt-2 w-full border border-dim bg-void px-3 py-3 font-mono text-sm text-paper placeholder:text-paper/30 focus:border-phosphor";

export default function RegisterForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errs>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErrors({}); setFormError("");
    const f = new FormData(e.currentTarget);
    const payload = { fullName: f.get("fullName"), email: f.get("email"), password: f.get("password"),
      confirmPassword: f.get("confirmPassword"), consent: f.get("consent") === "on" };
    try {
      const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.ok) { router.push("/registered"); return; }
      setErrors(data.fields || {}); setFormError(data.error || "Registration failed.");
    } catch { setFormError("Could not reach the system. Check your connection."); }
    setBusy(false);
  }

  const Err = ({ id }: { id: string }) => errors[id] ? <p id={`${id}-e`} className="mt-1 font-mono text-xs text-amber">{errors[id]}</p> : null;
  const a = (id: string) => ({ "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-e` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {formError && <p role="alert" className="border-l-2 border-amber bg-surface px-4 py-3 font-mono text-sm text-amber">{formError}</p>}
      <div><label htmlFor="fullName" className="font-mono text-xs tracking-widest text-paper/70">FULL NAME</label>
        <input id="fullName" name="fullName" autoComplete="name" required className={field} {...a("fullName")} /><Err id="fullName" /></div>
      <div><label htmlFor="email" className="font-mono text-xs tracking-widest text-paper/70">COLLEGE EMAIL</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={field} {...a("email")} /><Err id="email" /></div>
      <div><label htmlFor="password" className="font-mono text-xs tracking-widest text-paper/70">PASSWORD</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={10} required className={field} {...a("password")} />
        <p className="mt-1 font-mono text-xs text-paper/50">At least 10 characters.</p><Err id="password" /></div>
      <div><label htmlFor="confirmPassword" className="font-mono text-xs tracking-widest text-paper/70">CONFIRM PASSWORD</label>
        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className={field} {...a("confirmPassword")} /><Err id="confirmPassword" /></div>
      <div className="border border-dim/60 bg-surface p-4">
        <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-paper/80">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-[#9DBFA2]" {...a("consent")} />
          <span>I choose to take part in THE OBSERVER. I understand it is a fictional game, that I may be randomly selected as one of five participants, and that I can withdraw at any time.</span>
        </label><Err id="consent" />
      </div>
      <button disabled={busy} className="inline-flex items-center gap-3 border border-phosphor bg-phosphor px-6 py-3 font-mono text-sm tracking-widest text-void hover:bg-transparent hover:text-phosphor disabled:opacity-50">
        {busy && <Loader2 size={16} className="animate-spin" aria-hidden />}{busy ? "SENDING" : "SIGN THE REGISTER"}
      </button>
    </form>
  );
}
