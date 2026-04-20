import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="container grid gap-4 py-8">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-64 w-full" />
    </main>
  );
}
