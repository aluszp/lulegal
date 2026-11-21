import Link from "next/link";

import { PostCard } from "@/components/site/post-card";
import { Section, SectionTitle } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/posts";

/* blog: the three newest posts and "Zobacz wszystkie wpisy" */
export function BlogPreview() {
  return (
    <Section tone="sky" stage="blog" id="blog" aria-labelledby="blog-title">
      <SectionTitle id="blog-title">blog</SectionTitle>
      <div className="mt-[var(--head-gap)] flex flex-col gap-10">
        {posts.slice(0, 3).map((post) => (
          // the home cards' tags are a little tighter than the blog list's
          <PostCard key={post.slug} post={post} tagClassName="px-1.5 py-0.5" data-stage-card />
        ))}
      </div>
      <div className="mt-10" data-stage-card>
        <Button asChild>
          <Link href="/blog">Zobacz wszystkie wpisy</Link>
        </Button>
      </div>
    </Section>
  );
}
