import { z } from "zod";
import { submissionTypes } from "./types";

const trimmedRequired = (min = 1) => z.string().trim().min(min);
const trimmedOptional = z
  .string()
  .optional()
  .transform((value) => value?.trim() ?? "");

const zipSchema = z
  .string()
  .trim()
  .regex(/^\d{5}(?:-\d{4})?$/, "ZIP must be 5 digits (or ZIP+4).");

const urgencySchema = z.enum(["normal", "urgent", "emergency"]);
const yesNoUnknownSchema = z.enum(["yes", "no", "unknown"]);
const yesNoUnsureSchema = z.enum(["yes", "no", "unsure"]);

const locationOptionalSchema = {
  streetAddress: trimmedOptional,
  city: trimmedOptional,
  zip: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? "")
    .refine((value) => value === "" || /^\d{5}(?:-\d{4})?$/.test(value), {
      message: "ZIP must be 5 digits (or ZIP+4).",
    }),
  state: trimmedOptional,
  address: trimmedOptional,
};

const locationRequiredSchema = {
  streetAddress: trimmedRequired(4),
  city: trimmedRequired(2),
  zip: zipSchema,
  state: trimmedOptional,
  address: trimmedOptional,
};

const baseSchema = z.object({
  type: z.enum(submissionTypes),
  fullName: trimmedRequired(2),
  phone: trimmedRequired(7),
  email: z.string().trim().email(),
  preferredDate: trimmedOptional,
  preferredTime: trimmedOptional,
  urgency: urgencySchema,
  message: trimmedRequired(8),
  ...locationOptionalSchema,
});

export const generalContactSchema = baseSchema.extend({
  type: z.literal("general"),
  topic: trimmedRequired(2),
  serviceLocationInvolved: yesNoUnsureSchema,
});

export const septicServiceSchema = baseSchema.extend({
  type: z.literal("septic-service"),
  ...locationRequiredSchema,
  tankSizeGallons: z.enum(["500", "750", "1000", "1250", "1500", "2000-plus", "unknown"]),
  tankCount: z.enum(["1", "2", "3-plus", "unknown"]),
  lidsExposed: yesNoUnknownSchema,
  tankLocationKnown: yesNoUnsureSchema,
  problemSigns: z
    .array(
      z.enum([
        "sewage-backup",
        "toilet-wont-flush",
        "tub-sink-backup",
        "standing-water-yard",
        "strong-odor",
        "slow-drains",
        "septic-alarm",
        "routine-pumping",
        "unknown",
        "other",
      ]),
    )
    .min(1),
  additionalWarningDetails: trimmedOptional,
  accessIssues: z
    .array(
      z.enum([
        "gate",
        "pets",
        "snow",
        "landscaping-obstacles",
        "parked-vehicles",
        "none",
        "other",
      ]),
    )
    .min(1),
  existingCustomer: yesNoUnsureSchema,
  propertyUsage: z.enum(["residential", "commercial", "unsure"]),
  systemPumpedBefore: yesNoUnsureSchema,
});

export const wellSepticEvaluationSchema = baseSchema.extend({
  type: z.literal("evaluation"),
  ...locationRequiredSchema,
  roleInSale: z.enum(["buyer", "seller", "realtor", "other"]),
  brokerageOrCompany: trimmedOptional,
  closingDate: trimmedOptional,
  occupancyStatus: trimmedRequired(2),
  accessInstructions: trimmedOptional,
  utilityOnStatus: yesNoUnknownSchema,
  occupantPresent: yesNoUnknownSchema,
  propertyType: z.enum(["single-family", "multi-family", "vacant-land", "other"]),
});

export const portableToiletRentalSchema = baseSchema.extend({
  type: z.literal("rental"),
  ...locationRequiredSchema,
  eventType: trimmedRequired(2),
  unitCount: trimmedRequired(1),
  rentalDuration: trimmedRequired(2),
  serviceFrequency: trimmedRequired(2),
  siteType: trimmedRequired(2),
  handwashStationNeeded: z.enum(["yes", "no"]),
  adaUnitNeeded: z.enum(["yes", "no"]),
  placementSurface: z.enum(["grass", "gravel", "pavement", "mixed", "unknown"]),
  siteAccessNotes: trimmedOptional,
});

export const commercialServiceSchema = baseSchema.extend({
  type: z.literal("commercial-service"),
  ...locationRequiredSchema,
  facilityName: trimmedRequired(2),
  facilityType: trimmedRequired(2),
  serviceNeeded: trimmedRequired(2),
  greaseTrapCount: trimmedRequired(1),
  onSiteContact: trimmedRequired(2),
  accessHours: trimmedOptional,
  greaseTrapLocation: z.enum(["indoor", "outdoor", "mixed", "unknown"]),
  previousServiceHistoryKnown: yesNoUnknownSchema,
  serviceUrgency: urgencySchema,
});

export const submissionSchema = z.discriminatedUnion("type", [
  generalContactSchema,
  septicServiceSchema,
  wellSepticEvaluationSchema,
  portableToiletRentalSchema,
  commercialServiceSchema,
]);

export type SubmissionInput = z.infer<typeof submissionSchema>;
