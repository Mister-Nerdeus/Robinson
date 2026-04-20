import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <main className="container py-10">
      <EmptyState
        title="Route not found"
        description="The page you requested is unavailable. Use the contact command center or return home to pick the correct service lane."
        actionHref="/contact"
        actionLabel="Open Contact Router"
      />
    </main>
  );
}
