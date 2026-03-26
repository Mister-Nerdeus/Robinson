"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

export function AnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    void trackEvent({ event: analyticsEvents.pageView, path: pathname });
  }, [pathname]);

  return null;
}
