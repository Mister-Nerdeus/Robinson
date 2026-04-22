import { serviceAreaContract } from "@/content/serviceAreas";

export const serviceAreaContent = {
  strategy: "west-michigan-summary",
  summary: serviceAreaContract.summary,
  coreAreas: serviceAreaContract.areas.flatMap((entry) => entry.cities),
  expansionNote: "Portable rental availability is confirmed during quote review.",
};
