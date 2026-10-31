import { anonClient } from "./supabase";
export type EventInfo = { registrationOpen: boolean; started: boolean; known: boolean };
/** Reads the newest event. Never throws: falls back to "not known" so pages still render. */
export async function getEventInfo(): Promise<EventInfo> {
  try {
    const { data } = await anonClient().from("game_events").select("registration_status,event_status")
      .order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!data) return { registrationOpen: false, started: false, known: false };
    return { registrationOpen: data.registration_status === "OPEN", started: data.event_status === "COMPLETED", known: true };
  } catch { return { registrationOpen: false, started: false, known: false }; }
}
