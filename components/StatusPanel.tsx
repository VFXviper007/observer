"use client";
import { statusRows } from "@/content/site";
import { useSignal } from "@/lib/useSignal";
export default function StatusPanel() {
  const signal = useSignal();
  return (
    <section id="status" aria-labelledby="status-h" className="px-5 pb-24">
      <div className="mx-auto max-w-3xl border border-dim bg-surface font-mono text-sm">
        <h2 id="status-h" className="border-b border-dim px-5 py-2 text-xs tracking-widest text-dim">PROJECT RECORD / LIVE</h2>
        <dl className="divide-y divide-dim/30">
          {statusRows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-5 py-3"><dt className="text-paper/60">{k}</dt><dd className={k === "STATUS" ? "text-amber" : "text-phosphor"}>{v}</dd></div>
          ))}
          <div className="flex justify-between gap-4 px-5 py-3"><dt className="text-paper/60">SIGNAL</dt>
            <dd className={signal === "DETECTED" ? "text-phosphor" : "text-amber"} aria-live="polite">{signal}</dd></div>
        </dl>
      </div>
    </section>
  );
}
