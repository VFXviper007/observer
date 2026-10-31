import Link from "next/link";
import { ForgotForm } from "@/components/PasswordFlows";
export const metadata = { title: "Reset password — THE OBSERVER" };
export default function Page() {
  return (<main id="main" className="mx-auto max-w-md px-5 py-16">
    <Link href="/login" className="font-mono text-xs tracking-widest text-phosphor hover:text-amber">&larr; BACK TO LOGIN</Link>
    <h1 className="mt-10 font-mono text-3xl font-medium text-paper">RESET YOUR PASSWORD.</h1>
    <div className="mt-10"><ForgotForm /></div></main>);
}
