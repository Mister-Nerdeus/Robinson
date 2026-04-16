import type { ReactNode } from "react";
import {
  REQUEST_LAYOUT_CONTRACT_VERSION,
  type RequestLayoutRouteId,
} from "@/config/requestLayoutContract";

type RequestPageLayoutProps = {
  routeId: RequestLayoutRouteId;
  topPrimary: ReactNode;
  topSecondary: ReactNode;
  form: ReactNode;
  postForm?: ReactNode;
};

export function RequestPageLayout({
  routeId,
  topPrimary,
  topSecondary,
  form,
  postForm,
}: RequestPageLayoutProps) {
  return (
    <div
      className="request-page-shell"
      data-request-layout-contract={REQUEST_LAYOUT_CONTRACT_VERSION}
      data-request-layout-route={routeId}
      data-request-layout-geometry="top-support-then-full-width-form"
    >
      <div className="request-page-top" data-request-layout-zone="top-support">
        <div className="request-page-top-primary">{topPrimary}</div>
        <aside className="request-page-top-secondary">{topSecondary}</aside>
      </div>

      <div className="request-page-form" data-request-layout-zone="full-width-form" data-request-layout-form-width="full-width">
        {form}
      </div>

      {postForm ? <div className="request-page-post-form">{postForm}</div> : null}
    </div>
  );
}
