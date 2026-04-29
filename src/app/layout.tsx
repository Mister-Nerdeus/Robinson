import type { Metadata } from "next";
import { Archivo_Black, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AnalyticsPageView } from "@/components/site/AnalyticsPageView";
import { MobileActionRail } from "@/components/site/MobileActionRail";
import { buildMetadata } from "@/lib/seo/metadata";
import { validateRuntimeIdentityForRender } from "@/lib/runtime/env";

import { company } from "@/config/company";

export const metadata: Metadata = buildMetadata(company.publicBrand, company.tagline, "/");

const displayFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  validateRuntimeIdentityForRender();

  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} site-shell`}>
        <AnalyticsPageView />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionRail />
      </body>
    </html>
  );
}
