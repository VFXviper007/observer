import { redirect } from "next/navigation";
import { serverClient } from "@/lib/supabase-server";
import DashboardActions from "@/components/DashboardActions";
export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard — THE OBSERVER" };

export default async function Dashboard() {
  const supabase = serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: me } = await supabase.from("profiles").select("*").eq("id", user.id).single(); // RLS: own row only
  if (!me) return <main id="main" className="mx-auto max-w-xl px-5 py-20 font-mono text-sm text-amber">Profile not found. Contact the organizers.</main>;
  const { data: sel } = await supabase.from("player_selections").select("event_id,selection_status,selected_at")
    .eq("player_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
  const { data: notes } = await supabase.from("announcements").select("id,body,created_at").order("created_at", { ascending: false }).limit(5);

  const status = sel?.selection_status ?? (me.consent_status === "WITHDRAWN" ? "WITHDRAWN" : "NOT SELECTED");
  const rows: [string, string][] = [
    ["PLAYER ID", me.player_code], ["NAME", me.full_name],
    ["REGISTERED", new Date(me.created_at).toLocaleDateString("en-GB", { dateStyle: "long" })],
    ["EMAIL", me.email_verified_at ? "VERIFIED" : "UNVERIFIED"],
    ["CONSENT", me.consent_status.replace("_", " ")], ["SELECTION", status],
  ];
  const message = status === "SELECTED" ? "Your participation has been confirmed. PROJECT STILLWATER has identified you."
    : status === "NOT SELECTED" ? "Your registration is complete. Await further transmissions."
    : status === "DECLINED" ? "You declined participation. Your place has been released."
    : status === "WITHDRAWN" ? "You have withdrawn. You are not in the selection pool."
    : "Your place was reassigned. Thank you for registering.";

  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-16">
      <div className="flex items-start justify-between gap-4">
        <div><p className="font-mono text-xs tracking-[.25em] text-amber">PROJECT STILLWATER</p>
          <h1 className="mt-3 font-mono text-3xl font-medium text-paper">Welcome, {me.full_name.split(" ")[0]}.</h1></div>
        <form action="/api/logout" method="post"><button className="border border-dim px-4 py-2 font-mono text-xs tracking-widest text-paper/80 hover:border-phosphor">LOG OUT</button></form>
      </div>
      {me.account_status === "SUSPENDED" && <p role="alert" className="mt-6 border-l-2 border-amber bg-surface px-4 py-3 font-mono text-sm text-amber">This account is suspended. Contact the organizers.</p>}
      <p role="status" className="mt-8 border-l-2 border-phosphor bg-surface px-5 py-4 text-lg text-paper">{message}</p>
      <dl className="mt-8 divide-y divide-dim/30 border border-dim bg-surface font-mono text-sm">
        {rows.map(([k, v]) => (<div key={k} className="flex justify-between gap-4 px-5 py-3"><dt className="text-paper/60">{k}</dt>
          <dd className={k === "SELECTION" && status === "SELECTED" ? "text-amber" : "text-phosphor"}>{v}</dd></div>))}
      </dl>
      <DashboardActions consent={me.consent_status} eventId={sel?.event_id} canDecline={status === "SELECTED"} />
      <section aria-labelledby="ann" className="mt-14">
        <h2 id="ann" className="font-mono text-xs tracking-[.25em] text-amber">TRANSMISSIONS</h2>
        {notes?.length ? <ul className="mt-4 space-y-3">{notes.map((n) => (
          <li key={n.id} className="border border-dim/50 bg-surface px-5 py-3 text-paper/85"><p>{n.body}</p>
            <p className="mt-1 font-mono text-xs text-paper/40">{new Date(n.created_at).toLocaleDateString("en-GB")}</p></li>))}</ul>
          : <p className="mt-4 font-mono text-sm text-paper/60">No transmissions yet. The investigation has not begun.</p>}
      </section>
    </main>
  );
}
