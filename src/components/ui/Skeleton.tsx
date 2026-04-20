export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-[#e8ded1] ${className}`} aria-hidden="true" />;
}
