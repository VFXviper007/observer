import Link from "next/link";
import LoginForm from "@/components/LoginForm";
export const metadata = { title: "Enter system — THE OBSERVER" };
export default function LoginPage() {
  return (
    <main id="main" className="mx-auto max-w-md px-5 py-16">
      <Link href="/" className="font-mono text-xs tracking-widest text-phosphor hover:text-amber">&larr; THE OBSERVER</Link>
      <h1 className="mt-10 font-mono text-3xl font-medium text-paper">IDENTIFY YOURSELF.</h1>
      <p className="mt-4 text-paper/75">Log in with the email you registered with.</p>
      <div className="mt-10"><LoginForm /></div>
      <p className="mt-10 font-mono text-xs text-paper/60">No account yet? <Link href="/register" className="text-amber underline">Register</Link></p>
    </main>
  );
}
