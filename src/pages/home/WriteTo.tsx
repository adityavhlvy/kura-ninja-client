import { Link } from "react-router-dom";
import { profile } from "@/data/portfolio";
import { services } from "@/data/services";
import { buttonClass } from "@/components/button";
import { Reveal } from "@/components/Reveal";
import { useCopy } from "@/lib/useCopy";
import { wrap } from "@/lib/wrap";

/** The close: the address itself as display type on the inverse ground. No form, there is no backend. */
export function WriteTo() {
  const { email } = profile.contact;
  const [user, domain] = email.split("@");
  const { state, copy } = useCopy();

  return (
    <section aria-labelledby="write" className="flex min-h-[calc(100svh-4rem)] snap-start scroll-mt-16 flex-col justify-center bg-ink py-5 text-paper">
      <div className={wrap}>
        <Reveal>
          <p className="label text-paper/70">05 Contact</p>
          <h2 id="write" className="display mt-4 text-[clamp(2.5rem,6vw,5.5rem)]">
            Processes in. <span className="text-sea">Software out.</span>
          </h2>
          <p className="mt-6 max-w-[40ch] text-paper/80">Working on something with maps, agents, or both? Write to me.</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3 lg:gap-8">
            {services.map((s) => (
              <li key={s.id} className="border-t border-paper/25 pt-5">
                <p className="text-lg font-semibold">{s.title}</p>
                <p className="mt-2 leading-relaxed text-paper/90">{s.pitch}</p>
              </li>
            ))}
          </ul>
          <Link to="/hire" className={`${buttonClass("primary")} mt-6 hover:bg-paper hover:text-ink`}>
            Send a project brief
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <a
            href={`mailto:${email}`}
            className="display block text-[6.6vw] leading-[0.92] [overflow-wrap:anywhere] transition-colors duration-300 hover:text-sea md:text-[min(6.2vw,88px)]"
          >
            {user}@
            <br />
            {domain}
          </a>
          <button
            type="button"
            onClick={() => copy(email)}
            className={`${buttonClass("inverse")} mt-8`}
          >
            <span aria-live="polite">
              {state === "copied" ? "Address copied" : state === "failed" ? "Copy failed, select it above" : "Copy the address"}
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
