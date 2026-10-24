import type { IconType } from "react-icons";
import {
  PiArrowUpRightBold,
  PiEnvelopeSimpleBold,
  PiGithubLogoBold,
  PiGitlabLogoBold,
  PiInstagramLogoBold,
  PiLinkBold,
  PiLinkedinLogoBold,
  PiPhoneBold,
  PiSpotifyLogoBold,
} from "react-icons/pi";
import clsx from "clsx";
import { channels } from "@/data/portfolio";

const ICON: Record<string, IconType> = {
  Email: PiEnvelopeSimpleBold,
  Phone: PiPhoneBold,
  LinkedIn: PiLinkedinLogoBold,
  GitHub: PiGithubLogoBold,
  GitLab: PiGitlabLogoBold,
  Instagram: PiInstagramLogoBold,
  Spotify: PiSpotifyLogoBold,
};

/** The one contact list: every channel, same row shape, same order, on every page. */
export function ChannelList({ className }: { className?: string }) {
  return (
    <ul className={clsx("grid border-t border-current/15 sm:grid-cols-2 sm:gap-x-10", className)}>
      {channels.map((c) => {
        const Icon = ICON[c.name] ?? PiLinkBold;
        return (
          <li key={c.name} className="border-b border-current/15">
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noreferrer me" } : {})}
              className="group flex min-h-14 items-center gap-4 py-3 transition-colors hover:text-sea"
            >
              <Icon aria-hidden="true" className="shrink-0 text-xl" />
              <span className="font-medium">{c.name}</span>
              <span className="min-w-0 flex-1 truncate text-right text-sm opacity-70">{c.handle}</span>
              <PiArrowUpRightBold
                aria-hidden="true"
                className="shrink-0 opacity-60 transition-transform duration-300 group-hover:rotate-45"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
