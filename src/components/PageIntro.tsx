import type { ReactNode } from "react";
import { Reveal, RiseWords } from "./Reveal";

export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="mx-auto max-w-[1440px] px-5 pt-32 pb-12 md:px-10 md:pt-40 md:pb-16">
      <RiseWords as="h1" text={title} className="display max-w-[18ch] text-[clamp(2.75rem,7vw,6.5rem)]" />
      {children && (
        <Reveal delay={0.25} className="prose-body mt-8 text-lg">
          {children}
        </Reveal>
      )}
    </header>
  );
}
