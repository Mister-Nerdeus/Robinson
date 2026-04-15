import { z } from "zod";
import { submissionTypes } from "./types";

const trimmedRequired = (min = 1) => z.string().trim().min(min);
const trimmedOptional = z
  .string()
  .optional()
  .transform((value) => value?.trim() ?? "");

const baseSchema = z.object({
  type: z.enum(submissionTypes),
  fullName: trimmedRequired(2),
  phone: trimmedRequired(7),
  email: z.string().trim().email(),
  address: trimmedOptional,
  preferredDate: trimmedOptional,
  urgency: z.enum(["normal", "urgent", "emergency"]),
  message: trimmedRequired(8),
});

export const generalContactSchema = baseSchema.extend({
  type: z.literal("general"),
  topic: trimmedRequired(2),
});

export const septicServiceSchema = baseSchema.extend({
  type: z.literal("septic-service"),
  tankSizeGallons: trimmedRequired(1),
  tankCount: trimmedRequired(1),
  lidsExposed: z.enum(["yes", "no", "unknown"]),
  backupSigns: trimmedRequired(3),
});

export const wellSepticEvaluationSchema = baseSchema.extend({
  type: z.literal("evaluation"),
  roleInSale: z.enum(["buyer", "seller", "realtor", "other"]),
  brokerageOrCompany: trimmedOptional,
  closingDate: trimmedOptional,
  occupancyStatus: trimmedRequired(2),
});

export const portableToiletRentalSchema = baseSchema.extend({
  type: z.literal("rental"),
  eventType: trimmedRequired(2),
  unitCount: trimmedRequired(1),
  rentalDuration: trimmedRequired(2),
  serviceFrequency: trimmedRequired(2),
  siteType: trimmedRequired(2),
});

export const commercialServiceSchema = baseSchema.extend({
  type: z.literal("commercial-service"),
  facilityName: trimmedRequired(2),
  facilityType: trimmedRequired(2),
  serviceNeeded: trimmedRequired(2),
  greaseTrapCount: trimmedRequired(1),
  onSiteContact: trimmedRequired(2),
});

export const submissionSchema = z.discriminatedUnion("type", [
  generalContactSchema,
  septicServiceSchema,
  wellSepticEvaluationSchema,
  portableToiletRentalSchema,
  commercialServiceSchema,
]);

export type SubmissionInput = z.infer<typeof submissionSchema>;
