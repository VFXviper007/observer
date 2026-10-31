"use client";
import { useSignal } from "@/lib/useSignal";
const BARS = 40;
export default function SignalMonitor() {
  const signal = useSignal();
  return (
    <div className="border border-dim bg-surface p-5">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="tracking-widest text-paper/60">CARRIER 14.2 MHz</span>
        <span className={signal === "DETECTED" ? "text-phosphor" : "text-amber"} role="status">{signal}</span>
      </div>
      <div aria-hidden className="my-5 flex h-16 items-center justify-center gap-[3px]">
        {Array.from({ length: BARS }, (_, i) => {
          const h = 0.2 + (((i * 37) % 11) / 11) * 0.8, env = Math.sin((i / (BARS - 1)) * Math.PI);
          return <span key={i} className="bar h-full w-[3px] bg-phosphor/80"
            style={{ "--h": (h * (0.25 + env * 0.75)).toFixed(2), "--d": `${(0.6 + ((i * 13) % 7) / 8).toFixed(2)}s`, "--delay": `${-(((i * 29) % 10) / 10).toFixed(2)}s` } as React.CSSProperties} />;
        })}
      </div>
      <p className="font-mono text-xs text-paper/50">Interval 41s. Source unresolved. Visual only.</p>
    </div>
  );
}
