import { Link } from "react-router-dom";
import { profile } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { wrap } from "@/lib/wrap";

export function AboutBrief() {
  return (
    <section aria-labelledby="about-brief-title" className={`${wrap} pt-24 md:pt-32`}>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-9">
          <h2 id="about-brief-title" className="label">
            04 About
          </h2>
          <p className="mt-6 max-w-[40ch] text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.25] font-semibold tracking-tight">
            I ask how the work really runs before I write a line of it. Then I think about the system design more than is
            healthy.
          </p>
          <p className="hand mt-3 -rotate-2 text-2xl md:text-3xl">usually at 2am</p>
          <div className="mt-8">
            <Link to="/about" className="group inline-flex items-center gap-2 font-medium text-sea">
              <Roll>More about me</Roll>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-3">
          <img
            src="/assets/profile.webp"
            alt={`${profile.bio.name}, portrait`}
            width={720}
            height={1080}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full max-w-60 bg-sunk object-cover object-bottom grayscale"
          />
        </Reveal>
      </div>


      <Reveal delay={0.25} className="mt-16 md:mt-24">
        <div className="border-t border-line pt-12">
          <p className="label">Philosophy</p>
          <blockquote className="mt-4 max-w-[36ch] text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-snug tracking-tight text-ink">
            “{profile.philosophy.quote}”
          </blockquote>
          <p className="mt-4 text-sm text-mute">{profile.philosophy.comment}</p>
        </div>
      </Reveal>
    </section>
  );
}
