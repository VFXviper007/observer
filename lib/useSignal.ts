"use client";
import { useEffect, useState } from "react";
export type Signal = "DETECTED" | "UNSTABLE" | "INTERMITTENT";
/** Occasionally changes the signal label. Stays on DETECTED for users who prefer reduced motion. */
export function useSignal(): Signal {
  const [s, setS] = useState<Signal>("DETECTED");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setS(["UNSTABLE", "INTERMITTENT"][Math.floor(Math.random() * 2)] as Signal);
        t = setTimeout(() => { setS("DETECTED"); loop(); }, 900 + Math.random() * 1200);
      }, 5000 + Math.random() * 7000);
    };
    loop();
    return () => clearTimeout(t);
  }, []);
  return s;
}
