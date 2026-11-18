import { PiArrowUpRightBold } from "react-icons/pi";
import { PageIntro } from "@/components/PageIntro";
import { tools } from "@/data/tools";
import { useTitle } from "@/lib/useTitle";

export default function Tools() {
  useTitle("Tools");
  return (
    <>
      <PageIntro title="Tools">Small things I build for myself, then leave open for anyone.</PageIntro>

      <div className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-40">
        <ul className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <a
                href={tool.href}
                className="group flex h-full flex-col justify-between gap-10 border border-line p-6 transition-colors hover:bg-sunk md:p-8"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-tight">{tool.name}</h2>
                    <span className="font-mono text-xs text-mute">{tool.status === "live" ? "Live" : "Soon"}</span>
                  </div>
                  <p className="mt-3 max-w-[46ch] text-mute">{tool.summary}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-ink">
                  Open
                  <PiArrowUpRightBold aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
