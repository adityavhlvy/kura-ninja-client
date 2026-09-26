import { PiCheckBold, PiCopyBold } from "react-icons/pi";
import { profile } from "@/data/portfolio";
import { useCopy } from "@/lib/useCopy";
import { buttonClass } from "./button";
import { Roll } from "./Roll";

/** The contact call to action: the address itself, plus a real copy button. */
export function EmailBlock() {
  const { email } = profile.contact;
  const { state, copy } = useCopy();
  const [user, domain] = email.split("@");

  return (
    <div>
      <a
        href={`mailto:${email}`}
        className="display group block text-[clamp(1.6rem,5.2vw,5rem)] break-all transition-colors hover:text-sea"
      >
        {user}
        <span className="text-sea transition-colors group-hover:text-ink">@</span>
        {domain}
      </a>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={`mailto:${email}`} className={buttonClass("primary")}>
          <Roll>Email me</Roll>
        </a>
        <button type="button" onClick={() => copy(email)} className={buttonClass("outline")}>
          {state === "copied" ? <PiCheckBold aria-hidden="true" /> : <PiCopyBold aria-hidden="true" />}
          {state === "copied" ? "Copied" : state === "failed" ? "Copy failed, select it above" : "Copy address"}
        </button>
        <span role="status" className="sr-only">
          {state === "copied" ? "Email address copied" : ""}
        </span>
      </div>
    </div>
  );
}
