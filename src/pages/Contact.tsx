import { ChannelList } from "@/components/ChannelList";
import { EmailBlock } from "@/components/EmailBlock";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { useTitle } from "@/lib/useTitle";

export default function Contact() {
  useTitle("Contact");
  return (
    <>
      <PageIntro title="Say hello">
        Email reaches me directly. There is no form here. The button opens your own mail app.
      </PageIntro>

      <div className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-40">
        <Reveal>
          <EmailBlock />
        </Reveal>

        <Reveal className="mt-24">
          <h2 className="label mb-4">Everywhere else</h2>
          <ChannelList className="text-lg" />
        </Reveal>
      </div>
    </>
  );
}
