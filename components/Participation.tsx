import Link from "next/link";
import { Radio } from "lucide-react";
import { getEventInfo } from "@/lib/event";

const steps = [
  ["Register", "Add your name and confirm your college email."],
  ["Wait", "The investigation has not begun. Registration closes first."],
  ["Selection", "Five names are drawn at random. Nobody can ask to be chosen."],
  ["Contact", "If your name is drawn, you will be told privately, and you may decline."],
];
export default async function Participation() {
  const ev = await getEventInfo();
  return (
    <section id="participation" aria-labelledby="part-h" className="px-5 py-28">
      <div className="mx-auto max-w-5xl">
        <h2 id="part-h" className="font-mono text-3xl font-medium text-paper sm:text-4xl">FIVE SIGNATURES REQUIRED.</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">An investigation is being assembled. Participants will be selected from those who choose to enter.</p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <dl className="border border-dim bg-surface font-mono text-sm" role="status">
              <div className="flex justify-between border-b border-dim/30 px-5 py-3"><dt className="text-paper/60">REGISTER</dt>
                <dd className={ev.registrationOpen ? "text-phosphor" : "text-amber"}>{ev.registrationOpen ? "OPEN" : ev.known ? "CLOSED" : "PREPARING"}</dd></div>
              <div className="flex justify-between px-5 py-3"><dt className="text-paper/60">INVESTIGATION</dt><dd className="text-amber">NOT STARTED</dd></div>
            </dl>
            {ev.registrationOpen
              ? <Link href="/register" className="mt-6 inline-flex items-center gap-3 border border-amber px-6 py-3 font-mono text-sm tracking-widest text-amber hover:bg-amber hover:text-void"><Radio size={16} aria-hidden /> REGISTER INTEREST</Link>
              : <p className="mt-6 font-mono text-sm text-paper/70">Participant registration is not available right now. The system is being prepared.</p>}
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[.25em] text-amber">WHAT YOU NEED TO KNOW</h3>
            <ol className="mt-5 divide-y divide-dim/30 border-y border-dim/30">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex gap-4 py-4"><span className="font-mono text-sm text-dim">{i + 1}</span>
                  <div><p className="font-mono text-paper">{t}</p><p className="mt-1 text-sm text-paper/70">{d}</p></div></li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-paper/60">Everything else stays sealed until the investigation begins. It is a fictional game played over four days. It is not real, nothing watches you, and you can step out at any time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
