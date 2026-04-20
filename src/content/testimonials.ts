export type TestimonialEntry = {
  id: string;
  quote: string;
  attribution: string;
  source: {
    type: "direct-customer" | "legacy-marketing";
    verified: boolean;
    lastReviewed: string;
  };
  status: "publishable" | "internal-only";
};

export const testimonials: TestimonialEntry[] = [
  {
    id: "legacy-no-direct-quote",
    quote: "No direct customer testimonials are currently published until source verification is complete.",
    attribution: "Robinson publishing policy",
    source: {
      type: "legacy-marketing",
      verified: true,
      lastReviewed: "2026-04-19",
    },
    status: "internal-only",
  },
];
