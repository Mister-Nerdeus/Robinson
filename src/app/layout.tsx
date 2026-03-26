import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AnalyticsPageView } from "@/components/site/AnalyticsPageView";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: company.publicBrand,
  description: company.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsPageView />
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="border-t border-[#d7caca] bg-[#f3edec] py-3 text-center text-xs text-slate-600">
          Serving West Michigan with septic cleaning, evaluations, rentals, and support service.
        </div>
      </body>
    </html>
  );
}
