"use client";
import { useState } from "react";
import { Lock } from "lucide-react";
const items = ["FRAGMENT 04: AUDIO LOG, STATION B", "FRAGMENT 05: PERSONNEL ROSTER", "FRAGMENT 06: THE LAST SESSION", "FRAGMENT 07: [REMOVED]"];
export default function SealedFragments() {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <ul className="divide-y divide-dim/30 border border-dim bg-surface">
        {items.map((t) => (
          <li key={t}><button onClick={() => setMsg(`${t.split(":")[0]}: ACCESS DENIED. Clearance insufficient.`)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-mono text-xs text-paper/70 hover:text-amber">
            <span>{t}</span><Lock size={14} aria-hidden className="shrink-0 text-dim" /></button></li>
        ))}
      </ul>
      <p role="status" className="mt-2 min-h-[1.25rem] font-mono text-xs text-amber">{msg}</p>
    </div>
  );
}
