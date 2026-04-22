import type { ReactNode } from "react";
import {
  REQUEST_LAYOUT_CONTRACT_VERSION,
  REQUEST_LAYOUT_DESKTOP_TOKENS,
  type RequestLayoutMode,
  type RequestLayoutRouteId,
} from "@/config/requestLayoutContract";
import { TaskPageLayout } from "@/components/layout/TaskPageLayout";

type RequestPageLayoutProps = {
  routeId: RequestLayoutRouteId;
  topPrimary: ReactNode;
  topSecondary: ReactNode;
  form: ReactNode;
  postForm?: ReactNode;
  postFormSecondary?: ReactNode;
  postFormMode?: RequestLayoutMode;
};

export function RequestPageLayout({
  routeId,
  topPrimary,
  topSecondary,
  form,
  postForm,
  postFormSecondary,
  postFormMode = "full-width",
}: RequestPageLayoutProps) {
  const sectionModes: RequestLayoutMode[] = ["support-rail", "full-width"];
  if (postForm) {
    sectionModes.push(postFormMode);
  }

  return (
    <div
      className="request-page-shell"
      data-request-layout-contract={REQUEST_LAYOUT_CONTRACT_VERSION}
      data-request-layout-route={routeId}
      data-request-layout-geometry="explicit-section-modes"
      data-request-layout-modes={sectionModes.join("|")}
      data-request-layout-desktop-gutter={REQUEST_LAYOUT_DESKTOP_TOKENS.desktopGutter}
      data-request-layout-desktop-rail={REQUEST_LAYOUT_DESKTOP_TOKENS.supportRailMaxWidth}
      data-request-layout-desktop-form-shell={REQUEST_LAYOUT_DESKTOP_TOKENS.formShellMaxWidth}
    >
      <TaskPageLayout
        route={routeId}
        mode="support-rail"
        className="request-page-section request-page-top"
        primaryClassName="request-page-top-primary"
        supportClassName="request-page-top-secondary"
        primary={topPrimary}
        support={topSecondary}
      />

      <TaskPageLayout
        route={routeId}
        mode="full-width"
        className="request-page-section request-page-form"
        primaryClassName="request-page-form-primary"
        primary={form}
      />

      {postForm ? (
        <TaskPageLayout
          route={routeId}
          mode={postFormMode}
          className="request-page-section request-page-post-form"
          primaryClassName="request-page-post-form-primary"
          supportClassName="request-page-post-form-secondary"
          primary={postForm}
          support={postFormSecondary}
        />
      ) : null}
    </div>
  );
}
