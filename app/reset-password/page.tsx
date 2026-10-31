import { ResetForm } from "@/components/PasswordFlows";
export const metadata = { title: "New password — THE OBSERVER" };
export default function Page() {
  return (<main id="main" className="mx-auto max-w-md px-5 py-16">
    <h1 className="font-mono text-3xl font-medium text-paper">CHOOSE A NEW PASSWORD.</h1>
    <div className="mt-10"><ResetForm /></div></main>);
}
