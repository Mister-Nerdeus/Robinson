import { serviceAreaContract } from "@/content/serviceAreas";

export const serviceAreaContent = {
  strategy: "west-michigan-summary",
  summary: serviceAreaContract.summary,
  coreAreas: serviceAreaContract.areas.flatMap((entry) => entry.cities),
  expansionNote:
    "Portable toilet rentals have historically been offered within roughly 60 miles of greater Grand Rapids. Submit your request and Robinson will confirm final availability.",
};
