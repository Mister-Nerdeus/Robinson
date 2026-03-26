import { z } from "zod";
import { submissionTypes } from "./types";

const baseSchema = z.object({
  type: z.enum(submissionTypes),
  fullName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  address: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().min(8),
});

export const generalContactSchema = baseSchema.extend({
  type: z.literal("general-contact"),
});

export const septicServiceSchema = baseSchema.extend({
  type: z.literal("septic-service"),
  tankSizeGallons: z.string().min(1),
});

export const wellSepticEvaluationSchema = baseSchema.extend({
  type: z.literal("well-septic-evaluation"),
  roleInSale: z.string().min(1),
  realtorCompany: z.string().optional(),
});

export const portableToiletRentalSchema = baseSchema.extend({
  type: z.literal("portable-toilet-rental"),
  eventType: z.string().min(1),
  unitCount: z.string().min(1),
});

export const submissionSchema = z.discriminatedUnion("type", [
  generalContactSchema,
  septicServiceSchema,
  wellSepticEvaluationSchema,
  portableToiletRentalSchema,
]);

export type SubmissionInput = z.infer<typeof submissionSchema>;
