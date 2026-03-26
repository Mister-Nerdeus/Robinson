import { TrustBand } from "@/components/site/TrustBand";

export function HomeTrust({ points }: { points: string[] }) {
  return <TrustBand points={points} />;
}
