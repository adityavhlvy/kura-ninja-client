import { PiArrowUpRightBold } from "react-icons/pi";
import { profile } from "@/data/portfolio";
import { EmailBlock } from "@/components/EmailBlock";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { useTitle } from "@/lib/useTitle";

export default function Contact() {
  useTitle("Contact");
  const { phone, socials } = profile.contact;

  return (
    <>
      <PageIntro title="Say hello">
        Email reaches me directly. There is no form here. The button opens your own mail app.
      </PageIntro>

      <div className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-40">
        <Reveal>
          <EmailBlock />
        </Reveal>

        <div className="mt-24 grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="label mb-4">Phone</h2>
            <a href={`tel:${phone.replace(/-/g, "")}`} className="link text-2xl font-medium">
              {phone}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="label mb-4">Elsewhere</h2>
            <ul className="border-t border-line">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-line py-4 text-lg transition-colors hover:text-sea"
                  >
                    {s.name}
                    <PiArrowUpRightBold aria-hidden="true" className="text-mute transition-transform duration-300 group-hover:rotate-45 group-hover:text-sea" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </>
  );
}
