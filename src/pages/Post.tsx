import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import { PiArrowLeftBold } from "react-icons/pi";
import { formatDate, getPost, getProject, posts, shortTitle, type Post as PostType } from "@/data/portfolio";
import { Reveal, RiseWords } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { useTitle } from "@/lib/useTitle";
import NotFound from "./NotFound";

/** Marks the h2 currently in the reading band as active in the contents rail. */
function useActiveHeading(toc: PostType["toc"] = []) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);
  return active;
}

export default function Post() {
  const { slug } = useParams();
  const post = getPost(slug);
  useTitle(post?.title ?? "Not found");
  const active = useActiveHeading(post?.toc);

  if (!post) return <NotFound />;

  const project = getProject(post.project);
  const next = posts.length > 1 ? posts[(posts.indexOf(post) + 1) % posts.length] : undefined;

  return (
    <article>
      <header className="mx-auto max-w-[1440px] px-5 pt-28 pb-12 md:px-10 md:pt-36">
        <Link to="/blog" className="group inline-flex items-center gap-2 text-sm text-mute hover:text-ink">
          <PiArrowLeftBold aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
          <Roll>All posts</Roll>
        </Link>
        <p className="label mt-10">
          <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.minutes} min read
        </p>
        <RiseWords as="h1" text={post.title} className="display mt-6 max-w-[22ch] text-[clamp(2.5rem,6vw,5.5rem)]" />
        <Reveal delay={0.2} className="mt-8 flex flex-col gap-4">
          <p className="max-w-[62ch] text-lg leading-relaxed text-mute">{post.summary}</p>
          {project && (
            <p className="text-sm text-mute">
              From the project{" "}
              <Link to={`/projects/${project.slug}`} className="link text-ink">
                {shortTitle(project)}
              </Link>
            </p>
          )}
        </Reveal>
      </header>

      {post.cover && (
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          {/* Covers are 1200x630, the link-preview size, so they show uncropped. */}
          <img src={post.cover} alt="" className="aspect-[40/21] w-full border border-line bg-sunk object-cover" />
        </div>
      )}

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-16 md:px-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-20">
        <nav aria-label="On this page" className={clsx("hidden", post.toc.length > 2 && "lg:block")}>
          <ul className="sticky top-24 space-y-1 border-l border-line">
            {post.toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className={clsx(
                    "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                    active === t.id ? "border-sea text-ink" : "border-transparent text-mute hover:text-ink",
                  )}
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Safe to inject: the HTML is rendered at build time from our own markdown, not user input. */}
        <div className="prose-post lg:col-start-2" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      {next && (
        <nav aria-label="Next post" className="mx-auto mt-32 max-w-[1440px] px-5 md:px-10">
          <Link to={`/blog/${next.slug}`} className="group block border-t border-ink pt-8">
            <p className="text-sm text-mute">Next post</p>
            <p className="display mt-3 max-w-[24ch] text-[clamp(2rem,4.5vw,4rem)] transition-colors group-hover:text-sea">
              {next.title}
            </p>
          </Link>
        </nav>
      )}
    </article>
  );
}
