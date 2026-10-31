"use client";
import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import { archive, type ArchiveDoc } from "@/content/archive";
import DocumentModal from "./DocumentModal";
export default function Archive() {
  const [doc, setDoc] = useState<ArchiveDoc | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  return (
    <section id="archive" aria-labelledby="archive-h" className="border-t border-dim/30 bg-surface/40 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 id="archive-h" className="font-mono text-sm tracking-[.25em] text-amber">ARCHIVE: 3 RECORDS RECOVERED</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {archive.map((d) => (
            <li key={d.id}>
              <button onClick={(e) => { opener.current = e.currentTarget; setDoc(d); }}
                className="group flex h-full w-full flex-col border border-dim/60 bg-surface p-6 text-left transition-colors hover:border-phosphor focus-visible:border-phosphor">
                <FileText size={20} className="text-dim group-hover:text-phosphor" aria-hidden />
                <span className="mt-5 font-mono text-xs text-paper/50">{d.meta[0][1]}</span>
                <span className="mt-1 font-mono text-lg text-paper">{d.title} &mdash; {d.year}</span>
                <span className="mt-3 flex-1 text-paper/70">{d.summary}</span>
                <span className="mt-6 font-mono text-xs tracking-widest text-phosphor">OPEN RECORD</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <DocumentModal doc={doc} onClose={() => { setDoc(null); opener.current?.focus(); }} />
    </section>
  );
}
