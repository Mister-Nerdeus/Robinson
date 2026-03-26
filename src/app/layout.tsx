import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AnalyticsPageView } from "@/components/site/AnalyticsPageView";

export const metadata: Metadata = {
  title: "Robinson Septic Service",
  description: "Septic cleaning, home-sale evaluations, and portable toilet rentals.",
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
          Local-only mode. See <Link href="/">project routes</Link> for staged v1 surfaces.
        </div>
      </body>
    </html>
  );
}
