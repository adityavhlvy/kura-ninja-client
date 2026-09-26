import { Link } from "react-router-dom";
import { buttonClass } from "@/components/button";
import { Roll } from "@/components/Roll";
import { useTitle } from "@/lib/useTitle";

export default function NotFound() {
  useTitle("Not found");
  return (
    <section className="mx-auto flex min-h-[80dvh] max-w-[1440px] flex-col justify-center px-5 pt-24 md:px-10">
      <p className="font-mono text-sm text-mute">404</p>
      <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.5rem,6vw,5.5rem)]">
        This cell is open sea. Nothing is mapped here.
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className={buttonClass("primary")}>
          <Roll>Back to home</Roll>
        </Link>
        <Link to="/projects" className={buttonClass("outline")}>
          <Roll>See all work</Roll>
        </Link>
      </div>
    </section>
  );
}
