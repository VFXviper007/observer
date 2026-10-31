import { redirect } from "next/navigation";
import { serverClient } from "@/lib/supabase-server";
import DashboardActions from "@/components/DashboardActions";
import BootSequence from "@/components/BootSequence";
import SignalMonitor from "@/components/SignalMonitor";
import SealedFragments from "@/components/SealedFragments";
import Terminal from "@/components/Terminal";
export const dynamic = "force-dynamic";
export const metadata = { title: "Subject file — THE OBSERVER" };

const clearanceFor = (s: string) => s === "SELECTED" ? "LEVEL 3: INVESTIGATOR" : s === "NOT SELECTED" ? "LEVEL 1: REGISTERED SUBJECT" : "LEVEL 0: INACTIVE";

export default async function Dashboard() {
  const supabase = serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: me } = await supabase.from("profiles").select("*").eq("id", user.id).single(); // RLS: own row only
  if (!me) return <main id="main" className="mx-auto max-w-xl px-5 py-20 font-mono text-sm text-amber">Profile not found. Contact the organizers.</main>;
  const { data: sel } = await supabase.from("player_selections").select("event_id,selection_status")
    .eq("player_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
  const { data: notes } = await supabase.from("announcements").select("id,body,created_at").order("created_at", { ascending: false }).limit(5);
  const { data: pool } = await supabase.rpc("pool_size"); // optional; hidden if the function does not exist

  const status: string = sel?.selection_status ?? (me.consent_status === "WITHDRAWN" ? "WITHDRAWN" : "NOT SELECTED");
  const clearance = clearanceFor(status);
  const selected = status === "SELECTED";
  const first = me.full_name.split(" ")[0];
  const message = selected ? "Your participation has been confirmed. PROJECT STILLWATER has identified you."
    : status === "NOT SELECTED" ? "Your registration is complete. Await further transmissions."
    : status === "DECLINED" ? "You declined participation. Your place has been released."
    : status === "WITHDRAWN" ? "You have withdrawn. You are not in the selection pool."
    : "Your place was reassigned. Thank you for registering.";
  const rows: [string, string][] = [
    ["SUBJECT NO.", me.player_code], ["NAME", me.full_name],
    ["ENTERED REGISTER", new Date(me.created_at).toLocaleDateString("en-GB", { dateStyle: "long" })],
    ["EMAIL", me.email_verified_at ? "VERIFIED" : "UNVERIFIED"], ["CONSENT", me.consent_status.replace("_", " ")],
    ["CLEARANCE", clearance], ["SELECTION", status],
  ];
  const boot = [`session opened for ${me.player_code}`, "verifying subject file ........ ok", "archive link: 3 of 12 records readable",
    "carrier 14.2 MHz: listening", selected ? "subject flagged: IDENTIFIED" : "subject flagged: pending"];

  return (
    <main id="main" className="mx-auto max-w-5xl px-5 py-14">
      <div className="flex items-start justify-between gap-4">
        <div><p className="font-mono text-xs tracking-[.25em] text-amber">PROJECT STILLWATER / SUBJECT FILE</p>
          <h1 className="mt-3 font-mono text-3xl font-medium text-paper">Welcome, {first}.</h1></div>
        <form action="/api/logout" method="post"><button className="border border-dim px-4 py-2 font-mono text-xs tracking-widest text-paper/80 hover:border-phosphor">LOG OUT</button></form>
      </div>
      {me.account_status === "SUSPENDED" && <p role="alert" className="mt-6 border-l-2 border-amber bg-surface px-4 py-3 font-mono text-sm text-amber">This account is suspended. Contact the organizers.</p>}

      <div className="mt-8"><BootSequence lines={boot} /></div>

      {selected
        ? <div role="status" className="open-glitch mt-6 border border-amber bg-surface px-6 py-6">
            <p data-text="IDENTIFIED" className="glitch font-mono text-4xl tracking-tight text-amber">IDENTIFIED</p>
            <p className="mt-3 text-lg text-paper">{message}</p>
            <p className="mt-2 font-mono text-xs text-paper/60">Await your first instructions. You may decline below.</p></div>
        : <p role="status" className="mt-6 border-l-2 border-phosphor bg-surface px-5 py-4 text-lg text-paper">{message}</p>}

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <dl className="divide-y divide-dim/30 border border-dim bg-surface font-mono text-sm">
            {rows.map(([k, v]) => (<div key={k} className="flex justify-between gap-4 px-5 py-3"><dt className="text-paper/60">{k}</dt>
              <dd className={`text-right ${k === "SELECTION" && selected ? "text-amber" : "text-phosphor"}`}>{v}</dd></div>))}
          </dl>
          {typeof pool === "number" && <div className="border border-dim bg-surface px-5 py-4 font-mono text-sm">
            <p className="text-paper/60">SIGNATURES ON FILE</p>
            <p className="mt-1 text-3xl text-phosphor">{pool}</p><p className="mt-1 text-xs text-paper/50">Five will be required.</p></div>}
          <section aria-labelledby="sealed"><h2 id="sealed" className="mb-3 font-mono text-xs tracking-[.25em] text-amber">SEALED RECORDS</h2><SealedFragments /></section>
        </div>
        <div className="space-y-8">
          <SignalMonitor />
          <Terminal code={me.player_code} name={me.full_name} clearance={clearance} />
        </div>
      </div>

      <section aria-labelledby="ann" className="mt-14">
        <h2 id="ann" className="font-mono text-xs tracking-[.25em] text-amber">TRANSMISSIONS</h2>
        {notes?.length ? <ul className="mt-4 space-y-3">{notes.map((n) => (
          <li key={n.id} className="border border-dim/50 bg-surface px-5 py-3 text-paper/85"><p>{n.body}</p>
            <p className="mt-1 font-mono text-xs text-paper/40">{new Date(n.created_at).toLocaleDateString("en-GB")}</p></li>))}</ul>
          : <p className="mt-4 font-mono text-sm text-paper/60">No transmissions yet. The investigation has not begun.</p>}
      </section>

      <section aria-labelledby="ctl" className="mt-14 border-t border-dim/30 pt-8">
        <h2 id="ctl" className="font-mono text-xs tracking-[.25em] text-paper/50">SUBJECT CONTROLS</h2>
        <p className="mt-2 text-sm text-paper/60">This is a game. You can leave it at any time.</p>
        <DashboardActions consent={me.consent_status} eventId={sel?.event_id} canDecline={selected} />
      </section>
    </main>
  );
}
