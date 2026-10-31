"use client";
import { useState } from "react";
import { Radio } from "lucide-react";
export default function Participation() {
  const [shown, setShown] = useState(false);
  return (
    <section id="participation" aria-labelledby="part-h" className="px-5 py-28">
      <div className="mx-auto max-w-3xl">
        <h2 id="part-h" className="font-mono text-3xl font-medium text-paper sm:text-4xl">FIVE SIGNATURES REQUIRED.</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">An investigation is being assembled. Participants will be selected from those who choose to enter.</p>
        <button onClick={() => setShown(true)} aria-expanded={shown} aria-controls="reg-note"
          className="mt-10 inline-flex items-center gap-3 border border-amber px-6 py-3 font-mono text-sm tracking-widest text-amber hover:bg-amber hover:text-void">
          <Radio size={16} aria-hidden /> REGISTER INTEREST
        </button>
        <div id="reg-note" role="status" className="mt-6">
          {shown && <p className="open-glitch border-l-2 border-amber bg-surface px-5 py-4 font-mono text-sm text-paper/85">Participant registration is not yet available. The system is being prepared.</p>}
        </div>
      </div>
    </section>
  );
}
