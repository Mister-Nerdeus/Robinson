import { serviceAreaContract } from "@/content/serviceAreas";

export const serviceAreaContent = {
  strategy: "west-michigan-summary",
  summary: serviceAreaContract.summary,
  coreAreas: serviceAreaContract.areas.flatMap((entry) => entry.cities),
  expansionNote: "Portable rental availability is confirmed during quote review.",
  internalRoutingNote:
    "Internal territory and office assignment is operational-only and does not change public address/contact facts.",
};
