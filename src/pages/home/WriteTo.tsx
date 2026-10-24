import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { wrap } from "@/lib/wrap";

const SOCIALS = ["LinkedIn", "GitHub", "Instagram"];

/** The close: the address itself as display type on the inverse ground. No form, there is no backend. */
export function WriteTo() {
  const { email, phone, socials } = profile.contact;
  const [user, domain] = email.split("@");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  return (
    <section aria-labelledby="write" className="mt-24 bg-ink py-20 text-paper md:mt-32 md:py-28">
      <div className={wrap}>
        <Reveal>
          <h2 id="write" className="max-w-[28ch] text-[clamp(1.25rem,1.7vw,1.625rem)] leading-snug">
            Working on something with maps, agents, or both? Write to me.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <a
            href={`mailto:${email}`}
            className="display block text-[7.1vw] leading-[0.92] transition-colors duration-300 hover:text-sea md:text-[min(6.6vw,96px)]"
          >
            {user}@
            <br />
            {domain}
          </a>
        </Reveal>
        <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <a href={`tel:${phone.replace(/-/g, "")}`} className="hover:text-sea">
              {phone}
            </a>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(email).then(() => setCopied(true))}
              className="h-11 self-start bg-paper px-5 font-medium text-ink transition-colors hover:bg-sea hover:text-on-sea active:translate-y-px"
            >
              <span aria-live="polite">{copied ? "Address copied" : "Copy the address"}</span>
            </button>
          </div>
          <ul className="flex gap-6">
            {socials
              .filter((s) => SOCIALS.includes(s.name))
              .map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-sea">
                    {s.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
