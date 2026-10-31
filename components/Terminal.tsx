"use client";
import { useEffect, useRef, useState } from "react";
type Line = { cmd: string; out: string[] };

export default function Terminal({ code, name, clearance }: { code: string; name: string; clearance: string }) {
  const [hist, setHist] = useState<Line[]>([{ cmd: "", out: ['Type "help" for available commands.'] }]);
  const [val, setVal] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "nearest" }); }, [hist]);

  function run(raw: string): string[] | "clear" {
    const c = raw.trim().toLowerCase();
    switch (c) {
      case "": return [];
      case "help": return ["whoami   identify this subject", "status   investigation status", "signal   carrier details", "archive  record index", "listen   open the channel", "exit     how to leave", "clear    clear screen"];
      case "whoami": return [`${code}`, name, `CLEARANCE: ${clearance}`];
      case "status": return ["INVESTIGATION: NOT STARTED", "AWAITING AUTHORIZATION", "Selection has not been run."];
      case "signal": return ["14.2 MHz. Interval 41 s.", "Source: unresolved.", "Last response: before the last request."];
      case "archive": return ["3 records recovered. 9 remain sealed.", "Clearance insufficient for sealed records."];
      case "listen": return ["...", "...", "you are not the first to ask."];
      case "exit": return ["No exit required. This is a game.", "Use LOG OUT at any time, or withdraw from the game on this page."];
      case "stillwater": case "14.2": return ["CARRIER MATCHED.", "FRAGMENT 1 OF 5 RECOVERED:", '"it answers before we ask"', "Five are needed. Keep listening."];
      case "clear": return "clear";
      default: return [`command not recognised: ${c.slice(0, 40)}`, 'Type "help".'];
    }
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const out = run(val);
    setHist((h) => out === "clear" ? [] : [...h, { cmd: val.slice(0, 60), out }].slice(-30));
    setVal("");
  }
  return (
    <div className="border border-dim bg-void font-mono text-xs">
      <p className="border-b border-dim px-4 py-2 tracking-widest text-dim">STILLWATER TERMINAL</p>
      <div role="log" aria-live="polite" className="h-44 overflow-y-auto px-4 py-3 leading-relaxed text-paper/80">
        {hist.map((l, i) => (<div key={i}>{l.cmd && <p className="text-phosphor">&gt; {l.cmd}</p>}{l.out.map((o, j) => <p key={j}>{o}</p>)}</div>))}
        <div ref={end} />
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-dim px-4 py-2">
        <label htmlFor="term" className="text-phosphor">&gt;</label>
        <input id="term" value={val} onChange={(e) => setVal(e.target.value)} maxLength={60} autoComplete="off" autoCapitalize="off" spellCheck={false}
          aria-label="Terminal command" className="min-w-0 flex-1 bg-transparent py-1 text-paper outline-none" placeholder="type a command" />
      </form>
    </div>
  );
}
