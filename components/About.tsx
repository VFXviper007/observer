import { about } from "@/content/site";
export default function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="border-t border-dim/30 px-5 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_1fr]">
        <h2 id="about-h" className="font-mono text-3xl font-medium leading-tight text-paper sm:text-4xl">THE PROJECT WAS NEVER SUPPOSED TO RESUME.</h2>
        <div className="space-y-5 text-lg leading-relaxed text-paper/75">{about.map((p) => <p key={p}>{p}</p>)}</div>
      </div>
    </section>
  );
}
