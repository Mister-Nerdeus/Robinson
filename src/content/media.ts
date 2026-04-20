export type MediaAsset = {
  id: string;
  src: string;
  alt: string;
  allowedRoutes: string[];
  cropRule: "hero-wide" | "card" | "free";
};

export const mediaManifest: MediaAsset[] = [
  {
    id: "truck-full",
    src: "/images/enhanced/truck_full_ai_enhanced.jpg",
    alt: "Robinson service truck ready for field dispatch",
    allowedRoutes: ["/", "/contact", "/services/septic-cleaning", "/services/commercial"],
    cropRule: "hero-wide",
  },
  {
    id: "evaluation-tech",
    src: "/images/enhanced/tech_evaluation_ai_enhanced.jpg",
    alt: "Robinson team member at a property evaluation site",
    allowedRoutes: ["/realtors", "/services/well-septic-evaluations"],
    cropRule: "hero-wide",
  },
  {
    id: "portable-group",
    src: "/images/enhanced/portable_toilets_group_ai_enhanced.jpg",
    alt: "Multiple portable toilet units staged for service",
    allowedRoutes: ["/services/portable-toilets"],
    cropRule: "card",
  },
];
