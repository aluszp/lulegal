import type { Metadata } from "next";

import { BlogList } from "@/components/blog/blog-list";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Blog – Lu Legal",
  description: "Piszemy o tym, co widzimy w naszej praktyce – prosto, z podpisem autora.",
};

/* /blog: the page hero and the filterable post list */
export default function BlogPage() {
  return (
    <main className="contents">
      {/* "contents": the sections pin against the whole page, not just <main> (see "Stacking" in lulegal.css) */}
      <PageHero
        title="blog"
        lead="Bez ogólników i przepisanych z internetu porad. Piszemy o tym, co widzimy w naszej praktyce – prosto, z podpisem autora. A gdy potrzebujesz więcej niż artykułu, po prostu do nas napisz."
      />
      <BlogList />
    </main>
  );
}
