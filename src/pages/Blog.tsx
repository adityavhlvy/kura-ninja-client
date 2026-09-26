import { Link } from "react-router-dom";
import { formatDate, posts } from "@/data/portfolio";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { useTitle } from "@/lib/useTitle";

export default function Blog() {
  useTitle("Blog");

  return (
    <>
      <PageIntro title="Blog">
        Longer notes on the systems I build: how they work, the trade-offs I picked, and what I would change.
      </PageIntro>

      <div className="mx-auto max-w-[1440px] px-5 pb-10 md:px-10">
        {posts.length === 0 ? (
          <p className="border border-dashed border-line px-6 py-16 text-center text-lg">
            No posts yet. The first one is on its way.
          </p>
        ) : (
          <ul className="border-t border-line">
            {posts.map((p, i) => (
              <li key={p.slug} className="border-b border-line">
                <Reveal delay={Math.min(i, 4) * 0.06}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group grid gap-5 py-8 md:grid-cols-[minmax(0,1fr)_22rem] md:gap-10"
                  >
                    <div>
                      <p className="font-mono text-xs text-mute">
                        <time dateTime={p.date}>{formatDate(p.date)}</time>, {p.minutes} min read
                      </p>
                      <h2 className="display mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] transition-colors group-hover:text-sea">
                        {p.title}
                      </h2>
                      <p className="prose-body mt-3">{p.summary}</p>
                    </div>
                    {p.cover && (
                      <div className="overflow-hidden border border-line bg-sunk">
                        <img
                          src={p.cover}
                          alt=""
                          loading="lazy"
                          className="aspect-[40/21] w-full object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
