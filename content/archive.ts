export type ArchiveDoc = { id: string; title: string; year: string; summary: string; meta: [string, string][]; body: string[] };
// [[text]] marks redacted text.
export const archive: ArchiveDoc[] = [
  { id: "log-2008", title: "RESEARCH LOG", year: "2008", summary: "Initial observations and unexplained signal patterns.",
    meta: [["REF", "STW-RL-001"], ["CLEARANCE", "LEVEL 2"], ["AUTHOR", "[[Dr. M. Hale]]"]],
    body: ["Day 3. The receiver picked up a repeating pattern at 14.2 MHz. Interval: 41 seconds. Not natural, not a known broadcast.",
      "Day 9. The pattern now arrives [[four seconds early]] every night. We have changed nothing on our end.",
      "Day 14. Voss believes the signal is a reflection of our own transmissions. I have asked him to explain why it answers questions we have not yet sent."] },
  { id: "incident-2010", title: "INCIDENT REPORT", year: "2010", summary: "A record of an unusual event during the experiment.",
    meta: [["REF", "STW-IR-007"], ["CLEARANCE", "LEVEL 4"], ["LOCATION", "[[Station B, sublevel 2]]"]],
    body: ["At 02:17 all instruments recorded a loss of signal for eleven minutes. During that time the logging system continued to write entries.",
      "The entries are in the handwriting-style font used by [[the lead technician]]. The technician was not on site.",
      "Recommendation: suspend overnight sessions pending review. Review not completed."] },
  { id: "termination-2011", title: "TERMINATION RECORD", year: "2011", summary: "The final report before PROJECT STILLWATER was discontinued.",
    meta: [["REF", "STW-TR-012"], ["CLEARANCE", "LEVEL 5"], ["STATUS", "SEALED"]],
    body: ["By order of the oversight committee, PROJECT STILLWATER is discontinued effective immediately. All personnel are to cease contact with the station.",
      "Final statement from the research team: \"We have stopped transmitting. It has not stopped responding.\"",
      "[[Remaining pages removed]]"] },
];
