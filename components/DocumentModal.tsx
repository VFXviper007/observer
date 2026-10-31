"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { ArchiveDoc } from "@/content/archive";
function Redacted({ text }: { text: string }) {
  return <>{text.split(/(\[\[.*?\]\])/g).map((s, i) =>
    s.startsWith("[[") ? <span key={i} className="redact" aria-label="redacted">{s.slice(2, -2)}</span> : <span key={i}>{s}</span>)}</>;
}
/** Native <dialog>: built-in focus trap, Esc to close, inert background. */
export default function DocumentModal({ doc, onClose }: { doc: ArchiveDoc | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = ref.current; if (!d) return; if (doc && !d.open) d.showModal(); if (!doc && d.open) d.close(); }, [doc]);
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose(); }} aria-labelledby="doc-title"
      className="m-auto w-[min(92vw,42rem)] max-h-[85vh] border border-phosphor bg-void p-0 text-paper backdrop:bg-black/80">
      {doc && (
        <article className="open-glitch p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 id="doc-title" className="font-mono text-xl text-phosphor">{doc.title} &mdash; {doc.year}</h3>
            <button onClick={onClose} aria-label="Close document" className="p-1 text-paper/70 hover:text-amber"><X size={22} /></button>
          </div>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-y border-dim/40 py-3 font-mono text-xs">
            {doc.meta.map(([k, v]) => (<div key={k} className="contents"><dt className="text-dim">{k}</dt><dd className="text-paper/80"><Redacted text={v} /></dd></div>))}
          </dl>
          <div className="mt-5 space-y-4 leading-relaxed text-paper/85">{doc.body.map((p, i) => <p key={i}><Redacted text={p} /></p>)}</div>
          <p className="mt-6 font-mono text-xs text-dim">END OF RECORD</p>
        </article>
      )}
    </dialog>
  );
}
