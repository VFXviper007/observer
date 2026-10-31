import Link from "next/link";
export const metadata = { title: "Registered — THE OBSERVER" };
export default function Registered({ searchParams }: { searchParams: { verified?: string } }) {
  const verified = searchParams.verified === "1";
  return (
    <main id="main" className="mx-auto max-w-xl px-5 py-20">
      <p className="font-mono text-xs tracking-[.25em] text-amber">{verified ? "EMAIL CONFIRMED" : "ONE STEP REMAINING"}</p>
      <h1 className="mt-4 font-mono text-3xl font-medium text-paper">{verified ? "YOUR NAME IS ON THE REGISTER." : "CHECK YOUR INBOX."}</h1>
      <p className="mt-6 leading-relaxed text-paper/75">
        {verified
          ? "Your address is verified and you are in the pool. The investigation has not begun. If you are chosen, you will be contacted by email. Until then, nothing is required of you."
          : "We sent a confirmation link to the address you gave. Open it to complete your registration. Only confirmed addresses can be chosen. Check spam if it does not arrive within a few minutes."}
      </p>
      <p className="mt-8 font-mono text-sm text-phosphor cursor">Await further transmissions</p>
      <Link href="/login" className="mt-12 mr-6 inline-block font-mono text-xs tracking-widest text-amber hover:text-phosphor">LOG IN</Link>
      <Link href="/" className="mt-12 inline-block font-mono text-xs tracking-widest text-paper/70 hover:text-phosphor">&larr; RETURN TO THE ARCHIVE</Link>
    </main>
  );
}
