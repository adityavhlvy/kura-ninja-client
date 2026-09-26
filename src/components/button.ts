// Square corners everywhere: the hex is the only non-rectangular shape on the
// site, so buttons stay plain rectangles. One primary per view.
const base =
  "group inline-flex h-11 items-center gap-2 px-5 text-sm font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px disabled:opacity-50";

export const buttonClass = (variant: "primary" | "outline" = "primary") =>
  variant === "primary"
    ? `${base} bg-sea text-on-sea hover:bg-ink hover:text-paper`
    : `${base} border border-ink/80 text-ink hover:bg-ink hover:text-paper`;
