import type { Metadata } from "next";
import { IBM_Plex_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = { title: "THE OBSERVER — PROJECT STILLWATER", description: "An investigation into a discontinued research project. Five participants. Four days. One unanswered transmission." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[70] focus:bg-amber focus:px-3 focus:py-2 focus:text-void">Skip to content</a>
        {children}
        <div className="fx-grain" aria-hidden /><div className="fx-scan" aria-hidden />
      </body>
    </html>
  );
}
