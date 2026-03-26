import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AnalyticsPageView } from "@/components/site/AnalyticsPageView";

export const metadata: Metadata = {
  title: "Robinson Septic Cleaning",
  description: "Family owned and operated septic cleaning, home-sale evaluations, portable toilet rentals, grease trap cleaning, and lift pump service.",
  metadataBase: new URL("http://localhost:4850"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only">Skip to main content</a>
        <Header />
        <AnalyticsPageView />
        <main id="main">{children}</main>
        <Footer />
        <div className="container pb-6 text-xs text-slate-700">
          Local-only test and review mode. See <Link href="/">the rebuilt Robinson routes</Link> for the current staged surfaces.
        </div>
      </body>
    </html>
  );
}
