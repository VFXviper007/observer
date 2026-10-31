const BARS = 56;
export default function Transmission() {
  return (
    <section id="transmission" aria-labelledby="tx-h" className="border-y border-amber/30 bg-surface px-5 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 id="tx-h" className="font-mono text-sm tracking-[.3em] text-amber flicker">INCOMING TRANSMISSION</h2>
        <div aria-hidden className="my-10 flex h-28 items-center justify-center gap-[3px]">
          {Array.from({ length: BARS }, (_, i) => {
            const h = (0.25 + (((i * 37) % 11) / 11) * 0.75).toFixed(2);
            const env = Math.sin((i / (BARS - 1)) * Math.PI);
            return <span key={i} className="bar h-full w-[3px] bg-phosphor/80"
              style={{ "--h": (Number(h) * (0.3 + env * 0.7)).toFixed(2), "--d": `${(0.6 + ((i * 13) % 7) / 8).toFixed(2)}s`, "--delay": `${-(((i * 29) % 10) / 10).toFixed(2)}s` } as React.CSSProperties} />;
          })}
        </div>
        <p className="cursor font-mono text-2xl text-paper sm:text-3xl">&ldquo;Can anyone hear me?&rdquo;</p>
        <p className="mt-6 font-mono text-xs text-paper/50">Visual only. No audio will play.</p>
      </div>
    </section>
  );
}
