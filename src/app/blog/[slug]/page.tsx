import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorJump } from "@/components/post/author-jump";
import { PostEnter } from "@/components/post/post-enter";
import { Toc } from "@/components/post/toc";
import { Peek } from "@/components/site/stacking";
import { Badge } from "@/components/ui/badge";
import { team } from "@/lib/content";
import { authorBio, postContent } from "@/lib/post-content";
import { categories, formatDate, posts } from "@/lib/posts";
import { contact } from "@/lib/site";

/* /blog/[slug]: one template for every post. The [slug] folder name means
   "any address under /blog/" – e.g. /blog/pismo-z-urzedu; the post comes
   from src/lib/posts.ts (card details) and src/lib/post-content.ts (the
   text). All posts are built ahead of time (generateStaticParams). */

/* every post is built ahead of time, so the page may simply wait for its
   address (no loading placeholder needed) – it still ships as a static page */
export const instant = false;
/* (an address that isn't a post gets a real 404 from src/proxy.ts) */

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: `${post.title} – Lu Legal`, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const content = postContent[slug];
  if (!post || !content) notFound();

  const author = team.find((m) => m.slug === content.author)!;
  const person = contact.people.find((p) => p.name === author.name)!;
  const parts = content.blocks.flatMap((b) => (b.type === "part" ? [{ id: b.id, title: b.title }] : []));

  return (
    <main className="contents">
      {/* "contents": the sections pin against the whole page, not just <main> (see "Stacking" in lulegal.css) */}
      {/* the post hero: back link, tags, title, date · author · reading time */}
      <header className="lx-section lx-post-hero bg-navy text-white" aria-labelledby="post-title">
        <Link
          href="/blog"
          className="lx-post-hero__back self-start text-[length:var(--body)] font-medium tracking-[0.02em] hover:text-coral focus-visible:text-coral"
        >
          ← Wróć na blog
        </Link>
        <div className="lx-post-hero__head">
          <ul aria-label="Kategorie" className="lx-post-hero__cats flex flex-wrap gap-3">
            {post.categories.map((c) => (
              <li key={c}>
                <Badge asChild variant="post">
                  <Link href={`/blog?kategoria=${c}#filtry`}>{categories[c]}</Link>
                </Badge>
              </li>
            ))}
          </ul>
          <h1 className="lx-post-hero__title" id="post-title">
            {post.title}
          </h1>
          <div className="lx-post-hero__meta">
            <time dateTime={post.date} className="lx-label text-[length:inherit] tracking-[inherit]">
              {formatDate(post.date)}
            </time>
            <a href="#autor" className="transition-colors hover:text-coral focus-visible:text-coral">
              Autor: {author.name}
            </a>
            <span>{post.readingTime} min czytania</span>
          </div>
        </div>
      </header>

      <section className="lx-section lx-article bg-sky text-navy" aria-label="Treść wpisu">
        <div className="lx-article__main">
          <div className="lx-article__body">
            <p className="lx-article__lead" dangerouslySetInnerHTML={{ __html: content.lead }} />
            {content.blocks.map((b, i) =>
              b.type === "part" ? (
                <section key={b.id} id={b.id} className="lx-article__part" aria-labelledby={`${b.id}-h`}>
                  <h2 id={`${b.id}-h`}>{b.title}</h2>
                  {b.paragraphs.map((html, k) => (
                    <p key={k} dangerouslySetInnerHTML={{ __html: html }} />
                  ))}
                </section>
              ) : (
                <aside key={i} className="lx-tip" aria-label={b.label}>
                  <p className="lx-tip__label">
                    <Image src="/assets/icons/lightbulb.svg" alt="" width={20} height={20} />
                    {b.label}
                  </p>
                  {b.paragraphs.map((html, k) => (
                    <p key={k} dangerouslySetInnerHTML={{ __html: html }} />
                  ))}
                </aside>
              )
            )}
          </div>
          <Toc parts={parts} />
        </div>

        {/* the author */}
        <aside className="lx-author" id="autor" aria-label="Autor wpisu">
          <div className="flex min-w-0 flex-1 flex-col gap-10 py-6">
            <div className="flex flex-col gap-6 md:gap-10">
              <div className="flex flex-col gap-2">
                <p className="lx-label text-coral">{author.role}</p>
                <h2 className="text-[length:var(--title)] font-normal">{author.name}</h2>
              </div>
              <p className="max-w-[604px] text-[length:var(--body)] font-medium">{authorBio[content.author]}</p>
            </div>
            <ul className="flex flex-wrap gap-x-10 gap-y-4 text-[length:var(--body)] font-medium tracking-[0.02em]">
              <li className="flex items-center gap-2">
                <Image src="/assets/icons/telephone.svg" alt="" width={20} height={20} />
                <a href={`tel:${person.tel}`} className="transition-colors hover:text-coral focus-visible:text-coral">
                  {person.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Image src="/assets/icons/linkedin.svg" alt="" width={20} height={20} />
                <a href={person.linkedin} target="_blank" rel="noopener" className="transition-colors hover:text-coral focus-visible:text-coral">
                  {author.name}
                </a>
              </li>
            </ul>
          </div>
          <Image className="lx-author__photo" src={author.photo} alt={author.name} width={480} height={480} sizes="(max-width: 767px) 360px, (max-width: 1100px) 320px, 480px" />
        </aside>
        <Peek />
      </section>
      <AuthorJump />
      <PostEnter />
    </main>
  );
}
