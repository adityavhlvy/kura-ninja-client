import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { getProject, profile, shortTitle } from "@/data/portfolio";
import { budgets, services, timelines } from "@/data/services";
import { buttonClass, chipClass, fieldClass } from "@/components/button";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { useTitle } from "@/lib/useTitle";
import { wrap } from "@/lib/wrap";

/** Builds the email the visitor sends; exported so the self-check below can test it. */
export function brief(f: { name: string; company: string; kinds: string[]; budget: string; timeline: string; message: string }) {
  const subject = `Project inquiry: ${f.kinds.join(", ") || "General"}${f.company ? ` (${f.company})` : ""}`;
  const body = [
    `Name: ${f.name}`,
    f.company ? `Company: ${f.company}` : "",
    `Service: ${f.kinds.join(", ") || "Not sure"}`,
    `Budget: ${f.budget}`,
    `Timeline: ${f.timeline}`,
    f.message,
  ]
    .filter((l) => l !== "")
    .join("\n")
    .replace("Timeline: " + f.timeline + "\n", "Timeline: " + f.timeline + "\n\n");
  return `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Choices({ legend, name, options, value, onChange, multi }: {
  legend: string;
  name: string;
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  multi?: boolean;
}) {
  return (
    <fieldset>
      <legend className="label">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o);
          return (
            <label key={o} className={`${chipClass(on)} has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sea`}>
              <input
                type={multi ? "checkbox" : "radio"}
                name={name}
                value={o}
                required={!multi && value.length === 0}
                checked={on}
                onChange={() => onChange(multi ? (on ? value.filter((x) => x !== o) : [...value, o]) : [o])}
                className="sr-only"
              />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Brief() {
  const [kinds, setKinds] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    window.location.href = brief({
      name: get("name"),
      company: get("company"),
      kinds,
      budget: budget[0],
      timeline: timeline[0],
      message: get("message"),
    });
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="grid gap-8">
      <Choices legend="What do you need?" name="kind" options={services.map((s) => s.title)} value={kinds} onChange={setKinds} multi />
      <div className="grid gap-6 md:grid-cols-2">
        <label>
          <span className="label">Your name</span>
          <input name="name" required autoComplete="name" maxLength={80} className={`${fieldClass} mt-2`} />
        </label>
        <label>
          <span className="label">Company (optional)</span>
          <input name="company" autoComplete="organization" maxLength={80} className={`${fieldClass} mt-2`} />
        </label>
      </div>
      <Choices legend="Budget" name="budget" options={budgets} value={budget} onChange={setBudget} />
      <Choices legend="Timeline" name="timeline" options={timelines} value={timeline} onChange={setTimeline} />
      <label>
        <span className="label">The project</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={1500}
          placeholder="What are you building, who is it for, and what exists already?"
          className={`${fieldClass} mt-2 h-auto min-h-36 resize-y py-3 leading-relaxed`}
        />
      </label>
      <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
        <button type="submit" className={buttonClass("primary")}>
          <Roll>Open it in my mail app</Roll>
        </button>
        <p role="status" className="text-sm text-ink/80">
          {sent
            ? `Your mail app should be open with the brief filled in. If not, write to ${profile.contact.email}.`
            : "Nothing is stored here. The brief goes from your own mail app, and I reply within two working days."}
        </p>
      </div>
    </form>
  );
}

export default function Hire() {
  useTitle("Hire me");
  return (
    <>
      <PageIntro title="Work with me">
        <span className="mb-4 inline-flex items-center gap-2 bg-sunk px-3 py-1 text-sm font-medium text-ink">
          <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-sea" />
          Open for a few side projects
        </span>
        <br />
        I take on freelance work alongside my role at Pupuk Indonesia: AI agents, maps, and full-stack apps. Pricing depends on
        scope, so tell me about the project and we start from there.
      </PageIntro>

      <section aria-labelledby="services-title" className={`${wrap} pb-20`}>
        <h2 id="services-title" className="sr-only">
          Services
        </h2>
        <ul className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {services.map((s, i) => {
            const proof = getProject(s.proof);
            return (
              <li key={s.id} className="flex border border-line bg-paper">
                <Reveal delay={i * 0.08} className="flex w-full flex-col p-7 md:p-10">
                  <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink">{s.pitch}</p>
                  <ul className="mt-8 space-y-3 border-t border-line pt-6 text-ink">
                    {s.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  {proof && (
                    <Link to={`/projects/${proof.slug}`} className="group mt-auto inline-flex pt-8 font-medium text-sea">
                      <Roll>{`See it in ${shortTitle(proof)}`}</Roll>
                    </Link>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="brief-title" className="bg-sunk py-20 md:py-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-12 lg:gap-6`}>
          <div className="lg:col-span-4">
            <h2 id="brief-title" className="text-[clamp(1.375rem,2.5vw,2.25rem)] leading-tight font-semibold tracking-tight">
              Send a brief
            </h2>
            <p className="mt-4 text-ink/80">
              A few quick picks and one paragraph. I read every one and reply with questions or a rough plan. Prefer to just talk? Use any channel on
              the{" "}
              <Link to="/contact" className="text-sea underline underline-offset-4">
                contact page
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <Brief />
          </div>
        </div>
      </section>
    </>
  );
}
