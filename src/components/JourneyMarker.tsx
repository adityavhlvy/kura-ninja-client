import clsx from "clsx";
import { journeyTypeLabel, type JourneyType } from "@/data/portfolio";

// One hex per milestone. Fill encodes the kind, so the rail reads at a glance:
// work is solid sea, education solid ink, organisations and programmes outlined.
const style: Record<JourneyType, string> = {
  work: "fill-sea stroke-sea",
  education: "fill-ink stroke-ink",
  org: "fill-paper stroke-ink",
  achievement: "fill-paper stroke-sea",
};

export function JourneyMarker({ type, className }: { type: JourneyType; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={clsx("size-4 shrink-0", className)}>
      <path d="M10 1.5l7.4 4.25v8.5L10 18.5l-7.4-4.25v-8.5z" strokeWidth="2" className={style[type]} />
    </svg>
  );
}

export function JourneyLegend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-mute" aria-label="Milestone kinds">
      {(Object.keys(journeyTypeLabel) as JourneyType[]).map((t) => (
        <li key={t} className="flex items-center gap-2">
          <JourneyMarker type={t} className="size-3.5" />
          {journeyTypeLabel[t]}
        </li>
      ))}
    </ul>
  );
}
