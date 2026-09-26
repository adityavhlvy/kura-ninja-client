/**
 * Label that rolls up to a copy of itself on hover of the nearest `.group`.
 * The duplicate is aria-hidden so screen readers hear the label once.
 */
export function Roll({ children }: { children: string }) {
  return (
    <span className="relative inline-flex overflow-hidden align-top">
      <span className="transition-transform duration-500 ease-out-quint group-hover:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-full transition-transform duration-500 ease-out-quint group-hover:-translate-y-full motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}
