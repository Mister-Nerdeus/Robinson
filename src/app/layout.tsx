import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AnalyticsPageView } from "@/components/site/AnalyticsPageView";
import { MobileActionRail } from "@/components/site/MobileActionRail";
import { buildMetadata } from "@/lib/seo/metadata";
import { validateRuntimeIdentityForRender } from "@/lib/runtime/env";

import { company } from "@/config/company";

export const metadata: Metadata = buildMetadata(company.publicBrand, company.tagline, "/");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  validateRuntimeIdentityForRender();

  return (
    <html lang="en">
      <body className="site-shell">
        <AnalyticsPageView />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionRail />
      </body>
    </html>
  );
}
