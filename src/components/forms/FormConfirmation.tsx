export function FormConfirmation({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-[#cde3c1] bg-[#f5fff1] px-3 py-2 text-sm text-[#274420]" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
