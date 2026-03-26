export const analyticsEvents = {
  pageView: "page_view",
  callCtaClick: "call_cta_click",
  laneClick: "conversion_lane_click",
  formStart: "form_start",
  formSubmit: "form_submit",
  formSubmitSuccess: "form_submit_success",
  formSubmitError: "form_submit_error",
} as const;

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsPayload = {
  event: AnalyticsEventName;
  path?: string;
  lane?: string;
  submissionType?: string;
  metadata?: Record<string, string | number | boolean | null>;
  ts?: string;
};
