"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-dim/40 bg-void/90 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-mono text-sm tracking-[.2em] text-phosphor">THE OBSERVER</a>
        <ul className="hidden items-center gap-7 font-mono text-xs tracking-widest md:flex">
          {nav.map((n, i) => (
            <li key={n.href}><a href={n.href} className={i === nav.length - 1 ? "border border-amber px-3 py-1.5 text-amber hover:bg-amber hover:text-void" : "text-paper/70 hover:text-phosphor"}>{n.label}</a></li>
          ))}
        </ul>
        <button className="p-2 text-phosphor md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <ul id="mobile-nav" className="border-t border-dim/40 bg-surface px-5 py-3 font-mono text-sm md:hidden">
          {nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block border-b border-dim/20 py-3 text-paper/80">{n.label}</a></li>))}
        </ul>
      )}
    </header>
  );
}
