import type { Metadata } from "next";
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
          Serving West Michigan with 24/7 emergency septic service, home-sale evaluations, portable toilet rentals, and commercial support.
        </div>
      </body>
    </html>
  );
}
