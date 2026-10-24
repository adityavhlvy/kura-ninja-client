// Square corners everywhere: the hex is the only non-rectangular shape on the
// site, so buttons stay plain rectangles. One primary per view. Every control
// on the site takes its classes from here so heights, borders, and focus match.
const base =
  "group inline-flex h-11 items-center gap-2 px-5 text-sm font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px disabled:opacity-50";

export const buttonClass = (variant: "primary" | "outline" | "inverse" = "primary") =>
  variant === "primary"
    ? `${base} bg-sea text-on-sea hover:bg-ink hover:text-paper`
    : variant === "inverse"
      ? `${base} bg-paper text-ink hover:bg-sea hover:text-on-sea`
      : `${base} border border-ink/80 text-ink hover:bg-ink hover:text-paper`;

/** Text inputs, textareas, and the one native select. */
export const fieldClass =
  "block h-11 w-full border border-line bg-paper px-3 text-ink transition-colors placeholder:text-mute hover:border-mute focus:border-sea focus:outline-none";

/** Toggle chips: filters, and the radio and checkbox choices in forms. */
export const chipClass = (active: boolean) =>
  `inline-flex h-11 cursor-pointer items-center border px-4 text-sm transition-colors ${
    active ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
  }`;
