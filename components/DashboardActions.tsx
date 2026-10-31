"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function DashboardActions({ consent, eventId, canDecline }: { consent: string; eventId?: string; canDecline: boolean }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  async function call(action: string, body: object, confirmMsg?: string) {
    if (confirmMsg && !confirm(confirmMsg)) return;
    setBusy(true); setErr("");
    const res = await fetch(`/api/player/${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (d.ok) router.refresh(); else setErr(d.error || "Something went wrong.");
  }
  const b = "border px-4 py-2 font-mono text-xs tracking-widest disabled:opacity-50";
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {canDecline && eventId && <button disabled={busy} onClick={() => call("decline", { eventId }, "Decline your place? Another participant will be chosen.")} className={`${b} border-amber text-amber hover:bg-amber hover:text-void`}>DECLINE PARTICIPATION</button>}
      {consent === "OPTED_IN"
        ? <button disabled={busy} onClick={() => call("consent", { optIn: false }, "Withdraw from THE OBSERVER? You will leave the selection pool.")} className={`${b} border-dim text-paper/80 hover:border-amber`}>WITHDRAW FROM THE GAME</button>
        : <button disabled={busy} onClick={() => call("consent", { optIn: true })} className={`${b} border-phosphor text-phosphor hover:bg-phosphor hover:text-void`}>RE-ENTER THE POOL</button>}
      {err && <p role="alert" className="w-full font-mono text-xs text-amber">{err}</p>}
    </div>
  );
}
