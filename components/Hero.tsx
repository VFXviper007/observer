"use client";
import { ArrowDown } from "lucide-react";
import { bootLog } from "@/content/site";
import { useSignal } from "@/lib/useSignal";
export default function Hero() {
  const signal = useSignal();
  const lines = [...bootLog, ...bootLog];
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-14">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden font-mono text-xs text-dim/50 md:block [mask-image:linear-gradient(to_left,black,transparent)]">
        <div className="log-scroll space-y-3 p-8">{lines.map((l, i) => <p key={i}>&gt; {l}</p>)}</div>
      </div>
      <div className="relative mx-auto w-full max-w-6xl py-20">
        <p className="mb-6 font-mono text-xs tracking-[.25em] text-amber flicker">SYSTEM IDENTIFICATION: STILLWATER</p>
        <h1 data-text="THE OBSERVER" className="glitch font-mono text-5xl font-medium leading-none tracking-tight text-paper sm:text-7xl lg:text-8xl">THE OBSERVER</h1>
        <p className="cursor mt-8 font-mono text-xl text-phosphor sm:text-2xl">&ldquo;Something has been listening.&rdquo;</p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">An investigation into a discontinued research project. Five participants. Four days. One unanswered transmission.</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href="#archive" className="inline-flex items-center gap-3 border border-phosphor bg-phosphor px-6 py-3 font-mono text-sm tracking-widest text-void hover:bg-transparent hover:text-phosphor">ENTER THE ARCHIVE <ArrowDown size={16} aria-hidden /></a>
          <p className="font-mono text-xs tracking-widest text-paper/70" role="status">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-phosphor" aria-hidden />SYSTEM STATUS: <span className={signal === "DETECTED" ? "text-phosphor" : "text-amber"}>SIGNAL {signal}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
