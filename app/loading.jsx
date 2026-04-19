export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="container-x py-24 md:py-36 min-h-[40vh] flex flex-col gap-6 animate-pulse"
    >
      <div className="h-3 w-24 rounded bg-[var(--line)]" />
      <div className="h-10 w-[min(60ch,90%)] rounded bg-[var(--line)]" />
      <div className="h-5 w-[min(50ch,90%)] rounded bg-[var(--line)]" />
      <div className="h-5 w-[min(40ch,80%)] rounded bg-[var(--line)]" />
    </div>
  );
}
