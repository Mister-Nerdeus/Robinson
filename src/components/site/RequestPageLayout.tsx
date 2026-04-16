import type { ReactNode } from "react";

type RequestPageLayoutProps = {
  topPrimary: ReactNode;
  topSecondary: ReactNode;
  form: ReactNode;
  postForm?: ReactNode;
};

export function RequestPageLayout({
  topPrimary,
  topSecondary,
  form,
  postForm,
}: RequestPageLayoutProps) {
  return (
    <div className="request-page-shell">
      <div className="request-page-top">
        <div className="request-page-top-primary">{topPrimary}</div>
        <aside className="request-page-top-secondary">{topSecondary}</aside>
      </div>

      <div className="request-page-form">{form}</div>

      {postForm ? <div className="request-page-post-form">{postForm}</div> : null}
    </div>
  );
}
