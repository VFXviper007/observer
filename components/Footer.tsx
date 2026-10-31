export default function Footer() {
  return (
    <footer className="border-t border-dim/40 px-5 py-10 font-mono text-xs text-paper/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-phosphor">THE OBSERVER &mdash; PROJECT STILLWATER</p><p className="mt-1">Fictional project archive. A work of fiction; nothing here is monitoring you.</p></div>
        <p>Version 0.1 &nbsp;|&nbsp; <span className="text-amber">STATUS: STANDBY</span></p>
      </div>
    </footer>
  );
}
