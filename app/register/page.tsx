import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import { getEventInfo } from "@/lib/event";
export const revalidate = 30;
export const metadata = { title: "Register — THE OBSERVER" };
export default async function RegisterPage() {
  const ev = await getEventInfo();
  return (
    <main id="main" className="mx-auto max-w-xl px-5 py-16">
      <Link href="/" className="font-mono text-xs tracking-widest text-phosphor hover:text-amber">&larr; THE OBSERVER</Link>
      <h1 className="mt-10 font-mono text-3xl font-medium text-paper">ENTER YOUR NAME IN THE REGISTER.</h1>
      <p className="mt-4 text-paper/75">Registering does not start anything. It only places you in the pool from which five people may later be chosen.</p>
      {ev.registrationOpen ? <div className="mt-10"><RegisterForm /></div> : (
        <p role="status" className="mt-10 border-l-2 border-amber bg-surface px-5 py-4 font-mono text-sm text-paper/85">
          {ev.known ? "The register is closed. No new names are being accepted." : "The register is not open yet. The system is being prepared."}
        </p>
      )}
      <p className="mt-8 font-mono text-xs text-paper/60">Already registered? <Link href="/login" className="text-amber underline">Log in</Link></p>
      <p className="mt-6 font-mono text-xs leading-relaxed text-paper/50">This is a work of fiction. Nothing in it monitors you. You can leave the experience, or withdraw, at any time.</p>
    </main>
  );
}
