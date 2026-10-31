"use client";
import { useEffect, useState } from "react";
/** Types the log out once per browser session; shows it instantly otherwise (and for reduced motion). */
export default function BootSequence({ lines }: { lines: string[] }) {
  const [n, setN] = useState(lines.length);
  useEffect(() => {
    let seen = false;
    try { seen = !!sessionStorage.getItem("stw-boot"); sessionStorage.setItem("stw-boot", "1"); } catch { /* storage blocked */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let i = 0;
    const t = setInterval(() => { i++; setN(i); if (i >= lines.length) clearInterval(t); }, 420);
    return () => clearInterval(t);
  }, [lines]);
  return (
    <div role="log" aria-label="System log" className="min-h-[7.5rem] font-mono text-xs leading-relaxed text-dim">
      {lines.slice(0, n).map((l, i) => <p key={i}>&gt; {l}</p>)}
      <p className="cursor text-phosphor">&nbsp;</p>
    </div>
  );
}
