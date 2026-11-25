import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, formatDate, type Post } from "@/lib/posts";

/* A blog post card (home page and the blog list): white at 60% with a
   navy line under it. Date (coral, with its square), category tags and
   reading time; the title; the excerpt and "Czytaj dalej". Sizes follow
   the section's --label / --post-title / --body.
   - heading: the title's level (h3 on the home page, h2 on the blog)
   - tagClassName: extra classes for the tags
   - any other props go to the <article> (e.g. tabIndex, data-*) */
export function PostCard({
  post,
  heading: Heading = "h3",
  tagClassName,
  ...props
}: {
  post: Post;
  heading?: "h2" | "h3";
  tagClassName?: string;
} & React.ComponentProps<"article">) {
  return (
    <article className="flex flex-col gap-6 border-b border-navy bg-white/60 px-6 py-8 outline-none md:gap-10 md:p-10" {...props}>
      {/* mobile (Figma Mobile/Blog card, 903:582): the date on the left and
          the reading time on the right, the tags in a row under them; from
          tablet up: date and tags, the reading time at the far end */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-y-3 text-[length:var(--label)] font-semibold tracking-[0.1em] uppercase md:flex md:flex-wrap md:justify-between md:gap-x-4">
        <div className="contents md:flex md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2">
          <time dateTime={post.date} className="lx-label gap-1 text-coral md:gap-2">
            {formatDate(post.date)}
          </time>
          <ul aria-label="Kategorie" className="col-span-2 row-start-2 flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <li key={c}>
                <Badge asChild className={tagClassName}>
                  <Link href={`/blog?kategoria=${c}#filtry`}>{categories[c]}</Link>
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <span className="col-start-2 row-start-1 text-muted-foreground">{post.readingTime} min czytania</span>
      </div>

      {/* the excerpt 16px under the title on mobile, 40px from tablet up */}
      <div className="flex flex-col gap-4 md:gap-10">
        <Heading className="text-[length:var(--post-title)] leading-[34px] font-normal tracking-[-0.01em] md:leading-[1.125]">{post.title}</Heading>
        <p className="text-[length:var(--body)] font-medium">{post.excerpt}</p>
      </div>
      <Button asChild variant="outline" className="self-start">
        <Link href={`/blog/${post.slug}`}>Czytaj dalej →</Link>
      </Button>
    </article>
  );
}
