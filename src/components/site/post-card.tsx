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
    <article className="flex flex-col gap-6 border-b border-navy bg-white/60 p-6 outline-none md:gap-10 md:p-10" {...props}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-[length:var(--label)] font-semibold tracking-[0.1em] uppercase">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <time dateTime={post.date} className="lx-label text-coral">
            {formatDate(post.date)}
          </time>
          <ul aria-label="Kategorie" className="flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <li key={c}>
                <Badge asChild className={tagClassName}>
                  <Link href={`/blog?kategoria=${c}#filtry`}>{categories[c]}</Link>
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <span className="text-muted-foreground">{post.readingTime} min czytania</span>
      </div>

      <Heading className="text-[length:var(--post-title)] leading-[1.125] font-normal tracking-[-0.01em]">{post.title}</Heading>

      <div className="flex flex-col gap-6 md:gap-10">
        <p className="text-[length:var(--body)] font-medium">{post.excerpt}</p>
        <Button asChild variant="outline" className="self-start">
          <Link href={`/blog/${post.slug}`}>Czytaj dalej →</Link>
        </Button>
      </div>
    </article>
  );
}
