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
  topMode: RequestLayoutMode;
  formMode: RequestLayoutMode;
  postForm?: ReactNode;
  postFormSecondary?: ReactNode;
  postFormMode?: RequestLayoutMode;
};

export function RequestPageLayout({
  routeId,
  topPrimary,
  topSecondary,
  form,
  topMode,
  formMode,
  postForm,
  postFormSecondary,
  postFormMode = "fullWidthSupport",
}: RequestPageLayoutProps) {
  const sectionModes: RequestLayoutMode[] = [topMode, formMode];
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
      data-request-layout-desktop-support-band={REQUEST_LAYOUT_DESKTOP_TOKENS.supportBandPrimaryMaxWidth}
      data-request-layout-desktop-wizard-shell={REQUEST_LAYOUT_DESKTOP_TOKENS.wizardShellMaxWidth}
    >
      <TaskPageLayout
        route={routeId}
        mode={topMode}
        className="request-page-section request-page-top"
        primaryClassName="request-page-top-primary"
        supportClassName="request-page-top-secondary"
        primary={topPrimary}
        support={topSecondary}
      />

      <TaskPageLayout
        route={routeId}
        mode={formMode}
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
