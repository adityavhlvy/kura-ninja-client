import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { certificationCount, certifications } from "@/data/portfolio";
import { PageIntro } from "@/components/PageIntro";
import { ease } from "@/components/Reveal";
import { useTitle } from "@/lib/useTitle";

const issuers = new Set(certifications.flatMap((g) => g.items.map((i) => i.issuer)));

export default function Credentials() {
  useTitle("Credentials");
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = certifications[tab];

  // Roving focus: arrow keys move between tabs, as the ARIA tabs pattern expects.
  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (tab + dir + certifications.length) % certifications.length;
    setTab(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      <PageIntro title="Credentials">
        {certificationCount} certificates from {issuers.size} issuers, grouped by what they cover.
      </PageIntro>

      <div className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-40">
        <div role="tablist" aria-label="Credential categories" onKeyDown={onKey} className="flex gap-1 overflow-x-auto border-b border-line">
          {certifications.map((g, i) => (
            <button
              key={g.category}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${i}`}
              aria-selected={tab === i}
              aria-controls="cert-panel"
              tabIndex={tab === i ? 0 : -1}
              onClick={() => setTab(i)}
              className={clsx(
                "relative shrink-0 px-4 py-3 text-sm whitespace-nowrap transition-colors",
                tab === i ? "text-ink" : "text-mute hover:text-ink",
              )}
            >
              {g.category}
              <span className="ml-2 font-mono text-xs text-mute">{g.items.length}</span>
              {tab === i && (
                <motion.span layoutId="cert-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-sea" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
              )}
            </button>
          ))}
        </div>

        <div id="cert-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={0} className="outline-none">
          <AnimatePresence mode="wait">
            <motion.ul
              key={group.category}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              variants={{ show: { transition: { staggerChildren: 0.035 } } }}
            >
              {group.items.map((c) => (
                <motion.li
                  key={c.name}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                  className="grid gap-2 border-b border-line py-5 md:grid-cols-[minmax(0,1fr)_12rem_7rem] md:items-baseline md:gap-8"
                >
                  <div>
                    <h2 className="text-lg font-medium leading-snug">{c.name}</h2>
                    {c.skills?.length ? <p className="mt-1 text-sm text-mute">{c.skills.join(", ")}</p> : null}
                  </div>
                  <p className="text-sm">
                    {c.issuer}
                    <span className="text-mute">, {c.type}</span>
                  </p>
                  <p className="font-mono text-xs text-mute md:text-right">{c.date}</p>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
