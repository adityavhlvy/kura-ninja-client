import { ChannelList as ShellChannelList } from "@adityavhlvy/design-system";
import { channels } from "@/data/portfolio";

/** The package owns the row shape. The portfolio owns the data. */
export function ChannelList({ className }: { className?: string }) {
  return <ShellChannelList channels={channels} className={className} />;
}
