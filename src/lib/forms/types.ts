export const submissionTypes = [
  "general-contact",
  "septic-service",
  "well-septic-evaluation",
  "portable-toilet-rental",
] as const;

export type SubmissionType = (typeof submissionTypes)[number];

export type SubmissionRecord = {
  id: string;
  createdAt: string;
  type: SubmissionType;
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  preferredDate?: string;
  message: string;
  tankSizeGallons?: string;
  roleInSale?: string;
  realtorCompany?: string;
  eventType?: string;
  unitCount?: string;
};
